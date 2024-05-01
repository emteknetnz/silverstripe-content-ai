<?php

namespace emteknetnz\ContentAI\Controllers;

use SilverStripe\Admin\LeftAndMain;
use SilverStripe\Control\HTTPRequest;
use emteknetnz\ContentAI\Services\ChatGPTService;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\SiteConfig\SiteConfig;

/**
 * This is used by the 'bottom right' version of the field which uses ChatGPTField.global.js
 */
class ChatGPTController extends LeftAndMain
{
    private static string $url_segment = 'chatgpt';

    private static $allowed_actions = [
        'query'
    ];

    public function query(HTTPRequest $request)
    {
        $json = json_decode($request->getBody(), true);
        $content = $json['text'] ?? '';
        $mode = $json['mode'] ?? '';
        $customStyleGuide = $json['styleGuide'] ?? '';
        $service = new ChatGPTService();
        $result = $service->makeRequest($content, $mode, $customStyleGuide);
        return HTTPResponse::create()
            ->addHeader('Content-Type', 'text/plain')
            ->setBody($result);
    }

    public function getClientConfig(): array
    {
        $clientConfig = parent::getClientConfig();
        $clientConfig['chatgpt'] = [
            'queryUrl' => $this->Link('query'),
            'styleGuide' => $this->getStyleGuide(),
            'contexts' => $this->getContexts(),
        ];
        return $clientConfig;
    }

    private function getStyleGuide(): string
    {
        return SiteConfig::get()->first()?->ContentAIStyleGuide ?? ChatGPTService::DEFAULT_STYLE_GUIDE;
    }

    private function getContexts(): string
    {
        return SiteConfig::get()->first()?->ContentAIContexts ?? '';
    }
}
