/* global ss */
/* eslint-disable */
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { loadComponent } from 'lib/Injector';

jQuery.entwine('ss', ($) => {

  $('.js-injector-boot .entwine-chatgpt-field').entwine({

    Component: null,
    Root: null,

    onmatch() {
      const cmsContent = this.closest('.cms-content').attr('id');
      const context = (cmsContent)
        ? { context: cmsContent }
        : {};

      const schemaComponent = this.data('schema-component');
      const ReactField = loadComponent(schemaComponent, context);

      this.setComponent(ReactField);
      this.setRoot(ReactDOM.createRoot(this[0]))
      this._super();
      this.refresh();
    },

    refresh() {
      const props = this.getProps();
      this.getInputField().val(props.value);
      const ReactField = this.getComponent();
      const Root = this.getRoot();
      Root.render(<ReactField {...props} noHolder/>);
    },

    handleChange(value) {
      this.getInputField().data('value', value);
      this.refresh();
    },

    /**
     * Find the selected node and get attributes associated to attach the data to the form
     *
     * @returns {Object}
     */
    getProps() {
      const inputField = this.getInputField();
      return {
        // doing this to what happens when a react component is loaded in
        // a non-entwine context e.g. as an elemental block where there are all of
        // there props that are just magically there (most people probably don't realise
        // that they are there)
        // ensure that a 'data-schema' and 'data-state' as set in FormField::getAttributes()
        ...inputField.data('schema'),
        ...inputField.data('state'),
        ...{
          data: {
            ...inputField.data('schema').data,
            ...inputField.data('state').data
          },
          onChange: this.handleChange.bind(this),
        }
      };
    },

    /**
     * Get the <input> field that represents the ChatGPTField
     */
    getInputField() {
      const fieldID = this.data('field-id');
      return $(`#${fieldID}`);
    },

    /**
     * Remove the component when unmatching
     */
    onunmatch() {
      const Root = this.getRoot();
      if (Root) {
        Root.unmount();
      }
    },
  });
});
