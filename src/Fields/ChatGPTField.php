<?php

namespace emteknetnz\ContentAI\Fields;

use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;
use emteknetnz\ContentAI\Services\ChatGPTService;
use SilverStripe\Forms\FormField;
use SilverStripe\View\Requirements;
use SilverStripe\SiteConfig\SiteConfig;
use Exception;

/**
 * This is used by the 'page tab' version of the field
 */
class ChatGPTField extends FormField
{
    public const MODE_REWRITE_EXISTING_TEXT = 'rewrite-existing-text';

    public const MODE_FREEFORM_PROMPT = 'freeform-prompt';

    private static $allowed_actions = [
        'query'
    ];

    protected $schemaComponent = 'ChatGPTField';

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

    // This shows up in the entwine <input> tag
    // All the data-schema + data-state stuff should get converted to be a prop
    // in the react component so they get the same prop data no matter the context
    public function getAttributes()
    {
        return [
            'id' => $this->ID(),
            'class' => $this->extraClass(),
            // 'data-query-url' => $this->Link('query'),
            // "schema-data" is all the fixed form field API data that such as
            // "component" (react name), "title", "extraClass", "rightTitle", stuff for js validation, etc
            // there's a "data"  key in here for "custom" stuff
            'data-schema' => json_encode($this->getSchemaData()),
            // "schema-state" is things that can change, only value + message
            // there also some duplicates from schemaData of id + name
            // there's also a "data" key in here for "custom" stuff
            'data-state' => json_encode($this->getSchemaState()),
        ];
    }

    // this will show in the react component as props ... though not automatically if it's loaded by entwine
    // note that parent::getSchemaDataDefaults() will give a big stack of things like
    // 'disabled', 'readOnly', 'rightTitle', etc
    // public function getSchemaDataDefaults()
    // {
    //     $data = parent::getSchemaDataDefaults();
    //     $data['data'] = array_merge($data['data'], [
    //         'queryUrl' => $this->Link('query'),
    //         'styleGuide' => $this->getStyleGuide(),
    //     ]);
    //     return $data;
    // }

    private function getStyleGuide(): string
    {
        return SiteConfig::get()->first()?->ContentAIStyleGuide ?? ChatGPTService::DEFAULT_STYLE_GUIDE;
    }
}
