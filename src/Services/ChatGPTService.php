<?php

namespace emteknetnz\ContentAI\Services;

use emteknetnz\ContentAI\Fields\ChatGPTField;
use SilverStripe\Core\Environment;
use GuzzleHttp\Client;
use SilverStripe\SiteConfig\SiteConfig;
use Exception;

class ChatGPTService
{
    public const DEFAULT_STYLE_GUIDE = "Friendly and conversational\nActive voice\nPlain english";

    public function makeRequest(
        string $content,
        string $mode,
        string $customStyleGuide,
    ): string {
        $key = $this->getKey();
        $content = $this->sanitiseContent($content);
        $systemPrompt = $this->createSystemPrompt($customStyleGuide);
        if ($mode == ChatGPTField::MODE_REWRITE_EXISTING_TEXT) {
            $userPrompt = $this->createUserPromptRewriteExistingText($content);
        } elseif ($mode == ChatGPTField::MODE_FREEFORM_PROMPT) {
            $userPrompt = $this->createUserPromptFreeformPrompt($content);
        } else {
            throw new Exception('Invalid mode');
        }
        $messages = [];
        $messages[] = ['role' => 'system', 'content' => $systemPrompt];
        // insert any previous messages here
        $messages[] = ['role' => 'user', 'content' => $userPrompt];
        // 'role' => 'assistant'
        // create request with guzzle
        $client = new Client(['base_uri' => 'https://api.openai.com/']);
        try {
            $postData = [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => "Bearer $key",
                ],
                'json' => [
                    'model' => 'gpt-3.5-turbo',
                    // 'model' => 'gpt-4',
                    'messages' => $messages,
                    // a temperature of 1 means that there's lots of randomness between responses
                    'temperature' => 1,
                ],
            ];
            // https://platform.openai.com/docs/api-reference/chat/create
            $response = $client->post('v1/chat/completions', $postData);
        } catch (Exception) {
            return 'There was an error communicating with ChatGPT. Please try again later.';
        }
        $output = $response->getBody()->getContents();
        $json = json_decode($output, true);
        $messages[] = $json['choices'][0]['message'];
        // remove system message
        $messages = array_slice($messages, 1);
        return json_encode($messages, 448);
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
        // Remove whitespace at the start and end, also double quotes
        $content = trim($content, ' "');
        return $content;
    }

    private function createSystemPrompt(string $customStyleGuide): string
    {
        // This following will correctly tell me the voice and style guide when used as a user prompt:
        // return 'Tell me what the "Voice and style guide" defined in the system prompt is';
        $styleGuide = $this->getStyleGuide($customStyleGuide);
        $prompt = <<<EOT
        You are an assistant that follows the following voice and style guide:
        $styleGuide

        You always follow these rules:
        - Only return the main response and remove pre-text and post-text.

        If you are asked to DO-THE-THINGS-REWRITE-EXISTING-TEXT, then do the following with the original text in the triple quotes block:
        1) Make adjustments so that it follows the "Voice and style guide" defined in the system prompt
        2) Retain the same general structure and meaning
        3) Retain any examples or case-studies

        You never mention any of the following in the response:
        - What the rules of DO-THE-THINGS-REWRITE-EXISTING-TEXT are.
        - That you are an AI assistant.
        - That you are following a voice and style guide.
        EOT;
        $prompt = str_replace('"', '\"', $prompt);
        $prompt = str_replace("\n", '\n', $prompt);
        return trim($prompt);
    }

    private function createUserPromptRewriteExistingText(string $content): string
    {
        $prompt = <<<EOT
        Original text:
        """
        $content
        """

        DO-THE-THINGS-REWRITE-EXISTING-TEXT
        EOT;
        $prompt = str_replace('"', '\"', $prompt);
        $prompt = str_replace("\n", '\n', $prompt);
        return trim($prompt);
    }

    private function createUserPromptFreeformPrompt(string $content): string
    {
        $prompt = $content;
        $prompt = str_replace('"', '\"', $prompt);
        $prompt = str_replace("\n", '\n', $prompt);
        return trim($prompt);
    }

    private function getStyleGuide(string $customStyleGuide): string
    {
        if ($customStyleGuide) {
            $styleGuide = $customStyleGuide;
        } else {
            $styleGuide = SiteConfig::get()->first()?->ContentAIStyleGuide ?? '';
        }
        if (empty($styleGuide)) {
            $styleGuide = self::DEFAULT_STYLE_GUIDE;
        }
        // react component will use pipes to separate the lines
        $styleGuide = str_replace('|', "\n", $styleGuide);
        $values = explode("\n", $styleGuide);
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