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
})({"kQMTH":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "26170a8763aff760";
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

},{}],"adjPd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Camera", ()=>Camera
) // window.onload = init
;
parcelHelpers.export(exports, "ShaderAnimation", ()=>ShaderAnimation
);
var _detectChangesWebsocketJs = require("./detect_changes_websocket.js");
var _vectorJs = require("./vector.js");
async function init() {
    const anchorText = window.location.hash.substr(1);
    const select1 = getShaderSelectElement();
    const camera = new Camera(0, 1, 0);
    if (anchorText) setSelectedOption(select1, anchorText);
    const canvas = document.getElementById('glscreen');
    if (!(canvas instanceof window.HTMLCanvasElement)) throw Error("Canvas isn't a canvas");
    const animation = new ShaderAnimation(canvas, camera);
    await selectFragmentShader(animation, select1);
    animation.renderLoop();
    window.selectFragmentShader = (select)=>selectFragmentShader(animation, select)
    ;
    window.refetchCode = ()=>refetchCode(animation)
    ;
    window.textareaUpdated = ()=>textareaUpdated(animation)
    ;
    if (isLocalhost(window.location.hostname)) _detectChangesWebsocketJs.connectWebsocket((filename)=>handleCodeChange(animation, filename)
    );
    canvas.addEventListener('click', ()=>canvas.requestPointerLock()
    );
    canvas.addEventListener('mousemove', (event)=>camera.handleMouseMove(event)
    );
    window.document.addEventListener('keydown', (event)=>camera.handleKeyDown(event)
    );
    window.document.addEventListener('keyup', (event)=>camera.handleKeyUp(event)
    );
    window.setInterval(()=>camera.tick()
    , 50);
}
const KEY_MAP = new Map();
KEY_MAP.set('ArrowUp', new _vectorJs.Vector(0, 0, -1));
KEY_MAP.set('ArrowDown', new _vectorJs.Vector(0, 0, 1));
KEY_MAP.set('ArrowLeft', new _vectorJs.Vector(-1, 0, 0));
KEY_MAP.set('ArrowRight', new _vectorJs.Vector(1, 0, 0));
KEY_MAP.set(',', new _vectorJs.Vector(0, 0, -1));
KEY_MAP.set('w', new _vectorJs.Vector(0, 0, -1));
KEY_MAP.set('o', new _vectorJs.Vector(0, 0, 1));
KEY_MAP.set('s', new _vectorJs.Vector(0, 0, 1));
KEY_MAP.set('a', new _vectorJs.Vector(-1, 0, 0));
KEY_MAP.set('e', new _vectorJs.Vector(1, 0, 0));
KEY_MAP.set('d', new _vectorJs.Vector(1, 0, 0));
class Camera {
    /* :: _position : Vector */ /* :: velocity : Vector */ /* :: rotation : { x: number, y: number } */ constructor(x, y, z){
        this._position = new _vectorJs.Vector(x, y, z);
        this.velocity = new _vectorJs.Vector(0, 0, 0);
        this.rotation = {
            x: 0,
            y: 0
        };
    }
    get position() {
        return [
            this._position.x,
            this._position.y,
            this._position.z
        ];
    }
    tick() {
        this._position = this._position.add(this.velocity.scale(0.2).rotateY(this.rotation.y));
    }
    handleMouseMove(event) {
        if (document.pointerLockElement) {
            this.rotation.y += event.movementX / 100;
            this.rotation.x += event.movementY / 100;
        }
    }
    handleKeyDown(event) {
        if (event.repeat) return;
        if (!document.pointerLockElement) return;
        const direction = KEY_MAP.get(event.key);
        if (direction) this.velocity = this.velocity.add(direction);
    }
    handleKeyUp(event) {
        if (!document.pointerLockElement) return;
        const direction = KEY_MAP.get(event.key);
        if (direction) this.velocity = this.velocity.subtract(direction);
    }
}
async function selectFragmentShader(shaderAnimation, select) {
    const selectedProgram = select.selectedOptions[0].value;
    window.location.hash = '#' + selectedProgram;
    const shaderResponse = await window.fetch(selectedProgram);
    const shaderSource = await shaderResponse.text();
    getShaderSourceTextArea().value = shaderSource;
    changeFragmentShader(shaderAnimation, shaderSource);
}
function changeFragmentShader(shaderAnimation, shaderSource) {
    const uniformContainer = getElementByIdTyped('uniforms', window.HTMLUListElement);
    const uniforms = extractUniforms(shaderSource);
    addUniformElements(uniformContainer, uniforms);
    shaderAnimation.updateFragmentShader(shaderSource, uniforms);
}
async function refetchCode(shaderAnimation) {
    await selectFragmentShader(shaderAnimation, getShaderSelectElement());
}
async function textareaUpdated(shaderAnimation) {
    console.log('Recompiling from textarea.');
    changeFragmentShader(shaderAnimation, getShaderSourceTextArea().value);
}
class ShaderAnimation {
    /* :: startTime: number */ /* :: lastTime: number */ /* :: frames: number */ /* :: canvas: HTMLCanvasElement */ /* :: gl: WebGLRenderingContext */ /* :: program: any */ /* :: uniforms: Array<string> */ /* :: camera: Camera */ constructor(canvas, camera){
        this.startTime = window.performance.now();
        this.lastTime = this.startTime;
        this.frames = 0;
        this.canvas = canvas;
        this.camera = camera;
        const gl = canvas.getContext('experimental-webgl');
        if (!(gl instanceof window.WebGLRenderingContext)) throw Error("Didn't get a WebGL context.");
        this.gl = gl;
        canvas.width = 800;
        canvas.height = 600;
        this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
        this.bindQuadFillingScreen();
        this.program = null;
        this.uniforms = [];
    }
    renderLoop() {
        window.requestAnimationFrame(()=>this.renderLoop()
        , this.canvas);
        if (this.program) {
            const time = (window.performance.now() - this.startTime) / 1000;
            this.render(time);
            if (this.frames >= 100) {
                // getFPSSpan().textContent = Math.round(this.frames / (time - this.lastTime)).toString()
                this.frames = 0;
                this.lastTime = time;
            }
            this.frames += 1;
        }
    }
    render(time) {
        const gl = this.gl;
        const program = this.program;
        const positionLocation = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        const timeLocation = gl.getUniformLocation(program, 'time');
        gl.uniform1f(timeLocation, time);
        const resolutionUniform = gl.getUniformLocation(program, 'resolution');
        gl.uniform2fv(resolutionUniform, [
            this.canvas.width,
            this.canvas.height
        ]);
        const cameraPositionLocation = gl.getUniformLocation(program, 'camera_position');
        gl.uniform3fv(cameraPositionLocation, this.camera.position);
        const cameraRotationLocation = gl.getUniformLocation(program, 'camera_rotation');
        gl.uniform2fv(cameraRotationLocation, [
            this.camera.rotation.x,
            this.camera.rotation.y
        ]);
        for (const uniform of this.uniforms){
            const uniformLocation = gl.getUniformLocation(program, uniform);
            const color = colorToVec(getInputElement(uniform).value);
            gl.uniform3fv(uniformLocation, color);
        }
        gl.clearColor(1, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    updateFragmentShader(shaderSource, uniforms) {
        const gl = this.gl;
        const vertexShader = this.compileShader(gl.VERTEX_SHADER, vertexShaderText);
        const fragmentShader = this.compileShader(gl.FRAGMENT_SHADER, shaderSource);
        this.uniforms = uniforms;
        const program = gl.createProgram();
        if (!program) throw Error('Failed to create program.');
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.validateProgram(program);
        const errorLog = getDivElement('errors');
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const info = gl.getProgramInfoLog(program);
            errorLog.textContent = info || 'missing program error log';
            return;
        }
        errorLog.textContent = '';
        gl.useProgram(program);
        this.program = program;
    }
    bindQuadFillingScreen() {
        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
            -1,
            -1,
            1,
            -1,
            -1,
            1,
            -1,
            1,
            1,
            -1,
            1,
            1
        ]), this.gl.STATIC_DRAW);
    }
    compileShader(shaderType, source) {
        const shader = this.gl.createShader(shaderType);
        if (!shader) throw Error('Failed to create shader');
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        return shader;
    }
}
function addUniformElements(uniformContainer, uniforms) {
    while(uniformContainer.lastChild)uniformContainer.removeChild(uniformContainer.lastChild);
    for (const uniform of uniforms){
        const element = uniformControlElement(uniform);
        uniformContainer.appendChild(element);
    }
}
function uniformControlElement(uniform) {
    const li = document.createElement('li');
    const label = document.createElement('label');
    label.textContent = uniform;
    const input = document.createElement('input');
    input.id = uniform;
    input.type = 'color';
    li.appendChild(label);
    li.appendChild(input);
    return li;
}
function handleCodeChange(shaderAnimation, filename) {
    if (filename.endsWith('.frag')) {
        const select = getShaderSelectElement();
        setSelectedOption(select, filename);
        selectFragmentShader(shaderAnimation, select);
    } else window.location.reload(true);
}
function isLocalhost(hostname) {
    return hostname === '0.0.0.0' || hostname === 'localhost' || hostname === '127.0.0.1';
}
function colorToVec(colorString) /* : [number, number, number] */ {
    const r = parseInt('0x' + colorString.substr(1, 2));
    const g = parseInt('0x' + colorString.substr(3, 2));
    const b = parseInt('0x' + colorString.substr(5, 2));
    return [
        r / 255,
        g / 255,
        b / 255
    ];
}
function extractUniforms(source) {
    const uniforms = [];
    for (const line of source.split('\n'))if (line.startsWith('uniform vec3')) {
        const uniformName = line.split(';')[0].split(' ')[2];
        if (uniformName.indexOf('COLOR') >= 0) uniforms.push(uniformName);
    }
    return uniforms;
}
function setSelectedOption(select, value) {
    for (const option of select.options)if (option.text === value) option.selected = true;
}
function getShaderSourceTextArea() /* HTMLTextAreaElement */ {
    return window.document.getElementById('shader_source');
}
function getShaderSelectElement() /* : HTMLSelectElement */ {
    return getElementByIdTyped('shader-selection', window.HTMLSelectElement);
}
function getFPSSpan() /* : HTMLSpanElement */ {
    return getElementByIdTyped('fps', window.HTMLSpanElement);
}
function getInputElement(id) /* : HTMLInputElement */ {
    return getElementByIdTyped(id, window.HTMLInputElement);
}
const vertexShaderText = `#version 100

attribute vec2 a_position;

void main() {
    gl_Position = vec4(a_position, 0, 1);
}
`;
function getDivElement(id) /* : HTMLDivElement */ {
    return getElementByIdTyped(id, window.HTMLDivElement);
}
function getElementByIdTyped(id, type) {
    const element = document.getElementById(id);
    if (!(element instanceof type)) throw Error('Unexpected HTMLElement ' + element);
    return element;
}

},{"./detect_changes_websocket.js":"1DRJY","./vector.js":"97lzA","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1DRJY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "connectWebsocket", ()=>connectWebsocket
);
function connectWebsocket(handleCodeChange) {
    const socket = new window.WebSocket('ws://localhost:5555/changes');
    socket.onopen = function(e) {
        console.log('[open] Websocket connection established');
    };
    socket.onmessage = function(event) {
        const filename = event.data;
        console.log('Got code change message for: ', filename);
        handleCodeChange(filename);
    };
    socket.onclose = function(event) {
        if (event.wasClean) console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        else // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
    };
    socket.onerror = function(error) {
        console.log(`[websocket error] ${error.message}`);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"97lzA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Vector", ()=>Vector
);
class Vector {
    /* :: x : number */ /* :: y : number */ /* :: z : number */ constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
    add(other) /* : Vector */ {
        return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
    }
    subtract(other) /* : Vector */ {
        return new Vector(this.x - other.x, this.y - other.y, this.z - other.z);
    }
    scale(factor) /* : Vector */ {
        return new Vector(factor * this.x, factor * this.y, factor * this.z);
    }
    rotateY(theta) /* : Vector */ {
        return new Vector(Math.cos(theta) * this.x - Math.sin(theta) * this.z, this.y, Math.sin(theta) * this.x + Math.cos(theta) * this.z);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["kQMTH","adjPd"], "adjPd", "parcelRequirec7d2")

//# sourceMappingURL=index.63aff760.js.map
