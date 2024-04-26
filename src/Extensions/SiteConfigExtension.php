<?php

namespace emteknetnz\ContentAI\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\TextField;
use SilverStripe\SiteConfig\SiteConfig;

class SiteConfigExtension extends Extension
{
    private static $db = [
        'ContentAIStyleGuide' => 'Text',
        'ContentAIContexts' => 'Text',
    ];

    public function updateCMSFields(FieldList $fields): void
    {
        $fields->addFieldsToTab('Root.ContentAI', [
            TextareaField::create('ContentAIStyleGuide', 'Style guide rules')
                ->setRows(5)
                ->setDescription('Enter each rule on a new line'),
            TextareaField::create('ContentAIContexts', 'Style guide contexts')
                ->setRows(5)
                ->setDescription('Enter each context on a new line')
        ]);
    }

    public function onBeforeWrite()
    {
        // TODO: remove leading bullet points and other stuff
        $this->owner->ContentAIStyleGuide = str_replace("\r\n", "\n", $this->owner->ContentAIStyleGuide);
        $this->owner->ContentAIContexts = str_replace("\r\n", "\n", $this->owner->ContentAIContexts);
    }
}
