// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"jquery.js":[function(require,module,exports) {
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// window.$ = window.jQuery 是为了添加别名
window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
    var elements = void 0;
    if (typeof selectorOrArrayOrTemplate === "string") {
        if (selectorOrArrayOrTemplate[0] === "<") {
            // 说明是标签
            // 创建 div
            elements = [createElement(selectorOrArrayOrTemplate)];
        } else {
            // 说明是选择器
            // 查找 div
            elements = document.querySelectorAll(selectorOrArrayOrTemplate);
        }
    } else if (selectorOrArrayOrTemplate instanceof Array) {
        elements = selectorOrArrayOrTemplate;
    }

    function createElement(string) {
        var container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    }
    // api 可以操作 elements
    var api = Object.create(jQuery.prototype);
    // 创建一个对象，这个对象的 __proto__ 为jQuery.prototype
    // 相当于写成 const api = {__proto__:jQuery.prototype}
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArrayOrTemplate.oldApi
    });
    // Object.assign... 相当于写成下面的代码
    // api.elements = elements
    // api.oldApi = selectorOrArrayOrTemplate.oldApi
    return api;
};

jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    jQuery: true,
    get: function get(index) {
        return this.elements[index];
    },
    appendTo: function appendTo(node) {
        // appendTo() 把新增的元素放到另一个元素里
        if (node instanceof Element) {
            this.each(function (el) {
                return node.appendChild(el);
            });
            // 遍历 elements，对每个 el 进行 node.appendChild 操作
        } else if (node.jQuery === true) {
            this.each(function (el) {
                return node.get(0).appendChild(el);
            });
            // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
        }
    },
    append: function append(children) {
        var _this = this;

        //在每个匹配元素里面的末尾处插入参数内容
        if (children instanceof Element) {
            this.get(0).appendChild(children);
        } else if (children instanceof HTMLCollection) {
            for (var i = 0; i < children.length; i++) {
                this.get(0).appendChild(children[i]);
            }
        } else if (children.jQuery === true) {
            children.each(function (node) {
                return _this.get(0).appendChild(node);
            });
        }
    },
    find: function find(selector) {
        var array = [];
        for (var i = 0; i < this.elements.length; i++) {
            var elements2 = Array.from(this.elements[i].querySelectorAll(selector));
            array = array.concat(this.elements2);
        }
        array.oldApi = this; // 这里的 this 是 旧api
        return jQuery(array);
    },
    each: function each(fn) {
        for (var i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i);
        }
        return this;
    },
    parent: function parent() {
        var array = [];
        this.each(function (node) {
            if (array.indexOf(node.parentNode) === -1) {
                array.push(node.parentNode);
            }
        });
        return jQuery(array);
    },
    children: function children() {
        var array = [];
        this.each(function (node) {
            array.push.apply(array, _toConsumableArray(node.children));
        });
        return jQuery(array);
    },
    print: function print() {
        console.log(this.elements);
    },

    // 闭包：函数访问外部变量
    addClass: function addClass(className) {
        for (var i = 0; i < this.elements.length; i++) {
            var element = this.elements[i];
            element.classList.add(className);
        }
        return this;
    },
    end: function end() {
        return this.oldApi; // 这里的 this 是 新api
    }
};
},{}],"../../../../.config/yarn/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '63888' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../.config/yarn/global/node_modules/parcel/src/builtins/hmr-runtime.js","jquery.js"], null)
//# sourceMappingURL=/jquery.07d15279.map