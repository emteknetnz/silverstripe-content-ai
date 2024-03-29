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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ChatGPTField = _ref => {
  let {
    someProp
  } = _ref;
  return _react.default.createElement("div", null, "Hello world");
};
var _default = exports["default"] = ChatGPTField;

/***/ }),

/***/ "./client/src/entwine/ChatGPTField.js":
/*!********************************************!*\
  !*** ./client/src/entwine/ChatGPTField.js ***!
  \********************************************/
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
        value: inputField.data('value')
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
__webpack_require__(/*! entwine/ChatGPTField */ "./client/src/entwine/ChatGPTField.js");
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map