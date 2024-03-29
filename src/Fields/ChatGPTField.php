<?php

use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\View\Requirements;
use emteknetnz\ContentAI\Services\ChatGPTService;
use SilverStripe\Forms\TextareaField;

class ChatGPTField extends TextareaField
{
    private static $allowed_actions = [
        'query'
    ];

    public function Field($properties = [])
    {
        Requirements::javascript('emteknetnz/silverstripe-content-ai:client/js/chatgpt-field.js');
        return parent::Field($properties);
    }

    public function query(HTTPRequest $request): HTTPResponse
    {
        $service = new ChatGPTService();
        $content = $request->getBody();
        $output = $service->makeRequest($content);
        return HTTPResponse::create()
            ->addHeader('Content-Type', 'text/plain')
            ->setBody($output);
    }
}
