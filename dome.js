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
})({"lv26J":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "46ab4f245d15bae8";
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

},{}],"lQV7F":[function(require,module,exports) {
module.exports = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n  precision highp float;\n#else\n  precision mediump float;\n#endif\nprecision mediump int;\n#define GLSLIFY 1\n\nuniform vec2 resolution;\nuniform float time;\nuniform vec3 camera_position;\nuniform vec2 camera_rotation;\n\nconst int MAX_MARCHING_STEPS = 255;\nconst int MAX_REFLECTION_STEPS = 5;\nconst float PRECISION = 0.0001;\nconst float MIN_DIST = 0.0005;\nconst float MAX_DIST = 50.0;\n\nconst vec3 BACKGROUND_COLOR = vec3(0.1, 0.05, 0.02);\n\nconst vec3 AMBIENT_LIGHT =  1.0 * vec3(0.18, 0.18, 0.2);\n\nstruct Material {\n  vec3 color;\n  vec3 reflectance;\n  vec3 emitance;\n};\n\nstruct Surface {\n  float distance;\n  Material material;\n};\n\nstruct Ray {\n  vec3 origin;\n  vec3 direction;\n};\n\nstruct Light {\n  vec3 position;\n  vec3 color;\n};\n\nconst Light LIGHT1 = Light( vec3(1.2, 5.1, -0.5), vec3(1) );\nconst Light LIGHT2 = Light( vec3(-1.2, 3.8, -0.5), vec3(1) );\n\nfloat difference_sdf(float a, float b) {\n  return max(a, -b);\n}\n\nfloat intersection_sdf(float a, float b) {\n    return max(a, b);\n}\n\nfloat union_sdf(float a, float b) {\n    return min(a, b);\n}\n\nfloat smin_sdf(float a, float b)\n{\n  float k = 32.0;\n  float res = exp(-k*a) + exp(-k*b);\n  return -log(max(0.0001,res)) / k;\n}\n\nfloat sd_sphere(vec3 p, float r, vec3 offset)\n{\n  return length(p - offset) - r;\n}\n\nfloat sd_cube(vec3 p, float b, vec3 offset) {\n  p = p - offset;\n  vec3 q = abs(p) - b;\n  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)), 0.0);\n}\n\nfloat sd_cuboid(vec3 p, vec3 b, vec3 offset) {\n  p = p - offset;\n  vec3 q = abs(p) - b;\n  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)), 0.0);\n}\n\nfloat sd_cylinder(vec3 p, float r, float h, vec3 offset) {\n  return max(length(p.xz - offset.xz) - r, sd_cuboid(p, vec3(r, h, r), offset));\n}\n\nfloat point_distance(vec2 p0, vec2 p1, vec2 p2) {\n  float a = (p2.x - p1.x) * (p1.y - p0.y) - (p1.x - p0.x) * (p2.y - p1.y);\n  float b = length(p2 - p1);\n  return a / b;\n}\n\nfloat sd_cone(vec3 p, float r, float h, vec3 offset) {\n  float cube = sd_cuboid(p, vec3(r, h / 2.0, r), offset + vec3(0., h/2., 0.));\n  p = p - offset;\n  float x = length(p.xz);\n\n  float cone = point_distance(vec2(x, p.y), vec2(r, 0.), vec2(0., h));\n  return intersection_sdf(cone, cube);\n}\n\nfloat sd_pawn(vec3 p, float r, vec3 offset) {\n  float a = sd_cone(p, 0.2, 1.1, offset);\n  float b = sd_sphere(p, 0.15, offset + vec3(0., 0.78, 0.));\n  return smin_sdf(a, b);\n}\n\nfloat sd_mirror(vec3 p, vec3 offset) {\n  return difference_sdf(\n    sd_cube(p, 1., offset),\n    sd_sphere(p, 1.15, offset + vec3(0., 0., 1.7))\n  );\n}\n\nfloat sd_dome(vec3 p) {\n  return -sd_sphere(p, 5., vec3(0));\n\n}\n\nSurface min_surface(Surface a, Surface b) {\n  if (a.distance < b.distance) {\n     return a;\n  }\n  return b;\n}\n\nSurface max_surface(Surface a, Surface b) {\n  if (a.distance > b.distance) {\n     return a;\n  }\n  return b;\n}\n\nfloat floor_height(vec3 p) {\n  return 0.0;\n}\n\nSurface sd_floor(vec3 p, vec3 color) {\n  float tile = mod(floor(p.x) + floor(p.z), 2.0);\n  vec3 reflectance = vec3(0.);\n  return Surface(p.y - floor_height(p), Material((0.5 + 0.5 * tile) * color, tile * vec3(0.1), vec3(0)));\n}\n\nvec3 on_floor(vec3 p) {\n  return vec3(p.x, floor_height(p) + p.y, p.z);\n}\n\nSurface sd_scene(vec3 p) {\n  Surface cube = Surface(\n      sd_cube(p, 1.0, vec3(2.0, 1.0, -2.0)),\n      Material(vec3(1.,0.2,0.2), vec3(0.0), vec3(0)));\n\n  Surface white_cube = Surface(\n      sd_cube(p, 1.0, vec3(2.0, 1.0, 0.0)),\n      Material(vec3(1,1.,1), vec3(0), vec3(0)));\n  \n  Surface cylinder = Surface(\n      sd_cylinder(p, 0.4, 0.7, vec3(-2.0, 0.7, -2.0)),\n      Material(vec3(0,1.,0), vec3(0.2), vec3(0)));\n\n  Surface cone = Surface(\n      sd_cone(p, 0.5, 0.8, vec3(-1., 0.0, -1.)),\n      Material(vec3(0.9,0.3,0.9), vec3(0.1), vec3(0)));\n\n  Surface floor = sd_floor(p, vec3(0.5));\n\n  Surface mirror = Surface(\n      sd_mirror(p, vec3(0.0,1.0, -3.)),\n      Material(vec3(0.,0.,0.), vec3(0.8), vec3(0)));\n\n  Surface light1 = Surface(\n      sd_sphere(p, 0.05, LIGHT1.position),\n      Material(vec3(0), vec3(0.), LIGHT1.color));\n\n  Surface light2 = Surface(\n      sd_sphere(p, 0.05, LIGHT2.position),\n      Material(vec3(0), vec3(0.), LIGHT2.color));\n\n  Surface dome = Surface(\n      sd_dome(p),\n      Material(vec3(0), 1.-step(mod(p.y, 1.), 0.04) * vec3(0.6), vec3(0))\n  );\n  Surface scene;\n\n  scene = min_surface(floor, cube);\n  scene = min_surface(white_cube, scene);\n  scene = min_surface(dome, scene);\n  scene = min_surface(light1, scene);\n  scene = min_surface(light2, scene);\n  scene = min_surface(cylinder, scene);\n  scene = min_surface(cone, scene);\n  scene = min_surface(mirror, scene);\n  return scene;\n}\n\nSurface ray_march(Ray ray, float start, float end) {\n  float depth = start;\n  Surface closest_object;\n\n  for (int i = 0; i < MAX_MARCHING_STEPS; i++) {\n    vec3 point = ray.origin + depth * ray.direction;\n    closest_object = sd_scene(point);\n    depth += closest_object.distance;\n    if (closest_object.distance < PRECISION || depth > end) break;\n  }\n  \n  closest_object.distance = depth;\n  return closest_object;\n}\n\nvec3 calc_normal(vec3 p)\n{\n  float d = sd_scene(p).distance; //very close to 0\n \n  vec2 e = vec2(.01, 0.0);\n \n  vec3 n = vec3\n  (\n       d - sd_scene(p - e.xyy).distance,\n       d - sd_scene(p - e.yxy).distance,\n       d - sd_scene(p - e.yyx).distance\n  );\n \n  return normalize(n);\n}\n\nvec3 specular(Ray ray, vec3 normal, vec3 light_direction, vec3 color) {\n    float specular_strength = 0.3;\n    vec3 specular_color = vec3(1., 1., 1.);\n    vec3 reflect_dir = reflect(-light_direction, normal);\n    float spec = pow(max(dot(-ray.direction, reflect_dir), 0.0), 87.);\n    return specular_strength * spec * color;\n}\n\nvec3 compute_light(vec3 light_direction, vec3 point) {\n  Surface source = ray_march(Ray(point, light_direction), MIN_DIST, MAX_DIST);\n  if (source.distance > MAX_DIST) {\n    return vec3(1);\n  } else {\n    return source.material.emitance;\n  }\n}\n\nvec3 rotateY(vec3 point, float theta) {\n  return (mat4(cos(theta), 0, -sin(theta), 0,\n            0, 1, 0, 0,\n            sin(theta), 0, cos(theta), 0,\n            0, 0, 0, 1) * vec4(point, 1.0)).xyz;\n}\n\nvec3 rotateX(vec3 point, float theta) {\n  return (mat4(\n            1, 0, 0, 0,\n            0, cos(theta), -sin(theta), 0,\n            0, sin(theta), cos(theta), 0,\n            0, 0, 0, 1) * vec4(point, 1.0)).xyz;\n}\n\nvec3 pixel_color(vec2 uv) {\n  vec3 color = vec3(0);\n  Ray camera = Ray(camera_position, rotateY(rotateX(normalize(vec3(uv, -1)), camera_rotation.x), -camera_rotation.y));\n\n  Ray ray = camera;\n  Surface obj;\n  vec3 attentuation = vec3(1.0);\n\n  for(int i=0; i<MAX_REFLECTION_STEPS; i++) {\n    obj = ray_march(ray, MIN_DIST, MAX_DIST);\n\n    if (obj.distance > MAX_DIST) {\n      // ray didn't hit anything\n      color += attentuation * BACKGROUND_COLOR;\n      break;\n    } else {\n      vec3 point = ray.origin + ray.direction * obj.distance;\n      vec3 normal = calc_normal(point);\n\n      vec3 light = vec3(0);\n      vec3 spec;\n      vec3 diffuse;\n\n      vec3 light_direction;\n\n      light_direction = normalize(LIGHT1.position - point);\n      light = compute_light(light_direction, point);\n      spec += light * specular(ray, normal, light_direction, LIGHT1.color);\n      diffuse += LIGHT1.color * light * clamp(dot(normal, light_direction), 0.0, 1.);\n\n      light_direction = normalize(LIGHT2.position - point);\n      light = compute_light(light_direction, point);\n      spec += light * specular(ray, normal, light_direction, LIGHT2.color);\n      diffuse += LIGHT2.color * light * clamp(dot(normal, light_direction), 0.0, 1.);\n\n      vec3 albedo = (diffuse + AMBIENT_LIGHT) * obj.material.color + spec;\n\n      color += attentuation * max(albedo, obj.material.emitance);\n\n      ray = Ray(point, reflect(ray.direction, normal));\n      attentuation *= obj.material.reflectance;\n    }\n  }\n  return color;\n}\n\nvec2 get_uv(vec4 fragCoord) {\n  return (fragCoord.xy - 0.5 * resolution.xy) / resolution.y;\n}\n\nvec3 gamma_correction(vec3 color, float gamma) {\n  return pow(color, vec3(1./gamma));\n}\n\nvoid main() {\n  vec3 color = pixel_color(get_uv(gl_FragCoord));\n  gl_FragColor = vec4(gamma_correction(color, 0.8), 1);\n}\n";

},{}]},["lv26J","lQV7F"], "lQV7F", "parcelRequirec7d2")

//# sourceMappingURL=dome.js.map
