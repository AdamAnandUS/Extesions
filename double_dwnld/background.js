parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Dovi":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class r extends Error{constructor(r){super(`Unreachable case: ${r}`)}}function e(r,e="no additional info provided"){if(!r)throw new Error("Assertion Error: "+e)}function o(...r){}exports.UnreachableCaseError=r,exports.assert=e,exports.noop=o;
},{}],"fv3V":[function(require,module,exports) {
"use strict";function e(e){for(var r in e)exports.hasOwnProperty(r)||(exports[r]=e[r])}Object.defineProperty(exports,"__esModule",{value:!0}),e(require("./functions"));
},{"./functions":"Dovi"}],"wNgb":[function(require,module,exports) {
var define;
var global = arguments[3];
var e,r=arguments[3];!function(r,s){if("function"==typeof e&&e.amd)e("webextension-polyfill",["module"],s);else if("undefined"!=typeof exports)s(module);else{var g={exports:{}};s(g),r.browser=g.exports}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,function(e){"use strict";if("undefined"==typeof browser||Object.getPrototypeOf(browser)!==Object.prototype){const r="The message port closed before a response was received.",s="Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)",g=e=>{const g={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(0===Object.keys(g).length)throw new Error("api-metadata.json has not been included in browser-polyfill");class n extends WeakMap{constructor(e,r){super(r),this.createItem=e}get(e){return this.has(e)||this.set(e,this.createItem(e)),super.get(e)}}const a=(r,s)=>(...g)=>{e.runtime.lastError?r.reject(new Error(e.runtime.lastError.message)):s.singleCallbackArg||g.length<=1&&!1!==s.singleCallbackArg?r.resolve(g[0]):r.resolve(g)},m=e=>1==e?"argument":"arguments",t=(e,r,s)=>new Proxy(r,{apply:(r,g,n)=>s.call(g,e,...n)});let A=Function.call.bind(Object.prototype.hasOwnProperty);const i=(e,r={},s={})=>{let g=Object.create(null),n={has:(r,s)=>s in e||s in g,get(n,o,l){if(o in g)return g[o];if(!(o in e))return;let x=e[o];if("function"==typeof x)if("function"==typeof r[o])x=t(e,e[o],r[o]);else if(A(s,o)){let r=((e,r)=>(function(s,...g){if(g.length<r.minArgs)throw new Error(`Expected at least ${r.minArgs} ${m(r.minArgs)} for ${e}(), got ${g.length}`);if(g.length>r.maxArgs)throw new Error(`Expected at most ${r.maxArgs} ${m(r.maxArgs)} for ${e}(), got ${g.length}`);return new Promise((n,m)=>{if(r.fallbackToNoCallback)try{s[e](...g,a({resolve:n,reject:m},r))}catch(t){console.warn(`${e} API method doesn't seem to support the callback parameter, `+"falling back to call it without a callback: ",t),s[e](...g),r.fallbackToNoCallback=!1,r.noCallback=!0,n()}else r.noCallback?(s[e](...g),n()):s[e](...g,a({resolve:n,reject:m},r))})}))(o,s[o]);x=t(e,e[o],r)}else x=x.bind(e);else if("object"==typeof x&&null!==x&&(A(r,o)||A(s,o)))x=i(x,r[o],s[o]);else{if(!A(s,"*"))return Object.defineProperty(g,o,{configurable:!0,enumerable:!0,get:()=>e[o],set(r){e[o]=r}}),x;x=i(x,r[o],s["*"])}return g[o]=x,x},set:(r,s,n,a)=>(s in g?g[s]=n:e[s]=n,!0),defineProperty:(e,r,s)=>Reflect.defineProperty(g,r,s),deleteProperty:(e,r)=>Reflect.deleteProperty(g,r)},o=Object.create(e);return new Proxy(o,n)},o=e=>({addListener(r,s,...g){r.addListener(e.get(s),...g)},hasListener:(r,s)=>r.hasListener(e.get(s)),removeListener(r,s){r.removeListener(e.get(s))}}),l=new n(e=>"function"!=typeof e?e:function(r){const s=i(r,{},{getContent:{minArgs:0,maxArgs:0}});e(s)});let x=!1;const c=new n(e=>"function"!=typeof e?e:function(r,g,n){let a,m,t=!1,A=new Promise(e=>{a=function(r){x||(console.warn(s,(new Error).stack),x=!0),t=!0,e(r)}});try{m=e(r,g,a)}catch(l){m=Promise.reject(l)}const i=!0!==m&&(e=>e&&"object"==typeof e&&"function"==typeof e.then)(m);if(!0!==m&&!i&&!t)return!1;const o=e=>{e.then(e=>{n(e)},e=>{let r;r=e&&(e instanceof Error||"string"==typeof e.message)?e.message:"An unexpected error occurred",n({__mozWebExtensionPolyfillReject__:!0,message:r})}).catch(e=>{console.error("Failed to send onMessage rejected reply",e)})};return o(i?m:A),!0}),d=(s,g,n,...a)=>{if(a.length<g.minArgs)throw new Error(`Expected at least ${g.minArgs} ${m(g.minArgs)} for ${s}(), got ${a.length}`);if(a.length>g.maxArgs)throw new Error(`Expected at most ${g.maxArgs} ${m(g.maxArgs)} for ${s}(), got ${a.length}`);return new Promise((s,g)=>{const m=(({reject:s,resolve:g},n)=>{e.runtime.lastError?e.runtime.lastError.message===r?g():s(new Error(e.runtime.lastError.message)):n&&n.__mozWebExtensionPolyfillReject__?s(new Error(n.message)):g(n)}).bind(null,{resolve:s,reject:g});a.push(m),n.sendMessage(...a)})},u={devtools:{network:{onRequestFinished:o(l)}},runtime:{onMessage:o(c),onMessageExternal:o(c),sendMessage:d.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:d.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},f={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return g.privacy={network:{"*":f},services:{"*":f},websites:{"*":f}},i(e,u,g)};if("object"!=typeof chrome||!chrome||!chrome.runtime||!chrome.runtime.id)throw new Error("This script should only be loaded in a browser extension.");e.exports=g(chrome)}else e.exports=browser});
},{}],"psnZ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.browser=require("webextension-polyfill");
},{"webextension-polyfill":"wNgb"}],"BG1x":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.asMessage=exports.hotkeyTriggered=exports.requestDownload=exports.finished=exports.started=exports.signal=void 0;const e=["getImagesInSelection","hotkeyTriggered"];function t(e){return{subject:e}}exports.signal=t;const o={afterHotkeyTriggered:"afterHotkeyTriggered",downloadFinished:"downloadFinished",downloadRequested:"downloadRequested",downloadStarted:"downloadStarted"};function r(e){return{downloadId:e,subject:o.downloadStarted}}function n(e){return{downloadId:e,subject:o.downloadFinished}}function s(e){return{imageUrl:e.src,subject:o.downloadRequested}}function d(e){return{imageFound:e,subject:o.afterHotkeyTriggered}}exports.started=r,exports.finished=n,exports.requestDownload=s,exports.hotkeyTriggered=d;const i=[...e,...Object.values(o)];function u(e){return"string"==typeof e.subject}function a(e){return"object"==typeof e&&null!=e&&u(e)&&i.includes(e.subject)}function c(e){if(a(e))return e;throw new Error(`${JSON.stringify(e)} is not a message`)}exports.asMessage=c;
},{}],"hP6F":[function(require,module,exports) {
var define;
var global = arguments[3];
var n,t=arguments[3];!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof n&&n.amd?n(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self)["fast-equals"]={})}(this,function(n){"use strict";var t="function"==typeof WeakSet,e=Object.keys;function r(n,t){return n===t||n!=n&&t!=t}function o(n){return n.constructor===Object||null==n.constructor}function u(n){return!!n&&"function"==typeof n.then}function i(n){return!(!n||!n.$$typeof)}function f(){var n=[];return{add:function(t){n.push(t)},has:function(t){return-1!==n.indexOf(t)}}}var a=t?function(){return new WeakSet}:f;function c(n){return function(t){var e=n||t;return function(n,t,r){void 0===r&&(r=a());var o=!!n&&"object"==typeof n,u=!!t&&"object"==typeof t;if(o||u){var i=o&&r.has(n),f=u&&r.has(t);if(i||f)return i&&f;o&&r.add(n),u&&r.add(t)}return e(n,t,r)}}}var s="_owner",l=Function.prototype.bind.call(Function.prototype.call,Object.prototype.hasOwnProperty);function p(n,t,r,o){var u=e(n),f=u.length;if(e(t).length!==f)return!1;if(f)for(var a=void 0;f-- >0;){if((a=u[f])===s){var c=i(n),p=i(t);if((c||p)&&c!==p)return!1}if(!l(t,a)||!r(n[a],t[a],o))return!1}return!0}var y="function"==typeof Map,d="function"==typeof Set;function v(n){var t="function"==typeof n?n(e):e;function e(n,e,i){if(n===e)return!0;if(n&&e&&"object"==typeof n&&"object"==typeof e){if(o(n)&&o(e))return p(n,e,t,i);var f=Array.isArray(n),a=Array.isArray(e);return f||a?f===a&&function(n,t,e,r){var o=n.length;if(t.length!==o)return!1;for(;o-- >0;)if(!e(n[o],t[o],r))return!1;return!0}(n,e,t,i):(f=n instanceof Date,a=e instanceof Date,f||a?f===a&&r(n.getTime(),e.getTime()):(f=n instanceof RegExp,a=e instanceof RegExp,f||a?f===a&&function(n,t){return n.source===t.source&&n.global===t.global&&n.ignoreCase===t.ignoreCase&&n.multiline===t.multiline&&n.unicode===t.unicode&&n.sticky===t.sticky&&n.lastIndex===t.lastIndex}(n,e):u(n)||u(e)?n===e:y&&(f=n instanceof Map,a=e instanceof Map,f||a)?f===a&&function(n,t,e,r){var o=n.size===t.size;return o&&n.size&&n.forEach(function(n,u){o&&(o=!1,t.forEach(function(t,i){!o&&e(u,i,r)&&(o=e(n,t,r))}))}),o}(n,e,t,i):d&&(f=n instanceof Set,a=e instanceof Set,f||a)?f===a&&function(n,t,e,r){var o=n.size===t.size;return o&&n.size&&n.forEach(function(n){o&&(o=!1,t.forEach(function(t){o||(o=e(n,t,r))}))}),o}(n,e,t,i):p(n,e,t,i)))}return n!=n&&e!=e}return e}var h=v(),g=v(function(){return r}),b=v(c()),E=v(c(r));n.circularDeepEqual=b,n.circularShallowEqual=E,n.createCustomEqual=v,n.deepEqual=h,n.sameValueZeroEqual=r,n.shallowEqual=g,Object.defineProperty(n,"__esModule",{value:!0})});
},{}],"oHxt":[function(require,module,exports) {
"use strict";function t(t,e){return e===t||"*"===e}function e(e,r){return r.length===e.length&&Array(r.length).fill(0).map((t,e)=>e).every(n=>t(e[n],r[n]))}function r(t){const[e,...r]=t.split(".").reverse();return{tail:r,tld:e}}function n(t,e){const r=e.get(t);if(null==r){const r=new Set;return e.set(t,r),r}return r}function o(t,n){const o=r(n),i=t.get(o.tld);return null!=i&&Array.from(i).some(t=>e(o.tail,t))}function i(t){const e=new Map;return t.map(r).forEach(t=>n(t.tld,e).add(t.tail)),t=>o(e,t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.DOMAIN_NAME_FILTER_PATTERN=exports.domainFilterFrom=void 0,exports.domainFilterFrom=i,exports.DOMAIN_NAME_FILTER_PATTERN=/^(?:(?:[\w-]+|\*)\.)*(?:[\w-]+|\*)$/iu;
},{}],"tf7T":[function(require,module,exports) {
"use strict";function t(t){return r=>"boolean"==typeof r?r:t}function r(t,...r){return e=>"number"==typeof e&&r.every(t=>t(e))?e:t}function e(t,...r){return e=>"string"==typeof e&&r.every(t=>t(e))?e:t}function n(t,r){return e=>{return"string"==typeof e&&Object.values(t).map(t=>t).includes(e)?e:r}}function o(t,...r){return e=>Array.isArray(e)&&e.every(t=>"string"==typeof t&&r.every(r=>r(t)))?e:t}function s(t){return r=>{const e=r*10**t;return e===Math.round(e)}}function u(t){return r=>t.test(r)}function p(t){return t.trim().length>0}function i(t){return r=>r>t}function c(t){return r=>r>=t}function x(t){return r=>r<=t}function f(t,r){const e={};for(const n of Object.getOwnPropertyNames(r))if(Object.prototype.hasOwnProperty.call(r,n)){const o=r[n],s=t[n];e[n]=o(s)}return e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.sanitize=exports.lte=exports.gte=exports.gt=exports.notBlank=exports.matching=exports.roundedTo=exports.stringArray=exports.stringEnum=exports.str=exports.num=exports.bool=void 0,exports.bool=t,exports.num=r,exports.str=e,exports.stringEnum=n,exports.stringArray=o,exports.roundedTo=s,exports.matching=u,exports.notBlank=p,exports.gt=i,exports.gte=c,exports.lte=x,exports.sanitize=f;
},{}],"QYfS":[function(require,module,exports) {
"use strict";var t,o,e,i,n;Object.defineProperty(exports,"__esModule",{value:!0}),exports.FilenameVariables=exports.ConflictAction=exports.HoverButtonSkin=exports.HoverButtonPosition=exports.ClickType=void 0,function(t){t.none="none",t.singleLeft="singleLeft",t.doubleLeft="doubleLeft",t.singleRight="singleRight",t.doubleRight="doubleRight"}(t=exports.ClickType||(exports.ClickType={})),function(t){t.topLeftNE="1_2",t.topLeftSW="1_3",t.topLeftSE="1_4",t.topRightNW="2_1",t.topRightSW="2_3",t.topRightSE="2_4",t.bottomLeftNW="3_1",t.bottomleftNE="3_2",t.bottomLeftSE="3_4",t.bottomRightNW="4_1",t.bottomRightNE="4_2",t.bottomRightSW="4_3",t.northNorth="1",t.north="2",t.westWest="3",t.west="4",t.center="5",t.east="6",t.eastEast="7",t.south="8",t.southSouth="9"}(o=exports.HoverButtonPosition||(exports.HoverButtonPosition={})),function(t){t.original="original",t.alt1="alt1"}(e=exports.HoverButtonSkin||(exports.HoverButtonSkin={})),function(t){t.autoUnique="uniquify",t.prompt="prompt",t.overwrite="overwrite"}(i=exports.ConflictAction||(exports.ConflictAction={})),function(t){t.tabDomain="%pagedomain%",t.tabDirs="%pagedirs%",t.tabPath="%pagepath%",t.tabTitle="%title%",t.imageDomain="%imagedomain%",t.imageDirs="%imagedirs%",t.imagePath="%imagepath%",t.counter="%counter%",t.inferred="%original%",t.year="%y%",t.month="%M%",t.day="%d%",t.hour="%h%",t.minute="%m%",t.second="%s%",t.millisecond="%ms%"}(n=exports.FilenameVariables||(exports.FilenameVariables={}));
},{}],"G1x6":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.correct=exports.write=exports.read=exports.isSetting=void 0;const e=require("webextension-polyfill-ts"),t=require("../filtering"),n=require("./validation"),o=require("./enums"),r={aggressiveCursorTracking:n.bool(!1),buttonOpacity:n.num(1,n.gte(.1),n.lte(1),n.roundedTo(2)),buttonPosition:n.stringEnum(o.HoverButtonPosition,o.HoverButtonPosition.topRightSW),buttonSize:n.num(48,Number.isInteger,n.gte(8),n.lte(512)),counterPadding:n.num(1,Number.isInteger,n.gte(0)),counterStart:n.num(1,Number.isInteger,n.gte(0)),counterStep:n.num(1,Number.isInteger,n.gte(0)),doubleRightClickMillis:n.num(250,Number.isInteger,n.gt(0)),enableImageContextMenu:n.bool(!0),enableRename:n.bool(!1),enableSelectionContextMenu:n.bool(!0),excludedPageDomains:n.stringArray([],n.matching(t.DOMAIN_NAME_FILTER_PATTERN)),excludedSourceDomains:n.stringArray([],n.matching(t.DOMAIN_NAME_FILTER_PATTERN)),fileNamePattern:n.str(o.FilenameVariables.inferred,n.notBlank),greyOut:n.bool(!0),minimumImageSize:n.num(100,Number.isInteger,n.gte(1)),notify:n.bool(!1),onFilenameConflict:n.stringEnum(o.ConflictAction,o.ConflictAction.autoUnique),oneClickStyle:n.stringEnum(o.HoverButtonSkin,o.HoverButtonSkin.alt1),pageDomainsAreWhitelist:n.bool(!1),persist:n.bool(!1),requireShift:n.bool(!1),singleClickEnabled:n.bool(!1),sourceDomainsAreWhitelist:n.bool(!1),supportDragDrop:n.bool(!0),triggerByClickType:n.stringEnum(o.ClickType,o.ClickType.doubleLeft)};function i(e){return e in r}async function s(){return await e.browser.storage.sync.get(Object.keys(r))}async function u(t){return e.browser.storage.sync.set(t)}function l(e){return n.sanitize(e,r)}exports.isSetting=i,exports.read=s,exports.write=u,exports.correct=l;
},{"webextension-polyfill-ts":"psnZ","../filtering":"oHxt","./validation":"tf7T","./enums":"QYfS"}],"jbcu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.passesSizeRestrictions=exports.passesShiftKeySetting=exports.validate=exports.load=void 0;const e=require("fast-equals"),t=require("./io");async function i(){const e=await t.read();return t.correct(e)}async function s(){const i=await t.read(),s=t.correct(i);return!!e.deepEqual(s,i)||(await t.write(s),!1)}function r(e,t){return!t.requireShift||e.shiftKey}function a(e,t){return e.width>t.minimumImageSize&&e.height>t.minimumImageSize}exports.load=i,exports.validate=s,exports.passesShiftKeySetting=r,exports.passesSizeRestrictions=a;
},{"fast-equals":"hP6F","./io":"G1x6"}],"zqSa":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.monitorStorage=exports.monitor=void 0;const t=require("webextension-polyfill-ts"),e=require("./settings"),o=require("./io"),n=new Map;async function r(t){const o=await e.load(),r=t.flatMap(t=>{var e;return null!==(e=n.get(t))&&void 0!==e?e:[]}).map(t=>t(o));await Promise.all(r)}function i(t,e,o){const n=t.get(e);return null==n?(t.set(e,o),o):n}function s(t,e){i(n,t,[]).push(e)}async function a(t,e){if("sync"===e){const e=Object.keys(t).flatMap(t=>o.isSetting(t)?[t]:[]);await r(e)}}function c(){t.browser.storage.onChanged.addListener((t,e)=>void a(t,e).catch(console.error))}exports.monitor=s,exports.monitorStorage=c;
},{"webextension-polyfill-ts":"psnZ","./settings":"jbcu","./io":"G1x6"}],"S5rs":[function(require,module,exports) {
"use strict";function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function t(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?e(Object(o),!0).forEach(function(e){r(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.tryCreateFancyNotification=exports.fileNamingSupport=void 0;const n=require("webextension-polyfill-ts");function o(){return n.browser.downloads.onDeterminingFilename}async function i(e,r){try{return n.browser.notifications.create(t(t({},e),r))}catch(o){return n.browser.notifications.create(e)}}exports.fileNamingSupport=o,exports.tryCreateFancyNotification=i;
},{"webextension-polyfill-ts":"psnZ"}],"a6N1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.tickCounter=exports.notifications=exports.downloads=void 0,exports.downloads=new Map,exports.notifications=new Map;let t=NaN;function e(e){return isNaN(t)?t=e.counterStart:t+=e.counterStep,t}exports.tickCounter=e;
},{}],"TJMJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.notifyFailure=exports.notifyNoImageForHotkey=exports.notifyCompletion=exports.monitorNotifications=void 0;const o=require("webextension-polyfill-ts"),e=require("../common/compatibility"),t=require("./state");async function i(e,i){const n=t.notifications.get(e);if(null==n)throw new Error(`missing download id for notification ${e}`);switch(i){case 0:return o.browser.downloads.open(n);case 1:await o.browser.downloads.show(n);break;default:throw new Error(`unknown button: ${i}`)}}function n(){o.browser.notifications.onButtonClicked.addListener((o,e)=>void i(o,e).catch(console.error)),o.browser.notifications.onClosed.addListener(o=>t.notifications.delete(o))}exports.monitorNotifications=n;const r="images/icon-128.png";async function a(o){const i={iconUrl:r,message:o.filename,title:"Image downloaded",type:"basic"},n={buttons:[{title:"View image"},{title:"Open folder"}],imageUrl:o.filename,type:"image"},a=await e.tryCreateFancyNotification(i,n);t.notifications.set(a,o.id)}async function s(){await o.browser.notifications.create({iconUrl:r,message:"No image found under cursor.",title:"Hotkey activated",type:"basic"})}async function c(e){const{os:t}=await o.browser.runtime.getPlatformInfo(),i="win"===t?"\\":"/",n=e.filename.slice(e.filename.lastIndexOf(i)+1);await o.browser.notifications.create({iconUrl:"images/error-128.png",message:`Reason: ${e.error}\nFile: ${n}`,title:"Double-click download failed!",type:"basic"})}exports.notifyCompletion=a,exports.notifyNoImageForHotkey=s,exports.notifyFailure=c;
},{"webextension-polyfill-ts":"psnZ","../common/compatibility":"S5rs","./state":"a6N1"}],"nzlP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.renameFunctionally=exports.renameTechnically=void 0;const e=require("./settings/enums");function a(e,a){const n=String(e);return"0".repeat(Math.max(0,a-n.length))+n}function n(e){const a=e.lastIndexOf(".");return a<0?[e,null]:[e.substring(0,a),e.substring(a+1)]}function t(t,i,{counterPadding:r,tabUrl:l,tabTitle:s,imageUrl:o,counter:m}){const[u,b]=n(t),g=new Date;let c=i;const F=(e,a)=>{c=c.replace(new RegExp(e,"gu"),"string"==typeof a?a:String(a))};return F(e.FilenameVariables.counter,a(m,r)),F(e.FilenameVariables.year,g.getFullYear()),F(e.FilenameVariables.month,a(g.getMonth()+1,2)),F(e.FilenameVariables.day,a(g.getDate(),2)),F(e.FilenameVariables.hour,a(g.getHours(),2)),F(e.FilenameVariables.minute,a(g.getMinutes(),2)),F(e.FilenameVariables.second,a(g.getSeconds(),2)),F(e.FilenameVariables.millisecond,a(g.getMilliseconds(),3)),F(e.FilenameVariables.tabDomain,l.hostname),F(e.FilenameVariables.tabDirs,l.pathname.substring(1)),F(e.FilenameVariables.tabPath,l.pathname.substring(1).replace(/\//gu,".")),F(e.FilenameVariables.imageDomain,o.hostname),F(e.FilenameVariables.imageDirs,o.pathname.substring(1)),F(e.FilenameVariables.imagePath,o.pathname.substring(1).replace(/\//gu,".")),F(e.FilenameVariables.inferred,u),F(e.FilenameVariables.tabTitle,s),null==b?c:`${c}.${b}`}function i(e,a,{imageUrl:n,settings:i,tab:r}){if(null==r.url)throw new Error("missing url on tab?");const l=new URL(r.url);if(null==r.title)throw new Error("missing title on tab?");return t(e,i.fileNamePattern,{counter:a(i),counterPadding:i.counterPadding,imageUrl:n,tabTitle:r.title,tabUrl:l})}exports.renameTechnically=t,exports.renameFunctionally=i;
},{"./settings/enums":"QYfS"}],"bXOg":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.monitorDownloads=exports.startDownload=void 0;const o=require("webextension-polyfill-ts"),e=require("../common/messages"),n=require("./notifications"),t=require("./state"),i=require("../common/compatibility"),r=require("../common/filename"),a=require("../common/settings/settings");function s(n,i){const[r,a]=n;t.downloads.delete(i.id),o.browser.tabs.sendMessage(r,e.finished(i.id),{frameId:null!=a?a:void 0}).catch(console.error)}async function l(e){var i;const r=t.downloads.get(e.id);if(null!=r)switch(null===(i=e.state)||void 0===i?void 0:i.current){case"complete":if(s(r,e),(await a.load()).notify){const[t]=await o.browser.downloads.search({id:e.id});return null==t?void 0:n.notifyCompletion(t)}break;case"interrupted":{const[t]=await o.browser.downloads.search({id:e.id});null==t||"USER_CANCELED"===t.error?s(r,e):await n.notifyFailure(t);break}}}function d(e,n){const i=t.downloads.get(e.id);if(null!=i)return a.load().then(async a=>{if(a.enableRename){const s=await o.browser.tabs.get(i[0]),l=r.renameFunctionally(e.filename,t.tickCounter,{imageUrl:new URL(e.url),settings:a,tab:s});n({conflictAction:a.onFilenameConflict,filename:l})}else n()}).catch(o=>{console.error(o),n()}),!0}async function c(e,n,i){const r=await a.load(),s=await o.browser.downloads.download({conflictAction:r.onFilenameConflict,url:e.href});if(null==n.id)throw new Error("tab without id?");return t.downloads.set(s,[n.id,i]),s}function u(){var e;null===(e=i.fileNamingSupport())||void 0===e||e.addListener(d),o.browser.downloads.onChanged.addListener(o=>void l(o).catch(console.error))}exports.startDownload=c,exports.monitorDownloads=u;
},{"webextension-polyfill-ts":"psnZ","../common/messages":"BG1x","./notifications":"TJMJ","./state":"a6N1","../common/compatibility":"S5rs","../common/filename":"nzlP","../common/settings/settings":"jbcu"}],"xJdw":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.registerContextMenu=void 0;const e=require("ts-essentials"),o=require("webextension-polyfill-ts"),n=require("../common/messages"),t=require("../common/settings/settings"),r=require("../common/settings/monitoring"),i=require("./downloads"),s="doubleClickImageDownloader_DownloadImage",a="doubleClickImageDownloader_DownloadImagesInSelection";async function l(e){return new Promise((n,t)=>{o.browser.contextMenus.create(e,()=>{null==o.browser.runtime.lastError?n():t(new Error(o.browser.runtime.lastError.message))})})}async function c(e,t){if(null==t)throw new Error("clicked outside a tab?");if(null==t.id)throw new Error("missing tab id?");switch(e.menuItemId){case s:var r;if(null==e.srcUrl)throw new Error("missing src on image");return void(await i.startDownload(new URL(e.srcUrl),t,null!==(r=e.frameId)&&void 0!==r?r:null));case a:return void(await o.browser.tabs.sendMessage(t.id,n.signal("getImagesInSelection"),{frameId:e.frameId}));default:throw new Error(`received context menu ${e.menuItemId} and tab ${t.id}?`)}}async function d(n){await o.browser.contextMenus.remove(s).catch(e.noop),await o.browser.contextMenus.remove(a).catch(e.noop),n.enableImageContextMenu&&await l({contexts:["image"],documentUrlPatterns:["*://*/*","file:///*"],id:s,title:"Download image",type:"normal"}),n.enableSelectionContextMenu&&await l({contexts:["selection"],documentUrlPatterns:["*://*/*","file:///*"],id:a,title:"Download images in selection",type:"normal"})}function u(){o.browser.contextMenus.onClicked.addListener((e,o)=>void c(e,o).catch(console.error)),t.load().then(d).catch(console.error),r.monitor("enableImageContextMenu",e=>void d(e).catch(console.error)),r.monitor("enableSelectionContextMenu",e=>void d(e).catch(console.error))}exports.registerContextMenu=u;
},{"ts-essentials":"fv3V","webextension-polyfill-ts":"psnZ","../common/messages":"BG1x","../common/settings/settings":"jbcu","../common/settings/monitoring":"zqSa","./downloads":"bXOg"}],"R3w4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.listenForMessages=void 0;const e=require("webextension-polyfill-ts"),s=require("../common/messages"),r=require("./downloads");async function t(e,t){switch(e.subject){case"downloadRequested":{var n;if(null==t.tab)throw new Error("starting a download headlessly?");const o=await r.startDownload(new URL(e.imageUrl),t.tab,null!==(n=t.frameId)&&void 0!==n?n:null);return s.started(o)}default:throw new Error(`unknown message: ${JSON.stringify(e)}`)}}function n(){e.browser.runtime.onMessage.addListener(async(e,r)=>t(s.asMessage(e),r))}exports.listenForMessages=n;
},{"webextension-polyfill-ts":"psnZ","../common/messages":"BG1x","./downloads":"bXOg"}],"ETWt":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.fixSettingsOnUpdate=void 0;const e=require("webextension-polyfill-ts"),t=require("../common/settings/settings");async function n(n){if("install"===n.reason||"update"===n.reason){return await t.validate()?void 0:e.browser.runtime.openOptionsPage()}}function i(){e.browser.runtime.onInstalled.addListener(e=>void n(e).catch(console.error))}exports.fixSettingsOnUpdate=i;
},{"webextension-polyfill-ts":"psnZ","../common/settings/settings":"jbcu"}],"rLkP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.monitorHotkey=void 0;const e=require("webextension-polyfill-ts"),o=require("../common/messages"),r=require("./notifications");async function t(){const[t]=await e.browser.tabs.query({active:!0,currentWindow:!0});if(null==(null==t?void 0:t.id))throw new Error("missing tab id");const n=await e.browser.tabs.sendMessage(t.id,o.signal("hotkeyTriggered")).then(o.asMessage);if("afterHotkeyTriggered"!==n.subject)throw new Error(`unexpected response ${JSON.stringify(n)}`);n.imageFound||await r.notifyNoImageForHotkey()}function n(){e.browser.commands.onCommand.addListener(e=>{switch(e){case"download-focused":t().catch(console.error);break;default:throw new Error(`unknown hotkey command: ${e}`)}})}exports.monitorHotkey=n;
},{"webextension-polyfill-ts":"psnZ","../common/messages":"BG1x","./notifications":"TJMJ"}],"uL3H":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./background/context-menu"),o=require("./background/downloads"),r=require("./background/messaging"),t=require("./background/notifications"),n=require("./background/settings-validation"),i=require("./background/hotkey"),s=require("./common/settings/monitoring");s.monitorStorage(),n.fixSettingsOnUpdate(),t.monitorNotifications(),o.monitorDownloads(),i.monitorHotkey(),r.listenForMessages(),e.registerContextMenu();
},{"./background/context-menu":"xJdw","./background/downloads":"bXOg","./background/messaging":"R3w4","./background/notifications":"TJMJ","./background/settings-validation":"ETWt","./background/hotkey":"rLkP","./common/settings/monitoring":"zqSa"}]},{},["uL3H"], null)
//# sourceMappingURL=/background.js.map