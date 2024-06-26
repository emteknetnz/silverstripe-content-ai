<?php

namespace emteknetnz\ContentAI\Extensions;

use League\HTMLToMarkdown\HtmlConverter;
use SilverStripe\Core\Extension;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextareaField;
use emteknetnz\ContentAI\Services\ChatGPTService;
use emteknetnz\ContentAI\Fields\ChatGPTField;
use SilverStripe\Forms\TreeDropdownField;
use SilverStripe\CMS\Model\SiteTree;

class SiteTreeExtension extends Extension
{
    private static $db = [
        'ContentAITwo' => 'Text',
    ];

    public function updateCMSFields(FieldList $fields)
    {
        // Create a new tab with Content AI fields
        $fieldOne = TextareaField::create(
            'ContentAIOne',
            'Page content as plain text',
            $this->getContentAsMarkdown()
        )
            ->setRows(20)
            ->setDescription('This field is the page content as last save converted to plain text. Editing this field will not change the page content.');

        $fieldGen = CheckboxField::create(
            'GenerateContentAI',
            'Generate Content AI on page save'
        )
            ->setDescription('This will take several seconds.');

        $fieldTwo = TextareaField::create(
            'ContentAITwo',
            'AI generated content as plain text'
        )
            ->setRows(20)
            ->setDescription('This field will be automatically generated by AI when the page is saved after ticking the "Generate Content AI on save" checkbox. It may have been generated from a previous version of the page content.');

        $fields->addFieldsToTab(
            'Root.ContentAI',
            FieldList::create([$fieldOne, $fieldGen, $fieldTwo])
        );

        $fieldThree = new ChatGPTField('MyChatGPTField', 'Quick ChatGPT Field');
        $fieldThree->setTitle('');
        $fieldFour = new TreeDropdownField('MyTreeDropdownField', 'My Tree Dropdown Field', SiteTree::class);

        $fields->addFieldsToTab(
            'Root.QuickAI',
            FieldList::create([
                $fieldThree,
                // $fieldFour
            ])
        );
    }

    public function onBeforeWrite($f)
    {
        $changed = $this->owner->getChangedFields();
        // onBeforeWrite is called twice times, should only run once
        if (!isset($changed['SecurityID'])) {
            return;
        }
        // check user has ticked checkbox
        if ($changed['GenerateContentAI']['after'] != 1) {
            return;
        }
        $service = new ChatGPTService();
        $content = $this->getContentAsMarkdown();
        $output = $service->makeRequest($content, ChatGPTField::MODE_REWRITE_EXISTING_TEXT, '');
        $this->owner->ContentAITwo = $output;
    }

    private function getContentAsMarkdown(): string
    {
        // https://github.com/thephpleague/html-to-markdown
        $converter = new HtmlConverter();
        $config = $converter->getConfig();
        $config->setOption('strip_tags', true);
        $config->setOption('italic_style', '*');
        $config->setOption('bold_style', '**');
        $config->setOption('header_style', 'atx');
        $html = $this->owner->Content;
        $markdown = $converter->convert($html ?? '');
        return $markdown;
    }
}
