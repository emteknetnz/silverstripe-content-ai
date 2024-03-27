<?php

namespace emteknetnz\ContentAI\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextareaField;

class SiteTreeExtension extends Extension
{
    private static $db = [
        'ContentAI' => 'Text',
    ];

    public function updateCMSFields(FieldList $fields)
    {
        $fields->addFieldToTab(
            'Root.ContentAI',
            TextareaField::create('ContentAI', 'Content AI')
        );
    }
}
