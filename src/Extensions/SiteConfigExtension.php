<?php

namespace emteknetnz\ContentAI\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextField;
use SilverStripe\SiteConfig\SiteConfig;

class SiteConfigExtension extends Extension
{
    private static $db = [
        'ContentAIStyleGuide' => 'Text'
    ];

    public function updateCMSFields(FieldList $fields): void
    {
        $values = explode("\n", $this->getOwner()->ContentAIStyleGuide ?? '');
        $field = CompositeField::create(new FieldList([
            TextField::create('ContentAIRuleOne', 'Rule #1', $values[0] ?? ''),
            TextField::create('ContentAIRuleTwo', 'Rule #2', $values[1] ?? ''),
            TextField::create('ContentAIRuleThree', 'Rule #3', $values[2] ?? ''),
            TextField::create('ContentAIRuleFour', 'Rule #4', $values[3] ?? ''),
            TextField::create('ContentAIRuleFive', 'Rule #5', $values[4] ?? ''),
        ]))
            ->setTitle('Style guide rules');
        $fields->addFieldToTab('Root.ContentAI', $field);
    }

    public function onBeforeWrite()
    {
        $styleGuide = [];
        /** @var SiteConfig $owner */
        $owner = $this->getOwner();
        $changedFields = $owner->getChangedFields();
        foreach ($changedFields as $name => $arr) {
            if (strpos($name, 'ContentAIRule') !== 0) {
                continue;
            }
            $after = $arr['after'];
            if (empty($after)) {
                continue;
            }
            $styleGuide[] = $after;
        }
        $owner->ContentAIStyleGuide = implode("\n", $styleGuide);
    }
}
