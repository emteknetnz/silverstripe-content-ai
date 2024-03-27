<?php

namespace emteknetnz\ContentAI\Services;

use SilverStripe\Core\Environment;
use Exception;

class ChatGPTService
{
    public function makeRequest(string $content): string
    {
        $key = $this->getKey();
        $prompt = $this->createPrompt($content);
        // todo use guzzle, get error codes etc
        $cmd = <<<EOT
        curl https://api.openai.com/v1/chat/completions \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $key" \
        -d '{
           "model": "gpt-3.5-turbo",
           "messages": [{"role": "user", "content": "$prompt"}],
           "temperature": 0.7
         }'
        EOT;
        $cmd = trim($cmd);
        $output = shell_exec($cmd);
        $json = json_decode($output, true);
        return $json['choices'][0]['message']['content'];
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

    private function createPrompt(string $content): string
    {
        $prompt = <<<EOT
        Original text:
        """
        $content
        """

        Voice and style guide:
        ```
        1) Friendly and conversational
        2) Active voice
        3) Plain english
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
}

/*
{ "id": "chatcmpl-97KapChX7pnjlyyrtfyx1kGfltApT", "object": "chat.completion", "created": 1711534483, "model": "gpt-3.5-turbo-0125", "choices": [ { "index": 0, "message": { "role": "assistant", "content": "This is a test!" }, "logprobs": null, "finish_reason": "stop" } ], "usage": { "prompt_tokens": 13, "completion_tokens": 5, "total_tokens": 18 }, "system_fingerprint": "fp_3bc1b5746c" }
*/