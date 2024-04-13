<?php

namespace emteknetnz\ContentAI\Controllers;

use SilverStripe\Admin\LeftAndMain;
use SilverStripe\Control\HTTPRequest;
use emteknetnz\ContentAI\Services\ChatGPTService;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\SiteConfig\SiteConfig;

class ChatGPTController extends LeftAndMain
{
    private static string $url_segment = 'chatgpt';

    private static $allowed_actions = [
        'query'
    ];

    public function query(HTTPRequest $request)
    {
        $mode = $request->getVar('mode') ?: '';;
        $customStyleGuide = $request->getVar('styleguide') ?: '';
        $service = new ChatGPTService();
        $content = $request->getBody();
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
        ];
        return $clientConfig;
    }

    private function getStyleGuide(): string
    {
        return SiteConfig::get()->first()?->ContentAIStyleGuide ?? ChatGPTService::DEFAULT_STYLE_GUIDE;
    }
}
