/* global ss */
/* eslint-disable */
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Config from 'lib/Config';
import { loadComponent } from 'lib/Injector';

jQuery.entwine('ss', ($) => {

  $('.js-injector-boot .cms-container').entwine({

    Component: null,
    Root: null,

    onmatch() {

      const globalContainer = document.createElement('div');
      globalContainer.className = 'ChatGPTField__global-container';
      this[0].appendChild(globalContainer);

      const globalFieldContainer = document.createElement('div');
      globalFieldContainer.className = 'ChatGPTField__global-field-container';
      globalFieldContainer.style.display = 'none';
      globalContainer.appendChild(globalFieldContainer);

      const globalButton = document.createElement('div');
      globalButton.className = 'ChatGPTField__global-button';
      globalButton.tabIndex = 0;
      globalButton.addEventListener('click', () => {
        if (globalFieldContainer.style.display === 'none') {
          globalFieldContainer.style.display = 'block';
          globalContainer.classList.add('ChatGPTField__global-container--open');
        } else {
          globalFieldContainer.style.display = 'none';
          globalContainer.classList.remove('ChatGPTField__global-container--open');
        }
      });
      globalContainer.appendChild(globalButton);

      const cmsContent = this.closest('.cms-content').attr('id');
      const context = (cmsContent)
        ? { context: cmsContent }
        : {};

      // const schemaComponent = this.data('schema-component');
      const schemaComponent = 'ChatGPTField';
      const ReactField = loadComponent(schemaComponent, context);

      this.setComponent(ReactField);
      this.setRoot(ReactDOM.createRoot(globalFieldContainer))
      this._super();
      this.refresh();
    },

    refresh() {
      const props = this.getProps();
    //   this.getInputField().val(props.value);
      const ReactField = this.getComponent();
      const Root = this.getRoot();
      Root.render(<ReactField {...props} noHolder/>);
    },

    /**
     * Find the selected node and get attributes associated to attach the data to the form
     */
    getProps() {
        const section = 'emteknetnz\\ContentAI\\Controllers\\ChatGPTController';
        const config = Config.getSection(section)['chatgpt'];

        return {
          data: {
            queryUrl: config.queryUrl,
            styleGuide: config.styleGuide,
            contexts: config.contexts,
          },
        };
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
