(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("Components/Flicker.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _flickity = _interopRequireDefault(require("flickity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Flicker = function Flicker() {
  return {
    oncreate: function oncreate(_ref) {
      var dom = _ref.dom;
      return new _flickity["default"](dom, {
        freeScroll: true,
        contain: true,
        wrapAround: true
      });
    },
    view: function view(_ref2) {
      var _ref2$attrs = _ref2.attrs,
          mdl = _ref2$attrs.mdl,
          data = _ref2$attrs.data;
      return m(".main-carousel", [data.map(function (src) {
        return m(".carousel-cell", m("img", {
          src: src
        }));
      })]);
    }
  };
};

var _default = Flicker;
exports["default"] = _default;
});

;require.register("Components/Hamburger.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("@mithril-icons/clarity/cjs/index");

var Hamburger = function Hamburger() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return mdl.state.isAuth() ? m("span", [m("span", "Welcome ".concat(mdl.user.name.split(" ")[0])), m(_index.BarsLine)]) : m(_index.BarsLine);
    }
  };
};

var _default = Hamburger;
exports["default"] = _default;
});

;require.register("Components/Logo.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LogoSVG = m("svg[version='1.0'][xmlns='http://www.w3.org/2000/svg'][width='34.000000pt'][height='34.000000pt'][viewBox='0 0 220.000000 220.000000'][preserveAspectRatio='xMidYMid meet']", [m("metadata", " Created by potrace 1.11, written by Peter Selinger 2001-2013 "), m("g[transform='translate(0.000000,220.000000) scale(0.100000,-0.100000)'][fill='$color5'][stroke='none']", m("path[d='M736 2120 c-214 -68 -333 -297 -267 -511 37 -116 119 -207 238 -261 70 -33 236 -33 306 0 123 56 209 154 242 276 20 75 13 73 118 31 92 -37 164 -84 253 -169 46 -43 84 -82 84 -86 0 -4 -25 -10 -55 -13 -172 -18 -307 -159 -322 -337 l-6 -70 -32 0 c-53 0 -183 -38 -261 -75 -78 -38 -245 -158 -303 -219 l-35 -36 -32 46 c-39 55 -52 89 -62 169 -6 55 -9 60 -32 60 -20 0 -26 -6 -28 -30 -2 -16 1 -55 8 -85 29 -134 126 -248 273 -320 69 -34 97 -42 178 -50 148 -15 259 9 366 79 81 53 110 86 93 106 -18 22 -26 19 -74 -20 -57 -46 -160 -93 -232 -106 -113 -18 -268 12 -357 72 -26 17 -47 34 -47 38 0 14 113 115 180 163 123 86 281 148 380 148 34 0 38 -3 60 -50 31 -66 98 -132 168 -167 71 -35 182 -43 261 -20 59 17 57 23 20 -76 -50 -134 -186 -301 -310 -380 -78 -50 -210 -102 -295 -117 -112 -20 -301 -9 -399 23 -123 40 -227 107 -325 206 -115 117 -174 220 -217 382 -26 98 -24 292 5 391 27 95 62 174 102 233 34 50 36 78 5 83 -15 2 -30 -13 -58 -57 -161 -251 -177 -575 -42 -846 91 -184 212 -306 390 -395 133 -66 236 -90 390 -90 235 0 430 78 599 239 118 114 183 219 232 376 20 67 37 100 65 132 162 179 110 457 -106 564 -35 17 -72 43 -81 58 -89 136 -278 275 -446 327 -41 13 -58 23 -58 35 0 39 -41 146 -76 196 -97 141 -292 206 -458 153z m267 -68 c65 -29 141 -104 174 -171 25 -49 28 -68 28 -151 0 -77 -4 -104 -22 -142 -30 -66 -105 -143 -172 -175 -49 -25 -68 -28 -151 -28 -83 0 -102 3 -151 28 -67 32 -142 109 -172 175 -31 67 -31 216 0 284 40 86 115 155 206 189 68 26 191 21 260 -9z m788 -737 c101 -36 165 -107 195 -214 32 -116 -10 -236 -109 -310 -65 -48 -104 -61 -182 -61 -120 0 -219 60 -270 164 -82 167 -3 359 172 422 51 18 141 17 194 -1z']"))]);

var Logo = function Logo() {
  return {
    view: function view(_ref) {
      var attrs = _ref.attrs;
      return m(".logo", _objectSpread({}, attrs), m(".frow row-center", [m("h1.title.logo-text", {
        id: "logo-sette"
      }, "SETTE"), m("icon.icon", {
        id: "logo-svg"
      }, LogoSVG), m("h1.title.logo-text", {
        id: "logo-bambini"
      }, "BAMBINI")]));
    }
  };
};

var _default = Logo;
exports["default"] = _default;
});

;require.register("Components/LogoLoader.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Logo = _interopRequireDefault(require("./Logo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LogoLoader = function LogoLoader() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".logoLoader", m(".heartbeat", m(_Logo["default"])));
    }
  };
};

var _default = LogoLoader;
exports["default"] = _default;
});

;require.register("Components/Masonry/brick.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Brick = function Brick() {
  var _dom = null;
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          classList = _ref$attrs.classList,
          data = _ref$attrs.data,
          parent = _ref$attrs.parent,
          redraw = _ref$attrs.redraw;
      return m(".brick", {
        "class": classList
      }, m(".content", [data.title && m("h3.title", data.title), m(".description", [m("img", {
        onload: function onload(x) {// console.log("brick image onload", x, _dom)
          // m.redraw()
        },
        oncreate: function oncreate(_ref2) {
          var dom = _ref2.dom;
          _dom = dom; // console.log("brick image oncreate", dom)
          // console.log("brick image oncreate and complete", parent, dom)

          if (parent) {
            redraw(parent)(dom);
          }
        },
        src: "https://via.placeholder.com/".concat(data.imgSrc)
      }), m("p", data.description)])]));
    }
  };
};

var _default = Brick;
exports["default"] = _default;
});

;require.register("Components/Masonry/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _brick = _interopRequireDefault(require("./brick"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resizeGridItem = function resizeGridItem(dom) {
  return function (item) {
    var grid = dom;
    var rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-auto-rows"));
    var rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-row-gap"));
    var rowSpan = Math.ceil((item.querySelector(".content").getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
    return item.style.gridRowEnd = "span " + rowSpan;
  };
};

var onResize = function onResize(dom) {
  return Array.from(dom.children).map(resizeGridItem(dom));
};

var resizeAllGridItems = function resizeAllGridItems(dom) {
  window.addEventListener("resize", function (x) {
    return onResize(dom);
  });
  return onResize(dom);
};

var Masonry = function Masonry() {
  var _dom = null;
  return {
    oncreate: function oncreate(_ref) {
      var dom = _ref.dom;
      _dom = dom;
      resizeAllGridItems(dom);
    },
    view: function view(_ref2) {
      var data = _ref2.attrs.data;
      return m(".grid", data.map(function (brick) {
        return m(_brick["default"], {
          classList: "item",
          data: brick,
          parent: _dom,
          redraw: resizeGridItem
        });
      }));
    }
  };
};

var _default = Masonry;
exports["default"] = _default;
});

;require.register("Components/Modal.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _animations = require("Styles/animations");

var Modal = {
  oncreate: _animations.SlideInLeft,
  onbeforeremove: _animations.SlideOutRight,
  view: function view(_ref) {
    var _ref$attrs = _ref.attrs,
        classList = _ref$attrs.classList,
        isActive = _ref$attrs.isActive,
        close = _ref$attrs.close,
        title = _ref$attrs.title,
        content = _ref$attrs.content,
        footer = _ref$attrs.footer;
    console.log("MODAL", classList, isActive, close, title, content, footer);
    return m("section.modal.".concat(classList), {
      "class": isActive ? "active" : "",
      id: "modal"
    }, [m("a.modal-overlay", {
      "aria-label": "Close",
      onclick: function onclick() {
        return close();
      }
    }), m(".modal-container", {
      role: "document"
    }, [m(".modal-header", [m("a.btn btn-clear float-right", {
      id: "modal-close",
      "aria-label": "Close",
      onclick: function onclick() {
        return close();
      }
    }), m(".modal-title h3", title)]), m(".modal-body", m(".content", content)), m(".modal-footer", footer)])]);
  }
};
var _default = Modal;
exports["default"] = _default;
});

;require.register("Components/Selector.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _storage = require("Utils/storage");

var Selector = function Selector() {
  var state = {};

  var ResetState = function ResetState() {
    state.quantity = null;
    state.gender = "Select a Gender";
  };

  var saveToStorage = function saveToStorage(mdl) {
    var onError = function onError(e) {
      return console.log("Error saving", e);
    };

    var onSuccess = function onSuccess(s) {
      ResetState();
    };

    (0, _storage.saveStorageTask)(mdl)("sb-cart")(mdl.cart).fork(onError, onSuccess);
  };

  var addToCart = function addToCart(mdl) {
    return function (product) {
      return function (state) {
        mdl.cart[product][state.gender] += parseInt(state.quantity);
        saveToStorage(mdl);
      };
    };
  };

  return {
    oninit: function oninit() {
      return ResetState();
    },
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          product = _ref$attrs.product;
      return m(".frow", m(".frow content-center gutters row-between pt-20", [m(".col-sm-1-4", m("h2.pb-10", "".concat(mdl.state.currency(), " ").concat(mdl.state.prices[product]))), m(".col-sm-1-4", m("label", m("input", {
        type: "number",
        inputmode: "numeric",
        placeholder: "quantity",
        value: state.quantity,
        onchange: function onchange(e) {
          return state.quantity = e.target.value;
        },
        pattern: "[0-9]*"
      }))), m(".col-sm-1-4", m("label", m("select", {
        value: state.gender,
        onchange: function onchange(e) {
          return state.gender = e.target.value;
        }
      }, [m("option", {
        value: null
      }, "Select a Gender"), m("option", {
        value: "Male"
      }, "Male"), m("option", {
        value: "Female"
      }, "Female"), m("option", {
        value: "Unisex"
      }, "Unisex")]))), m(".col-sm-1-4", m("button", {
        disabled: state.quantity == undefined || state.gender == "Select a Gender",
        onclick: function onclick() {
          return addToCart(mdl)(product)(state);
        }
      }, "Add To Bag"))]));
    }
  };
};

var _default = Selector;
exports["default"] = _default;
});

;require.register("Components/ShoppingBag.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("@mithril-icons/clarity/cjs/index");

var ShoppingBag = function ShoppingBag() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(_index.ShoppingBagLine, {
        onclick: function onclick() {
          return mdl.state.showCartModal(true);
        }
      });
    }
  };
};

var _default = ShoppingBag;
exports["default"] = _default;
});

;require.register("Components/Single_Carousel.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("@mithril-icons/clarity/cjs/index");

var show = function show(dir, idx, cid) {
  var slideNum;

  if (dir == "prev") {
    slideNum = idx == 0 ? 3 : idx - 1;
  }

  if (dir == "next") {
    slideNum = idx == 3 ? 0 : idx + 1;
  }

  console.log(dir, idx, "".concat(cid, "-slide-").concat(slideNum));
  return "".concat(cid, "-slide-").concat(slideNum);
};

var Carousel = function Carousel() {
  return {
    onupdate: function onupdate(o, n) {
      return console.log(o, n);
    },
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          cid = _ref$attrs.cid,
          data = _ref$attrs.data;
      return m(".carousel", {
        role: "document"
      }, [data.map(function (item, idx) {
        return m("input.carousel-locator", {
          id: "".concat(cid, "-slide-").concat(idx),
          type: "radio",
          name: "carousel-radio",
          hidden: true,
          checked: true
        });
      }), m(".carousel-container", data.map(function (item, idx) {
        return m("figure.carousel-item", [m("label.item-next btn btn-action btn-lg", {
          "for": show("next", idx, cid)
        }, [m("i.icon icon-arrow-right", m(".point-right", m(_index.ArrowLine)))]), m("img.img-responsive rounded", {
          src: item
        }), m("label.item-prev btn btn-action btn-lg", {
          "for": show("prev", idx, cid)
        }, [m("i.icon icon-arrow-left", m(".point-left", m(_index.ArrowLine)))])]);
      })), m(".carousel-nav", data.map(function (item, idx) {
        return m("label.nav-item text-hide c-hand", {
          "for": "".concat(cid, "-slide-").concat(idx)
        });
      }))]);
    }
  };
};

var _default = Carousel;
exports["default"] = _default;
});

;require.register("Components/icons/Logo.js", function(exports, require, module) {
"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var mithril_1 = __importDefault(require("mithril"));

var Logo = {
  view: function view(_a) {
    var attrs = _a.attrs;
    return mithril_1["default"]("svg", __assign({
      version: 1.1,
      width: 36,
      height: 36,
      viewBox: "0 0 36 36",
      preserveAspectRatio: "xMidYMid meet",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }, attrs), mithril_1["default"]("title", {}, "logo"), mithril_1["default"]("path", {
      d: "M736 2120 c-214 -68 -333 -297 -267 -511 37 -116 119 -207 238 -261 70 -33 236 -33 306 0 123 56 209 154 242 276 20 75 13 73 118 31 92 -37 164 -84 253 -169 46 -43 84 -82 84 -86 0 -4 -25 -10 -55 -13 -172 -18 -307 -159 -322 -337 l-6 -70 -32 0 c-53 0 -183 -38 -261 -75 -78 -38 -245 -158 -303 -219 l-35 -36 -32 46 c-39 55 -52 89 -62 169 -6 55 -9 60 -32 60 -20 0 -26 -6 -28 -30 -2 -16 1 -55 8 -85 29 -134 126 -248 273 -320 69 -34 97 -42 178 -50 148 -15 259 9 366 79 81 53 110 86 93 106 -18 22 -26 19 -74 -20 -57 -46 -160 -93 -232 -106 -113 -18 -268 12 -357 72 -26 17 -47 34 -47 38 0 14 113 115 180 163 123 86 281 148 380 148 34 0 38 -3 60 -50 31 -66 98 -132 168 -167 71 -35 182 -43 261 -20 59 17 57 23 20 -76 -50 -134 -186 -301 -310 -380 -78 -50 -210 -102 -295 -117 -112 -20 -301 -9 -399 23 -123 40 -227 107 -325 206 -115 117 -174 220 -217 382 -26 98 -24 292 5 391 27 95 62 174 102 233 34 50 36 78 5 83 -15 2 -30 -13 -58 -57 -161 -251 -177 -575 -42 -846 91 -184 212 -306 390 -395 133 -66 236 -90 390 -90 235 0 430 78 599 239 118 114 183 219 232 376 20 67 37 100 65 132 162 179 110 457 -106 564 -35 17 -72 43 -81 58 -89 136 -278 275 -446 327 -41 13 -58 23 -58 35 0 39 -41 146 -76 196 -97 141 -292 206 -458 153z m267 -68 c65 -29 141 -104 174 -171 25 -49 28 -68 28 -151 0 -77 -4 -104 -22 -142 -30 -66 -105 -143 -172 -175 -49 -25 -68 -28 -151 -28 -83 0 -102 3 -151 28 -67 32 -142 109 -172 175 -31 67 -31 216 0 284 40 86 115 155 206 189 68 26 191 21 260 -9z m788 -737 c101 -36 165 -107 195 -214 32 -116 -10 -236 -109 -310 -65 -48 -104 -61 -182 -61 -120 0 -219 60 -270 164 -82 167 -3 359 172 422 51 18 141 17 194 -1z"
    }), mithril_1["default"]("path", {
      d: "M25,15.5H11a1,1,0,0,0,0,2H25a1,1,0,0,0,0-2Z",
      "class": "clr-i-outline clr-i-outline-path-2"
    }), mithril_1["default"]("path", {
      d: "M21.75,20.5h-7.5a1,1,0,0,0,0,2h7.5a1,1,0,0,0,0-2Z",
      "class": "clr-i-outline clr-i-outline-path-3"
    }), mithril_1["default"]("path", {
      d: "M11.28,12.5H24.72a1,1,0,0,0,0-2H11.28a1,1,0,0,0,0,2Z",
      "class": "clr-i-outline clr-i-outline-path-4"
    }), mithril_1["default"]("rect", {
      x: 0,
      y: 0,
      width: 36,
      height: 36,
      "fill-opacity": 0
    }));
  }
};
exports["default"] = Logo;
});

;require.register("Components/nav-link.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.NavLink = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// const touchEnd = (state) => {
//   state.onHover(true)
//   // console.log("end")
// }
// const touchStart = (state) => {
//   state.onHover(false)
//   // console.log("start")
// }
var NavLink = function NavLink() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          href = _ref$attrs.href,
          link = _ref$attrs.link,
          classList = _ref$attrs.classList,
          rest = _objectWithoutProperties(_ref$attrs, ["mdl", "href", "link", "classList"]);

      return m(m.route.Link, _objectSpread({
        // ontouchstart: (e) => touchStart(),
        // onmousedown: (e) => touchStart(state),
        // ontouchend: (e) => touchEnd(),
        // onmouseup: (e) => touchEnd(state),
        href: href,
        "class": "nav-link ".concat(classList, " ").concat(mdl.state.navSelected() == link && "shadow")
      }, rest), link);
    }
  };
};

exports.NavLink = NavLink;
var _default = NavLink;
exports["default"] = _default;
});

;require.register("FP/all.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.All = void 0;

var All = function All(x) {
  return {
    val: x,
    concat: function concat(_ref) {
      var val = _ref.val;
      return All(x && val);
    }
  };
};

exports.All = All;
All.empty = All(true);
});

;require.register("FP/any.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Any = void 0;

var Any = function Any(x) {
  return {
    val: x,
    concat: function concat(_ref) {
      var val = _ref.val;
      return Any(x || val);
    }
  };
};

exports.Any = Any;
Any.empty = Any(false);
});

;require.register("FP/array.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayFP = void 0;

var _util = require("./util");

var _flatten = function _flatten(xs) {
  return xs.reduce(function (a, b) {
    return a.concat(b);
  }, []);
};

var configure = function configure(_) {
  var _fmap = function _fmap(f) {
    var xs = this;
    return xs.map(function (x) {
      return f(x);
    }); //avoid index
  };

  Object.defineProperty(Array.prototype, "fmap", (0, _util.value)(_fmap));

  var _empty = function _empty(_) {
    return [];
  };

  Object.defineProperty(Array.prototype, "empty", (0, _util.value)(_empty));

  var _chain = function _chain(f) {
    return _flatten(this.fmap(f));
  };

  Object.defineProperty(Array.prototype, "chain", (0, _util.value)(_chain));

  var _of = function _of(x) {
    return [x];
  };

  Object.defineProperty(Array.prototype, "of", (0, _util.value)(_of));

  var _ap = function _ap(a2) {
    return _flatten(this.map(function (f) {
      return a2.map(function (a) {
        return f(a);
      });
    }));
  };

  Object.defineProperty(Array.prototype, "ap", (0, _util.value)(_ap));

  var _traverse = function _traverse(f, point) {
    var cons_f = function cons_f(ys, x) {
      return f(x).map(function (x) {
        return function (y) {
          return y.concat(x);
        };
      }).ap(ys);
    };

    return this.reduce(cons_f, point([]));
  };

  Object.defineProperty(Array.prototype, "traverse", (0, _util.value)(_traverse));

  var _any = function _any() {
    return this.length > 0;
  };

  Object.defineProperty(Array.prototype, "any", (0, _util.value)(_any));

  var _last = function _last() {
    return this[this.length - 1];
  };

  Object.defineProperty(Array.prototype, "last", (0, _util.value)(_last));

  var _in = function _in(comparer) {
    for (var i = 0; i < this.length; i++) {
      if (comparer(this[i])) return true;
    }

    return false;
  };

  Object.defineProperty(Array.prototype, "in", (0, _util.value)(_in));

  var _pushIfNotExist = function _pushIfNotExist(element, comparer) {
    if (!this["in"](comparer)) {
      this.push(element);
    }
  };

  Object.defineProperty(Array.prototype, "pushIfNotExist", (0, _util.value)(_pushIfNotExist));

  var _foldM = function _foldM(point, f) {
    var _this = this;

    var go = function go(a) {
      return !_this.any() ? point(a) : f(a, _this.shift()).chain(go);
    };

    return go;
  };

  Object.defineProperty(Array.prototype, "foldM", (0, _util.value)(_foldM));
};

var ArrayFP = {
  configure: configure
};
exports.ArrayFP = ArrayFP;
});

;require.register("FP/coyoneda.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Coyoneda = void 0;

var _daggy = require("daggy");

var _ramda = require("ramda");

var Coyoneda = (0, _daggy.tagged)('x', 'f');
exports.Coyoneda = Coyoneda;

Coyoneda.prototype.map = function (f) {
  return Coyoneda(this.x, (0, _ramda.compose)(f, this.f));
};

Coyoneda.prototype.lower = function () {
  return this.x.map(this.f);
};

Coyoneda.lift = function (x) {
  return Coyoneda(x, _ramda.identity);
};
});

;require.register("FP/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  FP: true,
  Coyoneda: true
};
Object.defineProperty(exports, "Coyoneda", {
  enumerable: true,
  get: function get() {
    return _coyoneda.Coyoneda;
  }
});
exports.FP = void 0;

var _all = require("./all");

Object.keys(_all).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _all[key];
    }
  });
});

var _any = require("./any");

Object.keys(_any).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _any[key];
    }
  });
});

var _tuple = require("./tuple.js");

Object.keys(_tuple).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tuple[key];
    }
  });
});

var _coyoneda = require("./coyoneda");

var _pointfree = require("./pointfree");

Object.keys(_pointfree).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _pointfree[key];
    }
  });
});

var _sum = require("./sum.js");

Object.keys(_sum).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sum[key];
    }
  });
});

var _list = require("./list");

Object.keys(_list).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _list[key];
    }
  });
});

var _intersection = require("./intersection.js");

Object.keys(_intersection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _intersection[key];
    }
  });
});

var _array = require("./array");

var _task = require("./task");

var _maybe = require("./maybe");

var _validation = require("./validation");

var configure = function configure() {
  _array.ArrayFP.configure();

  _task.Task.configure();

  _maybe.Maybe.configure();

  _validation.Validation.configure();
};

var FP = {
  configure: configure
};
exports.FP = FP;
});

;require.register("FP/intersection.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Intersection = void 0;

// Intersection Semigroup.
//
// The intersection (based on value equality) of two lists
// Intersection :: (Eq m) <= m -> Intersection m
var Intersection = function Intersection(xs) {
  return {
    xs: xs,
    concat: function concat(_ref) {
      var ys = _ref.xs;
      return Intersection(xs.filter(function (x) {
        return ys.some(function (y) {
          return y.equals(x);
        });
      }));
    },
    inspect: "Intersection(".concat(xs, ")")
  };
};

exports.Intersection = Intersection;
});

;require.register("FP/list.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = void 0;

var _data = require("data.maybe");

var _ramda = require("ramda");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Nil = function Nil() {
  _classCallCheck(this, Nil);

  this.head = undefined;
  this.tail = undefined;
  this.isNil = true;
  this.isCons = false;
};

var Cons = function Cons(x, xs) {
  _classCallCheck(this, Cons);

  this.head = x;
  this.tail = xs;
  this.isNil = false;
  this.isCons = true;
}; //curry :: (a -> b -> c) -> a -> b -> c


var curry = function curry(f) {
  return function (x) {
    return function (y) {
      return f(x, y);
    };
  };
}; //uncurry :: (a -> b -> c) -> (a, b) -> c


var uncurry = function uncurry(f) {
  return function (x, y) {
    return f(x)(y);
  };
}; //o :: ((b -> c), (a -> b)) -> a -> c


var o = function o(f, g) {
  return function (x) {
    return f(g(x));
  };
}; //id :: a -> a


var id = function id(x) {
  return x;
}; //flip :: (a -> b -> c) -> (b, a) -> c


var flip = function flip(f) {
  return function (x, y) {
    return f(y, x);
  };
}; //cons :: (a, List a) -> List a


var cons = function cons(x, xs) {
  return new Cons(x, xs);
}; //snoc :: (List a, a) -> List a


var snoc = function snoc(xs, x) {
  return new Cons(x, xs);
}; //ccons :: a -> List a -> List a


var ccons = curry(cons); //csnoc :: List a -> a -> List a
//const csnoc = curry(snoc)
//nil :: () => List a

var nil = function nil() {
  return new Nil();
}; //head :: List a -> a | undefined


var head = function head(_ref) {
  var head = _ref.head;
  return head;
}; //tail :: List a -> List a | undefined


var tail = function tail(_ref2) {
  var tail = _ref2.tail;
  return tail;
}; //concat :: List a -> List a -> List a


var concat = function concat(xs) {
  return function (ys) {
    return foldr(cons)(ys)(xs);
  };
}; //foldl :: ((a, b) -> a) -> a -> List b -> a


var foldl = function foldl(f) {
  var go = function go(b) {
    return function (_ref3) {
      var isNil = _ref3.isNil,
          head = _ref3.head,
          tail = _ref3.tail;
      return isNil ? b : go(f(b, head))(tail);
    };
  };

  return go;
}; //foldr :: ((a, b) -> a) -> a -> List b -> a


var foldr = function foldr(f) {
  return function (b) {
    var rev = function rev(acc) {
      return function (_ref4) {
        var isNil = _ref4.isNil,
            head = _ref4.head,
            tail = _ref4.tail;
        return isNil ? acc : rev(cons(head, acc))(tail);
      };
    };

    return o(foldl(flip(f))(b), rev(nil()));
  };
}; //foldMap :: Monoid m => (a -> m) -> List a -> m


var foldMap = function foldMap(f) {
  return foldl(function (acc, x) {
    return (acc || f(x).empty()).concat(f(x));
  })(null);
}; //foldM :: Monad m => (a -> m a) -> (a -> b -> m a) -> a -> List b -> m a


var foldM = function foldM(point) {
  return function (f) {
    var go = function go(a) {
      return function (_ref5) {
        var isNil = _ref5.isNil,
            head = _ref5.head,
            tail = _ref5.tail;
        return isNil ? point(a) : f(a, head).chain(function (x) {
          return go(x)(tail);
        });
      };
    };

    return go;
  };
}; //map :: (a -> b) -> List a -> List b


var map = function map(f) {
  return function (_ref6) {
    var isNil = _ref6.isNil,
        head = _ref6.head,
        tail = _ref6.tail;
    return isNil ? nil() : cons(f(head), map(f)(tail));
  };
}; //ap :: List (a -> b) -> List a -> List b


var ap = function ap(_ref7) {
  var isNil = _ref7.isNil,
      f = _ref7.head,
      fs = _ref7.tail;
  return function (xs) {
    return isNil ? nil() : concat(map(f)(xs))(ap(fs)(xs));
  };
}; //pure :: a -> List a


var pure = function pure(a) {
  return cons(a, nil());
}; //chain :: (a -> List b) -> List a -> List b


var chain = function chain(_ref8) {
  var isNil = _ref8.isNil,
      head = _ref8.head,
      tail = _ref8.tail;
  return function (f) {
    return isNil ? nil() : concat(f(head))(chain(tail)(f));
  };
}; //join :: List (List a -> List a)


var join = foldr(uncurry(concat))(nil()); //traverse :: Applicative f => (a -> f a) -> (a -> f b) -> List a -> f (List b)

var traverse = function traverse(point, f) {
  var con_f = function con_f(x, ys) {
    return f(x).map(ccons).ap(ys);
  };

  return foldr(con_f)(point(nil()));
}; //sequenceA :: Applicative f => (a -> f a) -> List (f a) -> f (List a)


var sequenceA = function sequenceA(point) {
  return traverse(point, id);
}; //length :: List a -> Int


var length = function length(xs) {
  var go = function go(b) {
    return function (_ref9) {
      var isCons = _ref9.isCons,
          tail = _ref9.tail;
      return isCons ? go(b + 1)(tail) : b;
    };
  };

  return go(0)(xs);
}; //findIndex :: (a -> Boolean) -> List a -> Maybe Int


var findIndex = function findIndex(f) {
  return function (xs) {
    var go = function go(n) {
      return function (_ref10) {
        var isNil = _ref10.isNil,
            head = _ref10.head,
            tail = _ref10.tail;
        return isNil ? (0, _data.Nothing)() : f(head) ? (0, _data.Just)(n) : go(n + 1)(tail);
      };
    };

    return go(0)(xs);
  };
}; //index :: Int -> List a -> Maybe a


var index = function index(i) {
  return function (xs) {
    var go = function go(n) {
      return function (_ref11) {
        var isNil = _ref11.isNil,
            head = _ref11.head,
            tail = _ref11.tail;
        return isNil ? (0, _data.Nothing)() : n === i ? (0, _data.Just)(head) : go(n + 1)(tail);
      };
    };

    return go(0)(xs);
  };
}; //reverse :: List a -> List a


var reverse = function reverse(xs) {
  var go = function go(acc) {
    return function (_ref12) {
      var isNil = _ref12.isNil,
          head = _ref12.head,
          tail = _ref12.tail;
      return isNil ? acc : go(cons(head, acc))(tail);
    };
  };

  return go(nil())(xs);
}; //contains :: Eq a => List a -> a -> Boolean


var contains = function contains(xs) {
  return function (x) {
    return findIndex((0, _ramda.equals)(x))(xs).isJust;
  };
}; //unique :: Eq a => List a -> List a


var unique = o(reverse, foldl(function (acc, x) {
  return contains(acc)(x) ? acc : cons(x, acc);
})(nil())); //toArray :: List a -> [a]

var toArray = foldl(function (acc, x) {
  return acc.concat([x]);
})([]); //toList :: [a] -> List a

var toList = function toList(xs) {
  return xs.reduceRight(function (acc, x) {
    return cons(x, acc);
  }, nil());
}; //List :: a -> ... -> List a


var list = function list() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return toList(args);
};

var List = {
  list: list,
  cons: cons,
  snoc: snoc,
  nil: nil,
  head: head,
  tail: tail,
  foldl: foldl,
  foldr: foldr,
  foldMap: foldMap,
  foldM: foldM,
  concat: concat,
  map: map,
  ap: ap,
  pure: pure,
  join: join,
  chain: chain,
  traverse: traverse,
  sequenceA: sequenceA,
  findIndex: findIndex,
  index: index,
  length: length,
  reverse: reverse,
  contains: contains,
  unique: unique,
  toArray: toArray,
  toList: toList
};
exports.List = List;
});

;require.register("FP/maybe.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Maybe = void 0;

var _data = _interopRequireDefault(require("data.maybe"));

var _data2 = _interopRequireDefault(require("data.task"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var configure = function configure(_) {
  var _toTask = function _toTask(nothing) {
    var cata = {
      Nothing: function Nothing(_) {
        return _data2["default"].of(nothing);
      },
      Just: function Just(x) {
        return _data2["default"].of(x);
      }
    };
    return this.cata(cata);
  };

  Object.defineProperty(_data["default"].prototype, 'toTask', (0, _util.value)(_toTask));
};

var Maybe = {
  configure: configure
};
exports.Maybe = Maybe;
});

;require.register("FP/pointfree.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = exports.taskToPromise = exports.promiseToTask = exports.eitherToTask = exports.toList = exports.fold = exports.foldMap = exports.traverse = exports.of = exports.sequenceA = exports.mconcat = exports.mjoin = exports.ParseError = void 0;

var _ramda = require("ramda");

var _data = _interopRequireDefault(require("data.either"));

var _data2 = _interopRequireDefault(require("data.task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ParseError = /*#__PURE__*/function (_Error) {
  _inherits(ParseError, _Error);

  var _super = _createSuper(ParseError);

  function ParseError() {
    _classCallCheck(this, ParseError);

    return _super.apply(this, arguments);
  }

  return ParseError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.ParseError = ParseError;

var id = function id(x) {
  return x;
};

var _groupsOf = (0, _ramda.curry)(function (n, xs) {
  return !xs.length ? [] : [xs.slice(0, n)].concat(_groupsOf(n, xs.slice(n, length)));
});

var mjoin = function mjoin(mmv) {
  if (mmv.mjoin) return mmv.mjoin();
  return (0, _ramda.chain)(id, mmv);
};

exports.mjoin = mjoin;
var mconcat = (0, _ramda.curry)(function (xs, empty) {
  return xs.length ? xs.reduce(_ramda.concat) : empty();
});
exports.mconcat = mconcat;
var sequenceA = (0, _ramda.curry)(function (point, fctr) {
  return fctr.traverse(id, point);
});
exports.sequenceA = sequenceA;

var of = function of(x) {
  return x.of;
};

exports.of = of;
var traverse = (0, _ramda.curry)(function (f, point, fctr) {
  return (0, _ramda.compose)(sequenceA(point), (0, _ramda.map)(f))(fctr);
});
exports.traverse = traverse;
var foldMap = (0, _ramda.curry)(function (f, fldable) {
  return fldable.reduce(function (acc, x) {
    var r = f(x);
    acc = acc || r.empty();
    return acc.concat(r);
  }, null);
});
exports.foldMap = foldMap;
var fold = (0, _ramda.curry)(function (f, g, x) {
  return x.fold(f, g);
});
exports.fold = fold;

var toList = function toList(x) {
  return x.reduce(function (acc, y) {
    return [y].concat(acc);
  }, []);
};

exports.toList = toList;

var eitherToTask = function eitherToTask(x) {
  return x.cata({
    Left: function Left(e) {
      return _data2["default"].rejected(new ParseError(e));
    },
    Right: function Right(x) {
      return _data2["default"].of(x);
    }
  });
};

exports.eitherToTask = eitherToTask;

var promiseToTask = function promiseToTask(p) {
  return new _data2["default"](function (rej, res) {
    return p.then(res, rej);
  });
};

exports.promiseToTask = promiseToTask;

var taskToPromise = function taskToPromise(t) {
  return new Promise(function (res, rej) {
    return t.fork(rej, res);
  });
};

exports.taskToPromise = taskToPromise;

var parse = _data["default"]["try"]((0, _ramda.compose)(JSON.parse, (0, _ramda.prop)('response')));

exports.parse = parse;
});

;require.register("FP/sum.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sum = void 0;

var Sum = function Sum(x) {
  return {
    x: x,
    concat: function concat(_ref) {
      var y = _ref.x;
      return x + y;
    },
    inspect: "Sum(".concat(x, ")")
  };
};

exports.Sum = Sum;
});

;require.register("FP/task.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Task = void 0;

var _data = _interopRequireDefault(require("data.task"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var configure = function configure() {
  var _mjoin = function _mjoin() {
    var _this = this;

    return new _data["default"](function (rej, res) {
      return _this.fork(rej, function (s) {
        return s.fork(rej, res);
      });
    });
  };

  Object.defineProperty(_data["default"].prototype, 'mjoin', (0, _util.value)(_mjoin));
};

var Task = {
  configure: configure
};
exports.Task = Task;
});

;require.register("FP/tuple.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uncurry5 = exports.uncurry4 = exports.uncurry3 = exports.uncurry2 = exports.curry5 = exports.curry4 = exports.curry3 = exports.curry2 = exports.tuple5 = exports.tuple4 = exports.tuple3 = exports.tuple2 = exports.Tuple5 = exports.Tuple4 = exports.Tuple3 = exports.Tuple2 = exports.Tuple = void 0;

var _daggy = require("daggy");

var Tuple = (0, _daggy.tagged)('_1', '_2');
exports.Tuple = Tuple;
var Tuple2 = Tuple;
exports.Tuple2 = Tuple2;
var Tuple3 = (0, _daggy.tagged)('_1', '_2', '_3');
exports.Tuple3 = Tuple3;
var Tuple4 = (0, _daggy.tagged)('_1', '_2', '_3', '_4');
exports.Tuple4 = Tuple4;
var Tuple5 = (0, _daggy.tagged)('_1', '_2', '_3', '_4', '_5'); // Methods

exports.Tuple5 = Tuple5;

Tuple2.prototype.concat = function (b) {
  return Tuple2(this._1.concat(b._1), this._2.concat(b._2));
};

Tuple3.prototype.concat = function (b) {
  return Tuple3(this._1.concat(b._1), this._2.concat(b._2), this._3.concat(b._3));
};

Tuple4.prototype.concat = function (b) {
  return Tuple4(this._1.concat(b._1), this._2.concat(b._2), this._3.concat(b._3), this._4.concat(b._4));
};

Tuple5.prototype.concat = function (b) {
  return Tuple5(this._1.concat(b._1), this._2.concat(b._2), this._3.concat(b._3), this._4.concat(b._4), this._5.concat(b._5));
}; // Methods


Tuple.prototype.dimap = function (f, g) {
  return Tuple(f(this._1), g(this._2));
};

Tuple.prototype.map = function (f) {
  return Tuple(this._1, f(this._2));
};

Tuple.prototype.curry = function (f) {
  return f(this);
};

Tuple.prototype.uncurry = function (f) {
  return f(this._1, this._2);
};

Tuple.prototype.extend = function (f) {
  return Tuple(this._1, f(this));
};

Tuple.prototype.extract = function () {
  return this._2;
};

Tuple.prototype.foldl = function (f, z) {
  return f(this._2, z);
};

Tuple.prototype.foldr = function (f, z) {
  return f(z, this._2);
};

Tuple.prototype.foldMap = function (f, _) {
  return f(this._2);
};

var tuple2 = Tuple;
exports.tuple2 = tuple2;

var tuple3 = function tuple3(a, b, c) {
  return Tuple(tuple2(a, b), c);
};

exports.tuple3 = tuple3;

var tuple4 = function tuple4(a, b, c, d) {
  return Tuple(tuple3(a, b, c), d);
};

exports.tuple4 = tuple4;

var tuple5 = function tuple5(a, b, c, d, e) {
  return Tuple(tuple4(a, b, c, d), e);
};

exports.tuple5 = tuple5;

var curry2 = function curry2(f, a, b) {
  return f(tuple2(a, b));
};

exports.curry2 = curry2;

var curry3 = function curry3(f, a, b, c) {
  return f(tuple3(a, b, c));
};

exports.curry3 = curry3;

var curry4 = function curry4(f, a, b, c, d) {
  return f(tuple4(a, b, c, d));
};

exports.curry4 = curry4;

var curry5 = function curry5(f, a, b, c, d, e) {
  return f(tuple5(a, b, c, d, e));
};

exports.curry5 = curry5;

var uncurry2 = function uncurry2(f, t) {
  return f(t._1, t._2);
};

exports.uncurry2 = uncurry2;

var uncurry3 = function uncurry3(f, t) {
  return f(t._1._1, t._1._2, t._2);
};

exports.uncurry3 = uncurry3;

var uncurry4 = function uncurry4(f, t) {
  return f(t._1._1._1, t._1._1._2, t._1._2, t._2);
};

exports.uncurry4 = uncurry4;

var uncurry5 = function uncurry5(f, t) {
  return f(t._1._1._1._1, t._1._1._1._2, t._1._1._2, t._1._2, t._2);
};

exports.uncurry5 = uncurry5;
});

;require.register("FP/util.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.value = void 0;

var value = function value(f) {
  var x = {
    value: f,
    writable: true,
    configurable: true,
    enumerable: false
  };
  return x;
};

exports.value = value;
});

;require.register("FP/validation.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validation = void 0;

var _data = _interopRequireDefault(require("data.validation"));

var _data2 = _interopRequireDefault(require("data.task"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var constant = function constant(x) {
  return function () {
    return x;
  };
};

var id = function id(x) {
  return x;
};

var configure = function configure() {
  var apLeft = function apLeft(b) {
    return this.map(constant).ap(b);
  };

  Object.defineProperty(_data["default"].prototype, 'apLeft', (0, _util.value)(apLeft));

  var apRight = function apRight(b) {
    return this.map(constant(id)).ap(b);
  };

  Object.defineProperty(_data["default"].prototype, 'apRight', (0, _util.value)(apRight));

  var _toTask = function _toTask() {
    var f = {
      Failure: function Failure(x) {
        return _data2["default"].rejected(x);
      },
      Success: function Success(x) {
        return _data2["default"].of(x);
      }
    };
    return this.cata(f);
  };

  Object.defineProperty(_data["default"].prototype, 'toTask', (0, _util.value)(_toTask));
};

var Validation = {
  configure: configure
};
exports.Validation = Validation;
});

;require.register("Layouts/Body/cart-modal.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _navLink = require("Components/nav-link");

var _helpers = require("Utils/helpers");

var _ramda = require("ramda");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getQuantity = function getQuantity(xs) {
  return (0, _ramda.reduce)(_ramda.add, 0, (0, _ramda.filter)((0, _ramda.compose)((0, _ramda.equals)("Number"), _ramda.type), (0, _ramda.flatten)(xs)));
};

var getPrice = function getPrice(mdl, title, genders) {
  /*
  get realprice from mdl.state.currency, title, getQuantity(title, genders)
  */
  // console.log("wtf", title, genders)
  var price = mdl.state.prices[title] * getQuantity(genders);

  if (mdl.state.currency() !== "$") {//price = convertPriceToCurrency(mdl.state.currency(), price)
  }

  return price;
};

var products = function products(cart) {
  return (0, _ramda.toPairs)(cart).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        product = _ref2[0],
        genders = _ref2[1];

    return [product, (0, _ramda.toPairs)(genders)];
  });
};

var Gender = function Gender() {
  return {
    view: function view(_ref3) {
      var _ref3$attrs = _ref3.attrs,
          mdl = _ref3$attrs.mdl,
          _ref3$attrs$gender = _slicedToArray(_ref3$attrs.gender, 2),
          sex = _ref3$attrs$gender[0],
          quantity = _ref3$attrs$gender[1];

      return quantity ? m(".", [m("img", {
        src: "https://via.placeholder.com/80"
      }), m("h4", "".concat(sex, " : ").concat(quantity))]) : null;
    }
  };
};

var Product = function Product(_ref4) {
  var _ref4$attrs = _ref4.attrs,
      mdl = _ref4$attrs.mdl,
      _ref4$attrs$p = _slicedToArray(_ref4$attrs.p, 2),
      title = _ref4$attrs$p[0],
      genders = _ref4$attrs$p[1];

  var amount = getQuantity(genders);
  var price = getPrice(mdl, title, genders);
  return {
    view: function view(_ref5) {
      var _ref5$attrs = _ref5.attrs,
          mdl = _ref5$attrs.mdl,
          _ref5$attrs$p = _slicedToArray(_ref5$attrs.p, 2),
          title = _ref5$attrs$p[0],
          genders = _ref5$attrs$p[1];

      return amount ? m(".frow column-start", [m("h3", "".concat(amount, " ").concat(title, " for ").concat(mdl.state.currency(), " ").concat(price)), m(".frow cart-item row-around", genders.map(function (gender) {
        return m(Gender, {
          mdl: mdl,
          gender: gender
        });
      }))]) : null;
    }
  };
};

var getTotal = function getTotal(mdl, products) {
  var getTotalPrice = getQuantity(products.map(function (p) {
    return getPrice(mdl, p[0], p[1]);
  }));
  return getTotalPrice;
};

var CartModal = function CartModal(_ref6) {
  var mdl = _ref6.attrs.mdl;
  return {
    oninit: function oninit(_ref7) {
      var mdl = _ref7.attrs.mdl;
      return mdl.state.showNavModal(false);
    },
    view: function view(_ref8) {
      var mdl = _ref8.attrs.mdl;
      return m(".modalOverlay-right.animated", {
        onclick: function onclick(e) {
          mdl.state.showCartModal(false);
        }
      }, m(".modal", {
        style: {
          right: 0
        },
        id: "cart-modal"
      }, [m("h1.title text-center", "Shopping Cart"), m(_navLink.NavLink, {
        mdl: mdl,
        href: "/cart",
        classList: "".concat((0, _helpers.isActiveRoute)("/cart"), " para button m-0"),
        link: "Update Cart"
      }), products(mdl.cart).map(function (p) {
        return m(Product, {
          mdl: mdl,
          p: p
        });
      }), m(getTotal(mdl, products(mdl.cart)) ? "" : ".frow centered-column", m(_navLink.NavLink, {
        mdl: mdl,
        href: "/checkout",
        classList: "".concat((0, _helpers.isActiveRoute)("/checkout"), " para button m-0"),
        link: getTotal(mdl, products(mdl.cart)) ? ["Proceed to Checkout", m("h1.bold text-center", "Total of ".concat(getQuantity(products(mdl.cart)), " for ").concat(mdl.state.currency(), ": ").concat(getTotal(mdl, products(mdl.cart))))] : m("h1.bold", "Your Cart is Empty")
      }))]));
    }
  };
};

var _default = CartModal;
exports["default"] = _default;
});

;require.register("Layouts/Body/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cartModal = _interopRequireDefault(require("./cart-modal.js"));

var _navModal = _interopRequireDefault(require("./nav-modal.js"));

var _animations = require("Styles/animations.js");

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var bigHeader = function bigHeader(mdl) {
  return mdl.Routes.filter(function (r) {
    return r.route == mdl.state.route.route;
  })[0].children.map(function (r) {
    return mdl.Routes.filter((0, _ramda.propEq)("id", r))[0];
  }).any();
};

var Body = function Body() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          children = _ref$attrs.children;
      return m(".body", {
        id: "body",
        style: {
          marginTop: bigHeader(mdl) ? "140px" : "100px"
        }
      }, m(".frow column-center items-stretch", [mdl.settings.screenSize !== "desktop" && mdl.state.showNavModal() && m(_navModal["default"], {
        oncreate: _animations.SlideInLeft,
        onbeforeremove: _animations.SlideOutRight,
        mdl: mdl
      }), mdl.state.showCartModal() && m(_cartModal["default"], {
        oncreate: _animations.SlideInRight,
        onbeforeremove: _animations.SlideOutLeft,
        mdl: mdl
      }), [m(".text-4x", m("h1.title.mb-20.text-center", mdl.state.route.name)), children]]));
    }
  };
};

var _default = Body;
exports["default"] = _default;
});

;require.register("Layouts/Body/nav-modal.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _navLink = _interopRequireDefault(require("Components/nav-link"));

var _index = require("Utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  onHover: function onHover() {},
  selected: function selected() {}
};

var NavItem = function NavItem() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          href = _ref$attrs.href,
          link = _ref$attrs.link,
          classList = _ref$attrs.classList;
      return m("li.nav-item", m(_navLink["default"], {
        mdl: mdl,
        state: state,
        href: href,
        link: link,
        classList: classList
      }));
    }
  };
};

var NavModal = function NavModal() {
  var routes = function routes(mdl) {
    return mdl.Routes.filter(function (r) {
      return r.group.includes("menu");
    });
  };

  return {
    oncreate: function oncreate(_ref2) {
      var mdl = _ref2.attrs.mdl;
      mdl.state.showCartModal(false);
    },
    view: function view(_ref3) {
      var mdl = _ref3.attrs.mdl;
      return m(".modalOverlay-left.animated", {
        onclick: function onclick(e) {
          mdl.state.showNavModal(false);
        }
      }, m(".modal", {
        id: "nav-modal"
      }, m("ul.nav", {
        id: ""
      }, [mdl.state.isAuth() ? [m(_navLink["default"], {
        state: state,
        mdl: mdl,
        href: "/account/".concat(mdl.user.name),
        link: "Your Account",
        classList: "".concat((0, _index.isActiveRoute)("/account/".concat(mdl.user.name)), " button")
      }), m(_navLink["default"], {
        mdl: mdl,
        href: "/logout",
        link: "Logout",
        classList: "bold auth-link"
      })] : m(".frow.justify-start", [m(NavItem, {
        mdl: mdl,
        href: "/login",
        link: "Login",
        classList: "".concat((0, _index.isActiveRoute)("/login"), " button para")
      }), m(NavItem, {
        mdl: mdl,
        href: "/register",
        link: "Register",
        classList: "".concat((0, _index.isActiveRoute)("/register"), " button para")
      })]), routes(mdl).map(function (r) {
        return m(NavItem, {
          mdl: mdl,
          href: r.route,
          link: r.name,
          classList: (0, _index.isActiveRoute)(r.route)
        });
      })])));
    }
  };
};

var _default = NavModal;
exports["default"] = _default;
});

;require.register("Layouts/Header/ProgressBar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var ProgressBar = function ProgressBar() {
  return {
    view: function view(_ref) {
      var _ref$attrs$mdl$state$ = _ref.attrs.mdl.state.loadingProgress,
          value = _ref$attrs$mdl$state$.value,
          max = _ref$attrs$mdl$state$.max;
      return m(".progress-bar", m("progress.progress-bar", {
        id: "progressbar",
        value: value ? value() : 0,
        max: max ? max() : 0
      }));
    }
  };
};

var _default = ProgressBar;
exports["default"] = _default;
});

;require.register("Layouts/Header/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _navbar = _interopRequireDefault(require("./navbar.js"));

var _subNav = _interopRequireDefault(require("./sub-nav.js"));

var _toolbar = _interopRequireDefault(require("./toolbar.js"));

var _ProgressBar = _interopRequireDefault(require("./ProgressBar.js"));

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Header = function Header(_ref) {
  var mdl = _ref.attrs.mdl;

  var subRoutes = function subRoutes(mdl) {
    return mdl.Routes.filter(function (r) {
      return r.route == mdl.state.route.route;
    })[0].children.map(function (r) {
      return mdl.Routes.filter((0, _ramda.propEq)("id", r))[0];
    });
  };

  return {
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return m("nav.header", {
        id: "header",
        style: {
          maxHeight: subRoutes(mdl).any() ? "140px" : "100px"
        }
      }, [mdl.state.isLoading() && m(_ProgressBar["default"], {
        mdl: mdl
      }), m(_toolbar["default"], {
        mdl: mdl
      }), m(_navbar["default"], {
        mdl: mdl
      }), m(_subNav["default"], {
        mdl: mdl,
        subRoutes: subRoutes
      })]);
    }
  };
};

var _default = Header;
exports["default"] = _default;
});

;require.register("Layouts/Header/navbar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _navLink = _interopRequireDefault(require("Components/nav-link.js"));

var _index = require("Utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NavBar = function NavBar() {
  var routes = function routes(mdl) {
    return mdl.Routes.filter(function (r) {
      return r.group.includes("navbar");
    });
  };

  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".navbar", {
        id: "navbar"
      }, m("nav.frow row-around", [routes(mdl).map(function (r) {
        return m(_navLink["default"], {
          mdl: mdl,
          href: r.route,
          link: r.name,
          classList: (0, _index.isActiveRoute)(r.route)
        });
      })]));
    }
  };
};

var _default = NavBar;
exports["default"] = _default;
});

;require.register("Layouts/Header/sub-nav.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _navLink = _interopRequireDefault(require("Components/nav-link.js"));

var _index = require("Utils/index.js");

var _animations = require("Styles/animations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SubNavBar = function SubNavBar() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          subRoutes = _ref$attrs.subRoutes;
      return subRoutes(mdl).any() && m(".sub-navbar animated", {
        oncreate: _animations.SlideDown,
        onbeforeremove: _animations.SlideUp,
        id: "sub-navbar"
      }, m("nav.frow row-around", [subRoutes(mdl).map(function (r) {
        return m(_navLink["default"], {
          mdl: mdl,
          href: r.route,
          link: r.name,
          classList: (0, _index.isActiveRoute)(r.route)
        });
      })]));
    }
  };
};

var _default = SubNavBar;
exports["default"] = _default;
});

;require.register("Layouts/Header/toolbar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _navLink = _interopRequireDefault(require("Components/nav-link.js"));

var _ShoppingBag = _interopRequireDefault(require("Components/ShoppingBag.js"));

var _Hamburger = _interopRequireDefault(require("Components/Hamburger.js"));

var _Logo = _interopRequireDefault(require("Components/Logo"));

var _index = require("Utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ToolBar = function ToolBar() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".toolbar.my-5", m(".frow row-between row-center", [m(".frow", [m(".navMenuButton visible-xs", {
        onclick: function onclick() {
          return mdl.state.showNavModal(true);
        }
      }, m(_Hamburger["default"], {
        mdl: mdl
      })), mdl.state.isAuth() ? [m(_navLink["default"], {
        mdl: mdl,
        href: "/account/".concat(mdl.user.name),
        link: "Your Account",
        classList: "".concat((0, _index.isActiveRoute)("/account/".concat(mdl.user.name)), " button hidden-xs")
      }), m(_navLink["default"], {
        mdl: mdl,
        href: "/logout",
        link: "Logout",
        classList: "bold auth-link hidden-xs"
      })] : m(".frow hidden-xs", [m(_navLink["default"], {
        mdl: mdl,
        href: "/login",
        link: "Login",
        classList: "".concat((0, _index.isActiveRoute)("/login"), " button auth-link")
      }), m(_navLink["default"], {
        mdl: mdl,
        href: "/register",
        link: "Register",
        classList: "".concat((0, _index.isActiveRoute)("/register"), " button auth-link")
      })])]), m(_navLink["default"], {
        mdl: mdl,
        href: "/",
        classList: "logo",
        link: m(_Logo["default"], {
          id: "toolbar-logo",
          "class": "frow row-center"
        })
      }), m(_ShoppingBag["default"], {
        mdl: mdl
      })]));
    }
  };
};

var _default = ToolBar;
exports["default"] = _default;
});

;require.register("Layouts/footer.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _navLink = _interopRequireDefault(require("Components/nav-link.js"));

var _index = require("Utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Footer = function Footer() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      var routes = mdl.Routes.filter(function (r) {
        return r.group.includes("footer");
      });
      return m("footer.frow content-end items-end", {
        id: "footer"
      }, m(".frow row-container", routes.map(function (r) {
        return m(_navLink["default"], {
          mdl: mdl,
          href: r.route,
          link: r.name,
          classList: (0, _index.isActiveRoute)(r.route)
        });
      })));
    }
  };
};

var _default = Footer;
exports["default"] = _default;
});

;require.register("Layouts/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./Header/index.js"));

var _index2 = _interopRequireDefault(require("./Body/index.js"));

var _footer = _interopRequireDefault(require("./footer.js"));

var _LogoLoader = _interopRequireDefault(require("Components/LogoLoader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Layout = function Layout() {
  return {
    view: function view(_ref) {
      var children = _ref.children,
          mdl = _ref.attrs.mdl;
      return m(".layout", {
        id: "layout",
        role: "main"
      }, m(_index["default"], {
        mdl: mdl
      }), mdl.state.isLoading() ? m(_LogoLoader["default"]) : m(_index2["default"], {
        mdl: mdl,
        children: children
      }), m(_footer["default"], {
        mdl: mdl
      }));
    }
  };
};

var _default = Layout;
exports["default"] = _default;
});

;require.register("Models.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.cart = void 0;

var _index = _interopRequireDefault(require("./Routes/index.js"));

var _mockData = require("./mock-data");

var _Utils = require("Utils");

var _http = _interopRequireDefault(require("./Utils/http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var currencies = {
  $: "US Dollar",
  "£": "British Pound"
};
var state = {
  currency: Stream("$"),
  prices: {
    Wraps: 35,
    "Christening Blankets": 55,
    "Burp Rags": 15
  },
  showAuthModal: Stream(false),
  showNavModal: Stream(false),
  showCartModal: Stream(false),
  paginate: {
    page: Stream(1),
    total_pages: Stream(0),
    total_results: Stream(0)
  },
  query: Stream(""),
  isLoading: Stream(false),
  loadingProgress: {
    max: Stream(null),
    value: Stream(null)
  },
  dragging: {},
  isAuth: Stream(false),
  navSelected: Stream("")
};
var user = {};
var settings = {};
var data = {};
var errors = {};
var cart = {
  Wraps: {
    Male: 0,
    Female: 0,
    Unisex: 0
  },
  "Christening Blankets": {
    Male: 0,
    Female: 0,
    Unisex: 0
  },
  "Burp Rags": {
    Male: 0,
    Female: 0,
    Unisex: 0
  }
};
exports.cart = cart;
var Model = {
  currencies: currencies,
  http: _http["default"],
  Data: _mockData.Data,
  Routes: _index["default"],
  state: state,
  user: user,
  cart: (0, _Utils.jsonCopy)(cart),
  data: data,
  errors: errors,
  settings: settings,
  toggleAuthModal: function toggleAuthModal(mdl) {
    return mdl.state.showAuthModal(!mdl.state.showAuthModal());
  },
  toggleCurrencies: function toggleCurrencies(mdl) {
    return function (currency) {
      return mdl.state.currency(currency);
    };
  }
};
var _default = Model;
exports["default"] = _default;
});

;require.register("Pages/Auth/Validations.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateLoginTask = exports.validateUserRegistrationTask = void 0;

var _ramda = require("ramda");

var _data = require("data.validation");

var _Utils = require("Utils");

var ValidateRegistration = (0, _data.Success)((0, _ramda.curryN)(3, _ramda.identity));
var ValidateLogin = (0, _data.Success)((0, _ramda.curryN)(2, _ramda.identity));
var nameLense = (0, _ramda.lensProp)("name");
var passwordLense = (0, _ramda.lensProp)("password");
var passwordConfirmLense = (0, _ramda.lensProp)("confirmPassword");
var emailLense = (0, _ramda.lensProp)("email");
var emailConfirmLense = (0, _ramda.lensProp)("confirmEmail");
var NAME_REQUIRED_MSG = "A Name is required";
var PASSWORD_REQUIRED_MSG = "A Password is required";
var EMAIL_REQUIRED_MSG = "An Email is required";
var EMAILS_MUST_MATCH = "Emails do not match";
var INVALID_EMAIL_FORMAT = "Email must be a valid format";
var PASSWORDS_MUST_MATCH = "Passwords do not match";

var inputsMatch = function inputsMatch(input1) {
  return function (input2) {
    return input2 === input1;
  };
};

var validateName = function validateName(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, nameLense, NAME_REQUIRED_MSG, data));
};

var validateEmails = function validateEmails(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, emailLense, EMAIL_REQUIRED_MSG, data)).apLeft((0, _Utils.validate)(_Utils.isRequired, emailConfirmLense, EMAIL_REQUIRED_MSG, data)).apLeft((0, _Utils.validate)(inputsMatch(data.confirmEmail), emailLense, EMAILS_MUST_MATCH, data)).apLeft((0, _Utils.validate)(inputsMatch(data.email), emailConfirmLense, EMAILS_MUST_MATCH, data)).apLeft((0, _Utils.validate)(_Utils.emailFormat, emailConfirmLense, INVALID_EMAIL_FORMAT, data)).apLeft((0, _Utils.validate)(_Utils.emailFormat, emailLense, INVALID_EMAIL_FORMAT, data));
};

var validateEmail = function validateEmail(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, emailLense, EMAIL_REQUIRED_MSG, data)).apLeft((0, _Utils.validate)(_Utils.emailFormat, emailLense, INVALID_EMAIL_FORMAT, data));
};

var validatePasswords = function validatePasswords(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, passwordLense, PASSWORD_REQUIRED_MSG, data)).apLeft((0, _Utils.validate)(_Utils.isRequired, passwordConfirmLense, PASSWORD_REQUIRED_MSG, data)).apLeft((0, _Utils.validate)(inputsMatch(data.password), passwordConfirmLense, PASSWORDS_MUST_MATCH, data)).apLeft((0, _Utils.validate)(inputsMatch(data.confirmPassword), passwordLense, PASSWORDS_MUST_MATCH, data));
};

var validatePassword = function validatePassword(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, passwordLense, PASSWORD_REQUIRED_MSG, data));
};

var validateUserRegistrationTask = function validateUserRegistrationTask(data) {
  return ValidateRegistration.ap(validateName(data)).ap(validateEmails(data)).ap(validatePasswords(data)).failureMap(_ramda.mergeAll).toTask();
};

exports.validateUserRegistrationTask = validateUserRegistrationTask;

var validateLoginTask = function validateLoginTask(data) {
  return ValidateLogin.ap(validateEmail(data)).ap(validatePassword(data)).failureMap(_ramda.mergeAll).toTask();
};

exports.validateLoginTask = validateLoginTask;
});

;require.register("Pages/Auth/fns.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkAccountTask = exports.createAccountTask = exports.registerUserTask = exports.loginTask = exports.loginUserTask = void 0;

var _index = require("Utils/index");

var _storage = require("Utils/storage");

var _ramda = require("ramda");

var mergeCarts = function mergeCarts(accnt) {
  return function (cart) {
    return (0, _ramda.mergeDeepWith)(_ramda.add, cart, accnt);
  };
};

var toAccountVM = function toAccountVM(mdl) {
  return function (accnts) {
    var cart = mergeCarts(JSON.parse(accnts[0].cart))(mdl.cart);
    mdl.user.account = {
      objectId: accnts[0].objectId,
      cart: cart
    };
    mdl.cart = cart;
    return cart;
  };
};

var setUserToken = function setUserToken(mdl) {
  return function (user) {
    sessionStorage.setItem("sb-user", JSON.stringify(user));
    sessionStorage.setItem("sb-user-token", user["user-token"]);
    mdl.state.isAuth(true);
    mdl.user = user;
    return user;
  };
};

var loginUserTask = function loginUserTask(mdl) {
  return function (_ref) {
    var email = _ref.email,
        password = _ref.password;
    return mdl.http.backEnd.postTask(mdl)("users/login")({
      login: email,
      password: password
    }).map(setUserToken(mdl));
  };
};

exports.loginUserTask = loginUserTask;

var getUserAccountTask = function getUserAccountTask(mdl) {
  return function (_) {
    return mdl.http.backEnd.getTask(mdl)("data/Accounts?where=userId%3D'".concat(mdl.user.objectId, "'")).map(toAccountVM(mdl));
  };
};

var loginTask = function loginTask(mdl) {
  return function (_ref2) {
    var email = _ref2.email,
        password = _ref2.password;
    return loginUserTask(mdl)({
      email: email,
      password: password
    }).chain(getUserAccountTask(mdl)).chain((0, _storage.saveStorageTask)(mdl)("sb-cart"));
  };
};

exports.loginTask = loginTask;

var registerUserTask = function registerUserTask(mdl) {
  return function (_ref3) {
    var name = _ref3.name,
        email = _ref3.email,
        password = _ref3.password,
        isAdmin = _ref3.isAdmin;
    return mdl.http.backEnd.postTask(mdl)("users/register")({
      name: name,
      email: email,
      password: password,
      isAdmin: isAdmin
    });
  };
};

exports.registerUserTask = registerUserTask;

var createAccountTask = function createAccountTask(mdl) {
  return mdl.http.backEnd.postTask(mdl)("data/Accounts")({
    cart: JSON.stringify(mdl.cart),
    userId: mdl.user.objectId
  });
};

exports.createAccountTask = createAccountTask;

var linkAccountTask = function linkAccountTask(mdl) {
  return mdl.http.backEnd.postTask(mdl)("data/Users/".concat(mdl.user.objectId, "/account%3AAccounts%3A1"))([mdl.user.account.objectId]);
};

exports.linkAccountTask = linkAccountTask;
});

;require.register("Pages/Auth/login-user.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Login = void 0;

var _navLink = _interopRequireDefault(require("Components/nav-link"));

var _Utils = require("Utils");

var _Validations = require("./Validations.js");

var _fns = require("./fns.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateForm = function validateForm(mdl) {
  return function (data) {
    var onError = function onError(errs) {
      if (errs) {
        state.errors = errs;
        state.errorMsg(errs.message);
        state.showErrorMsg(true);
        console.log("failed - state", state);
      } else {
        state.errorMsg("Issue with logging in. Have you registered?");
        state.showErrorMsg(true);
        console.log("failed - other?", state);
      }
    };

    var onSuccess = function onSuccess(mdl) {
      return function (account) {
        state.errors = {};
        mdl.user.account = account;
        m.route.set("/");
      };
    };

    state.isSubmitted = true;
    (0, _Validations.validateLoginTask)(data.userModel).chain((0, _fns.loginTask)(mdl)).fork(onError, onSuccess(mdl));
  };
};

var userModel = {
  name: "",
  email: "",
  password: "",
  confirmEmail: "",
  confirmPassword: "",
  isAdmin: false
};
var dataModel = {
  userModel: userModel
};
var state = {
  isSubmitted: false,
  errors: {},
  httpError: undefined,
  data: (0, _Utils.jsonCopy)(dataModel),
  showErrorMsg: Stream(false),
  errorMsg: Stream("")
};

var resetState = function resetState() {
  state.data = (0, _Utils.jsonCopy)(dataModel);
  state.errors = {};
  state.httpError = undefined;
  state.isSubmitted = false;
  state.showErrorMsg(false);
  state.errorMsg("");
};

var Login = function Login() {
  return {
    onremove: function onremove() {
      return resetState();
    },
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".frow centered pt-30", [state.showErrorMsg() && m("code.warning", state.errorMsg()), m("form.frow-container frow-center", {
        role: "form",
        id: "Login-form",
        onsubmit: function onsubmit(e) {
          return e.preventDefault();
        }
      }, [m("input.auth-input", {
        "class": state.isSubmitted ? state.errors.email ? "has-error" : "has-success" : "",
        id: "reg-email",
        type: "email",
        placeholder: "Email",
        onkeyup: function onkeyup(e) {
          // state.isSubmitted && validateForm(mdl)(state.data)
          state.data.userModel.email = e.target.value;
        },
        value: state.data.userModel.email
      }), state.errors.email && m("p.auth-input-hint", state.errors.email), m("input.auth-input", {
        "class": state.isSubmitted ? state.errors.password ? "has-error" : "has-success" : "",
        id: "reg-pass",
        type: "password",
        placeholder: "Password",
        onkeyup: function onkeyup(e) {
          // state.isSubmitted && validateForm(mdl)(state.data)
          state.data.userModel.password = e.target.value;
        },
        value: state.data.userModel.password
      }), state.errors.password && m("p.auth-input-hint", state.errors.password)]), state.httpError && m(".toast toast-error", state.httpError)], m("a.button.auth-btn", {
        // type: "submit",
        form: "login-form",
        onclick: function onclick() {
          return validateForm(mdl)(state.data);
        },
        "class": mdl.state.isLoading() && "loading"
      }, "Login"), m(".auth-link", ["Need to ", m(_navLink["default"], {
        mdl: mdl,
        href: "/register",
        link: "register",
        classList: "bold"
      }), " ?"]));
    }
  };
};

exports.Login = Login;
var _default = Login;
exports["default"] = _default;
});

;require.register("Pages/Auth/register-user.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Register = exports.validateForm = void 0;

var _navLink = _interopRequireDefault(require("Components/nav-link"));

var _Utils = require("Utils");

var _Validations = require("./Validations");

var _fns = require("./fns.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userModel = {
  name: "",
  email: "",
  password: "",
  confirmEmail: "",
  confirmPassword: "",
  isAdmin: false
};
var dataModel = {
  userModel: userModel
};
var state = {
  isSubmitted: false,
  errors: {},
  httpError: undefined,
  data: (0, _Utils.jsonCopy)(dataModel),
  showErrorMsg: Stream(false),
  errorMsg: Stream("")
};

var resetState = function resetState() {
  state.data = (0, _Utils.jsonCopy)(dataModel);
  state.errors = {};
  state.httpError = undefined;
  state.isSubmitted = false;
  state.showErrorMsg(false);
  state.errorMsg("");
};

var validateForm = function validateForm(mdl) {
  return function (data) {
    var onError = function onError(errs) {
      if (errs) {
        state.errors = errs;
        state.errorMsg(errs.message);
        state.showErrorMsg(true);
        console.log("failed - state", state);
      } else {
        state.errorMsg("There seems to be a problem please contact web support");
        state.showErrorMsg(true);
        console.log("failed - state", state);
      }
    };

    var onSuccess = function onSuccess(mdl) {
      return function (data) {
        state.errors = {};
        sessionStorage.setItem("sb-user-token", mdl.user["user-token"]);
        sessionStorage.setItem("sb-user", JSON.stringify(mdl.user));
        m.route.set("/");
      };
    };

    state.isSubmitted = true;
    (0, _Validations.validateUserRegistrationTask)(data.userModel).chain((0, _fns.registerUserTask)(mdl)).chain(function (_) {
      return (0, _fns.loginUserTask)(mdl)({
        email: data.userModel.email,
        password: data.userModel.password
      });
    }).chain(function (_) {
      return (0, _fns.createAccountTask)(mdl);
    }).chain(function (accnt) {
      mdl.user.account = accnt;
      return (0, _fns.linkAccountTask)(mdl);
    }).fork(onError, onSuccess(mdl));
  };
};

exports.validateForm = validateForm;

var RegisterUser = function RegisterUser() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          data = _ref$attrs.data,
          errors = _ref$attrs.errors,
          isSubmitted = _ref$attrs.isSubmitted;
      return [m("input.auth-input", {
        "class": isSubmitted ? errors.name ? "has-error" : "has-success" : "",
        id: "reg-name",
        type: "text",
        placeholder: "Full Name",
        onkeyup: function onkeyup(e) {
          return data.name = e.target.value;
        },
        value: data.name
      }), errors.name && m("p.auth-input-hint", errors.name), m("input.auth-input", {
        "class": isSubmitted ? errors.email ? "has-error" : "has-success" : "",
        id: "reg-email",
        type: "email",
        placeholder: "Email",
        onkeyup: function onkeyup(e) {
          return data.email = e.target.value;
        },
        value: data.email
      }), errors.email && m("p.auth-input-hint", errors.email), m("input.auth-input", {
        id: "confirmEmail",
        "class": isSubmitted ? errors.confirmEmail ? "has-error" : "has-success" : "",
        type: "email",
        placeholder: "Confirm Email",
        onkeyup: function onkeyup(e) {
          return data.confirmEmail = e.target.value;
        },
        value: data.confirmEmail
      }), errors.confirmEmail && m("p.auth-input-hint", errors.confirmEmail), m("input.auth-input", {
        "class": isSubmitted ? errors.password ? "has-error" : "has-success" : "",
        id: "reg-pass",
        type: "password",
        placeholder: "Password",
        onkeyup: function onkeyup(e) {
          return data.password = e.target.value;
        },
        value: data.password
      }), errors.password && m("p.auth-input-hint", errors.password), m("input.auth-input", {
        "class": isSubmitted ? errors.confirmPassword ? "has-error" : "has-success" : "",
        id: "pass-confirm",
        type: "password",
        placeholder: "Confirm Password",
        onkeyup: function onkeyup(e) {
          return data.confirmPassword = e.target.value;
        },
        value: data.confirmPassword
      }), errors.confirmPassword && m("p.auth-input-hint", errors.confirmPassword)];
    }
  };
};

var Register = function Register() {
  return {
    onremove: function onremove() {
      return resetState();
    },
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return [m(".frow centered pt-30", [state.showErrorMsg() && m("code.warning", state.errorMsg()), m("form.frow-container column-center", {
        role: "form",
        id: "Register-form",
        onsubmit: function onsubmit(e) {
          return e.preventDefault();
        }
      }, [m(RegisterUser, {
        data: state.data.userModel,
        errors: state.errors,
        isSubmitted: state.isSubmitted
      }), m("a.button.auth-btn", {
        form: "register-form",
        onclick: function onclick() {
          return validateForm(mdl)(state.data);
        },
        "class": mdl.state.isLoading() && "loading"
      }, "Register"), m(".auth-link", ["Need to ", m(_navLink["default"], {
        mdl: mdl,
        href: "/login",
        link: "Login",
        classList: "bold"
      }), " ?"])])]), state.httpError && m(".toast toast-error", state.httpError)];
    }
  };
};

exports.Register = Register;
var _default = Register;
exports["default"] = _default;
});

;require.register("Pages/account.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Account = function Account(mdl) {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".frow-container frow-center", [m("h2", "Welcome ", mdl.user.name)]);
    }
  };
};

var _default = Account;
exports["default"] = _default;
});

;require.register("Pages/blankets.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Flicker = _interopRequireDefault(require("Components/Flicker.js"));

var _Selector = _interopRequireDefault(require("Components/Selector.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Blankets = function Blankets() {
  var state = {
    errors: {},
    data: ["https://source.unsplash.com/random/800x600", "https://source.unsplash.com/random/800x600", "https://source.unsplash.com/random/800x600", "https://source.unsplash.com/random/800x600"]
  };
  return {
    oninit: function oninit() {// console.log("init blankets")
    },
    onremove: function onremove() {
      state.errors = {};
      state.data = [];
    },
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".frow-container frow-center", [m(".mb-30", {
        id: "wraps"
      }, [m("h2.pb-10", "Wraps"), m(_Flicker["default"], {
        mdl: mdl,
        data: state.data
      }), m(".mt-20", m(_Selector["default"], {
        mdl: mdl,
        product: "Wraps"
      }))]), m(".mb-30", {
        id: "christening"
      }, m("h2.pb-10", "Christening Blankets"), m(_Flicker["default"], {
        mdl: mdl,
        data: state.data
      }), m(".mt-20", m(_Selector["default"], {
        mdl: mdl,
        product: "Christening Blankets"
      })))]);
    }
  };
};

var _default = Blankets;
exports["default"] = _default;
});

;require.register("Pages/blog.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _data = _interopRequireDefault(require("data.task"));

var _Masonry = _interopRequireDefault(require("Components/Masonry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fetchBurpRagsTask = function fetchBurpRagsTask(mdl) {
  return _data["default"].of([{
    imgSrc: 220,
    title: "Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }, {
    imgSrc: 0,
    title: "Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }, {
    imgSrc: 220,
    title: "Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }, {
    imgSrc: 200,
    title: "Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }, {
    imgSrc: 250,
    title: "Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }, {
    imgSrc: 220,
    title: "Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }, {
    imgSrc: 2,
    title: "Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }]);
};

var onPageInit = function onPageInit(state) {
  return function (_ref) {
    var mdl = _ref.attrs.mdl;

    var onError = function onError(s) {
      return function (error) {
        s.errors.init = error;
        console.log("errror", error);
      };
    };

    var onSuccess = function onSuccess(s) {
      return function (data) {
        s.data = data;
      };
    };

    fetchBurpRagsTask(mdl).fork(onError(state), onSuccess(state));
  };
};

var Blog = function Blog() {
  var state = {
    errors: {},
    data: []
  };
  return {
    oninit: onPageInit(state),
    onremove: function onremove() {
      state.errors = {};
      state.data = [];
    },
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return m(".frow-container frow-center", {
        id: "blog-page"
      }, [m(_Masonry["default"], {
        data: state.data
      })]);
    }
  };
};

var _default = Blog;
exports["default"] = _default;
});

;require.register("Pages/burp-rags.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Flicker = _interopRequireDefault(require("Components/Flicker.js"));

var _Selector = _interopRequireDefault(require("Components/Selector.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BurpRags = function BurpRags() {
  var state = {
    errors: {},
    data: ["https://source.unsplash.com/random/800x600", "https://source.unsplash.com/random/800x600", "https://source.unsplash.com/random/800x600", "https://source.unsplash.com/random/800x600"]
  };
  return {
    onremove: function onremove() {
      state.errors = {};
      state.data = [];
    },
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".frow-container frow-center", [m(".mb-30", {
        id: "burps"
      }, m(_Flicker["default"], {
        mdl: mdl,
        data: state.data
      }), m(".mt-20", m(_Selector["default"], {
        mdl: mdl,
        product: "Burp Rags"
      })))]);
    }
  };
};

var _default = BurpRags;
exports["default"] = _default;
});

;require.register("Pages/cart.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Cart = function Cart(mdl) {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".frow-container frow-center");
    }
  };
};

var _default = Cart;
exports["default"] = _default;
});

;require.register("Pages/default.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Default = function Default(mdl) {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".frow-container frow-center");
    }
  };
};

var _default = Default;
exports["default"] = _default;
});

;require.register("Pages/home.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _data = _interopRequireDefault(require("data.task"));

var _Masonry = _interopRequireDefault(require("Components/Masonry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fetchBurpRagsTask = function fetchBurpRagsTask(mdl) {
  return _data["default"].of([{
    imgSrc: 320,
    title: "",
    description: ""
  }, {
    imgSrc: 250,
    title: "",
    description: ""
  }, {
    imgSrc: 220,
    title: "",
    description: ""
  }, {
    imgSrc: 200,
    title: "",
    description: ""
  }, {
    imgSrc: 250,
    title: "",
    description: ""
  }, {
    imgSrc: 320,
    title: "",
    description: ""
  }, {
    imgSrc: 320,
    title: "",
    description: ""
  }]);
};

var onPageInit = function onPageInit(state) {
  return function (_ref) {
    var mdl = _ref.attrs.mdl;

    var onError = function onError(s) {
      return function (error) {
        s.errors.init = error;
        console.log("errror", error);
      };
    };

    var onSuccess = function onSuccess(s) {
      return function (data) {
        s.data = data;
      };
    };

    fetchBurpRagsTask(mdl).fork(onError(state), onSuccess(state));
  };
};

var Home = function Home() {
  var state = {
    errors: {},
    data: []
  };
  return {
    oninit: onPageInit(state),
    onremove: function onremove() {
      state.errors = {};
      state.data = [];
    },
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return m(".frow-container frow-center", {
        id: "home-page"
      }, [m(_Masonry["default"], {
        data: state.data
      })]);
    }
  };
};

var _default = Home;
exports["default"] = _default;
});

;require.register("Routes/authenticated-routes.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default2 = _interopRequireDefault(require("Pages/default.js"));

var _home = _interopRequireDefault(require("Pages/home.js"));

var _account = _interopRequireDefault(require("Pages/account.js"));

var _index = _interopRequireDefault(require("Layouts/index.js"));

var _Utils = require("Utils");

var _Models = require("../Models.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AuthenticatedRoutes = [{
  id: "account",
  name: "Account",
  // icon: Icons.logo,
  route: "/account/:name",
  position: ["toolbar"],
  group: ["authenticated"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _Utils.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_account["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "profile-page",
  name: "Profile Page",
  // icon: Icons.home,
  route: "/account/:name/profile",
  position: ["settings-nav"],
  group: ["authenticated"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    console.log("profile page login on match", mdl, args, path, fullroute, isAnchor, !mdl.state.isAuth());
    isAnchor ? (0, _Utils.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_default2["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "manage-users",
  name: "Manage Users",
  // icon: Icons.users,
  route: "/account/:name/user-management",
  position: ["settings-nav"],
  group: ["authenticated", "admin"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    // console.log(
    //   "manage users on match",
    //   mdl,
    //   args,
    //   path,
    //   fullroute,
    //   isAnchor,
    //   mdl.state.isAuth(),
    //   mdl.user.isAdmin
    // )
    !mdl.user.isAdmin && m.route.set(m.route.get());
    isAnchor ? (0, _Utils.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_default2["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "logout",
  name: "",
  // icon: Icons.users,
  route: "/logout",
  position: [],
  group: ["authenticated", "admin"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    localStorage.clear();
    sessionStorage.clear();
    mdl.user = {};
    mdl.cart = (0, _Utils.jsonCopy)(_Models.cart);
    mdl.state.isAuth(false);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    m.route.set(m.route.get());
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_home["default"], {
      mdl: mdl
    }));
  }
}];
var _default = AuthenticatedRoutes;
exports["default"] = _default;
});

;require.register("Routes/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _authenticatedRoutes = _interopRequireDefault(require("./authenticated-routes.js"));

var _mainRoutes = _interopRequireDefault(require("./main-routes.js"));

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Routes = (0, _ramda.flatten)([_mainRoutes["default"], _authenticatedRoutes["default"]]);
var _default = Routes;
exports["default"] = _default;
});

;require.register("Routes/main-routes.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("Layouts/index.js"));

var _burpRags = _interopRequireDefault(require("Pages/burp-rags.js"));

var _blankets = _interopRequireDefault(require("Pages/blankets.js"));

var _default2 = _interopRequireDefault(require("Pages/default.js"));

var _blog = _interopRequireDefault(require("Pages/blog.js"));

var _home = _interopRequireDefault(require("Pages/home.js"));

var _cart = _interopRequireDefault(require("Pages/cart.js"));

var _Logo = _interopRequireDefault(require("Components/Logo"));

var _loginUser = _interopRequireDefault(require("Pages/Auth/login-user.js"));

var _registerUser = _interopRequireDefault(require("Pages/Auth/register-user.js"));

var _index2 = require("Utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Routes = [{
  id: "sette-bambini",
  name: m(_Logo["default"]),
  // icon: Icons.home,
  route: "/",
  isNav: true,
  group: ["toolbar"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_home["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "login",
  name: "Account Login",
  // icon: Icons.search,
  route: "/login",
  isNav: false,
  group: [],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_loginUser["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "register",
  name: "Register Account",
  // icon: Icons.search,
  route: "/register",
  isNav: false,
  group: [],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_registerUser["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "cart",
  name: "Cart",
  // icon: Icons.search,
  route: "/cart",
  isNav: false,
  group: [],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_cart["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "checkout",
  name: "Check Out",
  // icon: Icons.search,
  route: "/checkout",
  isNav: false,
  group: ["toolbar"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_cart["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "burp-rags",
  name: "Burp Rags",
  // icon: Icons.search,
  route: "/burp-rags",
  isNav: true,
  group: ["navbar"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_burpRags["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "blankets",
  name: "Blankets",
  // icon: Icons.search,
  route: "/blankets",
  isNav: false,
  group: ["navbar", "blankets"],
  children: ["wraps-blankets", "christ-blankets"],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_blankets["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "wraps-blankets",
  name: "Wraps",
  // icon: Icons.search,
  route: "/blankets/#wraps",
  isNav: false,
  group: ["sub-navbar", "blankets"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_blankets["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "christ-blankets",
  name: "Christening Blankets",
  // icon: Icons.search,
  route: "/blankets/#christening",
  isNav: false,
  group: ["sub-navbar", "blankets"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_blankets["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "blog",
  name: "Blog",
  // icon: Icons.home,
  route: "/blog",
  isNav: true,
  group: ["footer", "menu"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_blog["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "about-us",
  name: "About Us",
  // icon: Icons.home,
  route: "/about-us",
  isNav: true,
  group: ["footer"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_default2["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "Contact Us",
  name: "Contact",
  // icon: Icons.search,
  route: "/contact-us",
  isNav: false,
  group: ["footer"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_default2["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "returns",
  name: "Returns Policy",
  // icon: Icons.search,
  route: "/returns",
  isNav: false,
  group: ["footer", "menu"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_default2["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "tos",
  name: "Terms of Service",
  // icon: Icons.search,
  route: "/terms-of-service",
  isNav: false,
  group: ["footer"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_default2["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "privacy-policy",
  name: "Privacy Policy",
  // icon: Icons.search,
  route: "/privacy-policy",
  isNav: false,
  group: ["footer"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_default2["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "partnerships",
  name: "Partnerships",
  // icon: Icons.search,
  route: "/partnerships",
  isNav: false,
  group: ["footer", "menu"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_default2["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "safety-information",
  name: "Safety Information",
  // icon: Icons.search,
  route: "/safety-information",
  isNav: false,
  group: ["footer", "menu"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_default2["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "faq",
  name: "FAQ",
  // icon: Icons.search,
  route: "/faq",
  isNav: false,
  group: ["footer", "menu"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_default2["default"], {
      mdl: mdl
    }));
  }
}];
var _default = Routes;
exports["default"] = _default;
});

;require.register("Styles/animations.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveChildrenOut = exports.animate = exports.SlideChildrenInDown = exports.StretchInLeft = exports.SlideChildrenInRight = exports.SlideUp = exports.SlideDown = exports.SlideOutLeft = exports.SlideOutRight = exports.SlideInRight = exports.SlideInLeft = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var SlideInLeft = function SlideInLeft(_ref) {
  var dom = _ref.dom;
  return dom.classList.toggle("slideInLeft");
};

exports.SlideInLeft = SlideInLeft;

var SlideInRight = function SlideInRight(_ref2) {
  var dom = _ref2.dom;
  return dom.classList.toggle("slideInRight");
};

exports.SlideInRight = SlideInRight;

var SlideOutRight = function SlideOutRight(_ref3) {
  var dom = _ref3.dom;
  dom.classList.replace("slideInLeft", "slideOutLeft");
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, 500);
  });
};

exports.SlideOutRight = SlideOutRight;

var SlideOutLeft = function SlideOutLeft(_ref4) {
  var dom = _ref4.dom;
  dom.classList.replace("slideInRight", "slideOutRight");
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, 500);
  });
};

exports.SlideOutLeft = SlideOutLeft;

var SlideDown = function SlideDown(_ref5) {
  var dom = _ref5.dom;
  dom.style.opacity = 0;
  dom.classList.toggle("slideInDown");
  dom.style.opacity = 1;
};

exports.SlideDown = SlideDown;

var SlideUp = function SlideUp(_ref6) {
  var dom = _ref6.dom;
  dom.classList.replace("slideInDown", "slideOutUp");
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, 300);
  });
};

exports.SlideUp = SlideUp;

var SlideChildrenInRight = function SlideChildrenInRight(_ref7) {
  var dom = _ref7.dom;

  var children = _toConsumableArray(dom.children);

  return children.map(function (child, idx) {
    child.style.opacity = 0;
    setTimeout(function () {
      child.classList.toggle("slideInLeft");
      child.style.opacity = 1;
    }, (idx + 1) * 10);
  });
};

exports.SlideChildrenInRight = SlideChildrenInRight;

var StretchInLeft = function StretchInLeft(idx) {
  return function (_ref8) {
    var dom = _ref8.dom;
    dom.style.opacity = 0;
    return setTimeout(function () {
      dom.classList.toggle("stretchRight");
      dom.style.opacity = 1;
    }, idx * 100 + 20);
  };
};

exports.StretchInLeft = StretchInLeft;

var SlideChildrenInDown = function SlideChildrenInDown(idx) {
  return function (_ref9) {
    var dom = _ref9.dom;
    dom.style.opacity = 0;
    setTimeout(function () {
      dom.classList.toggle("slideDown");
      dom.style.opacity = 1;
    }, (idx + 1) * 200);
  };
};

exports.SlideChildrenInDown = SlideChildrenInDown;

var animate = function animate(dir) {
  return function (_ref10) {
    var dom = _ref10.dom;
    dom.style.opacity = 0;
    setTimeout(function () {
      dom.classList.toggle(dir);
      dom.style.opacity = 1;
    }, 200);
  };
};

exports.animate = animate;

var RemoveChildrenOut = function RemoveChildrenOut(_ref11) {
  var dom = _ref11.dom;
  return new Promise(function () {
    ;

    _toConsumableArray(dom.children).reverse().map(function (child, idx) {
      return setTimeout(function () {
        child.style.display = "none";
      }, idx * 100);
    });
  });
};

exports.RemoveChildrenOut = RemoveChildrenOut;
});

;require.register("Utils/.secrets.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackEnd = void 0;

//NEED TO MOVE THESE TO ENVIRONMENT/GITLAB IN PRODUCTION for manifest
var getUserToken = function getUserToken() {
  return sessionStorage.getItem("sb-user-token") ? sessionStorage.getItem("sb-user-token") : "";
};

var BackEnd = {
  API_KEY: "6FB32F97-89BF-466F-8F6D-06FE7BA2653A",
  APP_ID: "7A0EDE25-0509-5305-FFA3-0FA3A11BEF00",
  baseUrl: "https://api.backendless.com",
  headers: function headers() {
    return {
      "user-token": getUserToken()
    };
  }
};
exports.BackEnd = BackEnd;
});

;require.register("Utils/helpers.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uuid = exports.isActiveRoute = exports.jsonCopy = exports.scrollToAnchor = exports.getRoute = exports.debounce = exports.filterTask = exports._paginate = exports._direction = exports._sort = exports._search = exports.addTerms = exports.infiniteScroll = exports.isEmpty = exports.log = exports.makeRoute = void 0;

var _ramda = require("ramda");

var _data = _interopRequireDefault(require("data.task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var makeRoute = (0, _ramda.compose)((0, _ramda.join)("-"), (0, _ramda.split)(" "), (0, _ramda.trim)(), (0, _ramda.toLower)());
exports.makeRoute = makeRoute;

var log = function log(m) {
  return function (v) {
    console.log(m, v);
    return v;
  };
};

exports.log = log;

var isEmpty = function isEmpty(data) {
  return data.length == 0;
};

exports.isEmpty = isEmpty;

var infiniteScroll = function infiniteScroll(mdl) {
  return function (e) {
    var route = mdl.state.route;
    var length = mdl.data[route].data.length;
    var setpoint = 10 * length * mdl.state.scrollPos;

    if (e.target.scrollTop - mdl.state.scrollPos >= setpoint) {
      mdl.state.scrollPos++ + e.target.scrollTop;
    }
  };
};

exports.infiniteScroll = infiniteScroll;

var addTerms = function addTerms(item) {
  var terms = (0, _ramda.compose)((0, _ramda.join)(" "), _ramda.values, (0, _ramda.props)(["uuid", "id", "name"]))(item);
  return (0, _ramda.assoc)("_terms", terms, item);
};

exports.addTerms = addTerms;

var byTerms = function byTerms(query) {
  return (0, _ramda.compose)((0, _ramda.test)(new RegExp(query, "i")), (0, _ramda.prop)("name"));
};

var _search = function _search(query) {
  return (0, _ramda.compose)((0, _ramda.filter)(byTerms(query)));
};

exports._search = _search;

var _sort = function _sort(p) {
  return (0, _ramda.sortBy)((0, _ramda.compose)(_ramda.toLower, toString, (0, _ramda.prop)(p)));
};

exports._sort = _sort;

var _direction = function _direction(dir) {
  return dir == "asc" ? _ramda.identity : _ramda.reverse;
};

exports._direction = _direction;

var _paginate = function _paginate(offset) {
  return function (limit) {
    return function (data) {
      return (0, _ramda.slice)((0, _ramda.max)(0, (0, _ramda.min)(offset, data.length)), (0, _ramda.min)(offset + limit, data.length), data);
    };
  };
};

exports._paginate = _paginate;

var filterTask = function filterTask(query) {
  return function (prop) {
    return function (direction) {
      return function (offset) {
        return function (limit) {
          return (0, _ramda.compose)(_data["default"].of, (0, _ramda.map)(_paginate(offset)(limit)), (0, _ramda.map)(_direction(direction)), (0, _ramda.map)(_sort(prop)), _search(query));
        };
      };
    };
  };
};

exports.filterTask = filterTask;

var debounce = function debounce(wait, now) {
  return function (fn) {
    var timeout = undefined;
    return function () {
      var context = this;
      var args = arguments;

      var later = function later() {
        timeout = undefined;
        if (!now) fn.apply(context, args);
      };

      var callNow = now && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      console.log(fn);
      if (callNow) fn.apply(context, args);
    };
  };
};

exports.debounce = debounce;

var getRoute = function getRoute() {
  return (0, _ramda.last)(m.route.get().split("/"));
};

exports.getRoute = getRoute;

var scrollToAnchor = function scrollToAnchor(anchor) {
  var is = function is(el) {
    return el !== undefined && el !== null;
  }; //if you pass an undefined anchor it will scroll to the top of the body


  var targetEl = is(anchor) ? document.getElementById(anchor) : document.body;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var target = is(targetEl) ? targetEl.getBoundingClientRect().top : 0;
  return window.scroll({
    top: target + scrollTop - 150,
    left: 0,
    behavior: "smooth"
  });
};

exports.scrollToAnchor = scrollToAnchor;

var jsonCopy = function jsonCopy(src) {
  return JSON.parse(JSON.stringify(src));
};

exports.jsonCopy = jsonCopy;

var isActiveRoute = function isActiveRoute(route) {
  return m.route.get() == route ? "bold" : "";
};

exports.isActiveRoute = isActiveRoute;

var uuid = function uuid() {
  return "xxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == "x" ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

exports.uuid = uuid;
});

;require.register("Utils/http.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.parseHttpSuccess = exports.parseHttpError = void 0;

var _data = _interopRequireDefault(require("data.task"));

var _secrets = require("./.secrets.js");

var _Models = _interopRequireDefault(require("../Models.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function onProgress(e) {
  if (e.lengthComputable) {
    _Models["default"].state.loadingProgress.max = e.total;
    _Models["default"].state.loadingProgress.value = e.loaded;
    m.redraw();
  }
}

function onLoad() {
  return false;
}

function onLoadStart() {
  _Models["default"].state.isLoading(true);

  return false;
}

function onLoadEnd() {
  _Models["default"].state.isLoading(false);

  _Models["default"].state.loadingProgress.max = 0;
  _Models["default"].state.loadingProgress.value = 0;
  return false;
}

var xhrProgress = {
  config: function config(xhr) {
    xhr.onprogress = onProgress;
    xhr.onload = onLoad;
    xhr.onloadstart = onLoadStart;
    xhr.onloadend = onLoadEnd;
  }
};

var parseHttpError = function parseHttpError(mdl) {
  return function (rej) {
    return function (e) {
      mdl.state.isLoading(false);
      return rej(e.response);
    };
  };
};

exports.parseHttpError = parseHttpError;

var parseHttpSuccess = function parseHttpSuccess(mdl) {
  return function (res) {
    return function (data) {
      mdl.state.isLoading(false);
      return res(data);
    };
  };
};

exports.parseHttpSuccess = parseHttpSuccess;

var getUserToken = function getUserToken() {
  return window.sessionStorage.getItem("user-token") ? window.sessionStorage.getItem("user-token") : "";
};

var HttpTask = function HttpTask(_headers) {
  return function (method) {
    return function (mdl) {
      return function (url) {
        return function (body) {
          mdl.state.isLoading(true);
          return new _data["default"](function (rej, res) {
            return m.request(_objectSpread({
              method: method,
              url: url,
              headers: _objectSpread({
                "content-type": "application/json"
              }, _headers),
              body: body,
              withCredentials: false
            }, xhrProgress)).then(parseHttpSuccess(mdl)(res), parseHttpError(mdl)(rej));
          });
        };
      };
    };
  };
};

var lookupLocationTask = function lookupLocationTask(query) {
  return new _data["default"](function (rej, res) {
    return m.request({
      method: "GET",
      url: "https://nominatim.openstreetmap.org/search?q=".concat(query, "&format=json")
    }).then(res, rej);
  });
};

var getTask = function getTask(mdl) {
  return function (url) {
    return HttpTask({})("GET")(mdl)(url)(null);
  };
};

var nhtsaUrl = "http://localhost:3001/nhtsa/api/";
var nhtsa = {
  get: function get(mdl) {
    return function (url) {
      return getTask(mdl)(nhtsaUrl + "/" + url);
    };
  }
};
var backEndUrl = "".concat(_secrets.BackEnd.baseUrl, "/").concat(_secrets.BackEnd.APP_ID, "/").concat(_secrets.BackEnd.API_KEY, "/");
var backEnd = {
  getTask: function getTask(mdl) {
    return function (url) {
      return HttpTask(_secrets.BackEnd.headers())("GET")(mdl)(backEndUrl + url)(null);
    };
  },
  postTask: function postTask(mdl) {
    return function (url) {
      return function (dto) {
        return HttpTask(_secrets.BackEnd.headers())("POST")(mdl)(backEndUrl + url)(dto);
      };
    };
  },
  putTask: function putTask(mdl) {
    return function (url) {
      return function (dto) {
        return HttpTask(_secrets.BackEnd.headers())("PUT")(mdl)(backEndUrl + url)(dto);
      };
    };
  }
};
var http = {
  backEnd: backEnd,
  HttpTask: HttpTask,
  getTask: getTask,
  lookupLocationTask: lookupLocationTask
};
var _default = http; // const makeQuery = (string) => JSON.parse(JSON.stringify(string))
// const parseQLResponse = (mdl) => ({ data, errors }) => {
//   mdl.state.isLoading(false)
//   return errors ? Promise.reject(errors) : Promise.resolve(data)
// }
// const postQl = (mdl) => (query) => {
//   mdl.state.isLoading(true)
//   return new Task((rej, res) =>
//     m
//       .request({
//         method: 'POST',
//         // url: graphQl,
//         withCredentials: false,
//         ...xhrProgress,
//         data: makeQuery(query),
//         headers: {
//           Authorization: `Bearer ${mdl.state.token}`,
//           'cache-control': 'no-cache',
//           'x-apikey': '64fecd3f0cbb54d46d7f7260b86b8ad45d31b',
//           'content-type': 'application/json',
//         },
//       })
//       .then(parseQLResponse(mdl))
//       .then(parseHttpSuccess(mdl)(res), parseHttpError(mdl)(rej))
//   )
// }
// const postTask = (mdl) => (url) => ({ dto }) => {
//   mdl.state.isLoading(true)
//   return new Task((rej, res) =>
//     m
//       .request({
//         method: 'POST',
//         url: `${url}`,
//         body: dto,
//         headers: { 'user-token': getUserToken() },
//         withCredentials: false,
//         ...xhrProgress,
//       })
//       .then(parseHttpSuccess(mdl)(res), parseHttpError(mdl)(rej))
//   )
// }
// const putTask = (mdl) => (url) => ({ dto }) => {
//   mdl.state.isLoading(true)
//   return new Task((rej, res) =>
//     m
//       .request({
//         method: 'PUT',
//         url: `${url}`,
//         body: dto,
//         headers: { 'user-token': getUserToken() },
//         withCredentials: false,
//         ...xhrProgress,
//       })
//       .then(parseHttpSuccess(mdl)(res), parseHttpError(mdl)(rej))
//   )
// }
// const getTask = (mdl) => (url) => {
//   mdl.state.isLoading(true)
//   return new Task((rej, res) =>
//     m
//       .request({
//         method: 'GET',
//         url: `${url}`,
//         headers: { 'user-token': getUserToken() },
//         withCredentials: false,
//         ...xhrProgress,
//       })
//       .then(parseHttpSuccess(mdl)(res), parseHttpError(mdl)(rej))
//   )
// }
// const deleteTask = (mdl) => (url) => (id) => {
//   mdl.state.isLoading(true)
//   return new Task((rej, res) =>
//     m
//       .request({
//         method: 'DELETE',
//         url: `${url}/${id}`,
//         headers: { 'user-token': getUserToken() },
//         withCredentials: false,
//         ...xhrProgress,
//       })
//       .then(parseHttpSuccess(mdl)(res), parseHttpError(mdl)(rej))
//   )
// }

exports["default"] = _default;
});

;require.register("Utils/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require("./helpers.js");

Object.keys(_helpers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _helpers[key];
    }
  });
});

var _http = require("./http.js");

Object.keys(_http).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _http[key];
    }
  });
});

var _validation = require("./validation.js");

Object.keys(_validation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _validation[key];
    }
  });
});

var _storage = require("./storage.js");

Object.keys(_storage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _storage[key];
    }
  });
});
});

;require.register("Utils/storage.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveStorageTask = exports.getDbStorageTask = exports.saveDbStorageTask = exports.saveLocalStorageTask = exports.getLocalStorageTask = void 0;

var _data = _interopRequireDefault(require("data.task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getLocalStorageTask = function getLocalStorageTask(key) {
  return new _data["default"](function (rej, res) {
    return localStorage.getItem(key) ? rej("nothing here") : res(localStorage.getItem(key));
  });
};

exports.getLocalStorageTask = getLocalStorageTask;

var saveLocalStorageTask = function saveLocalStorageTask(key) {
  return function (value) {
    localStorage.setItem(key, JSON.stringify(value));
    return _data["default"].of(localStorage.getItem(key));
  };
};

exports.saveLocalStorageTask = saveLocalStorageTask;

var saveDbStorageTask = function saveDbStorageTask(mdl) {
  return function (cart) {
    return mdl.http.backEnd.putTask(mdl)("data/Accounts/".concat(mdl.user.account.objectId))({
      cart: cart
    });
  };
};

exports.saveDbStorageTask = saveDbStorageTask;

var getDbStorageTask = function getDbStorageTask(mdl) {
  return mdl.http.backEnd.gettTask(mdl)("data/Accounts/".concat(mdl.account.objectId));
};

exports.getDbStorageTask = getDbStorageTask;

var saveStorageTask = function saveStorageTask(mdl) {
  return function (key) {
    return function (value) {
      return mdl.state.isAuth() ? saveLocalStorageTask(key)(value).chain(saveDbStorageTask(mdl)) : saveLocalStorageTask(key)(value);
    };
  };
};

exports.saveStorageTask = saveStorageTask;
});

;require.register("Utils/validation.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNilOrEmptyOrAtom = exports.allCaps = exports.inDateRange = exports.unique = exports.maxLengthNullable = exports.onlyNumeric = exports.urlFormat = exports.phoneFormat = exports.onlyAlphaNumericSpaceSpecial = exports.onlyAlphaNumericSpaceUnderscore = exports.onlyAlphaNumericSpace = exports.onlyAlphaNumericUnderscore = exports.onlyAlphaNumeric = exports.onlyAlpha = exports.emailFormat = exports.maxSize = exports.maxLength = exports.isNullOrEmpty = exports.isNotNullOrEmpty = exports.IsNotNil = exports.isRequired = exports.validate = exports.getOrElse = void 0;

var _ramda = require("ramda");

var _data = require("data.validation");

var _data2 = _interopRequireDefault(require("data.maybe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getOrElse = function getOrElse(val) {
  return function (x) {
    return x.getOrElse(val);
  };
};

exports.getOrElse = getOrElse;
var validate = (0, _ramda.curry)(function (rule, lens, msg, data) {
  return rule((0, _ramda.view)(lens, data)) ? (0, _data.Success)(data) : (0, _data.Failure)([(0, _ramda.set)(lens, msg, {})]);
});
exports.validate = validate;
var isRequired = (0, _ramda.compose)(_ramda.not, _ramda.isEmpty);
exports.isRequired = isRequired;
var IsNotNil = (0, _ramda.compose)(_ramda.not, _ramda.isNil);
exports.IsNotNil = IsNotNil;

var isNotNullOrEmpty = function isNotNullOrEmpty(data) {
  return !isNullOrEmpty(data);
};

exports.isNotNullOrEmpty = isNotNullOrEmpty;

var isNullOrEmpty = function isNullOrEmpty(data) {
  return (0, _ramda.isNil)(data) || (0, _ramda.isEmpty)(data);
};

exports.isNullOrEmpty = isNullOrEmpty;

var maxLength = function maxLength(max) {
  return (0, _ramda.compose)((0, _ramda.gte)(max), _ramda.length);
};

exports.maxLength = maxLength;
var maxSize = (0, _ramda.curry)(function (max, value) {
  return (0, _ramda.gte)(max, value);
});
exports.maxSize = maxSize;
var emailFormat = (0, _ramda.test)(/@/);
exports.emailFormat = emailFormat;
var onlyAlpha = (0, _ramda.test)(/^[a-zA-Z]*$/);
exports.onlyAlpha = onlyAlpha;
var onlyAlphaNumeric = (0, _ramda.test)(/^[a-zA-Z0-9]*$/);
exports.onlyAlphaNumeric = onlyAlphaNumeric;
var onlyAlphaNumericUnderscore = (0, _ramda.test)(/^[a-zA-Z0-9_]*$/);
exports.onlyAlphaNumericUnderscore = onlyAlphaNumericUnderscore;
var onlyAlphaNumericSpace = (0, _ramda.test)(/^[a-zA-Z0-9\s]*$/);
exports.onlyAlphaNumericSpace = onlyAlphaNumericSpace;
var onlyAlphaNumericSpaceUnderscore = (0, _ramda.test)(/^[a-zA-Z0-9_\s]*$/);
exports.onlyAlphaNumericSpaceUnderscore = onlyAlphaNumericSpaceUnderscore;
var onlyAlphaNumericSpaceSpecial = (0, _ramda.test)(/^[a-zA-Z0-9_.~!*''();:@&=+$,/?#[%-\]+\s]*$/);
exports.onlyAlphaNumericSpaceSpecial = onlyAlphaNumericSpaceSpecial;
var phoneFormat = (0, _ramda.test)(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
exports.phoneFormat = phoneFormat;
var urlFormat = (0, _ramda.test)(/^[a-zA-Z0-9_.~!*''();:@&=+$,/?#[%-\]+]*$/);
exports.urlFormat = urlFormat;
var onlyNumeric = (0, _ramda.test)(/^[0-9]*$/);
exports.onlyNumeric = onlyNumeric;

var maxLengthNullable = function maxLengthNullable(max) {
  return (0, _ramda.compose)(getOrElse(false), (0, _ramda.map)((0, _ramda.gte)(max)), (0, _ramda.map)(_ramda.length), _data2["default"].fromNullable);
};

exports.maxLengthNullable = maxLengthNullable;
var unique = (0, _ramda.curry)(function (keys, value) {
  var lookup = _data2["default"].fromNullable(keys);

  return !(0, _ramda.contains)((0, _ramda.toUpper)(value.toString()), (0, _ramda.map)(function (y) {
    return (0, _ramda.toUpper)(y.toString());
  }, lookup.getOrElse([])));
});
exports.unique = unique;
var inDateRange = (0, _ramda.curry)(function (start, end, value) {
  if (value == null || value === '') {
    return true;
  }

  return new Date(start) <= new Date(value) && new Date(value) < new Date(end);
});
exports.inDateRange = inDateRange;

var allCaps = function allCaps(str) {
  return str.toUpperCase() === str;
};

exports.allCaps = allCaps;

var isNilOrEmptyOrAtom = function isNilOrEmptyOrAtom(item) {
  return (0, _ramda.isNil)(item) || (0, _ramda.isEmpty)(item) || item === '{$type:atom}';
};

exports.isNilOrEmptyOrAtom = isNilOrEmptyOrAtom;
});

;require.register("app.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var toRoutes = function toRoutes(mdl) {
  return function (acc, route) {
    acc[route.route] = {
      onmatch: function onmatch(args, path, fullroute) {
        if (route.group.includes("authenticated") && !mdl.state.isAuth()) {
          mdl.route.set(m.route.get());
        }

        mdl.state.route = route;
        mdl.state.anchor = path.split("#")[1];
        var isAnchor = Boolean(mdl.state.anchor);
        route.onmatch(mdl, args, path, fullroute, isAnchor);
      },
      render: function render() {
        return route.component(mdl);
      }
    };
    return acc;
  };
};

var App = function App(mdl) {
  return mdl.Routes.reduce(toRoutes(mdl), {});
};

var _default = App;
exports["default"] = _default;
});

;require.register("index.js", function(exports, require, module) {
"use strict";

var _app = _interopRequireDefault(require("./app.js"));

var _Models = _interopRequireDefault(require("./Models.js"));

var _ramda = require("ramda");

var _FP = require("FP");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_FP.FP.configure();

var root = document.body;
var winW = window.innerWidth;

if (module.hot) {
  module.hot.accept();
}

if ('development' !== "production") {
  console.log("Looks like we are in development mode!");
} else {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./service-worker.js").then(function (registration) {
        console.log("⚙️ SW registered: ", registration);
      })["catch"](function (registrationError) {
        console.log("🧟 SW registration failed: ", registrationError);
      });
    });
  }
} // set display profiles


var getProfile = function getProfile(w) {
  if (w < 668) return "phone";
  if (w < 920) return "tablet";
  return "desktop";
};

var checkWidth = function checkWidth(winW) {
  var w = window.innerWidth;

  if (winW !== w) {
    winW = w;
    var lastProfile = _Models["default"].settings.screenSize;
    _Models["default"].settings.screenSize = getProfile(w);
    if (lastProfile != _Models["default"].settings.screenSize) m.redraw();
  }

  return requestAnimationFrame(checkWidth);
};

_Models["default"].settings.screenSize = getProfile(winW);
checkWidth(winW);

if (sessionStorage.getItem("sb-user")) {
  _Models["default"].user = JSON.parse(sessionStorage.getItem("sb-user")); //fetch cart from db? do i really??
  // Model.state.isAuth(true)
}

if (localStorage.getItem("sb-cart")) {
  _Models["default"].cart = JSON.parse(localStorage.getItem("sb-cart"));
}

m.route(root, "/", (0, _app["default"])(_Models["default"]));
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  require("./index.js");
});
});

;require.register("mock-data.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Data = void 0;

var _ramda = require("ramda");

var _Utils = require("Utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getImg = function getImg(_ref) {
  var width = _ref.width,
      height = _ref.height;
  return ["https://loremflickr.com/".concat(width, "/").concat(height)];
};

var Data = function Data(size) {
  return function (amount) {
    var arr = _toConsumableArray(Array(amount).keys());

    var res = arr.traverse(function (_) {
      return getImg(size);
    }, Array.of);
    console.log(res);
    return res[0]; // return []
  };
};

exports.Data = Data;
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.m = require("mithril");
window.Stream = require("mithril-stream");


});})();require('___globals___');


//# sourceMappingURL=app.js.map