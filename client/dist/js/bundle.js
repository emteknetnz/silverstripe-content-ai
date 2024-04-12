/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/src/boot/index.js":
/*!**********************************!*\
  !*** ./client/src/boot/index.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



var _registerComponents = _interopRequireDefault(__webpack_require__(/*! ./registerComponents */ "./client/src/boot/registerComponents.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
document.addEventListener('DOMContentLoaded', () => {
  (0, _registerComponents.default)();
});

/***/ }),

/***/ "./client/src/boot/registerComponents.js":
/*!***********************************************!*\
  !*** ./client/src/boot/registerComponents.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _Injector = _interopRequireDefault(__webpack_require__(/*! lib/Injector */ "lib/Injector"));
var _ChatGPTField = _interopRequireDefault(__webpack_require__(/*! components/ChatGPTField/ChatGPTField */ "./client/src/components/ChatGPTField/ChatGPTField.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const registerComponents = () => {
  _Injector.default.component.registerMany({
    ChatGPTField: _ChatGPTField.default
  });
};
var _default = exports["default"] = registerComponents;

/***/ }),

/***/ "./client/src/components/ChatGPTField/ChatGPTField.js":
/*!************************************************************!*\
  !*** ./client/src/components/ChatGPTField/ChatGPTField.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _Button = _interopRequireDefault(__webpack_require__(/*! components/Button/Button */ "components/Button/Button"));
var _reactstrap = __webpack_require__(/*! reactstrap */ "reactstrap");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ChatGPTField = props => {
  const [reply, setReply] = (0, _react.useState)('');
  const [querying, setQuerying] = (0, _react.useState)(false);
  const [mode, setMode] = (0, _react.useState)('rewrite-existing-text');
  const [useCustomStyleGuide, setUseCustomStyleGuide] = (0, _react.useState)(false);
  const textareaRef = (0, _react.useRef)(null);
  const checkboxRef = (0, _react.useRef)(null);
  const customStyleGuideRef = (0, _react.useRef)(null);
  const handleSubmit = () => {
    const text = textareaRef.current.value;
    if (!text) {
      setReply('Please enter some text in the field above.');
      return;
    }
    let url = `${props.data.queryUrl}?mode=${mode}`;
    if (useCustomStyleGuide) {
      let styleguide = customStyleGuideRef.current.value;
      if (styleguide) {
        const styleguideList = styleguide.split('\n');
        styleguide = styleguideList.map(item => item.replace(/^[\*\-] */, '')).join('\n');
        styleguide = styleguide.replaceAll('\n', '|').replaceAll('||', '|').replaceAll(/[\x00-\x1F\x7F]/gm, '');
        url += `&styleguide=${encodeURIComponent(styleguide)}`;
      }
    }
    setQuerying(true);
    fetch(url, {
      method: 'POST',
      body: text
    }).then(response => response.text()).then(responseText => {
      setReply(responseText);
      setQuerying(false);
    });
  };
  const createButton = (text, buttonMode) => _react.default.createElement(_Button.default, {
    color: "info",
    onClick: () => setMode(buttonMode),
    active: mode === buttonMode,
    outline: "true"
  }, text);
  const handleCheckboxChange = () => {
    const newValue = !useCustomStyleGuide;
    setUseCustomStyleGuide(!useCustomStyleGuide);
    checkboxRef.current.checked = newValue;
  };
  const styleGuide = props.data.styleGuide.replace(/\n/g, ', ');
  const styleGuideList = styleGuide.split(',').map(item => _react.default.createElement("li", null, item));
  let text = '';
  if (mode === 'rewrite-existing-text') {
    text = _react.default.createElement("div", null, "Apply the style guide to text entered below");
  } else if (mode === 'freeform-prompt') {
    text = _react.default.createElement("div", null, "Ask ChatGPT to do something for you. The results will have the style guide applied to it");
  }
  return _react.default.createElement("div", {
    className: "ChatGPTField no-change-track"
  }, _react.default.createElement("div", null, _react.default.createElement("strong", null, "Mode: "), createButton('Rewrite text', 'rewrite-existing-text'), createButton('Freeform prompt', 'freeform-prompt')), text, _react.default.createElement("div", null, _react.default.createElement(_reactstrap.Input, {
    type: "textarea",
    rows: "6",
    innerRef: textareaRef
  })), _react.default.createElement("div", null, _react.default.createElement("strong", null, "Default style guide:"), _react.default.createElement("ul", null, styleGuideList), _react.default.createElement("div", {
    className: "ChatGPTField__edit-style-guide"
  }, "Administrators can ", _react.default.createElement("a", {
    href: "/admin/settings#Root_ContentAI",
    target: "_blank"
  }, "edit the default style guide"))), _react.default.createElement(_reactstrap.Form, null, _react.default.createElement(_reactstrap.FormGroup, {
    check: true,
    inline: true
  }, _react.default.createElement(_reactstrap.Input, {
    type: "checkbox",
    onChange: handleCheckboxChange,
    innerRef: checkboxRef
  }), _react.default.createElement(_reactstrap.Label, {
    check: true,
    onClick: handleCheckboxChange
  }, "Use custom style guide")), _react.default.createElement("div", {
    style: {
      display: useCustomStyleGuide ? 'block' : 'none'
    }
  }, "Enter your custom style guide rules seperated by line breaks.", _react.default.createElement("br", null), "These rules will be used instead of the default style guide rules.", _react.default.createElement(_reactstrap.Input, {
    type: "textarea",
    rows: "3",
    innerRef: customStyleGuideRef
  }))), _react.default.createElement("div", null, _react.default.createElement(_Button.default, {
    color: "warning",
    onClick: handleSubmit
  }, "Submit"), querying && _react.default.createElement("span", {
    className: "ChatGPTField__querying"
  }, "Communicating with ChatGPT...")), reply && _react.default.createElement("div", null, _react.default.createElement("strong", null, "Response from ChatGPT:"), _react.default.createElement("br", null), _react.default.createElement(_reactstrap.Input, {
    type: "textarea",
    rows: "12",
    value: reply,
    readOnly: "true"
  }), _react.default.createElement("br", null), "Submit again to get a different result."), mode === 'rewrite-existing-text' && _react.default.createElement("div", {
    className: "ChatGPTField__sample-text"
  }, _react.default.createElement("strong", null, "Sample text that could be optimised:"), _react.default.createElement("br", null), "All information (including name and address details) contained in submissions will be made available to the public on the website unless you indicate that you would like all or part of your submission to remain in confidence. Automatically generated confidentiality statements in emails do not suffice for this purpose.", _react.default.createElement("br", null), _react.default.createElement("br", null), "Respondents who would like part of their submission to remain in confidence should provide this information marked as such in a separate attachment."));
};
var _default = exports["default"] = ChatGPTField;

/***/ }),

/***/ "./client/src/entwine/ChatGPTField.entwine.js":
/*!****************************************************!*\
  !*** ./client/src/entwine/ChatGPTField.entwine.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



var _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ "jquery"));
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _client = _interopRequireDefault(__webpack_require__(/*! react-dom/client */ "react-dom/client"));
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
_jquery.default.entwine('ss', $ => {
  $('.js-injector-boot .entwine-chatgpt-field').entwine({
    Component: null,
    Root: null,
    onmatch() {
      const cmsContent = this.closest('.cms-content').attr('id');
      const context = cmsContent ? {
        context: cmsContent
      } : {};
      const schemaComponent = this.data('schema-component');
      const ReactField = (0, _Injector.loadComponent)(schemaComponent, context);
      this.setComponent(ReactField);
      this.setRoot(_client.default.createRoot(this[0]));
      this._super();
      this.refresh();
    },
    refresh() {
      const props = this.getProps();
      this.getInputField().val(props.value);
      const ReactField = this.getComponent();
      const Root = this.getRoot();
      Root.render(_react.default.createElement(ReactField, _extends({}, props, {
        noHolder: true
      })));
    },
    handleChange(value) {
      this.getInputField().data('value', value);
      this.refresh();
    },
    getProps() {
      const inputField = this.getInputField();
      return {
        ...inputField.data('schema'),
        ...inputField.data('state'),
        ...{
          data: {
            ...inputField.data('schema').data,
            ...inputField.data('state').data
          },
          onChange: this.handleChange.bind(this)
        }
      };
    },
    getInputField() {
      const fieldID = this.data('field-id');
      return $(`#${fieldID}`);
    },
    onunmatch() {
      const Root = this.getRoot();
      if (Root) {
        Root.unmount();
      }
    }
  });
});

/***/ }),

/***/ "components/Button/Button":
/*!*************************!*\
  !*** external "Button" ***!
  \*************************/
/***/ (function(module) {

module.exports = Button;

/***/ }),

/***/ "lib/Injector":
/*!***************************!*\
  !*** external "Injector" ***!
  \***************************/
/***/ (function(module) {

module.exports = Injector;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = React;

/***/ }),

/***/ "react-dom/client":
/*!*********************************!*\
  !*** external "ReactDomClient" ***!
  \*********************************/
/***/ (function(module) {

module.exports = ReactDomClient;

/***/ }),

/***/ "reactstrap":
/*!*****************************!*\
  !*** external "Reactstrap" ***!
  \*****************************/
/***/ (function(module) {

module.exports = Reactstrap;

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

module.exports = jQuery;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**************************************!*\
  !*** ./client/src/bundles/bundle.js ***!
  \**************************************/


__webpack_require__(/*! boot */ "./client/src/boot/index.js");
__webpack_require__(/*! entwine/ChatGPTField.entwine.js */ "./client/src/entwine/ChatGPTField.entwine.js");
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map