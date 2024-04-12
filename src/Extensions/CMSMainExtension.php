<?php

namespace emteknetnz\ContentAI\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\Forms\Form;
use emteknetnz\ContentAI\Fields\ChatGPTField;

class CMSMainExtension extends Extension
{
    public function updateEditForm(Form $form)
    {
        return;
        //
        $field = new ChatGPTField('MyChatGPTField', 'Quick ChatGPT Field');
        $field->setForm($form);
        $field->addExtraClass('ChatGPTField--cms-main');
        $form->Fields()->add($field);
    }
}
