!function(){var t={318:function(t){t.exports=function(t){return t&&t.__esModule?t:{default:t}},t.exports.__esModule=!0,t.exports.default=t.exports},855:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return o}});var o=function(t){return t=t||Object.create(null),{on:function(e,n){(t[e]||(t[e]=[])).push(n)},off:function(e,n){t[e]&&t[e].splice(t[e].indexOf(n)>>>0,1)},emit:function(e,n){(t[e]||[]).slice().map((function(t){t(n)})),(t["*"]||[]).slice().map((function(t){t(e,n)}))}}}()},251:function(t){"use strict";t.exports=NetlifyCmsApp},983:function(t){"use strict";t.exports=netlifyIdentity}},e={};function n(o){var i=e[o];if(void 0!==i)return i.exports;var u=e[o]={exports:{}};return t[o](u,u.exports,n),u.exports}n.d=function(t,e){for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},function(){"use strict";var t=n(318),e=t(n(251)),o=t(n(855));window.___emitter=o.default,window.___loader={enqueue:function(){},hovering:function(){}},e.default.init(),e.default.registerPreviewStyle("cms.css")}(),function(){"use strict";var t=n(318)(n(983));window.netlifyIdentity=t.default;var e=function(){return t.default.on("login",(function(){document.location.href="/admin/"}))};t.default.on("init",(function(n){n?t.default.on("logout",(function(){e()})):e()})),setImmediate((function(){t.default.init()}))}()}();
//# sourceMappingURL=cms.js.map