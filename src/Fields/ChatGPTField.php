<?php

namespace emteknetnz\ContentAI\Fields;

use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;
use emteknetnz\ContentAI\Services\ChatGPTService;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\FormField;
use SilverStripe\View\Requirements;

class ChatGPTField extends TextareaField
{
    private static $allowed_actions = [
        'query'
    ];

    protected $schemaComponent = 'ChatGPTField';

    // probably dont' need this
    protected $schemaDataType = FormField::SCHEMA_DATA_TYPE_CUSTOM;

    // or this
    protected $inputType = 'hidden';

    public function Field($properties = [])
    {
        Requirements::javascript('emteknetnz/silverstripe-content-ai:client/dist/js/bundle.js');
        Requirements::css('emteknetnz/silverstripe-content-ai:client/dist/styles/bundle.css');
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
