// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"iKiqL":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "0a8ecb283d214d75";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"bB7Pu":[function(require,module,exports) {
"use strict";
var _reactSimpleCodeEditor = _interopRequireDefault(require("react-simple-code-editor"));
var _prismCore = require("prismjs/components/prism-core");
require("prismjs/components/prism-clike");
require("prismjs/components/prism-javascript");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function Welcome(props) {
    return(/*#__PURE__*/ React.createElement("h1", null, "Welcome, ", props.name));
}
var app = /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(Welcome, {
    name: "Adam"
}), /*#__PURE__*/ React.createElement(_reactSimpleCodeEditor["default"], {
    highlight: function highlight(code) {
        return (0, _prismCore.highlight)(code, _prismCore.languages.js);
    }
}));
ReactDOM.render(app, document.getElementById('root'));

},{"react-simple-code-editor":"1ApD6","prismjs/components/prism-core":"dRApq","prismjs/components/prism-clike":"ioeQR","prismjs/components/prism-javascript":"2Qyfv"}],"1ApD6":[function(require,module,exports) {
'use strict';
var global = arguments[3];
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _extends = Object.assign || function(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i];
        for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
    }
    return target;
};
var _createClass = function() {
    function defineProperties(target, props) {
        for(var i = 0; i < props.length; i++){
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
var _react = require('react');
var React = _interopRequireWildcard(_react);
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    else {
        var newObj = {
        };
        if (obj != null) {
            for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
        newObj.default = obj;
        return newObj;
    }
}
function _objectWithoutProperties(obj, keys) {
    var target = {
    };
    for(var i in obj){
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
    }
    return target;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _possibleConstructorReturn(self, call) {
    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
/* global global */ var KEYCODE_ENTER = 13;
var KEYCODE_TAB = 9;
var KEYCODE_BACKSPACE = 8;
var KEYCODE_Y = 89;
var KEYCODE_Z = 90;
var KEYCODE_M = 77;
var KEYCODE_PARENS = 57;
var KEYCODE_BRACKETS = 219;
var KEYCODE_QUOTE = 222;
var KEYCODE_BACK_QUOTE = 192;
var KEYCODE_ESCAPE = 27;
var HISTORY_LIMIT = 100;
var HISTORY_TIME_GAP = 3000;
var isWindows = 'navigator' in global && /Win/i.test(navigator.platform);
var isMacLike = 'navigator' in global && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
var className = 'npm__react-simple-code-editor__textarea';
var cssText = /* CSS */ '\n/**\n * Reset the text fill color so that placeholder is visible\n */\n.' + className + ':empty {\n  -webkit-text-fill-color: inherit !important;\n}\n\n/**\n * Hack to apply on some CSS on IE10 and IE11\n */\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  /**\n    * IE doesn\'t support \'-webkit-text-fill-color\'\n    * So we use \'color: transparent\' to make the text transparent on IE\n    * Unlike other browsers, it doesn\'t affect caret color in IE\n    */\n  .' + className + ' {\n    color: transparent !important;\n  }\n\n  .' + className + '::selection {\n    background-color: #accef7 !important;\n    color: transparent !important;\n  }\n}\n';
var Editor = function(_React$Component) {
    _inherits(Editor1, _React$Component);
    function Editor1() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Editor1);
        for(var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++)args[_key] = arguments[_key];
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Editor1.__proto__ || Object.getPrototypeOf(Editor1)).call.apply(_ref, [
            this
        ].concat(args))), _this), _this.state = {
            capture: true
        }, _this._recordCurrentState = function() {
            var input = _this._input;
            if (!input) return;
            // Save current state of the input
            var value = input.value, selectionStart = input.selectionStart, selectionEnd = input.selectionEnd;
            _this._recordChange({
                value: value,
                selectionStart: selectionStart,
                selectionEnd: selectionEnd
            });
        }, _this._getLines = function(text, position) {
            return text.substring(0, position).split('\n');
        }, _this._recordChange = function(record) {
            var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var _this$_history = _this._history, stack = _this$_history.stack, offset = _this$_history.offset;
            if (stack.length && offset > -1) {
                // When something updates, drop the redo operations
                _this._history.stack = stack.slice(0, offset + 1);
                // Limit the number of operations to 100
                var count = _this._history.stack.length;
                if (count > HISTORY_LIMIT) {
                    var extras = count - HISTORY_LIMIT;
                    _this._history.stack = stack.slice(extras, count);
                    _this._history.offset = Math.max(_this._history.offset - extras, 0);
                }
            }
            var timestamp = Date.now();
            if (overwrite) {
                var last = _this._history.stack[_this._history.offset];
                if (last && timestamp - last.timestamp < HISTORY_TIME_GAP) {
                    // A previous entry exists and was in short interval
                    // Match the last word in the line
                    var re = /[^a-z0-9]([a-z0-9]+)$/i;
                    // Get the previous line
                    var previous = _this._getLines(last.value, last.selectionStart).pop().match(re);
                    // Get the current line
                    var current = _this._getLines(record.value, record.selectionStart).pop().match(re);
                    if (previous && current && current[1].startsWith(previous[1])) {
                        // The last word of the previous line and current line match
                        // Overwrite previous entry so that undo will remove whole word
                        _this._history.stack[_this._history.offset] = _extends({
                        }, record, {
                            timestamp: timestamp
                        });
                        return;
                    }
                }
            }
            // Add the new operation to the stack
            _this._history.stack.push(_extends({
            }, record, {
                timestamp: timestamp
            }));
            _this._history.offset++;
        }, _this._updateInput = function(record) {
            var input = _this._input;
            if (!input) return;
            // Update values and selection state
            input.value = record.value;
            input.selectionStart = record.selectionStart;
            input.selectionEnd = record.selectionEnd;
            _this.props.onValueChange(record.value);
        }, _this._applyEdits = function(record) {
            // Save last selection state
            var input = _this._input;
            var last = _this._history.stack[_this._history.offset];
            if (last && input) _this._history.stack[_this._history.offset] = _extends({
            }, last, {
                selectionStart: input.selectionStart,
                selectionEnd: input.selectionEnd
            });
            // Save the changes
            _this._recordChange(record);
            _this._updateInput(record);
        }, _this._undoEdit = function() {
            var _this$_history2 = _this._history, stack = _this$_history2.stack, offset = _this$_history2.offset;
            // Get the previous edit
            var record = stack[offset - 1];
            if (record) {
                // Apply the changes and update the offset
                _this._updateInput(record);
                _this._history.offset = Math.max(offset - 1, 0);
            }
        }, _this._redoEdit = function() {
            var _this$_history3 = _this._history, stack = _this$_history3.stack, offset = _this$_history3.offset;
            // Get the next edit
            var record = stack[offset + 1];
            if (record) {
                // Apply the changes and update the offset
                _this._updateInput(record);
                _this._history.offset = Math.min(offset + 1, stack.length - 1);
            }
        }, _this._handleKeyDown = function(e) {
            var _this$props = _this.props, tabSize = _this$props.tabSize, insertSpaces = _this$props.insertSpaces, ignoreTabKey = _this$props.ignoreTabKey, onKeyDown = _this$props.onKeyDown;
            if (onKeyDown) {
                onKeyDown(e);
                if (e.defaultPrevented) return;
            }
            if (e.keyCode === KEYCODE_ESCAPE) e.target.blur();
            var _e$target = e.target, value = _e$target.value, selectionStart = _e$target.selectionStart, selectionEnd = _e$target.selectionEnd;
            var tabCharacter = (insertSpaces ? ' ' : '\t').repeat(tabSize);
            if (e.keyCode === KEYCODE_TAB && !ignoreTabKey && _this.state.capture) {
                // Prevent focus change
                e.preventDefault();
                if (e.shiftKey) {
                    // Unindent selected lines
                    var linesBeforeCaret = _this._getLines(value, selectionStart);
                    var startLine = linesBeforeCaret.length - 1;
                    var endLine = _this._getLines(value, selectionEnd).length - 1;
                    var nextValue = value.split('\n').map(function(line, i) {
                        if (i >= startLine && i <= endLine && line.startsWith(tabCharacter)) return line.substring(tabCharacter.length);
                        return line;
                    }).join('\n');
                    if (value !== nextValue) {
                        var startLineText = linesBeforeCaret[startLine];
                        _this._applyEdits({
                            value: nextValue,
                            // Move the start cursor if first line in selection was modified
                            // It was modified only if it started with a tab
                            selectionStart: startLineText.startsWith(tabCharacter) ? selectionStart - tabCharacter.length : selectionStart,
                            // Move the end cursor by total number of characters removed
                            selectionEnd: selectionEnd - (value.length - nextValue.length)
                        });
                    }
                } else if (selectionStart !== selectionEnd) {
                    // Indent selected lines
                    var _linesBeforeCaret = _this._getLines(value, selectionStart);
                    var _startLine = _linesBeforeCaret.length - 1;
                    var _endLine = _this._getLines(value, selectionEnd).length - 1;
                    var _startLineText = _linesBeforeCaret[_startLine];
                    _this._applyEdits({
                        value: value.split('\n').map(function(line, i) {
                            if (i >= _startLine && i <= _endLine) return tabCharacter + line;
                            return line;
                        }).join('\n'),
                        // Move the start cursor by number of characters added in first line of selection
                        // Don't move it if it there was no text before cursor
                        selectionStart: /\S/.test(_startLineText) ? selectionStart + tabCharacter.length : selectionStart,
                        // Move the end cursor by total number of characters added
                        selectionEnd: selectionEnd + tabCharacter.length * (_endLine - _startLine + 1)
                    });
                } else {
                    var updatedSelection = selectionStart + tabCharacter.length;
                    _this._applyEdits({
                        // Insert tab character at caret
                        value: value.substring(0, selectionStart) + tabCharacter + value.substring(selectionEnd),
                        // Update caret position
                        selectionStart: updatedSelection,
                        selectionEnd: updatedSelection
                    });
                }
            } else if (e.keyCode === KEYCODE_BACKSPACE) {
                var hasSelection = selectionStart !== selectionEnd;
                var textBeforeCaret = value.substring(0, selectionStart);
                if (textBeforeCaret.endsWith(tabCharacter) && !hasSelection) {
                    // Prevent default delete behaviour
                    e.preventDefault();
                    var _updatedSelection = selectionStart - tabCharacter.length;
                    _this._applyEdits({
                        // Remove tab character at caret
                        value: value.substring(0, selectionStart - tabCharacter.length) + value.substring(selectionEnd),
                        // Update caret position
                        selectionStart: _updatedSelection,
                        selectionEnd: _updatedSelection
                    });
                }
            } else if (e.keyCode === KEYCODE_ENTER) // Ignore selections
            {
                if (selectionStart === selectionEnd) {
                    // Get the current line
                    var line1 = _this._getLines(value, selectionStart).pop();
                    var matches = line1.match(/^\s+/);
                    if (matches && matches[0]) {
                        e.preventDefault();
                        // Preserve indentation on inserting a new line
                        var indent = '\n' + matches[0];
                        var _updatedSelection2 = selectionStart + indent.length;
                        _this._applyEdits({
                            // Insert indentation character at caret
                            value: value.substring(0, selectionStart) + indent + value.substring(selectionEnd),
                            // Update caret position
                            selectionStart: _updatedSelection2,
                            selectionEnd: _updatedSelection2
                        });
                    }
                }
            } else if (e.keyCode === KEYCODE_PARENS || e.keyCode === KEYCODE_BRACKETS || e.keyCode === KEYCODE_QUOTE || e.keyCode === KEYCODE_BACK_QUOTE) {
                var chars = void 0;
                if (e.keyCode === KEYCODE_PARENS && e.shiftKey) chars = [
                    '(',
                    ')'
                ];
                else if (e.keyCode === KEYCODE_BRACKETS) {
                    if (e.shiftKey) chars = [
                        '{',
                        '}'
                    ];
                    else chars = [
                        '[',
                        ']'
                    ];
                } else if (e.keyCode === KEYCODE_QUOTE) {
                    if (e.shiftKey) chars = [
                        '"',
                        '"'
                    ];
                    else chars = [
                        "'",
                        "'"
                    ];
                } else if (e.keyCode === KEYCODE_BACK_QUOTE && !e.shiftKey) chars = [
                    '`',
                    '`'
                ];
                // If text is selected, wrap them in the characters
                if (selectionStart !== selectionEnd && chars) {
                    e.preventDefault();
                    _this._applyEdits({
                        value: value.substring(0, selectionStart) + chars[0] + value.substring(selectionStart, selectionEnd) + chars[1] + value.substring(selectionEnd),
                        // Update caret position
                        selectionStart: selectionStart,
                        selectionEnd: selectionEnd + 2
                    });
                }
            } else if ((isMacLike ? e.metaKey && e.keyCode === KEYCODE_Z : e.ctrlKey && e.keyCode === KEYCODE_Z) && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                _this._undoEdit();
            } else if ((isMacLike ? e.metaKey && e.keyCode === KEYCODE_Z && e.shiftKey : isWindows ? e.ctrlKey && e.keyCode === KEYCODE_Y : e.ctrlKey && e.keyCode === KEYCODE_Z && e.shiftKey) && !e.altKey) {
                e.preventDefault();
                _this._redoEdit();
            } else if (e.keyCode === KEYCODE_M && e.ctrlKey && (isMacLike ? e.shiftKey : true)) {
                e.preventDefault();
                // Toggle capturing tab key so users can focus away
                _this.setState(function(state) {
                    return {
                        capture: !state.capture
                    };
                });
            }
        }, _this._handleChange = function(e) {
            var _e$target2 = e.target, value = _e$target2.value, selectionStart = _e$target2.selectionStart, selectionEnd = _e$target2.selectionEnd;
            _this._recordChange({
                value: value,
                selectionStart: selectionStart,
                selectionEnd: selectionEnd
            }, true);
            _this.props.onValueChange(value);
        }, _this._history = {
            stack: [],
            offset: -1
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Editor1, [
        {
            key: 'componentDidMount',
            value: function componentDidMount() {
                this._recordCurrentState();
            }
        },
        {
            key: 'render',
            value: function render() {
                var _this2 = this;
                var _props = this.props, value = _props.value, style = _props.style, padding = _props.padding, highlight = _props.highlight, textareaId = _props.textareaId, textareaClassName = _props.textareaClassName, autoFocus = _props.autoFocus, disabled = _props.disabled, form = _props.form, maxLength = _props.maxLength, minLength = _props.minLength, name = _props.name, placeholder = _props.placeholder, readOnly = _props.readOnly, required = _props.required, onClick = _props.onClick, onFocus = _props.onFocus, onBlur = _props.onBlur, onKeyUp = _props.onKeyUp, onKeyDown = _props.onKeyDown, onValueChange = _props.onValueChange, tabSize = _props.tabSize, insertSpaces = _props.insertSpaces, ignoreTabKey = _props.ignoreTabKey, preClassName = _props.preClassName, rest = _objectWithoutProperties(_props, [
                    'value',
                    'style',
                    'padding',
                    'highlight',
                    'textareaId',
                    'textareaClassName',
                    'autoFocus',
                    'disabled',
                    'form',
                    'maxLength',
                    'minLength',
                    'name',
                    'placeholder',
                    'readOnly',
                    'required',
                    'onClick',
                    'onFocus',
                    'onBlur',
                    'onKeyUp',
                    'onKeyDown',
                    'onValueChange',
                    'tabSize',
                    'insertSpaces',
                    'ignoreTabKey',
                    'preClassName'
                ]);
                var contentStyle = {
                    paddingTop: padding,
                    paddingRight: padding,
                    paddingBottom: padding,
                    paddingLeft: padding
                };
                var highlighted = highlight(value);
                return React.createElement('div', _extends({
                }, rest, {
                    style: _extends({
                    }, styles.container, style)
                }), React.createElement('textarea', {
                    ref: function ref(c) {
                        return _this2._input = c;
                    },
                    style: _extends({
                    }, styles.editor, styles.textarea, contentStyle),
                    className: className + (textareaClassName ? ' ' + textareaClassName : ''),
                    id: textareaId,
                    value: value,
                    onChange: this._handleChange,
                    onKeyDown: this._handleKeyDown,
                    onClick: onClick,
                    onKeyUp: onKeyUp,
                    onFocus: onFocus,
                    onBlur: onBlur,
                    disabled: disabled,
                    form: form,
                    maxLength: maxLength,
                    minLength: minLength,
                    name: name,
                    placeholder: placeholder,
                    readOnly: readOnly,
                    required: required,
                    autoFocus: autoFocus,
                    autoCapitalize: 'off',
                    autoComplete: 'off',
                    autoCorrect: 'off',
                    spellCheck: false,
                    'data-gramm': false
                }), React.createElement('pre', _extends({
                    className: preClassName,
                    'aria-hidden': 'true',
                    style: _extends({
                    }, styles.editor, styles.highlight, contentStyle)
                }, typeof highlighted === 'string' ? {
                    dangerouslySetInnerHTML: {
                        __html: highlighted + '<br />'
                    }
                } : {
                    children: highlighted
                })), React.createElement('style', {
                    type: 'text/css',
                    dangerouslySetInnerHTML: {
                        __html: cssText
                    }
                }));
            }
        },
        {
            key: 'session',
            get: function get() {
                return {
                    history: this._history
                };
            },
            set: function set(session) {
                this._history = session.history;
            }
        }
    ]);
    return Editor1;
}(React.Component);
Editor.defaultProps = {
    tabSize: 2,
    insertSpaces: true,
    ignoreTabKey: false,
    padding: 0
};
exports.default = Editor;
var styles = {
    container: {
        position: 'relative',
        textAlign: 'left',
        boxSizing: 'border-box',
        padding: 0,
        overflow: 'hidden'
    },
    textarea: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        resize: 'none',
        color: 'inherit',
        overflow: 'hidden',
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
        WebkitTextFillColor: 'transparent'
    },
    highlight: {
        position: 'relative',
        pointerEvents: 'none'
    },
    editor: {
        margin: 0,
        border: 0,
        background: 'none',
        boxSizing: 'inherit',
        display: 'inherit',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontStyle: 'inherit',
        fontVariantLigatures: 'inherit',
        fontWeight: 'inherit',
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
        tabSize: 'inherit',
        textIndent: 'inherit',
        textRendering: 'inherit',
        textTransform: 'inherit',
        whiteSpace: 'pre-wrap',
        wordBreak: 'keep-all',
        overflowWrap: 'break-word'
    }
};

},{"react":"21dqq"}],"21dqq":[function(require,module,exports) {
'use strict';
module.exports = require('./cjs/react.development.js');

},{"./cjs/react.development.js":"6YvXz"}],"6YvXz":[function(require,module,exports) {
/** @license React v16.14.0
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
(function() {
    var _assign = require('object-assign');
    var checkPropTypes = require('prop-types/checkPropTypes');
    var ReactVersion = '16.14.0';
    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var hasSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 60103;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 60106;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 60107;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 60108;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 60114;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 60109;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 60110; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 60111;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 60112;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 60113;
    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 60120;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 60115;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 60116;
    var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 60121;
    var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 60117;
    var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 60118;
    var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 60119;
    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';
    function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== 'object') return null;
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === 'function') return maybeIterator;
        return null;
    }
    /**
 * Keeps track of the current dispatcher.
 */ var ReactCurrentDispatcher = {
        /**
   * @internal
   * @type {ReactComponent}
   */ current: null
    };
    /**
 * Keeps track of the current batch's configuration such as how long an update
 * should suspend for if it needs to.
 */ var ReactCurrentBatchConfig = {
        suspense: null
    };
    /**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */ var ReactCurrentOwner = {
        /**
   * @internal
   * @type {ReactComponent}
   */ current: null
    };
    var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
    function describeComponentFrame(name, source, ownerName) {
        var sourceInfo = '';
        if (source) {
            var path = source.fileName;
            var fileName = path.replace(BEFORE_SLASH_RE, '');
            // In DEV, include code for a common special case:
            // prefer "folder/index.js" instead of just "index.js".
            if (/^index\./.test(fileName)) {
                var match = path.match(BEFORE_SLASH_RE);
                if (match) {
                    var pathBeforeSlash = match[1];
                    if (pathBeforeSlash) {
                        var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
                        fileName = folderName + '/' + fileName;
                    }
                }
            }
            sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
        } else if (ownerName) sourceInfo = ' (created by ' + ownerName + ')';
        return '\n    in ' + (name || 'Unknown') + sourceInfo;
    }
    var Resolved = 1;
    function refineResolvedLazyComponent(lazyComponent) {
        return lazyComponent._status === Resolved ? lazyComponent._result : null;
    }
    function getWrappedName(outerType, innerType, wrapperName) {
        var functionName = innerType.displayName || innerType.name || '';
        return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
    }
    function getComponentName(type) {
        if (type == null) // Host root, text node or just invalid type.
        return null;
        if (typeof type.tag === 'number') error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue.");
        if (typeof type === 'function') return type.displayName || type.name || null;
        if (typeof type === 'string') return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return 'Fragment';
            case REACT_PORTAL_TYPE:
                return 'Portal';
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return 'StrictMode';
            case REACT_SUSPENSE_TYPE:
                return 'Suspense';
            case REACT_SUSPENSE_LIST_TYPE:
                return 'SuspenseList';
        }
        if (typeof type === 'object') switch(type.$$typeof){
            case REACT_CONTEXT_TYPE:
                return 'Context.Consumer';
            case REACT_PROVIDER_TYPE:
                return 'Context.Provider';
            case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, 'ForwardRef');
            case REACT_MEMO_TYPE:
                return getComponentName(type.type);
            case REACT_BLOCK_TYPE:
                return getComponentName(type.render);
            case REACT_LAZY_TYPE:
                var thenable = type;
                var resolvedThenable = refineResolvedLazyComponent(thenable);
                if (resolvedThenable) return getComponentName(resolvedThenable);
                break;
        }
        return null;
    }
    var ReactDebugCurrentFrame1 = {
    };
    var currentlyValidatingElement = null;
    function setCurrentlyValidatingElement(element) {
        currentlyValidatingElement = element;
    }
    // Stack implementation injected by the current renderer.
    ReactDebugCurrentFrame1.getCurrentStack = null;
    ReactDebugCurrentFrame1.getStackAddendum = function() {
        var stack = ''; // Add an extra top frame while an element is being validated
        if (currentlyValidatingElement) {
            var name = getComponentName(currentlyValidatingElement.type);
            var owner = currentlyValidatingElement._owner;
            stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
        } // Delegate to the injected renderer-specific implementation
        var impl = ReactDebugCurrentFrame1.getCurrentStack;
        if (impl) stack += impl() || '';
        return stack;
    };
    /**
 * Used by act() to track whether you're inside an act() scope.
 */ var IsSomeRendererActing = {
        current: false
    };
    var ReactSharedInternals = {
        ReactCurrentDispatcher: ReactCurrentDispatcher,
        ReactCurrentBatchConfig: ReactCurrentBatchConfig,
        ReactCurrentOwner: ReactCurrentOwner,
        IsSomeRendererActing: IsSomeRendererActing,
        // Used by renderers to avoid bundling object-assign twice in UMD bundles:
        assign: _assign
    };
    _assign(ReactSharedInternals, {
        // These should not be included in production.
        ReactDebugCurrentFrame: ReactDebugCurrentFrame1,
        // Shim for React DOM 16.0.0 which still destructured (but not used) this.
        // TODO: remove in React 17.0.
        ReactComponentTreeHook: {
        }
    });
    // by calls to these methods by a Babel plugin.
    //
    // In PROD (or in packages without access to React internals),
    // they are left as they are instead.
    function warn(format) {
        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)args[_key - 1] = arguments[_key];
        printWarning('warn', format, args);
    }
    function error(format) {
        for(var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)args[_key2 - 1] = arguments[_key2];
        printWarning('error', format, args);
    }
    function printWarning(level, format, args) {
        var hasExistingStack = args.length > 0 && typeof args[args.length - 1] === 'string' && args[args.length - 1].indexOf('\n    in') === 0;
        if (!hasExistingStack) {
            var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame.getStackAddendum();
            if (stack !== '') {
                format += '%s';
                args = args.concat([
                    stack
                ]);
            }
        }
        var argsWithFormat = args.map(function(item) {
            return '' + item;
        }); // Careful: RN currently depends on this prefix
        argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
        // breaks IE9: https://github.com/facebook/react/issues/13610
        // eslint-disable-next-line react-internal/no-production-logging
        Function.prototype.apply.call(console[level], console, argsWithFormat);
        try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            var argIndex = 0;
            var message = 'Warning: ' + format.replace(/%s/g, function() {
                return args[argIndex++];
            });
            throw new Error(message);
        } catch (x) {
        }
    }
    var didWarnStateUpdateForUnmountedComponent = {
    };
    function warnNoop(publicInstance, callerName) {
        var _constructor = publicInstance.constructor;
        var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
        var warningKey = componentName + "." + callerName;
        if (didWarnStateUpdateForUnmountedComponent[warningKey]) return;
        error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
    }
    /**
 * This is the abstract API for an update queue.
 */ var ReactNoopUpdateQueue = {
        /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */ isMounted: function(publicInstance) {
            return false;
        },
        /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */ enqueueForceUpdate: function(publicInstance, callback, callerName) {
            warnNoop(publicInstance, 'forceUpdate');
        },
        /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */ enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
            warnNoop(publicInstance, 'replaceState');
        },
        /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */ enqueueSetState: function(publicInstance, partialState, callback, callerName) {
            warnNoop(publicInstance, 'setState');
        }
    };
    var emptyObject = {
    };
    Object.freeze(emptyObject);
    /**
 * Base class helpers for the updating state of a component.
 */ function Component(props, context, updater) {
        this.props = props;
        this.context = context; // If a component has string refs, we will assign a different object later.
        this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
        // renderer.
        this.updater = updater || ReactNoopUpdateQueue;
    }
    Component.prototype.isReactComponent = {
    };
    /**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */ Component.prototype.setState = function(partialState, callback) {
        if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };
    /**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */ Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };
    var deprecatedAPIs = {
        isMounted: [
            'isMounted',
            "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
            'replaceState',
            "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
    };
    var defineDeprecationWarning = function(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
            get: function() {
                warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
                return undefined;
            }
        });
    };
    for(var fnName in deprecatedAPIs)if (deprecatedAPIs.hasOwnProperty(fnName)) defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    function ComponentDummy() {
    }
    ComponentDummy.prototype = Component.prototype;
    /**
 * Convenience component with default shallow equality check for sCU.
 */ function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context; // If a component has string refs, we will assign a different object later.
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
    }
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.
    _assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;
    // an immutable object with a single mutable value
    function createRef() {
        var refObject = {
            current: null
        };
        Object.seal(refObject);
        return refObject;
    }
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
    };
    var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
    didWarnAboutStringRefs = {
    };
    function hasValidRef(config) {
        if (hasOwnProperty.call(config, 'ref')) {
            var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
            if (getter && getter.isReactWarning) return false;
        }
        return config.ref !== undefined;
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, 'key')) {
            var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
            if (getter && getter.isReactWarning) return false;
        }
        return config.key !== undefined;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        var warnAboutAccessingKey = function() {
            if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://fb.me/react-special-props)", displayName);
            }
        };
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, 'key', {
            get: warnAboutAccessingKey,
            configurable: true
        });
    }
    function defineRefPropWarningGetter(props, displayName) {
        var warnAboutAccessingRef = function() {
            if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://fb.me/react-special-props)", displayName);
            }
        };
        warnAboutAccessingRef.isReactWarning = true;
        Object.defineProperty(props, 'ref', {
            get: warnAboutAccessingRef,
            configurable: true
        });
    }
    function warnIfStringRefCannotBeAutoConverted(config) {
        if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
            var componentName = getComponentName(ReactCurrentOwner.current.type);
            if (!didWarnAboutStringRefs[componentName]) {
                error("Component \"%s\" contains the string ref \"%s\". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://fb.me/react-strict-mode-string-ref", getComponentName(ReactCurrentOwner.current.type), config.ref);
                didWarnAboutStringRefs[componentName] = true;
            }
        }
    }
    /**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */ var ReactElement = function(type, key, ref, self, source, owner, props) {
        var element = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,
            // Built-in properties that belong on the element
            type: type,
            key: key,
            ref: ref,
            props: props,
            // Record the component responsible for creating this element.
            _owner: owner
        };
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {
        }; // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.
        Object.defineProperty(element._store, 'validated', {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
        }); // self and source are DEV only properties.
        Object.defineProperty(element, '_self', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self
        }); // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.
        Object.defineProperty(element, '_source', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
        });
        if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
        }
        return element;
    };
    /**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */ function createElement(type, config, children) {
        var propName; // Reserved names are extracted
        var props = {
        };
        var key = null;
        var ref = null;
        var self = null;
        var source = null;
        if (config != null) {
            if (hasValidRef(config)) {
                ref = config.ref;
                warnIfStringRefCannotBeAutoConverted(config);
            }
            if (hasValidKey(config)) key = '' + config.key;
            self = config.__self === undefined ? null : config.__self;
            source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object
            for(propName in config)if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) props[propName] = config[propName];
        } // Children can be more than one argument, and those are transferred onto
        // the newly allocated props object.
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1) props.children = children;
        else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for(var i = 0; i < childrenLength; i++)childArray[i] = arguments[i + 2];
            if (Object.freeze) Object.freeze(childArray);
            props.children = childArray;
        } // Resolve default props
        if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for(propName in defaultProps)if (props[propName] === undefined) props[propName] = defaultProps[propName];
        }
        if (key || ref) {
            var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
            if (key) defineKeyPropWarningGetter(props, displayName);
            if (ref) defineRefPropWarningGetter(props, displayName);
        }
        return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }
    function cloneAndReplaceKey(oldElement, newKey) {
        var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
        return newElement;
    }
    /**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */ function cloneElement(element, config, children) {
        if (!!(element === null || element === undefined)) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
        var propName; // Original props are copied
        var props = _assign({
        }, element.props); // Reserved names are extracted
        var key = element.key;
        var ref = element.ref; // Self is preserved since the owner is preserved.
        var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
        // transpiler, and the original source is probably a better indicator of the
        // true owner.
        var source = element._source; // Owner will be preserved, unless ref is overridden
        var owner = element._owner;
        if (config != null) {
            if (hasValidRef(config)) {
                // Silently steal the ref from the parent.
                ref = config.ref;
                owner = ReactCurrentOwner.current;
            }
            if (hasValidKey(config)) key = '' + config.key;
             // Remaining properties override existing props
            var defaultProps;
            if (element.type && element.type.defaultProps) defaultProps = element.type.defaultProps;
            for(propName in config)if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                if (config[propName] === undefined && defaultProps !== undefined) // Resolve default props
                props[propName] = defaultProps[propName];
                else props[propName] = config[propName];
            }
        } // Children can be more than one argument, and those are transferred onto
        // the newly allocated props object.
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1) props.children = children;
        else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for(var i = 0; i < childrenLength; i++)childArray[i] = arguments[i + 2];
            props.children = childArray;
        }
        return ReactElement(element.type, key, ref, self, source, owner, props);
    }
    /**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */ function isValidElement(object) {
        return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';
    /**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */ function escape(key) {
        var escapeRegex = /[=:]/g;
        var escaperLookup = {
            '=': '=0',
            ':': '=2'
        };
        var escapedString = ('' + key).replace(escapeRegex, function(match) {
            return escaperLookup[match];
        });
        return '$' + escapedString;
    }
    /**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */ var didWarnAboutMaps = false;
    var userProvidedKeyEscapeRegex = /\/+/g;
    function escapeUserProvidedKey(text) {
        return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
    }
    var POOL_SIZE = 10;
    var traverseContextPool = [];
    function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
        if (traverseContextPool.length) {
            var traverseContext = traverseContextPool.pop();
            traverseContext.result = mapResult;
            traverseContext.keyPrefix = keyPrefix;
            traverseContext.func = mapFunction;
            traverseContext.context = mapContext;
            traverseContext.count = 0;
            return traverseContext;
        } else return {
            result: mapResult,
            keyPrefix: keyPrefix,
            func: mapFunction,
            context: mapContext,
            count: 0
        };
    }
    function releaseTraverseContext(traverseContext) {
        traverseContext.result = null;
        traverseContext.keyPrefix = null;
        traverseContext.func = null;
        traverseContext.context = null;
        traverseContext.count = 0;
        if (traverseContextPool.length < POOL_SIZE) traverseContextPool.push(traverseContext);
    }
    /**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */ function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
        var type = typeof children;
        if (type === 'undefined' || type === 'boolean') // All of the above are perceived as null.
        children = null;
        var invokeCallback = false;
        if (children === null) invokeCallback = true;
        else switch(type){
            case 'string':
            case 'number':
                invokeCallback = true;
                break;
            case 'object':
                switch(children.$$typeof){
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                        invokeCallback = true;
                }
        }
        if (invokeCallback) {
            callback(traverseContext, children, // so that it's consistent if the number of children grows.
            nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
            return 1;
        }
        var child;
        var nextName;
        var subtreeCount = 0; // Count of children found in the current subtree.
        var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
        if (Array.isArray(children)) for(var i = 0; i < children.length; i++){
            child = children[i];
            nextName = nextNamePrefix + getComponentKey(child, i);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
        else {
            var iteratorFn = getIteratorFn(children);
            if (typeof iteratorFn === 'function') {
                // Warn about using Maps as children
                if (iteratorFn === children.entries) {
                    if (!didWarnAboutMaps) warn("Using Maps as children is deprecated and will be removed in a future major release. Consider converting children to an array of keyed ReactElements instead.");
                    didWarnAboutMaps = true;
                }
                var iterator = iteratorFn.call(children);
                var step;
                var ii = 0;
                while(!(step = iterator.next()).done){
                    child = step.value;
                    nextName = nextNamePrefix + getComponentKey(child, ii++);
                    subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
                }
            } else if (type === 'object') {
                var addendum = '';
                addendum = " If you meant to render a collection of children, use an array instead." + ReactDebugCurrentFrame1.getStackAddendum();
                var childrenString = '' + children;
                throw Error("Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + ")." + addendum);
            }
        }
        return subtreeCount;
    }
    /**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */ function traverseAllChildren(children, callback, traverseContext) {
        if (children == null) return 0;
        return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }
    /**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */ function getComponentKey(component, index) {
        // Do some typechecking here since we call this blindly. We want to ensure
        // that we don't block potential future ES APIs.
        if (typeof component === 'object' && component !== null && component.key != null) // Explicit key
        return escape(component.key);
         // Implicit key determined by the index in the set
        return index.toString(36);
    }
    function forEachSingleChild(bookKeeping, child, name) {
        var func = bookKeeping.func, context = bookKeeping.context;
        func.call(context, child, bookKeeping.count++);
    }
    /**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */ function forEachChildren(children, forEachFunc, forEachContext) {
        if (children == null) return children;
        var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
        traverseAllChildren(children, forEachSingleChild, traverseContext);
        releaseTraverseContext(traverseContext);
    }
    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
        var result = bookKeeping.result, keyPrefix = bookKeeping.keyPrefix, func = bookKeeping.func, context = bookKeeping.context;
        var mappedChild = func.call(context, child, bookKeeping.count++);
        if (Array.isArray(mappedChild)) mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function(c) {
            return c;
        });
        else if (mappedChild != null) {
            if (isValidElement(mappedChild)) mappedChild = cloneAndReplaceKey(mappedChild, // traverseAllChildren used to do for objects as children
            keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
            result.push(mappedChild);
        }
    }
    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
        var escapedPrefix = '';
        if (prefix != null) escapedPrefix = escapeUserProvidedKey(prefix) + '/';
        var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
        traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
        releaseTraverseContext(traverseContext);
    }
    /**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */ function mapChildren(children, func, context) {
        if (children == null) return children;
        var result = [];
        mapIntoWithKeyPrefixInternal(children, result, null, func, context);
        return result;
    }
    /**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrencount
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */ function countChildren(children) {
        return traverseAllChildren(children, function() {
            return null;
        }, null);
    }
    /**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
 */ function toArray(children) {
        var result = [];
        mapIntoWithKeyPrefixInternal(children, result, null, function(child) {
            return child;
        });
        return result;
    }
    /**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */ function onlyChild(children) {
        if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
        return children;
    }
    function createContext(defaultValue, calculateChangedBits) {
        if (calculateChangedBits === undefined) calculateChangedBits = null;
        else if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') error("createContext: Expected the optional second argument to be a function. Instead received: %s", calculateChangedBits);
        var context = {
            $$typeof: REACT_CONTEXT_TYPE,
            _calculateChangedBits: calculateChangedBits,
            // As a workaround to support multiple concurrent renderers, we categorize
            // some renderers as primary and others as secondary. We only expect
            // there to be two concurrent renderers at most: React Native (primary) and
            // Fabric (secondary); React DOM (primary) and React ART (secondary).
            // Secondary renderers store their context values on separate fields.
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            // Used to track how many concurrent renderers this context currently
            // supports within in a single renderer. Such as parallel server rendering.
            _threadCount: 0,
            // These are circular
            Provider: null,
            Consumer: null
        };
        context.Provider = {
            $$typeof: REACT_PROVIDER_TYPE,
            _context: context
        };
        var hasWarnedAboutUsingNestedContextConsumers = false;
        var hasWarnedAboutUsingConsumerProvider = false;
        // A separate object, but proxies back to the original context object for
        // backwards compatibility. It has a different $$typeof, so we can properly
        // warn for the incorrect usage of Context as a Consumer.
        var Consumer = {
            $$typeof: REACT_CONTEXT_TYPE,
            _context: context,
            _calculateChangedBits: context._calculateChangedBits
        }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here
        Object.defineProperties(Consumer, {
            Provider: {
                get: function() {
                    if (!hasWarnedAboutUsingConsumerProvider) {
                        hasWarnedAboutUsingConsumerProvider = true;
                        error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                    }
                    return context.Provider;
                },
                set: function(_Provider) {
                    context.Provider = _Provider;
                }
            },
            _currentValue: {
                get: function() {
                    return context._currentValue;
                },
                set: function(_currentValue) {
                    context._currentValue = _currentValue;
                }
            },
            _currentValue2: {
                get: function() {
                    return context._currentValue2;
                },
                set: function(_currentValue2) {
                    context._currentValue2 = _currentValue2;
                }
            },
            _threadCount: {
                get: function() {
                    return context._threadCount;
                },
                set: function(_threadCount) {
                    context._threadCount = _threadCount;
                }
            },
            Consumer: {
                get: function() {
                    if (!hasWarnedAboutUsingNestedContextConsumers) {
                        hasWarnedAboutUsingNestedContextConsumers = true;
                        error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                    }
                    return context.Consumer;
                }
            }
        }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty
        context.Consumer = Consumer;
        context._currentRenderer = null;
        context._currentRenderer2 = null;
        return context;
    }
    function lazy(ctor) {
        var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _ctor: ctor,
            // React uses these fields to store the result.
            _status: -1,
            _result: null
        };
        // In production, this would just set it on the object.
        var defaultProps;
        var propTypes;
        Object.defineProperties(lazyType, {
            defaultProps: {
                configurable: true,
                get: function() {
                    return defaultProps;
                },
                set: function(newDefaultProps) {
                    error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    defaultProps = newDefaultProps; // Match production behavior more closely:
                    Object.defineProperty(lazyType, 'defaultProps', {
                        enumerable: true
                    });
                }
            },
            propTypes: {
                configurable: true,
                get: function() {
                    return propTypes;
                },
                set: function(newPropTypes) {
                    error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    propTypes = newPropTypes; // Match production behavior more closely:
                    Object.defineProperty(lazyType, 'propTypes', {
                        enumerable: true
                    });
                }
            }
        });
        return lazyType;
    }
    function forwardRef(render) {
        if (render != null && render.$$typeof === REACT_MEMO_TYPE) error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
        else if (typeof render !== 'function') error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
        else if (render.length !== 0 && render.length !== 2) error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
        if (render != null) {
            if (render.defaultProps != null || render.propTypes != null) error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        }
        return {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render: render
        };
    }
    function isValidElementType(type) {
        return typeof type === 'string' || typeof type === 'function' || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
    }
    function memo(type, compare) {
        if (!isValidElementType(type)) error("memo: The first argument must be a component. Instead received: %s", type === null ? 'null' : typeof type);
        return {
            $$typeof: REACT_MEMO_TYPE,
            type: type,
            compare: compare === undefined ? null : compare
        };
    }
    function resolveDispatcher() {
        var dispatcher = ReactCurrentDispatcher.current;
        if (!(dispatcher !== null)) throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.");
        return dispatcher;
    }
    function useContext(Context, unstable_observedBits) {
        var dispatcher = resolveDispatcher();
        if (unstable_observedBits !== undefined) error("useContext() second argument is reserved for future use in React. Passing it is not supported. You passed: %s.%s", unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? "\n\nDid you call array.map(useContext)? Calling Hooks inside a loop is not supported. Learn more at https://fb.me/rules-of-hooks" : '');
         // TODO: add a more generic warning for invalid values.
        if (Context._context !== undefined) {
            var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
            // and nobody should be using this in existing code.
            if (realContext.Consumer === Context) error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
            else if (realContext.Provider === Context) error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return dispatcher.useContext(Context, unstable_observedBits);
    }
    function useState(initialState) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useState(initialState);
    }
    function useReducer(reducer, initialArg, init) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useReducer(reducer, initialArg, init);
    }
    function useRef(initialValue) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useRef(initialValue);
    }
    function useEffect(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useEffect(create, deps);
    }
    function useLayoutEffect(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useLayoutEffect(create, deps);
    }
    function useCallback(callback, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useCallback(callback, deps);
    }
    function useMemo(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useMemo(create, deps);
    }
    function useImperativeHandle(ref, create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useImperativeHandle(ref, create, deps);
    }
    function useDebugValue(value, formatterFn) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useDebugValue(value, formatterFn);
    }
    var propTypesMisspellWarningShown;
    propTypesMisspellWarningShown = false;
    function getDeclarationErrorAddendum() {
        if (ReactCurrentOwner.current) {
            var name = getComponentName(ReactCurrentOwner.current.type);
            if (name) return '\n\nCheck the render method of `' + name + '`.';
        }
        return '';
    }
    function getSourceInfoErrorAddendum(source) {
        if (source !== undefined) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, '');
            var lineNumber = source.lineNumber;
            return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
        }
        return '';
    }
    function getSourceInfoErrorAddendumForProps(elementProps) {
        if (elementProps !== null && elementProps !== undefined) return getSourceInfoErrorAddendum(elementProps.__source);
        return '';
    }
    /**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */ var ownerHasKeyUseWarning = {
    };
    function getCurrentComponentErrorInfo(parentType) {
        var info = getDeclarationErrorAddendum();
        if (!info) {
            var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
            if (parentName) info = "\n\nCheck the top-level render call using <" + parentName + ">.";
        }
        return info;
    }
    /**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */ function validateExplicitKey(element, parentType) {
        if (!element._store || element._store.validated || element.key != null) return;
        element._store.validated = true;
        var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
        if (ownerHasKeyUseWarning[currentComponentErrorInfo]) return;
        ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
        // property, it may be the creator of the child that's responsible for
        // assigning it a key.
        var childOwner = '';
        if (element && element._owner && element._owner !== ReactCurrentOwner.current) // Give the component that originally created this child.
        childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
        setCurrentlyValidatingElement(element);
        error("Each child in a list should have a unique \"key\" prop.%s%s See https://fb.me/react-warning-keys for more information.", currentComponentErrorInfo, childOwner);
        setCurrentlyValidatingElement(null);
    }
    /**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */ function validateChildKeys(node, parentType) {
        if (typeof node !== 'object') return;
        if (Array.isArray(node)) for(var i = 0; i < node.length; i++){
            var child = node[i];
            if (isValidElement(child)) validateExplicitKey(child, parentType);
        }
        else if (isValidElement(node)) // This element was passed in a valid location.
        {
            if (node._store) node._store.validated = true;
        } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === 'function') // Entry iterators used to provide implicit keys,
            // but now we print a separate warning for them later.
            {
                if (iteratorFn !== node.entries) {
                    var iterator = iteratorFn.call(node);
                    var step;
                    while(!(step = iterator.next()).done)if (isValidElement(step.value)) validateExplicitKey(step.value, parentType);
                }
            }
        }
    }
    /**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */ function validatePropTypes(element) {
        var type = element.type;
        if (type === null || type === undefined || typeof type === 'string') return;
        var name = getComponentName(type);
        var propTypes;
        if (typeof type === 'function') propTypes = type.propTypes;
        else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Inner props are checked in the reconciler.
        type.$$typeof === REACT_MEMO_TYPE)) propTypes = type.propTypes;
        else return;
        if (propTypes) {
            setCurrentlyValidatingElement(element);
            checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame1.getStackAddendum);
            setCurrentlyValidatingElement(null);
        } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true;
            error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
        }
        if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
    /**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */ function validateFragmentProps(fragment) {
        setCurrentlyValidatingElement(fragment);
        var keys = Object.keys(fragment.props);
        for(var i = 0; i < keys.length; i++){
            var key = keys[i];
            if (key !== 'children' && key !== 'key') {
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                break;
            }
        }
        if (fragment.ref !== null) error('Invalid attribute `ref` supplied to `React.Fragment`.');
        setCurrentlyValidatingElement(null);
    }
    function createElementWithValidation(type, props, children) {
        var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
        // succeed and there will likely be errors in render.
        if (!validType) {
            var info = '';
            if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            var sourceInfo = getSourceInfoErrorAddendumForProps(props);
            if (sourceInfo) info += sourceInfo;
            else info += getDeclarationErrorAddendum();
            var typeString;
            if (type === null) typeString = 'null';
            else if (Array.isArray(type)) typeString = 'array';
            else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
                info = ' Did you accidentally export a JSX literal instead of a component?';
            } else typeString = typeof type;
            error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
        }
        var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
        // TODO: Drop this when these are no longer allowed as the type argument.
        if (element == null) return element;
         // Skip key warning if the type isn't valid since our key validation logic
        // doesn't expect a non-string/function type and can throw confusing errors.
        // We don't want exception behavior to differ between dev and prod.
        // (Rendering will throw with a helpful message and as soon as the type is
        // fixed, the key warnings will appear.)
        if (validType) for(var i = 2; i < arguments.length; i++)validateChildKeys(arguments[i], type);
        if (type === REACT_FRAGMENT_TYPE) validateFragmentProps(element);
        else validatePropTypes(element);
        return element;
    }
    var didWarnAboutDeprecatedCreateFactory = false;
    function createFactoryWithValidation(type) {
        var validatedFactory = createElementWithValidation.bind(null, type);
        validatedFactory.type = type;
        if (!didWarnAboutDeprecatedCreateFactory) {
            didWarnAboutDeprecatedCreateFactory = true;
            warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
        } // Legacy hook: remove it
        Object.defineProperty(validatedFactory, 'type', {
            enumerable: false,
            get: function() {
                warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                Object.defineProperty(this, 'type', {
                    value: type
                });
                return type;
            }
        });
        return validatedFactory;
    }
    function cloneElementWithValidation(element, props, children) {
        var newElement = cloneElement.apply(this, arguments);
        for(var i = 2; i < arguments.length; i++)validateChildKeys(arguments[i], newElement.type);
        validatePropTypes(newElement);
        return newElement;
    }
    try {
        var frozenObject = Object.freeze({
        });
        var testMap = new Map([
            [
                frozenObject,
                null
            ]
        ]);
        var testSet = new Set([
            frozenObject
        ]); // This is necessary for Rollup to not consider these unused.
        // https://github.com/rollup/rollup/issues/1771
        // TODO: we can remove these if Rollup fixes the bug.
        testMap.set(0, 0);
        testSet.add(0);
    } catch (e) {
    }
    var createElement$1 = createElementWithValidation;
    var cloneElement$1 = cloneElementWithValidation;
    var createFactory = createFactoryWithValidation;
    var Children = {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray: toArray,
        only: onlyChild
    };
    exports.Children = Children;
    exports.Component = Component;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.PureComponent = PureComponent;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
    exports.cloneElement = cloneElement$1;
    exports.createContext = createContext;
    exports.createElement = createElement$1;
    exports.createFactory = createFactory;
    exports.createRef = createRef;
    exports.forwardRef = forwardRef;
    exports.isValidElement = isValidElement;
    exports.lazy = lazy;
    exports.memo = memo;
    exports.useCallback = useCallback;
    exports.useContext = useContext;
    exports.useDebugValue = useDebugValue;
    exports.useEffect = useEffect;
    exports.useImperativeHandle = useImperativeHandle;
    exports.useLayoutEffect = useLayoutEffect;
    exports.useMemo = useMemo;
    exports.useReducer = useReducer;
    exports.useRef = useRef;
    exports.useState = useState;
    exports.version = ReactVersion;
})();

},{"object-assign":"7OXxh","prop-types/checkPropTypes":"5VwyJ"}],"7OXxh":[function(require,module,exports) {
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/ 'use strict';
/* eslint-disable no-unused-vars */ var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
    if (val === null || val === undefined) throw new TypeError('Object.assign cannot be called with null or undefined');
    return Object(val);
}
function shouldUseNative() {
    try {
        if (!Object.assign) return false;
        // Detect buggy property enumeration order in older V8 versions.
        // https://bugs.chromium.org/p/v8/issues/detail?id=4118
        var test1 = "abc"; // eslint-disable-line no-new-wrappers
        test1[5] = 'de';
        if (Object.getOwnPropertyNames(test1)[0] === '5') return false;
        // https://bugs.chromium.org/p/v8/issues/detail?id=3056
        var test2 = {
        };
        for(var i = 0; i < 10; i++)test2['_' + String.fromCharCode(i)] = i;
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
        });
        if (order2.join('') !== '0123456789') return false;
        // https://bugs.chromium.org/p/v8/issues/detail?id=3056
        var test3 = {
        };
        'abcdefghijklmnopqrst'.split('').forEach(function(letter) {
            test3[letter] = letter;
        });
        if (Object.keys(Object.assign({
        }, test3)).join('') !== 'abcdefghijklmnopqrst') return false;
        return true;
    } catch (err) {
        // We don't expect any of the above to throw, but better to be safe.
        return false;
    }
}
module.exports = shouldUseNative() ? Object.assign : function(target, source) {
    var from;
    var to = toObject(target);
    var symbols;
    for(var s = 1; s < arguments.length; s++){
        from = Object(arguments[s]);
        for(var key in from)if (hasOwnProperty.call(from, key)) to[key] = from[key];
        if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for(var i = 0; i < symbols.length; i++)if (propIsEnumerable.call(from, symbols[i])) to[symbols[i]] = from[symbols[i]];
        }
    }
    return to;
};

},{}],"5VwyJ":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
var printWarning = function() {
};
var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
var loggedTypeFailures = {
};
var has = require('./lib/has');
printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') console.error(message);
    try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
    } catch (x) {
    }
};
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */ function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    for(var typeSpecName in typeSpecs)if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
                var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
                err.name = 'Invariant Violation';
                throw err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
            error = ex;
        }
        if (error && !(error instanceof Error)) printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;
            var stack = getStack ? getStack() : '';
            printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
    }
}
/**
 * Resets warning cache when testing.
 *
 * @private
 */ checkPropTypes.resetWarningCache = function() {
    loggedTypeFailures = {
    };
};
module.exports = checkPropTypes;

},{"./lib/ReactPropTypesSecret":"jZTZJ","./lib/has":"fqKuf"}],"jZTZJ":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
module.exports = ReactPropTypesSecret;

},{}],"fqKuf":[function(require,module,exports) {
module.exports = Function.call.bind(Object.prototype.hasOwnProperty);

},{}],"dRApq":[function(require,module,exports) {
var global = arguments[3];
/// <reference lib="WebWorker"/>
var _self = typeof window !== 'undefined' ? window // if in browser
 : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self // if in worker
 : {
} // if in node js
;
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */ var Prism = function(_self1) {
    // Private helper vars
    var lang1 = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
    var uniqueId = 0;
    // The grammar object for plaintext
    var plainTextGrammar = {
    };
    var _ = {
        /**
		 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
		 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
		 * additional languages or plugins yourself.
		 *
		 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
		 *
		 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.manual = true;
		 * // add a new <script> to load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */ manual: _self1.Prism && _self1.Prism.manual,
        /**
		 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
		 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
		 * own worker, you don't want it to do this.
		 *
		 * By setting this value to `true`, Prism will not add its own listeners to the worker.
		 *
		 * You obviously have to change this value before Prism executes. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.disableWorkerMessageHandler = true;
		 * // Load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */ disableWorkerMessageHandler: _self1.Prism && _self1.Prism.disableWorkerMessageHandler,
        /**
		 * A namespace for utility methods.
		 *
		 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
		 * change or disappear at any time.
		 *
		 * @namespace
		 * @memberof Prism
		 */ util: {
            encode: function encode(tokens) {
                if (tokens instanceof Token) return new Token(tokens.type, encode(tokens.content), tokens.alias);
                else if (Array.isArray(tokens)) return tokens.map(encode);
                else return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
            },
            /**
			 * Returns the name of the type of the given value.
			 *
			 * @param {any} o
			 * @returns {string}
			 * @example
			 * type(null)      === 'Null'
			 * type(undefined) === 'Undefined'
			 * type(123)       === 'Number'
			 * type('foo')     === 'String'
			 * type(true)      === 'Boolean'
			 * type([1, 2])    === 'Array'
			 * type({})        === 'Object'
			 * type(String)    === 'Function'
			 * type(/abc+/)    === 'RegExp'
			 */ type: function(o) {
                return Object.prototype.toString.call(o).slice(8, -1);
            },
            /**
			 * Returns a unique number for the given object. Later calls will still return the same number.
			 *
			 * @param {Object} obj
			 * @returns {number}
			 */ objId: function(obj) {
                if (!obj['__id']) Object.defineProperty(obj, '__id', {
                    value: ++uniqueId
                });
                return obj['__id'];
            },
            /**
			 * Creates a deep clone of the given object.
			 *
			 * The main intended use of this function is to clone language definitions.
			 *
			 * @param {T} o
			 * @param {Record<number, any>} [visited]
			 * @returns {T}
			 * @template T
			 */ clone: function deepClone(o, visited) {
                visited = visited || {
                };
                var clone;
                var id;
                switch(_.util.type(o)){
                    case 'Object':
                        id = _.util.objId(o);
                        if (visited[id]) return visited[id];
                        clone = {
                        };
                        visited[id] = clone;
                        for(var key in o)if (o.hasOwnProperty(key)) clone[key] = deepClone(o[key], visited);
                        return clone;
                    case 'Array':
                        id = _.util.objId(o);
                        if (visited[id]) return visited[id];
                        clone = [];
                        visited[id] = clone;
                        o.forEach(function(v, i) {
                            clone[i] = deepClone(v, visited);
                        });
                        return clone;
                    default:
                        return o;
                }
            },
            /**
			 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
			 *
			 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
			 *
			 * @param {Element} element
			 * @returns {string}
			 */ getLanguage: function(element) {
                while(element){
                    var m = lang1.exec(element.className);
                    if (m) return m[1].toLowerCase();
                    element = element.parentElement;
                }
                return 'none';
            },
            /**
			 * Sets the Prism `language-xxxx` class of the given element.
			 *
			 * @param {Element} element
			 * @param {string} language
			 * @returns {void}
			 */ setLanguage: function(element, language) {
                // remove all `language-xxxx` classes
                // (this might leave behind a leading space)
                element.className = element.className.replace(RegExp(lang1, 'gi'), '');
                // add the new `language-xxxx` class
                // (using `classList` will automatically clean up spaces for us)
                element.classList.add('language-' + language);
            },
            /**
			 * Returns the script element that is currently executing.
			 *
			 * This does __not__ work for line script element.
			 *
			 * @returns {HTMLScriptElement | null}
			 */ currentScript: function() {
                if (typeof document === 'undefined') return null;
                if ('currentScript' in document && true /* hack to trip TS' flow analysis */ ) return document.currentScript;
                // IE11 workaround
                // we'll get the src of the current script by parsing IE11's error stack trace
                // this will not work for inline scripts
                try {
                    throw new Error();
                } catch (err) {
                    // Get file src url from stack. Specifically works with the format of stack traces in IE.
                    // A stack will look like this:
                    //
                    // Error
                    //    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
                    //    at Global code (http://localhost/components/prism-core.js:606:1)
                    var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
                    if (src) {
                        var scripts = document.getElementsByTagName('script');
                        for(var i in scripts){
                            if (scripts[i].src == src) return scripts[i];
                        }
                    }
                    return null;
                }
            },
            /**
			 * Returns whether a given class is active for `element`.
			 *
			 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
			 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
			 * given class is just the given class with a `no-` prefix.
			 *
			 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
			 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
			 * ancestors have the given class or the negated version of it, then the default activation will be returned.
			 *
			 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
			 * version of it, the class is considered active.
			 *
			 * @param {Element} element
			 * @param {string} className
			 * @param {boolean} [defaultActivation=false]
			 * @returns {boolean}
			 */ isActive: function(element, className, defaultActivation) {
                var no = 'no-' + className;
                while(element){
                    var classList = element.classList;
                    if (classList.contains(className)) return true;
                    if (classList.contains(no)) return false;
                    element = element.parentElement;
                }
                return !!defaultActivation;
            }
        },
        /**
		 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
		 *
		 * @namespace
		 * @memberof Prism
		 * @public
		 */ languages: {
            /**
			 * The grammar for plain, unformatted text.
			 */ plain: plainTextGrammar,
            plaintext: plainTextGrammar,
            text: plainTextGrammar,
            txt: plainTextGrammar,
            /**
			 * Creates a deep copy of the language with the given id and appends the given tokens.
			 *
			 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
			 * will be overwritten at its original position.
			 *
			 * ## Best practices
			 *
			 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
			 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
			 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
			 *
			 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
			 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
			 *
			 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
			 * @param {Grammar} redef The new tokens to append.
			 * @returns {Grammar} The new language created.
			 * @public
			 * @example
			 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
			 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
			 *     // at its original position
			 *     'comment': { ... },
			 *     // CSS doesn't have a 'color' token, so this token will be appended
			 *     'color': /\b(?:red|green|blue)\b/
			 * });
			 */ extend: function(id, redef) {
                var lang = _.util.clone(_.languages[id]);
                for(var key in redef)lang[key] = redef[key];
                return lang;
            },
            /**
			 * Inserts tokens _before_ another token in a language definition or any other grammar.
			 *
			 * ## Usage
			 *
			 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
			 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
			 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
			 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
			 * this:
			 *
			 * ```js
			 * Prism.languages.markup.style = {
			 *     // token
			 * };
			 * ```
			 *
			 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
			 * before existing tokens. For the CSS example above, you would use it like this:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'cdata', {
			 *     'style': {
			 *         // token
			 *     }
			 * });
			 * ```
			 *
			 * ## Special cases
			 *
			 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
			 * will be ignored.
			 *
			 * This behavior can be used to insert tokens after `before`:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'comment', {
			 *     'comment': Prism.languages.markup.comment,
			 *     // tokens after 'comment'
			 * });
			 * ```
			 *
			 * ## Limitations
			 *
			 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
			 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
			 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
			 * deleting properties which is necessary to insert at arbitrary positions.
			 *
			 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
			 * Instead, it will create a new object and replace all references to the target object with the new one. This
			 * can be done without temporarily deleting properties, so the iteration order is well-defined.
			 *
			 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
			 * you hold the target object in a variable, then the value of the variable will not change.
			 *
			 * ```js
			 * var oldMarkup = Prism.languages.markup;
			 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
			 *
			 * assert(oldMarkup !== Prism.languages.markup);
			 * assert(newMarkup === Prism.languages.markup);
			 * ```
			 *
			 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
			 * object to be modified.
			 * @param {string} before The key to insert before.
			 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
			 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
			 * object to be modified.
			 *
			 * Defaults to `Prism.languages`.
			 * @returns {Grammar} The new grammar object.
			 * @public
			 */ insertBefore: function(inside, before, insert, root) {
                root = root || _.languages;
                var grammar = root[inside];
                /** @type {Grammar} */ var ret = {
                };
                for(var token in grammar)if (grammar.hasOwnProperty(token)) {
                    if (token == before) {
                        for(var newToken in insert)if (insert.hasOwnProperty(newToken)) ret[newToken] = insert[newToken];
                    }
                    // Do not insert token which also occur in insert. See #1525
                    if (!insert.hasOwnProperty(token)) ret[token] = grammar[token];
                }
                var old = root[inside];
                root[inside] = ret;
                // Update references in other language definitions
                _.languages.DFS(_.languages, function(key, value) {
                    if (value === old && key != inside) this[key] = ret;
                });
                return ret;
            },
            // Traverse a language definition with Depth First Search
            DFS: function DFS(o, callback, type, visited) {
                visited = visited || {
                };
                var objId = _.util.objId;
                for(var i in o)if (o.hasOwnProperty(i)) {
                    callback.call(o, i, o[i], type || i);
                    var property = o[i];
                    var propertyType = _.util.type(property);
                    if (propertyType === 'Object' && !visited[objId(property)]) {
                        visited[objId(property)] = true;
                        DFS(property, callback, null, visited);
                    } else if (propertyType === 'Array' && !visited[objId(property)]) {
                        visited[objId(property)] = true;
                        DFS(property, callback, i, visited);
                    }
                }
            }
        },
        plugins: {
        },
        /**
		 * This is the most high-level function in Prism’s API.
		 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
		 * each one of them.
		 *
		 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
		 *
		 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
		 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
		 * @memberof Prism
		 * @public
		 */ highlightAll: function(async, callback) {
            _.highlightAllUnder(document, async, callback);
        },
        /**
		 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
		 * {@link Prism.highlightElement} on each one of them.
		 *
		 * The following hooks will be run:
		 * 1. `before-highlightall`
		 * 2. `before-all-elements-highlight`
		 * 3. All hooks of {@link Prism.highlightElement} for each element.
		 *
		 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
		 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
		 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
		 * @memberof Prism
		 * @public
		 */ highlightAllUnder: function(container, async, callback) {
            var env = {
                callback: callback,
                container: container,
                selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            _.hooks.run('before-highlightall', env);
            env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
            _.hooks.run('before-all-elements-highlight', env);
            for(var i = 0, element; element = env.elements[i++];)_.highlightElement(element, async === true, env.callback);
        },
        /**
		 * Highlights the code inside a single element.
		 *
		 * The following hooks will be run:
		 * 1. `before-sanity-check`
		 * 2. `before-highlight`
		 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
		 * 4. `before-insert`
		 * 5. `after-highlight`
		 * 6. `complete`
		 *
		 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
		 * the element's language.
		 *
		 * @param {Element} element The element containing the code.
		 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
		 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
		 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
		 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
		 *
		 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
		 * asynchronous highlighting to work. You can build your own bundle on the
		 * [Download page](https://prismjs.com/download.html).
		 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
		 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
		 * @memberof Prism
		 * @public
		 */ highlightElement: function(element, async, callback) {
            // Find language
            var language = _.util.getLanguage(element);
            var grammar = _.languages[language];
            // Set language on the element, if not present
            _.util.setLanguage(element, language);
            // Set language on the parent, for styling
            var parent = element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === 'pre') _.util.setLanguage(parent, language);
            var code = element.textContent;
            var env = {
                element: element,
                language: language,
                grammar: grammar,
                code: code
            };
            function insertHighlightedCode(highlightedCode) {
                env.highlightedCode = highlightedCode;
                _.hooks.run('before-insert', env);
                env.element.innerHTML = env.highlightedCode;
                _.hooks.run('after-highlight', env);
                _.hooks.run('complete', env);
                callback && callback.call(env.element);
            }
            _.hooks.run('before-sanity-check', env);
            // plugins may change/add the parent/element
            parent = env.element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) parent.setAttribute('tabindex', '0');
            if (!env.code) {
                _.hooks.run('complete', env);
                callback && callback.call(env.element);
                return;
            }
            _.hooks.run('before-highlight', env);
            if (!env.grammar) {
                insertHighlightedCode(_.util.encode(env.code));
                return;
            }
            if (async && _self1.Worker) {
                var worker = new Worker(_.filename);
                worker.onmessage = function(evt) {
                    insertHighlightedCode(evt.data);
                };
                worker.postMessage(JSON.stringify({
                    language: env.language,
                    code: env.code,
                    immediateClose: true
                }));
            } else insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
        },
        /**
		 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
		 * and the language definitions to use, and returns a string with the HTML produced.
		 *
		 * The following hooks will be run:
		 * 1. `before-tokenize`
		 * 2. `after-tokenize`
		 * 3. `wrap`: On each {@link Token}.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @param {string} language The name of the language definition passed to `grammar`.
		 * @returns {string} The highlighted HTML.
		 * @memberof Prism
		 * @public
		 * @example
		 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
		 */ highlight: function(text, grammar, language) {
            var env = {
                code: text,
                grammar: grammar,
                language: language
            };
            _.hooks.run('before-tokenize', env);
            env.tokens = _.tokenize(env.code, env.grammar);
            _.hooks.run('after-tokenize', env);
            return Token.stringify(_.util.encode(env.tokens), env.language);
        },
        /**
		 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
		 * and the language definitions to use, and returns an array with the tokenized code.
		 *
		 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
		 *
		 * This method could be useful in other contexts as well, as a very crude parser.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @returns {TokenStream} An array of strings and tokens, a token stream.
		 * @memberof Prism
		 * @public
		 * @example
		 * let code = `var foo = 0;`;
		 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
		 * tokens.forEach(token => {
		 *     if (token instanceof Prism.Token && token.type === 'number') {
		 *         console.log(`Found numeric literal: ${token.content}`);
		 *     }
		 * });
		 */ tokenize: function(text, grammar) {
            var rest = grammar.rest;
            if (rest) {
                for(var token in rest)grammar[token] = rest[token];
                delete grammar.rest;
            }
            var tokenList = new LinkedList();
            addAfter(tokenList, tokenList.head, text);
            matchGrammar(text, tokenList, grammar, tokenList.head, 0);
            return toArray(tokenList);
        },
        /**
		 * @namespace
		 * @memberof Prism
		 * @public
		 */ hooks: {
            all: {
            },
            /**
			 * Adds the given callback to the list of callbacks for the given hook.
			 *
			 * The callback will be invoked when the hook it is registered for is run.
			 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
			 *
			 * One callback function can be registered to multiple hooks and the same hook multiple times.
			 *
			 * @param {string} name The name of the hook.
			 * @param {HookCallback} callback The callback function which is given environment variables.
			 * @public
			 */ add: function(name, callback) {
                var hooks = _.hooks.all;
                hooks[name] = hooks[name] || [];
                hooks[name].push(callback);
            },
            /**
			 * Runs a hook invoking all registered callbacks with the given environment variables.
			 *
			 * Callbacks will be invoked synchronously and in the order in which they were registered.
			 *
			 * @param {string} name The name of the hook.
			 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
			 * @public
			 */ run: function(name, env) {
                var callbacks = _.hooks.all[name];
                if (!callbacks || !callbacks.length) return;
                for(var i = 0, callback; callback = callbacks[i++];)callback(env);
            }
        },
        Token: Token
    };
    _self1.Prism = _;
    // Typescript note:
    // The following can be used to import the Token type in JSDoc:
    //
    //   @typedef {InstanceType<import("./prism-core")["Token"]>} Token
    /**
	 * Creates a new token.
	 *
	 * @param {string} type See {@link Token#type type}
	 * @param {string | TokenStream} content See {@link Token#content content}
	 * @param {string|string[]} [alias] The alias(es) of the token.
	 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
	 * @class
	 * @global
	 * @public
	 */ function Token(type, content, alias, matchedStr) {
        /**
		 * The type of the token.
		 *
		 * This is usually the key of a pattern in a {@link Grammar}.
		 *
		 * @type {string}
		 * @see GrammarToken
		 * @public
		 */ this.type = type;
        /**
		 * The strings or tokens contained by this token.
		 *
		 * This will be a token stream if the pattern matched also defined an `inside` grammar.
		 *
		 * @type {string | TokenStream}
		 * @public
		 */ this.content = content;
        /**
		 * The alias(es) of the token.
		 *
		 * @type {string|string[]}
		 * @see GrammarToken
		 * @public
		 */ this.alias = alias;
        // Copy of the full string this token was created from
        this.length = (matchedStr || '').length | 0;
    }
    /**
	 * A token stream is an array of strings and {@link Token Token} objects.
	 *
	 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
	 * them.
	 *
	 * 1. No adjacent strings.
	 * 2. No empty strings.
	 *
	 *    The only exception here is the token stream that only contains the empty string and nothing else.
	 *
	 * @typedef {Array<string | Token>} TokenStream
	 * @global
	 * @public
	 */ /**
	 * Converts the given token or token stream to an HTML representation.
	 *
	 * The following hooks will be run:
	 * 1. `wrap`: On each {@link Token}.
	 *
	 * @param {string | Token | TokenStream} o The token or token stream to be converted.
	 * @param {string} language The name of current language.
	 * @returns {string} The HTML representation of the token or token stream.
	 * @memberof Token
	 * @static
	 */ Token.stringify = function stringify(o, language) {
        if (typeof o == 'string') return o;
        if (Array.isArray(o)) {
            var s = '';
            o.forEach(function(e) {
                s += stringify(e, language);
            });
            return s;
        }
        var env = {
            type: o.type,
            content: stringify(o.content, language),
            tag: 'span',
            classes: [
                'token',
                o.type
            ],
            attributes: {
            },
            language: language
        };
        var aliases = o.alias;
        if (aliases) {
            if (Array.isArray(aliases)) Array.prototype.push.apply(env.classes, aliases);
            else env.classes.push(aliases);
        }
        _.hooks.run('wrap', env);
        var attributes = '';
        for(var name in env.attributes)attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
        return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
    };
    /**
	 * @param {RegExp} pattern
	 * @param {number} pos
	 * @param {string} text
	 * @param {boolean} lookbehind
	 * @returns {RegExpExecArray | null}
	 */ function matchPattern(pattern, pos, text, lookbehind) {
        pattern.lastIndex = pos;
        var match = pattern.exec(text);
        if (match && lookbehind && match[1]) {
            // change the match to remove the text matched by the Prism lookbehind group
            var lookbehindLength = match[1].length;
            match.index += lookbehindLength;
            match[0] = match[0].slice(lookbehindLength);
        }
        return match;
    }
    /**
	 * @param {string} text
	 * @param {LinkedList<string | Token>} tokenList
	 * @param {any} grammar
	 * @param {LinkedListNode<string | Token>} startNode
	 * @param {number} startPos
	 * @param {RematchOptions} [rematch]
	 * @returns {void}
	 * @private
	 *
	 * @typedef RematchOptions
	 * @property {string} cause
	 * @property {number} reach
	 */ function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
        for(var token in grammar){
            if (!grammar.hasOwnProperty(token) || !grammar[token]) continue;
            var patterns = grammar[token];
            patterns = Array.isArray(patterns) ? patterns : [
                patterns
            ];
            for(var j = 0; j < patterns.length; ++j){
                if (rematch && rematch.cause == token + ',' + j) return;
                var patternObj = patterns[j];
                var inside = patternObj.inside;
                var lookbehind = !!patternObj.lookbehind;
                var greedy = !!patternObj.greedy;
                var alias = patternObj.alias;
                if (greedy && !patternObj.pattern.global) {
                    // Without the global flag, lastIndex won't work
                    var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                    patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
                }
                /** @type {RegExp} */ var pattern = patternObj.pattern || patternObj;
                for(var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next){
                    if (rematch && pos >= rematch.reach) break;
                    var str = currentNode.value;
                    if (tokenList.length > text.length) // Something went terribly wrong, ABORT, ABORT!
                    return;
                    if (str instanceof Token) continue;
                    var removeCount = 1; // this is the to parameter of removeBetween
                    var match;
                    if (greedy) {
                        match = matchPattern(pattern, pos, text, lookbehind);
                        if (!match || match.index >= text.length) break;
                        var from = match.index;
                        var to = match.index + match[0].length;
                        var p = pos;
                        // find the node that contains the match
                        p += currentNode.value.length;
                        while(from >= p){
                            currentNode = currentNode.next;
                            p += currentNode.value.length;
                        }
                        // adjust pos (and p)
                        p -= currentNode.value.length;
                        pos = p;
                        // the current node is a Token, then the match starts inside another Token, which is invalid
                        if (currentNode.value instanceof Token) continue;
                        // find the last node which is affected by this match
                        for(var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === 'string'); k = k.next){
                            removeCount++;
                            p += k.value.length;
                        }
                        removeCount--;
                        // replace with the new match
                        str = text.slice(pos, p);
                        match.index -= pos;
                    } else {
                        match = matchPattern(pattern, 0, str, lookbehind);
                        if (!match) continue;
                    }
                    // eslint-disable-next-line no-redeclare
                    var from = match.index;
                    var matchStr = match[0];
                    var before = str.slice(0, from);
                    var after = str.slice(from + matchStr.length);
                    var reach = pos + str.length;
                    if (rematch && reach > rematch.reach) rematch.reach = reach;
                    var removeFrom = currentNode.prev;
                    if (before) {
                        removeFrom = addAfter(tokenList, removeFrom, before);
                        pos += before.length;
                    }
                    removeRange(tokenList, removeFrom, removeCount);
                    var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
                    currentNode = addAfter(tokenList, removeFrom, wrapped);
                    if (after) addAfter(tokenList, currentNode, after);
                    if (removeCount > 1) {
                        // at least one Token object was removed, so we have to do some rematching
                        // this can only happen if the current pattern is greedy
                        /** @type {RematchOptions} */ var nestedRematch = {
                            cause: token + ',' + j,
                            reach: reach
                        };
                        matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                        // the reach might have been extended because of the rematching
                        if (rematch && nestedRematch.reach > rematch.reach) rematch.reach = nestedRematch.reach;
                    }
                }
            }
        }
    }
    /**
	 * @typedef LinkedListNode
	 * @property {T} value
	 * @property {LinkedListNode<T> | null} prev The previous node.
	 * @property {LinkedListNode<T> | null} next The next node.
	 * @template T
	 * @private
	 */ /**
	 * @template T
	 * @private
	 */ function LinkedList() {
        /** @type {LinkedListNode<T>} */ var head = {
            value: null,
            prev: null,
            next: null
        };
        /** @type {LinkedListNode<T>} */ var tail = {
            value: null,
            prev: head,
            next: null
        };
        head.next = tail;
        /** @type {LinkedListNode<T>} */ this.head = head;
        /** @type {LinkedListNode<T>} */ this.tail = tail;
        this.length = 0;
    }
    /**
	 * Adds a new node with the given value to the list.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {T} value
	 * @returns {LinkedListNode<T>} The added node.
	 * @template T
	 */ function addAfter(list, node, value) {
        // assumes that node != list.tail && values.length >= 0
        var next = node.next;
        var newNode = {
            value: value,
            prev: node,
            next: next
        };
        node.next = newNode;
        next.prev = newNode;
        list.length++;
        return newNode;
    }
    /**
	 * Removes `count` nodes after the given node. The given node will not be removed.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {number} count
	 * @template T
	 */ function removeRange(list, node, count) {
        var next = node.next;
        for(var i = 0; i < count && next !== list.tail; i++)next = next.next;
        node.next = next;
        next.prev = node;
        list.length -= i;
    }
    /**
	 * @param {LinkedList<T>} list
	 * @returns {T[]}
	 * @template T
	 */ function toArray(list) {
        var array = [];
        var node = list.head.next;
        while(node !== list.tail){
            array.push(node.value);
            node = node.next;
        }
        return array;
    }
    if (!_self1.document) {
        if (!_self1.addEventListener) // in Node.js
        return _;
        if (!_.disableWorkerMessageHandler) // In worker
        _self1.addEventListener('message', function(evt) {
            var message = JSON.parse(evt.data);
            var lang = message.language;
            var code = message.code;
            var immediateClose = message.immediateClose;
            _self1.postMessage(_.highlight(code, _.languages[lang], lang));
            if (immediateClose) _self1.close();
        }, false);
        return _;
    }
    // Get current script and highlight
    var script = _.util.currentScript();
    if (script) {
        _.filename = script.src;
        if (script.hasAttribute('data-manual')) _.manual = true;
    }
    function highlightAutomaticallyCallback() {
        if (!_.manual) _.highlightAll();
    }
    if (!_.manual) {
        // If the document state is "loading", then we'll use DOMContentLoaded.
        // If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
        // DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
        // might take longer one animation frame to execute which can create a race condition where only some plugins have
        // been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
        // See https://github.com/PrismJS/prism/issues/2102
        var readyState = document.readyState;
        if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
        else if (window.requestAnimationFrame) window.requestAnimationFrame(highlightAutomaticallyCallback);
        else window.setTimeout(highlightAutomaticallyCallback, 16);
    }
    return _;
}(_self);
if (typeof module !== 'undefined' && module.exports) module.exports = Prism;
// hack for components to work correctly in node.js
if (typeof global !== 'undefined') global.Prism = Prism;
 // some additional documentation/types
 /**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
 */  /**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */  /**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
 */  /**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */ 

},{}],"ioeQR":[function(require,module,exports) {
Prism.languages.clike = {
    'comment': [
        {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true,
            greedy: true
        },
        {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true
        }
    ],
    'string': {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
    },
    'class-name': {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: true,
        inside: {
            'punctuation': /[.\\]/
        }
    },
    'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    'boolean': /\b(?:false|true)\b/,
    'function': /\b\w+(?=\()/,
    'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    'punctuation': /[{}[\];(),.:]/
};

},{}],"2Qyfv":[function(require,module,exports) {
Prism.languages.javascript = Prism.languages.extend('clike', {
    'class-name': [
        Prism.languages.clike['class-name'],
        {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
            lookbehind: true
        }
    ],
    'keyword': [
        {
            pattern: /((?:^|\})\s*)catch\b/,
            lookbehind: true
        },
        {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: true
        }, 
    ],
    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    'number': {
        pattern: RegExp(/(^|[^\w$])/.source + '(?:' + // constant
        (/NaN|Infinity/.source + '|' + // binary integer
        /0[bB][01]+(?:_[01]+)*n?/.source + '|' + // octal integer
        /0[oO][0-7]+(?:_[0-7]+)*n?/.source + '|' + // hexadecimal integer
        /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + '|' + // decimal bigint
        /\d+(?:_\d+)*n/.source + '|' + // decimal number (integer or float) but no bigint
        /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ')' + /(?![\w$])/.source),
        lookbehind: true
    },
    'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});
Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
Prism.languages.insertBefore('javascript', 'keyword', {
    'regex': {
        // eslint-disable-next-line regexp/no-dupe-characters-character-class
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
        lookbehind: true,
        greedy: true,
        inside: {
            'regex-source': {
                pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                lookbehind: true,
                alias: 'language-regex',
                inside: Prism.languages.regex
            },
            'regex-delimiter': /^\/|\/$/,
            'regex-flags': /^[a-z]+$/
        }
    },
    // This must be declared before keyword because we use "function" inside the look-forward
    'function-variable': {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: 'function'
    },
    'parameter': [
        {
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: true,
            inside: Prism.languages.javascript
        },
        {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: true,
            inside: Prism.languages.javascript
        },
        {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: true,
            inside: Prism.languages.javascript
        },
        {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: true,
            inside: Prism.languages.javascript
        }
    ],
    'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
Prism.languages.insertBefore('javascript', 'string', {
    'hashbang': {
        pattern: /^#!.*/,
        greedy: true,
        alias: 'comment'
    },
    'template-string': {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: true,
        inside: {
            'template-punctuation': {
                pattern: /^`|`$/,
                alias: 'string'
            },
            'interpolation': {
                pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                lookbehind: true,
                inside: {
                    'interpolation-punctuation': {
                        pattern: /^\$\{|\}$/,
                        alias: 'punctuation'
                    },
                    rest: Prism.languages.javascript
                }
            },
            'string': /[\s\S]+/
        }
    },
    'string-property': {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: true,
        greedy: true,
        alias: 'property'
    }
});
Prism.languages.insertBefore('javascript', 'operator', {
    'literal-property': {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: true,
        alias: 'property'
    }
});
if (Prism.languages.markup) {
    Prism.languages.markup.tag.addInlined('script', 'javascript');
    // add attribute support for all DOM events.
    // https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
    Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, 'javascript');
}
Prism.languages.js = Prism.languages.javascript;

},{}]},["iKiqL","bB7Pu"], "bB7Pu", "parcelRequirec7d2")

//# sourceMappingURL=index.3d214d75.js.map
