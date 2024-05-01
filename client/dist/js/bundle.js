!function(){"use strict";var e={38:function(e,t,n){var l,a=(l=n(121))&&l.__esModule?l:{default:l};document.addEventListener("DOMContentLoaded",(()=>{(0,a.default)()}))},121:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=o(n(207)),a=o(n(629));function o(e){return e&&e.__esModule?e:{default:e}}t.default=()=>{l.default.component.registerMany({ChatGPTField:a.default})}},629:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l,a=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=u(t);if(n&&n.has(e))return n.get(e);var l={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&{}.hasOwnProperty.call(e,o)){var r=a?Object.getOwnPropertyDescriptor(e,o):null;r&&(r.get||r.set)?Object.defineProperty(l,o,r):l[o]=e[o]}return l.default=e,n&&n.set(e,l),l}(n(594)),o=(l=n(551))&&l.__esModule?l:{default:l},r=n(556);function u(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(u=function(e){return e?n:t})(e)}t.default=e=>{const[t,n]=(0,a.useState)(""),[l,u]=(0,a.useState)(!1),[i,s]=(0,a.useState)("rewrite-existing-text"),[d,c]=(0,a.useState)("default"),f=(0,a.useRef)(null),p=(0,a.useRef)(null),m=(0,a.useRef)(null),h=(e,t)=>a.default.createElement(o.default,{color:"info",onClick:()=>s(t),active:i===t,outline:"true"},e),g=(e,t)=>a.default.createElement(o.default,{color:"info",onClick:()=>c(t),active:d===t,outline:"true"},e),v=e.data.styleGuide.replace(/\n/g,", ").split(",").map((e=>a.default.createElement("li",null,e)));let y="";return"rewrite-existing-text"===i?y=a.default.createElement("div",null,"Apply the style guide to text entered below"):"freeform-prompt"===i&&(y=a.default.createElement("div",null,"Ask ChatGPT to do something for you. The results will have the style guide applied to it")),a.default.createElement("div",{className:"ChatGPTField no-change-track"},a.default.createElement("div",null,a.default.createElement("strong",null,"Mode: "),h("Rewrite text","rewrite-existing-text"),h("Freeform prompt","freeform-prompt")),y,a.default.createElement("div",null,a.default.createElement(r.Input,{type:"textarea",rows:"6",innerRef:f})),a.default.createElement("div",null,a.default.createElement("strong",null,"Style guide mode: "),g("Default","default"),g("Custom","custom")),"default"===d&&a.default.createElement("div",null,a.default.createElement("strong",null,"Default style guide:"),a.default.createElement("ul",null,v),a.default.createElement("div",{className:"ChatGPTField__edit-style-guide"},"Administrators can ",a.default.createElement("a",{href:"/admin/settings#Root_ContentAI",target:"_blank"},"edit the default style guide"))),"custom"===d&&a.default.createElement("div",null,"Enter your custom style guide rules seperated by line breaks.",a.default.createElement(r.Input,{type:"textarea",rows:"4",innerRef:p})),a.default.createElement("div",null,a.default.createElement(o.default,{color:"warning",onClick:()=>{const t=f.current.value;if(!t)return void n("Please enter some text in the field above.");const l=`${e.data.queryUrl}`;let a="";if("custom"===d&&(a=p.current.value,a)){const e=a.split("\n");a=e.map((e=>e.replace(/^[\*\-] */,""))).join("\n"),a=a.replaceAll("\n","|").replaceAll("||","|").replaceAll(/[\x00-\x1F\x7F]/gm,"")}u(!0),fetch(l,{method:"POST",body:JSON.stringify({mode:i,text:t,styleGuide:a})}).then((e=>e.json())).then((e=>{const t=e[e.length-1].content;n(t),u(!1)}))}},"Submit"),l&&a.default.createElement("span",{className:"ChatGPTField__querying"},"Communicating with ChatGPT...")),a.default.createElement("div",null,a.default.createElement("strong",null,"Response from ChatGPT:"),a.default.createElement("br",null),a.default.createElement(r.Input,{type:"textarea",rows:"8",value:t,readOnly:"true"}),a.default.createElement("br",null),"Submit again to get a different result."),a.default.createElement("div",null,a.default.createElement("strong",null,"Follow up:"),a.default.createElement("br",null),a.default.createElement(r.Input,{type:"textarea",rows:"2",innerRef:m,disabled:!t}),a.default.createElement(o.default,{color:"warning",onClick:()=>{}},"Submit")))}},231:function(e,t,n){var l=u(n(669)),a=u(n(594)),o=u(n(145)),r=n(207);function u(e){return e&&e.__esModule?e:{default:e}}function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&(e[l]=n[l])}return e},i.apply(this,arguments)}l.default.entwine("ss",(e=>{e(".js-injector-boot .entwine-chatgpt-field").entwine({Component:null,Root:null,onmatch(){const e=this.closest(".cms-content").attr("id"),t=e?{context:e}:{},n=this.data("schema-component"),l=(0,r.loadComponent)(n,t);this.setComponent(l),this.setRoot(o.default.createRoot(this[0])),this._super(),this.refresh()},refresh(){const e=this.getProps();this.getInputField().val(e.value);const t=this.getComponent();this.getRoot().render(a.default.createElement(t,i({},e,{noHolder:!0})))},handleChange(e){this.getInputField().data("value",e),this.refresh()},getProps(){const e=this.getInputField();return{...e.data("schema"),...e.data("state"),data:{...e.data("schema").data,...e.data("state").data},onChange:this.handleChange.bind(this)}},getInputField(){const t=this.data("field-id");return e(`#${t}`)},onunmatch(){const e=this.getRoot();e&&e.unmount()}})}))},720:function(e,t,n){var l=i(n(669)),a=i(n(594)),o=i(n(145)),r=i(n(177)),u=n(207);function i(e){return e&&e.__esModule?e:{default:e}}function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&(e[l]=n[l])}return e},s.apply(this,arguments)}l.default.entwine("ss",(e=>{e(".js-injector-boot .cms-container").entwine({Component:null,Root:null,onmatch(){const e=document.createElement("div");e.className="ChatGPTField__global-container",this[0].appendChild(e);const t=document.createElement("div");t.className="ChatGPTField__global-field-container",t.style.display="none",e.appendChild(t);const n=document.createElement("div");n.className="ChatGPTField__global-button",n.tabIndex=0,n.addEventListener("click",(()=>{"none"===t.style.display?(t.style.display="block",e.classList.add("ChatGPTField__global-container--open")):(t.style.display="none",e.classList.remove("ChatGPTField__global-container--open"))})),e.appendChild(n);const l=this.closest(".cms-content").attr("id"),a=l?{context:l}:{},r=(0,u.loadComponent)("ChatGPTField",a);this.setComponent(r),this.setRoot(o.default.createRoot(t)),this._super(),this.refresh()},refresh(){const e=this.getProps(),t=this.getComponent();this.getRoot().render(a.default.createElement(t,s({},e,{noHolder:!0})))},getProps(){const e=r.default.getSection("emteknetnz\\ContentAI\\Controllers\\ChatGPTController").chatgpt;return{data:{queryUrl:e.queryUrl,styleGuide:e.styleGuide,contexts:e.contexts}}},onunmatch(){const e=this.getRoot();e&&e.unmount()}})}))},551:function(e){e.exports=Button},177:function(e){e.exports=Config},207:function(e){e.exports=Injector},594:function(e){e.exports=React},145:function(e){e.exports=ReactDomClient},556:function(e){e.exports=Reactstrap},669:function(e){e.exports=jQuery}},t={};function n(l){var a=t[l];if(void 0!==a)return a.exports;var o=t[l]={exports:{}};return e[l](o,o.exports,n),o.exports}n(38),n(231),n(720)}();