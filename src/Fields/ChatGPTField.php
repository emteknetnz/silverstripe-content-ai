<?php

namespace emteknetnz\ContentAI\Fields;

use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;
use emteknetnz\ContentAI\Services\ChatGPTService;
use SilverStripe\Forms\FormField;
use SilverStripe\View\Requirements;

class ChatGPTField extends FormField
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

    public function query(HTTPRequest $request)
    {
        $service = new ChatGPTService();
        $content = $request->getBody();
        $result = $service->makeRequest($content);
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

    // this will show in the react component as props ... but only if it's not loaded by entwine
    // note that parent::getSchemaDataDefaults() will give a big stack of things like
    // 'disabled', 'readOnly', 'rightTitle', etc
    public function getSchemaDataDefaults()
    {
        $data = parent::getSchemaDataDefaults();
        $data['data'] = array_merge($data['data'], [
            'queryUrl' => $this->Link('query'),
        ]);
        return $data;
    }
}
