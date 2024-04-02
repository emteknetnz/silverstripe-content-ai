<?php

namespace emteknetnz\ContentAI\Services;

use SilverStripe\Core\Environment;
use GuzzleHttp\Client;
use SilverStripe\SiteConfig\SiteConfig;

class ChatGPTService
{
    const DEFAULT_STYLE_GUIDE = "Friendly and conversational\nActive voice\nPlain english";

    public function makeRequest(string $content): string
    {
        $key = $this->getKey();
        $content = $this->sanitiseContent($content);
        $prompt = $this->createPrompt($content);
        // create request with guzzle
        $client = new Client(['base_uri' => 'https://api.openai.com/']);
        $response = $client->post('v1/chat/completions', [
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => "Bearer $key",
            ],
            'json' => [
                'model' => 'gpt-3.5-turbo',
                'messages' => [['role' => 'user', 'content' => $prompt]],
                'temperature' => 0.7
            ],
        ]);
        $output = $response->getBody()->getContents();
        $json = json_decode($output, true);
        $res = $json['choices'][0]['message']['content'];
        return $res;
    }

    private function getKey(): string
    {
        // https://platform.openai.com/docs/api-reference/introduction
        $key = Environment::getEnv('OPENAI_API_KEY');
        if (!$key) {
            throw new Exception('OPENAI_API_KEY environment key is not set');
        }
        return $key;
    }

    private function sanitiseContent(string $content): string
    {
        // Retain newlines
        $content = str_replace("\n", '\n', $content);
        // Remove non-printable characters - ASCII cars 0-31 + 127
        $content = preg_replace('/[\x00-\x1F\x7F]/u', '', $content);
        return trim($content);
    }

    private function createPrompt(string $content): string
    {
        // Friendly and conversational\nActive voice\nPlain english
        $styleGuide = $this->getStyleGuide();
        $prompt = <<<EOT
        Original text:
        """
        $content
        """

        Voice and style guide:
        ```
        $styleGuide
        ```

        [Return only the main response. Remove pre-text and post-text.]

        Do the following with the original text in the triple quotes block:
        1) Make adjustments so that it follows the "Voice and style guide" defined in the triple tilde block
        2) Retain the same general structure and meaning
        3) Retain any examples or case-studies
        EOT;
        $prompt = str_replace('"', '\"', $prompt);
        $prompt = str_replace("\n", '\n', $prompt);
        return trim($prompt);
    }

    private function getStyleGuide(): string
    {
        $contentAIStyleGuide = SiteConfig::get()->first()?->ContentAIStyleGuide;
        if (empty($contentAIStyleGuide)) {
            $styleGuide = self::DEFAULT_STYLE_GUIDE;
        }
        $values = explode("\n", $contentAIStyleGuide);
        $i = 1;
        $styleGuide = implode("\n", array_map(function(string $value) use (&$i) {
            $v = "$i) $value";
            $i++;
            return $v;
        }, $values));
        return $styleGuide;
    }
}
/*
{ "id": "chatcmpl-97KapChX7pnjlyyrtfyx1kGfltApT", "object": "chat.completion", "created": 1711534483, "model": "gpt-3.5-turbo-0125", "choices": [ { "index": 0, "message": { "role": "assistant", "content": "This is a test!" }, "logprobs": null, "finish_reason": "stop" } ], "usage": { "prompt_tokens": 13, "completion_tokens": 5, "total_tokens": 18 }, "system_fingerprint": "fp_3bc1b5746c" }
*/