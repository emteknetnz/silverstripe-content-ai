!function(){"use strict";var t={38:function(t,e,n){var a,o=(a=n(121))&&a.__esModule?a:{default:a};document.addEventListener("DOMContentLoaded",(()=>{(0,o.default)()}))},121:function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n(207)),o=r(n(629));function r(t){return t&&t.__esModule?t:{default:t}}e.default=()=>{a.default.component.registerMany({ChatGPTField:o.default})}},629:function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=function(t,e){if(!e&&t&&t.__esModule)return t;if(null===t||"object"!=typeof t&&"function"!=typeof t)return{default:t};var n=o(e);if(n&&n.has(t))return n.get(t);var a={__proto__:null},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in t)if("default"!==u&&{}.hasOwnProperty.call(t,u)){var l=r?Object.getOwnPropertyDescriptor(t,u):null;l&&(l.get||l.set)?Object.defineProperty(a,u,l):a[u]=t[u]}return a.default=t,n&&n.set(t,a),a}(n(594));function o(t){if("function"!=typeof WeakMap)return null;var e=new WeakMap,n=new WeakMap;return(o=function(t){return t?n:e})(t)}e.default=t=>{const e=t.data.queryUrl,[n,o]=(0,a.useState)(""),r="The quick brown fox jumped over the lazy dog";return(0,a.useEffect)((async()=>{const t=await fetch(e,{method:"POST",body:r}),n=await t.text();o(n)}),[]),a.default.createElement("div",null,a.default.createElement("h2",null,"React field has loaded"),a.default.createElement("div",null,"Start text is: ",a.default.createElement("strong",null,r)),a.default.createElement("div",null,"Result is: ",a.default.createElement("strong",null,n)))}},541:function(t,e,n){var a=l(n(669)),o=l(n(594)),r=l(n(145)),u=n(207);function l(t){return t&&t.__esModule?t:{default:t}}function i(){return i=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},i.apply(this,arguments)}a.default.entwine("ss",(t=>{t(".js-injector-boot .entwine-chatgpt-field").entwine({Component:null,Root:null,onmatch(){const t=this.closest(".cms-content").attr("id"),e=t?{context:t}:{},n=this.data("schema-component"),a=(0,u.loadComponent)(n,e);this.setComponent(a),this.setRoot(r.default.createRoot(this[0])),this._super(),this.refresh()},refresh(){const t=this.getProps();this.getInputField().val(t.value);const e=this.getComponent();this.getRoot().render(o.default.createElement(e,i({},t,{noHolder:!0})))},handleChange(t){this.getInputField().data("value",t),this.refresh()},getProps(){const t=this.getInputField();return{...t.data("schema"),...t.data("state"),data:{...t.data("schema").data,...t.data("state").data},onChange:this.handleChange.bind(this)}},getInputField(){const e=this.data("field-id");return t(`#${e}`)},onunmatch(){const t=this.getRoot();t&&t.unmount()}})}))},207:function(t){t.exports=Injector},594:function(t){t.exports=React},145:function(t){t.exports=ReactDomClient},669:function(t){t.exports=jQuery}},e={};function n(a){var o=e[a];if(void 0!==o)return o.exports;var r=e[a]={exports:{}};return t[a](r,r.exports,n),r.exports}n(38),n(541)}();