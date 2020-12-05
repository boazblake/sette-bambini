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
      return m(".main-carousel.animated", [data.map(function (img) {
        mdl.addToCart.id(img.src);
        return m(".carousel-cell", m("img.Sirv", {
          'data-src': img.src
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
      }, m(".content", [data.title && m("h3.title", data.title), m(".description", [m("img.Sirv", {
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
        'data-src': data.src //`https://via.placeholder.com/${data.imgSrc}`,

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
      return m(".masonry", data.map(function (brick, idx) {
        return m(_brick["default"], {
          classList: "item ",
          data: brick,
          parent: _dom,
          idx: idx,
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

var _animations = require("Styles/animations");

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
        mdl.addToCart.show(product);
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
      return m(".frow", m(".frow content-center gutters row-between pt-20", [m(".col-sm-1-4", m("h2.pb-10", "$".concat(mdl.state.prices[product]))), m(".col-sm-1-4", m("label", m("input", {
        type: "number",
        inputmode: "numeric",
        pattern: "[0-9]*",
        placeholder: "quantity",
        value: state.quantity,
        oninput: function oninput(e) {
          return state.quantity = e.target.value;
        }
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
      }, "Unisex")]))), mdl.addToCart.show() == product && m(".animated", {
        oncreate: _animations.AddToCartOut,
        id: "add-to-cart-img",
        style: {
          "background-image": "url(".concat(mdl.addToCart.id(), ")")
        }
      }), m(".col-sm-1-4", m("button", {
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

;require.register("Components/cart-icon.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cjs = require("@mithril-icons/clarity/cjs");

var _ramda = require("ramda");

var _helpers = require("Utils/helpers");

var itemAddedToCart = function itemAddedToCart(mdl) {
  var res = "";

  if (mdl.addToCart.show()) {
    res = "ping";
    setTimeout(function () {
      res = "";
      mdl.addToCart.show(null);
      m.redraw();
    }, 500);
    return res;
  }
};

var CartIcon = function CartIcon() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".animated.clickable", {
        id: "cart-icon",
        onupdate: function onupdate() {
          return mdl.addToCart.show(null);
        },
        "class": itemAddedToCart(mdl),
        onclick: function onclick() {
          return mdl.state.showCartModal(true);
        }
      }, [m(_cjs.ShoppingBagLine, {
        width: "45px",
        height: "45px"
      }), (0, _helpers.getQuantity)((0, _helpers.toProducts)(mdl.cart)) ? m(".cart-pill", (0, _helpers.getQuantity)((0, _helpers.toProducts)(mdl.cart))) : null]);
    }
  };
};

var _default = CartIcon;
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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var handlers = function handlers(types, fn) {
  return types.reduce(function (acc, type) {
    return Object.assign(acc, _defineProperty({}, type, fn));
  }, {});
};

var showBorderStyle = function showBorderStyle(style) {
  style.border = "1px solid black";
  return style;
};

var hideBorderStyle = function hideBorderStyle(style) {
  style.border = "";
  return style;
};

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
        style: _objectSpread({}, handlers(["onmouseover", "onmouseout"], function (e) {
          console.log(e);
          return e.type == "mouseover" ? showBorderStyle(e.target.style) : hideBorderStyle(e.target.style);
        })),
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

;require.register("Components/paypal.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayPal = void 0;

var _data = _interopRequireDefault(require("data.task"));

var _Utils = require("Utils");

var _Models = require("Models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var makePaymentTask = function makePaymentTask(actions) {
  (0, _Utils.log)("makePaymentTask")();
  return new _data["default"](function (rej, res) {
    return actions.order.capture().then(res, rej);
  });
};

var formatInvoice = function formatInvoice(_ref) {
  var cart = _ref.cart,
      prices = _ref.state.prices;
  return function (_ref2) {
    var orderID = _ref2.orderID,
        payerID = _ref2.payerID;
    return function (details) {
      (0, _Utils.log)("formatInvoice")();
      return {
        orderID: orderID,
        payerID: payerID,
        purchaseTime: details.create_time,
        status: details.status,
        customer: details.payer,
        shipping: details.purchase_units[0].shipping,
        cart: cart,
        prices: prices
      };
    };
  };
};

var setTempUser = function setTempUser(user) {
  return sessionStorage.setItem("sb-user-token", user["user-token"]);
};

var unSetTempUser = function unSetTempUser() {
  return sessionStorage.clear();
};

var updateCartTask = function updateCartTask(mdl) {
  return function (_) {
    (0, _Utils.log)("formatInvoice")();
    mdl.cart = (0, _Utils.jsonCopy)(_Models.newCart);
    return (0, _Utils.saveStorageTask)(mdl)("sb-cart")(mdl.cart);
  };
};

var linkInvoiceUserTask = function linkInvoiceUserTask(mdl) {
  return function (user) {
    return function (invoice) {
      return mdl.http.backEnd.postTask(mdl)("data/Users/".concat(user.objectId, "/invoices%3AInvoices%3A1"))([invoice.objectId]);
    };
  };
};

var linkInvoiceUnregisteredTask = function linkInvoiceUnregisteredTask(mdl) {
  return function (invoice) {
    return mdl.http.backEnd.postTask(mdl)("users/login")({
      login: mdl.http.backEnd.unregistered.email,
      password: btoa(mdl.http.backEnd.unregistered.password)
    }).map(setTempUser).chain(function (_) {
      return saveInvoiceTask(mdl)(invoice);
    }).chain(linkInvoiceUserTask(mdl)(mdl.http.backEnd.unregistered)).map(unSetTempUser);
  };
};

var addInvoiceTask = function addInvoiceTask(mdl) {
  return function (invoice) {
    (0, _Utils.log)("formatInvoice")();
    return mdl.state.isAuth() ? saveInvoiceTask(mdl)(invoice).chain(linkInvoiceUserTask(mdl)(mdl.user)) : linkInvoiceUnregisteredTask(mdl)(invoice);
  };
};

var saveInvoiceTask = function saveInvoiceTask(mdl) {
  return function (invoice) {
    return mdl.http.backEnd.postTask(mdl)("data/Invoices")(invoice);
  };
};

var onSuccess = function onSuccess(mdl, state) {
  return function (_) {
    console.log("succc", state, _);
    state.isPaying = "success";
  };
};

var onError = function onError(state) {
  return function (error) {
    (0, _Utils.log)("state")(state);
    state.error = error;
    state.isPaying = "failed";
    console.log("error", error);
  };
};

var PayPal = function PayPal() {
  return {
    view: function view(_ref3) {
      var _ref3$attrs = _ref3.attrs,
          mdl = _ref3$attrs.mdl,
          state = _ref3$attrs.state;
      return m(".", {
        style: {
          maxHeight: "500px",
          overflowY: "auto",
          minWidth: "80vw"
        },
        oncreate: function oncreate(_ref4) {
          var dom = _ref4.dom;
          return paypal.Buttons({
            createOrder: function createOrder(_, actions) {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: (0, _Utils.getTotal)(mdl, (0, _Utils.toProducts)(mdl.cart))
                  }
                }]
              });
            },
            onApprove: function onApprove(data, actions) {
              state.isPaying = "start";
              (0, _Utils.log)("onapprove")(JSON.stringify(state));
              return makePaymentTask(actions).map(formatInvoice(mdl)(data)).chain(addInvoiceTask(mdl)).chain(updateCartTask(mdl)).fork(onError(state), onSuccess(mdl, state));
            }
          }).render(dom);
        }
      });
    }
  };
};

exports.PayPal = PayPal;
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

var _indexImages = require("index.images.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
          quantity = _ref3$attrs$gender[1],
          title = _ref3$attrs.title;

      return quantity ? m(".", [m("img", _objectSpread({
        style: {
          width: "100px"
        }
      }, _indexImages.productImages[title][0])), m("h4", "".concat(sex, " : ").concat(quantity))]) : null;
    }
  };
};

var Product = function Product(_ref4) {
  var _ref4$attrs = _ref4.attrs,
      mdl = _ref4$attrs.mdl,
      _ref4$attrs$p = _slicedToArray(_ref4$attrs.p, 2),
      title = _ref4$attrs$p[0],
      genders = _ref4$attrs$p[1];

  var amount = (0, _helpers.getQuantity)(genders);
  var price = (0, _helpers.getPrice)(mdl, title, genders);
  return {
    view: function view(_ref5) {
      var _ref5$attrs = _ref5.attrs,
          mdl = _ref5$attrs.mdl,
          _ref5$attrs$p = _slicedToArray(_ref5$attrs.p, 2),
          title = _ref5$attrs$p[0],
          genders = _ref5$attrs$p[1];

      return amount ? m(".frow column-start", [m("h3", "".concat(amount, " ").concat(title, " for $").concat(price)), m(".frow cart-item row-around", genders.map(function (gender) {
        return m(Gender, {
          mdl: mdl,
          gender: gender,
          title: title
        });
      }))]) : null;
    }
  };
};

var getTotal = function getTotal(mdl, products) {
  var getTotalPrice = (0, _helpers.getQuantity)(products.map(function (p) {
    return (0, _helpers.getPrice)(mdl, p[0], p[1]);
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
      }, [m("h1.title text-center", "Shopping Cart"), getTotal(mdl, products(mdl.cart)) ? m(_navLink.NavLink, {
        mdl: mdl,
        href: "/cart",
        classList: "".concat((0, _helpers.isActiveRoute)("/cart"), " para button m-0"),
        link: "Update Cart"
      }) : null, products(mdl.cart).map(function (p) {
        return m(Product, {
          mdl: mdl,
          p: p
        });
      }), getTotal(mdl, products(mdl.cart)) ? m(".frow ", m(_navLink.NavLink, {
        mdl: mdl,
        href: "/checkout",
        classList: "".concat((0, _helpers.isActiveRoute)("/checkout"), " para button m-0"),
        link: ["Proceed to Checkout", m("h1.bold text-center", "Total of ".concat((0, _helpers.getQuantity)(products(mdl.cart)), " for $").concat(getTotal(mdl, products(mdl.cart))))]
      })) : m(".frow centered-column", m("h1.bold", "Your Cart is Empty")),,]));
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

var isShowingProducts = function isShowingProducts(mdl) {
  return mdl.Routes.filter(function (r) {
    return r.route == mdl.state.route.route;
  })[0].children.map(function (r) {
    return mdl.Routes.filter((0, _ramda.propEq)("id", r))[0];
  }).any();
};

var isShowingRoutes = function isShowingRoutes(mdl) {
  return mdl.settings.screenSize !== "phone";
};

var getStyle = function getStyle(mdl) {
  return {
    marginTop: isShowingRoutes(mdl) ? isShowingProducts(mdl) ? "180px" : "140px" : isShowingProducts(mdl) ? "140px" : "100px"
  };
};

var PageTitle = function PageTitle() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          show = _ref$attrs.show,
          name = _ref$attrs.name;
      return show && m(".text-4x", m("h1.title.mb-20.text-center", name));
    }
  };
};

var Body = function Body() {
  return {
    view: function view(_ref2) {
      var _ref2$attrs = _ref2.attrs,
          mdl = _ref2$attrs.mdl,
          children = _ref2$attrs.children;
      return m(".body", {
        id: "body",
        style: getStyle(mdl)
      }, m(".frow centered-column items-stretch", [mdl.settings.screenSize !== "desktop" && mdl.state.showNavModal() && m(_navModal["default"], {
        oncreate: _animations.SlideInLeft,
        onbeforeremove: _animations.SlideOutRight,
        mdl: mdl
      }), mdl.state.showCartModal() && m(_cartModal["default"], {
        oncreate: _animations.SlideInRight,
        onbeforeremove: _animations.SlideOutLeft,
        mdl: mdl
      }), [m(PageTitle, {
        show: ![undefined, '/'].includes(m.route.get()),
        name: mdl.state.route.name
      }), children]]));
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
        onclick: function onclick() {// localStorage.clear()
          // sessionStorage.clear()
          // mdl.state.isAuth(false)
          // mdl.user = {}
          // mdl.cart = cart
          // m.route.set(m.route.get())
        },
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
  var NavRoutes = function NavRoutes(mdl) {
    return mdl.Routes.filter(function (r) {
      return r.group.includes("navbar");
    });
  };

  var SubNavRoutes = function SubNavRoutes(mdl) {
    return mdl.Routes.filter(function (r) {
      return r.group.includes("sub-navbar");
    });
  };

  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return [m(".navbar.navbar1", {
        id: "navbar"
      }, m("nav.frow row-around", NavRoutes(mdl).map(function (r) {
        return m(_navLink["default"], {
          mdl: mdl,
          href: r.route,
          link: r.name,
          classList: (0, _index.isActiveRoute)(r.route)
        });
      }))), m(".navbar.navbar2.hidden-xs", m("nav.frow row-around", SubNavRoutes(mdl).map(function (r) {
        return m(_navLink["default"], {
          mdl: mdl,
          href: r.route,
          link: r.name,
          classList: (0, _index.isActiveRoute)(r.route)
        });
      })))];
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

var _Hamburger = _interopRequireDefault(require("Components/Hamburger.js"));

var _Logo = _interopRequireDefault(require("Components/Logo"));

var _index = require("Utils/index.js");

var _cartIcon = _interopRequireDefault(require("Components/cart-icon"));

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
      }), m(_cartIcon["default"], {
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

var _Utils = require("Utils");

var _data = _interopRequireDefault(require("data.task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initApp = function initApp(_ref) {
  var mdl = _ref.attrs.mdl;
  return _data["default"].of(function (token) {
    return function (prices) {
      mdl.state.prices = prices;
      return token;
    };
  }).ap(mdl.http.backEnd.getTask(mdl)("users/isvalidusertoken/".concat(sessionStorage.getItem("sb-user-token")))).ap(mdl.http.store.getTask(mdl)("prices")).fork((0, _Utils.log)("e"), function (isValid) {
    (0, _Utils.log)("isValid")(mdl, isValid);
    isValid ? function () {} : m.route.set("/logout");
  });
};

var Layout = function Layout() {
  return {
    oninit: initApp,
    view: function view(_ref2) {
      var children = _ref2.children,
          mdl = _ref2.attrs.mdl;
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

;require.register("Models/Main.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../Routes/index.js"));

var _mockData = require("./mock-data");

var _Utils = require("Utils");

var _http = _interopRequireDefault(require("Utils/http"));

var _cart = require("./cart");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var currencies = {
  $: "US Dollar",
  "£": "British Pound"
};
var state = {
  prices: {// Wraps: 60,
    // "Christening Blankets": 100,
    // "Burp Rags": 60,
    // Collections: 85,
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
var addToCart = {
  id: Stream(null),
  show: Stream(null)
};
var Model = {
  currencies: currencies,
  addToCart: addToCart,
  http: _http["default"],
  Data: _mockData.Data,
  Routes: _index["default"],
  state: state,
  user: user,
  cart: (0, _Utils.jsonCopy)(_cart.newCart),
  data: data,
  errors: errors,
  settings: settings,
  paypal: {},
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

;require.register("Models/cart.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newCart = void 0;
var newCart = {
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
  },
  Collections: {
    Male: 0,
    Female: 0,
    Unisex: 0
  }
};
exports.newCart = newCart;
});

;require.register("Models/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;

var _cart = require("./cart.js");

Object.keys(_cart).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _cart[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cart[key];
    }
  });
});

var _states = require("./states.js");

Object.keys(_states).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _states[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _states[key];
    }
  });
});

var _Main = _interopRequireDefault(require("./Main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _Main["default"];
exports["default"] = _default;
});

;require.register("Models/mock-data.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Data = void 0;

var _ramda = require("ramda");

var _Utils = require("Utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

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

;require.register("Models/states.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stateDict = exports.states = void 0;
var states = {
  AL: "Alabama",
  AK: "Alaska",
  AS: "American Samoa",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District Of Columbia",
  FM: "Federated States Of Micronesia",
  FL: "Florida",
  GA: "Georgia",
  GU: "Guam",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MH: "Marshall Islands",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  MP: "Northern Mariana Islands",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PW: "Palau",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VI: "Virgin Islands",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming"
};
exports.states = states;

var stateDict = function stateDict(state) {
  return states[state];
};

exports.stateDict = stateDict;
});

;require.register("Pages/Account/address.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountAddress = void 0;

var _Models = require("Models");

var _cjs = require("@mithril-icons/clarity/cjs");

var submitAddressTask = function submitAddressTask(mdl) {
  return function (data) {
    return mdl.http.backEnd.putTask(mdl)("data/Accounts/".concat(mdl.user.account.objectId))({
      address: JSON.stringify(data)
    });
  };
};

var AccountAddress = function AccountAddress(_ref) {
  var mdl = _ref.attrs.mdl;
  var state = {
    address: {
      street1: "",
      street2: "",
      city: "",
      state: "",
      zip: ""
    },
    editAddress: Stream(false),
    showAddress: Stream(false),
    errors: {}
  };

  var toggleEditAddress = function toggleEditAddress(state) {
    return state.editAddress(!state.editAddress());
  };

  var submitAddress = function submitAddress(mdl) {
    return function (state) {
      var onError = function onError(errors) {
        return console.log("e", e);
      };

      var onSuccess = function onSuccess(mdl) {
        return function (s) {
          mdl.user.address = JSON.parse(s.address);
        };
      };

      submitAddressTask(mdl)(state.address).fork(onError, onSuccess(mdl));
    };
  };

  state.address = mdl.user.address;

  if (state.address) {
    state.showAddress(true);
    state.editAddress(false);
  } else {
    state.address = {};
    state.showAddress(false);
    state.editAddress(false);
  }

  return {
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return m("section.m-5", [m("span.frow row-start", m("h3.pr-10", "Shipping Address"), m(_cjs.PencilLine, {
        "class": "clickable",
        onclick: function onclick() {
          return toggleEditAddress(state);
        },
        width: "16px"
      }), Object.keys(state.address).length ? m("pre", "".concat(state.address.street1, " ").concat(state.address.street2 || "", " ").concat(state.address.city, " ").concat(state.address.state, " ").concat(state.address.zip)) : m("h4", "No Address on File")), state.editAddress() && m("form.frow column-start m-5 px-20", {
        oninput: function oninput(e) {
          console.log(mdl, state);
          state.address[e.target.id] = e.target.value;
        }
      }, [m("input.col-xs-1-2", {
        type: "text",
        id: "street1",
        placeholder: "street1",
        value: state.address.street1
      }), m("input.col-xs-1-2", {
        type: "text",
        id: "street2",
        placeholder: "street2",
        value: state.address.street2
      }), m(".frow row", [m("input.col-xs-1-3", {
        type: "text",
        id: "city",
        placeholder: "city",
        value: state.address.city
      }), m(".col-xs-1-3", m("select", {
        id: "state",
        placeholder: "state",
        value: state.address.state || "state"
      }, Object.keys(_Models.states).map(function (state) {
        return [m("option", {
          key: "placeholder",
          value: "state"
        }, "state"), m("option", {
          key: state,
          placeholder: "state",
          value: (0, _Models.stateDict)(state)
        }, "".concat((0, _Models.stateDict)(state)))];
      }), state.address.state || "state")), m("input.col-xs-1-3", {
        type: "number",
        inputmode: "numeric",
        pattern: "[0-9]*",
        id: "zip",
        value: state.address.zip,
        placeholder: "zip"
      })]), m("a.button", {
        type: "submit",
        "class": "clickable",
        onclick: function onclick() {
          return submitAddress(mdl)(state);
        }
      }, "Submit")])]);
    }
  };
};

exports.AccountAddress = AccountAddress;
});

;require.register("Pages/Account/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _address = require("./address.js");

var _orders = require("./orders.js");

var _prices = require("./prices.js");

var Account = function Account() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".frow-container frow-center", [m("h2", "Welcome ", mdl.user.name), m(_address.AccountAddress, {
        mdl: mdl
      }), m(_orders.PastOrders, {
        mdl: mdl
      }), m(_prices.PriceAdjustment, {
        mdl: mdl
      }), m("section"), m("section")]);
    }
  };
};

var _default = Account;
exports["default"] = _default;
});

;require.register("Pages/Account/orders.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PastOrders = void 0;

var _Utils = require("Utils");

var _cjs = require("@mithril-icons/clarity/cjs");

var _ramda = require("ramda");

var state = {
  invoices: []
};

var calcProductPrice = function calcProductPrice(_ref, product) {
  var prices = _ref.prices,
      cart = _ref.cart;
  return parseInt(prices[product]) * Object.values(cart[product]).reduce(_ramda.add, 0);
};

var calcTotalPrice = function calcTotalPrice(invoice) {
  return Object.keys(invoice.cart).map(function (product) {
    return calcProductPrice(invoice, product);
  }).reduce(_ramda.add, 0);
};

var invoiceUrl = function invoiceUrl(mdl) {
  (0, _Utils.log)("mdl")(mdl);
  return mdl.user.isAdmin ? "data/Invoices" : "data/Invoices?where=ownerId%3D'".concat(mdl.user.objectId, "'");
};

var fetchInvoicesTask = function fetchInvoicesTask(mdl) {
  return mdl.http.backEnd.getTask(mdl)(invoiceUrl(mdl)).map((0, _ramda.map)((0, _ramda.assoc)("isSelected", false)));
};

var onFetchInvoiceError = function onFetchInvoiceError(mdl) {
  return function (e) {
    return console.log("e", e, mdl);
  };
};

var onFetchInvoiceSuccess = function onFetchInvoiceSuccess(_) {
  return function (invoices) {
    return state.invoices = invoices;
  };
};

var fetchInvoices = function fetchInvoices(_ref2) {
  var mdl = _ref2.attrs.mdl;
  return fetchInvoicesTask(mdl).fork(onFetchInvoiceError(mdl), onFetchInvoiceSuccess(mdl));
};

var PastOrders = function PastOrders() {
  return {
    oninit: fetchInvoices,
    view: function view(_ref3) {
      var mdl = _ref3.attrs.mdl;
      return m("section", [m("h3", "Past Orders"), m("table", [m("thead", m("tr", [m("th", "Date"), m("th", "order Id"), m("th", "shipping"), m("th", "payment status"), m("th")])), state.invoices.map(function (invoice) {
        return m("tbody", [m("tr", [m("td", invoice.purchaseTime), m("td", invoice.orderID), m("td", "".concat(invoice.shipping.name.full_name, " ").concat(invoice.shipping.address.address_line_1, " ").concat(invoice.shipping.address.admin_area_2, " ").concat(invoice.shipping.address.admin_area_1, " ").concat(invoice.shipping.address.postal_code)), m("td", invoice.status), m("td", m(_cjs.AngleLine, {
          "class": "clickable ".concat(!invoice.isSelected && "point-down"),
          onclick: function onclick() {
            return invoice.isSelected = !invoice.isSelected;
          },
          width: "16px"
        }))]), invoice.isSelected && m("table", [m("thead", [m("th", "product"), m("th", "quantities"), m("th", "unit price"), m("th", "unit total")]), m("tbody", Object.keys(invoice.cart).map(function (product) {
          return m("tr", [m("td", product), m("td", JSON.stringify(invoice.cart[product])), m("td", invoice.prices[product]), m("td", calcProductPrice(invoice, product))]);
        }), m("tr", m("th", "Order Total"), m("th", calcTotalPrice(invoice))))])]);
      })])]);
    }
  };
};

exports.PastOrders = PastOrders;
});

;require.register("Pages/Account/prices.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PriceAdjustment = void 0;

var _Utils = require("Utils");

var Prices = function Prices(mdl) {
  (0, _Utils.log)("priies")(mdl);
  return Object.keys(mdl.state.prices).map(function (product) {
    return m("label", product, m("input", {
      type: "number",
      value: mdl.state.prices[product],
      onchange: function onchange(e) {
        return mdl.state.prices[product] = e.target.value;
      }
    }));
  });
};

var PriceAdjustment = function PriceAdjustment() {
  var getPrices = function getPrices(_ref) {
    var mdl = _ref.attrs.mdl;
    return mdl.http.store.getTask(mdl)("prices").fork((0, _Utils.log)("error"), function (_ref2) {
      var prices = _ref2.prices;
      return mdl.state.prices = prices;
    });
  };

  var updatePrices = function updatePrices(mdl) {
    return mdl.http.store.putTask(mdl)("prices")({
      prices: mdl.state.prices
    }).fork((0, _Utils.log)("error"), function (_ref3) {
      var prices = _ref3.prices;
      return mdl.state.prices = prices;
    });
  };

  return {
    // oninit: getPrices,
    view: function view(_ref4) {
      var mdl = _ref4.attrs.mdl;
      return m("section", [m("h3", "Prices"), Prices(mdl), m("button", {
        onclick: function onclick(e) {
          return updatePrices(mdl);
        }
      }, "update prices")]);
    }
  };
};

exports.PriceAdjustment = PriceAdjustment;
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
    mdl.user.address = JSON.parse(accnts[0].address);
    mdl.cart = cart;
    setUserToken(mdl)(mdl.user);
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
      password: btoa(password)
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
      password: btoa(password),
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
        id: "login-form",
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
      return [m(".frow centered pt-30", [state.showErrorMsg() && m("code.warning", state.errorMsg()), m("form.frow-container frow-center", {
        role: "form",
        id: "register-form",
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

;require.register("Pages/Collections.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Flicker = _interopRequireDefault(require("Components/Flicker.js"));

var _Selector = _interopRequireDefault(require("Components/Selector.js"));

var _indexImages = require("index.images.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Collections = function Collections() {
  var state = {
    errors: {},
    data: _indexImages.collectionImgs
  };
  return {
    onremove: function onremove() {
      state.errors = {};
      state.data = [];
    },
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".frow-container frow-center", [m(".mb-30", {
        id: "collections"
      }, [m(_Flicker["default"], {
        mdl: mdl,
        data: state.data
      }), m(".mt-20", m(_Selector["default"], {
        mdl: mdl,
        product: "Collections"
      })), m("ul", [m("li.pb-10", "Each Collection comprise of hand selected blankets and burp rags"), m("li.pb-10", "Each guranteed to be one of a kind"), m("li.pb-10", 'Double sided Flannel burp cloths 21" x 12"'), m("li.pb-10", "Thick and absorbent!"), m("li.pb-10", "No two cloths are the same!"), m("li.pb-10", "Proudly made in Houston Texas USA")]), m("p.pb-10", "Gender neutral sets are available in gray, cream or yellow/ green. Please specify when ordering.")])]);
    }
  };
};

var _default = Collections;
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

var _indexImages = require("index.images.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Blankets = function Blankets() {
  var state = {
    errors: {},
    data: _indexImages.blanketImgs
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
      }, [m(".text-2halfx", m("h2.pb-10", "Wraps")), m(_Flicker["default"], {
        mdl: mdl,
        data: state.data
      }), m(".mt-20", m(_Selector["default"], {
        mdl: mdl,
        product: "Wraps"
      })), m("ul", [m("li.pb-10", 'Handcrafted 100% Pure Wool Carriage style Blanket 21" x 18"'), m("li.pb-10", "Machine wash and tumble dry."), m("li.pb-10", "Proudly made in Houston Texas USA")])]), m(".mb-30", {
        id: "christening"
      }, m(".text-2halfx", m("h2.pb-10", "Christening Blankets")), m(_Flicker["default"], {
        mdl: mdl,
        data: state.data
      }), m(".mt-20", m(_Selector["default"], {
        mdl: mdl,
        product: "Christening Blankets"
      })), m("ul", [m("li.pb-10", 'Handcrafted 100% Pure Wool Christening style Blanket 21" x 18"'), m("li.pb-10", "This is a specialty blanket not for general use. Care has been taken to secure the pearls and crystals."), m("li.pb-10", "babies should be supervised at all times when this blanket is in use."), m("li.pb-10", "Proudly made in Houston Texas USA")]))]);
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

var _indexImages = require("index.images.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BurpRags = function BurpRags() {
  var state = {
    errors: {},
    data: _indexImages.burpImgs
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
      }, [m(_Flicker["default"], {
        mdl: mdl,
        data: state.data
      }), m(".mt-20", m(_Selector["default"], {
        mdl: mdl,
        product: "Burp Rags"
      })), m("ul", [m("li.pb-10", "Set of 7 handcrafted burp rags"), m("li.pb-10", "Each guranteed to be one of a kind"), m("li.pb-10", 'Double sided Flannel burp cloths 21" x 12"'), m("li.pb-10", "Thick and absorbent!"), m("li.pb-10", "No two cloths are the same!"), m("li.pb-10", "Proudly made in Houston Texas USA")]), m("p.pb-10", "Gender neutral sets are available in gray, cream or yellow/ green. Please specify when ordering.")])]);
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

var _navLink = require("Components/nav-link");

var _Utils = require("Utils");

var _indexImages = require("index.images.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var saveToStorage = function saveToStorage(mdl) {
  var onError = function onError(e) {
    return console.log("Error saving", e);
  };

  var onSuccess = function onSuccess(s) {
    console.log("success saving", s);
  };

  (0, _Utils.saveStorageTask)(mdl)("sb-cart")(mdl.cart).fork(onError, onSuccess);
};

var addToCart = function addToCart(mdl) {
  return function (product, sex, quantity) {
    console.log(product, sex, quantity);
    mdl.cart[product][sex] = parseInt(quantity) ? parseInt(quantity) : 0;
    saveToStorage(mdl);
  };
};

var Gender = function Gender() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          product = _ref$attrs.product,
          _ref$attrs$gender = _slicedToArray(_ref$attrs.gender, 2),
          sex = _ref$attrs$gender[0],
          quantity = _ref$attrs$gender[1];

      console.log("pp", (0, _Utils.randomEl)(_indexImages.productImages[product]));
      return quantity ? m(".animated.frow row-around mt-10", [m("img", _objectSpread({
        style: {
          width: "100px"
        }
      }, _indexImages.productImages[product][0])), // m(
      // ".col-xs-1-4",
      m("label.col-xs-1-4", m("h4", "".concat(sex)), m("input", {
        type: "number",
        inputmode: "numeric",
        min: 0,
        placeholder: "quantity",
        value: quantity,
        onchange: function onchange(e) {
          return addToCart(mdl)(product, sex, e.target.value);
        },
        pattern: "[0-9]*"
      }) // )
      )]) : null;
    }
  };
};

var Product = function Product() {
  return {
    view: function view(_ref2) {
      var _ref2$attrs = _ref2.attrs,
          mdl = _ref2$attrs.mdl,
          _ref2$attrs$p = _slicedToArray(_ref2$attrs.p, 2),
          title = _ref2$attrs$p[0],
          genders = _ref2$attrs$p[1];

      return (0, _Utils.getQuantity)(genders) ? m(".frow mt-10 items-baseline justify-evenly", [m("h2", "".concat(title, "  ")), m("h4", "($".concat(mdl.state.prices[title], ")")), m(".animated.frow cart-item column-start", genders.map(function (gender) {
        return m(Gender, {
          mdl: mdl,
          gender: gender,
          product: title
        });
      }))]) : null;
    }
  };
};

var Cart = function Cart(_ref3) {
  var mdl = _ref3.attrs.mdl;
  return {
    oninit: function oninit(_ref4) {
      var mdl = _ref4.attrs.mdl;
      return mdl.state.showNavModal(false);
    },
    view: function view(_ref5) {
      var mdl = _ref5.attrs.mdl;
      return m(".animated.frow-container frow-center", [(0, _Utils.toProducts)(mdl.cart).map(function (p) {
        return m(Product, {
          mdl: mdl,
          p: p
        });
      }), (0, _Utils.getTotal)(mdl, (0, _Utils.toProducts)(mdl.cart)) ? m(".frow centered-column", m(_navLink.NavLink, {
        mdl: mdl,
        href: "/checkout",
        classList: "".concat((0, _Utils.isActiveRoute)("/checkout"), " button para mt-20"),
        link: ["Proceed to Checkout", m("h1.bold text-center white", "Total of ".concat((0, _Utils.getQuantity)((0, _Utils.toProducts)(mdl.cart)), " for $").concat((0, _Utils.getTotal)(mdl, (0, _Utils.toProducts)(mdl.cart))))]
      })) : m("h1.bold", "Your Cart is Empty")]);
    }
  };
};

var _default = Cart;
exports["default"] = _default;
});

;require.register("Pages/checkout.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _navLink = require("Components/nav-link");

var _paypal = require("Components/paypal");

var _helpers = require("Utils/helpers");

var _indexImages = require("index.images.js");

var _LogoLoader = _interopRequireDefault(require("Components/LogoLoader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Gender = function Gender() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          _ref$attrs$gender = _slicedToArray(_ref$attrs.gender, 2),
          sex = _ref$attrs$gender[0],
          quantity = _ref$attrs$gender[1],
          title = _ref$attrs.title;

      return quantity ? m(".", [m("img", _objectSpread({
        style: {
          width: "100px"
        }
      }, _indexImages.productImages[title][0])), m("h4", "".concat(sex, " : ").concat(quantity))]) : null;
    }
  };
};

var Product = function Product() {
  return {
    view: function view(_ref2) {
      var _ref2$attrs = _ref2.attrs,
          mdl = _ref2$attrs.mdl,
          _ref2$attrs$p = _slicedToArray(_ref2$attrs.p, 2),
          title = _ref2$attrs$p[0],
          genders = _ref2$attrs$p[1];

      var amount = (0, _helpers.getQuantity)(genders);
      var price = (0, _helpers.getPrice)(mdl, title, genders);
      return amount ? m(".frow column-start mt-10", [m("span.underline", m("h3.mb-10", "".concat(amount, " ").concat(title, " for $").concat(price))), m(".frow cart-item row-around", genders.map(function (gender) {
        return m(Gender, {
          mdl: mdl,
          gender: gender,
          title: title
        });
      }))]) : null;
    }
  };
};

var Checkout = function Checkout(_ref3) {
  var mdl = _ref3.attrs.mdl;
  var state = {
    isPaying: null
  };
  return {
    oninit: function oninit(_ref4) {
      var mdl = _ref4.attrs.mdl;
      return mdl.state.showNavModal(false);
    },
    view: function view(_ref5) {
      var mdl = _ref5.attrs.mdl;
      return m(".frow-container frow-center", [(0, _helpers.getTotal)(mdl, (0, _helpers.toProducts)(mdl.cart)) ? m(_navLink.NavLink, {
        mdl: mdl,
        href: "/cart",
        classList: "".concat((0, _helpers.isActiveRoute)("/cart"), " para button m-0"),
        link: "Update Cart"
      }) : null, (0, _helpers.toProducts)(mdl.cart).map(function (p) {
        return m(Product, {
          mdl: mdl,
          p: p
        });
      }), (0, _helpers.getTotal)(mdl, (0, _helpers.toProducts)(mdl.cart)) ? [m("h1.bold text-center.mt-20.mb-20", "Total of ".concat((0, _helpers.getQuantity)((0, _helpers.toProducts)(mdl.cart)), " for $").concat((0, _helpers.getTotal)(mdl, (0, _helpers.toProducts)(mdl.cart)))), state.isPaying == "start" && m(_LogoLoader["default"]), m(_paypal.PayPal, {
        mdl: mdl,
        state: state
      })] : m("h1.bold", "Your Cart is Empty")]);
    }
  };
};

var _default = Checkout;
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

var _indexImages = require("index.images.js");

var _animations = require("Styles/animations");

var Home = function Home() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".frow frow-center justify-evenly", {
        id: "home-page"
      }, _indexImages.frontImgs.map(function (img) {
        return m('.img', m('img.Sirv', {
          oncreate: _animations.SlideUp,
          'data-src': img.src
        }));
      }));
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

var _index = _interopRequireDefault(require("Pages/Account/index.js"));

var _index2 = _interopRequireDefault(require("Layouts/index.js"));

var _Utils = require("Utils");

var _cart = require("Models/cart");

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
    return m(_index2["default"], {
      mdl: mdl
    }, m(_index["default"], {
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
    return m(_index2["default"], {
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
    return m(_index2["default"], {
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
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    localStorage.clear();
    sessionStorage.clear();
    mdl.cart = (0, _Utils.jsonCopy)(_cart.newCart);
    mdl.state.isAuth(false);
    mdl.user = {};
    m.route.set(m.route.get());
    console.log("loggout", mdl);
  },
  component: function component(mdl) {
    return m(_index2["default"], {
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

var _Collections = _interopRequireDefault(require("Pages/Collections.js"));

var _home = _interopRequireDefault(require("Pages/home.js"));

var _cart = _interopRequireDefault(require("Pages/cart.js"));

var _checkout = _interopRequireDefault(require("Pages/checkout.js"));

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
    }, m(_checkout["default"], {
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
  id: "collections",
  name: "Collections",
  // icon: Icons.search,
  route: "/collections",
  isNav: false,
  group: ["navbar", "collections"],
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
    }, m(_Collections["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "wraps-blankets",
  name: "Wraps",
  // icon: Icons.search,
  route: "/blankets/#wraps",
  isNav: false,
  group: ["nav", "blankets"],
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
  group: ["nav", "blankets"],
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
}, // {
//   id: "blog",
//   name: "Blog",
//   // icon: Icons.home,
//   route: "/blog",
//   isNav: true,
//   group: ["footer", "menu", "sub-navbar"],
//   children: [],
//   options: [],
//   onmatch: (mdl, args, path, fullroute, isAnchor) => {
//     isAnchor
//       ? scrollToAnchor(mdl.state.anchor)
//       : window.scroll({
//           top: 0,
//           left: 0,
//           behavior: "smooth",
//         })
//   },
//   component: (mdl) => m(Layout, { mdl }, m(Blog, { mdl })),
// },
{
  id: "about-us",
  name: "About Us",
  // icon: Icons.home,
  route: "/about-us",
  isNav: true,
  group: ["footer", "sub-navbar"],
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
  group: ["footer", "sub-navbar"],
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
  group: ["footer", "menu", "sub-navbar"],
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
exports.RemoveChildrenOut = exports.animate = exports.SlideChildrenInDown = exports.StretchInLeft = exports.SlideChildrenInRight = exports.SlideUp = exports.SlideDown = exports.SlideOutLeft = exports.SlideOutRight = exports.AddToCartOut = exports.AddToCart = exports.SlideInRight = exports.SlideInLeft = exports.SlideInUp = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var SlideInUp = function SlideInUp(_ref) {
  var dom = _ref.dom;
  return dom.classList.toggle("slideInUp");
};

exports.SlideInUp = SlideInUp;

var SlideInLeft = function SlideInLeft(_ref2) {
  var dom = _ref2.dom;
  return dom.classList.toggle("slideInLeft");
};

exports.SlideInLeft = SlideInLeft;

var SlideInRight = function SlideInRight(_ref3) {
  var dom = _ref3.dom;
  return dom.classList.toggle("slideInRight");
};

exports.SlideInRight = SlideInRight;

var AddToCart = function AddToCart(_ref4) {
  var dom = _ref4.dom;
  return dom.classList.toggle("slide-out-tr");
};

exports.AddToCart = AddToCart;

var AddToCartOut = function AddToCartOut(_ref5) {
  var dom = _ref5.dom;
  AddToCart({
    dom: dom
  });
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, 500);
  });
};

exports.AddToCartOut = AddToCartOut;

var SlideOutRight = function SlideOutRight(_ref6) {
  var dom = _ref6.dom;
  dom.classList.replace("slideInLeft", "slideOutLeft");
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, 300);
  });
};

exports.SlideOutRight = SlideOutRight;

var SlideOutLeft = function SlideOutLeft(_ref7) {
  var dom = _ref7.dom;
  dom.classList.replace("slideInRight", "slideOutRight");
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, 300);
  });
};

exports.SlideOutLeft = SlideOutLeft;

var SlideDown = function SlideDown(_ref8) {
  var dom = _ref8.dom;
  dom.style.opacity = 0;
  dom.classList.toggle("slideInDown");
  dom.style.opacity = 1;
};

exports.SlideDown = SlideDown;

var SlideUp = function SlideUp(_ref9) {
  var dom = _ref9.dom;
  dom.classList.replace("slideInDown", "slideOutUp");
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, 300);
  });
};

exports.SlideUp = SlideUp;

var SlideChildrenInRight = function SlideChildrenInRight(_ref10) {
  var dom = _ref10.dom;

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
  return function (_ref11) {
    var dom = _ref11.dom;
    dom.style.opacity = 0;
    return setTimeout(function () {
      dom.classList.toggle("stretchRight");
      dom.style.opacity = 1;
    }, idx * 100 + 20);
  };
};

exports.StretchInLeft = StretchInLeft;

var SlideChildrenInDown = function SlideChildrenInDown(idx) {
  return function (_ref12) {
    var dom = _ref12.dom;
    dom.style.opacity = 0;
    setTimeout(function () {
      dom.classList.toggle("slideDown");
      dom.style.opacity = 1;
    }, (idx + 1) * 200);
  };
};

exports.SlideChildrenInDown = SlideChildrenInDown;

var animate = function animate(dir) {
  return function (_ref13) {
    var dom = _ref13.dom;
    dom.style.opacity = 0;
    setTimeout(function () {
      dom.classList.toggle(dir);
      dom.style.opacity = 1;
    }, 200);
  };
};

exports.animate = animate;

var RemoveChildrenOut = function RemoveChildrenOut(_ref14) {
  var dom = _ref14.dom;
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

;require.register("Utils/helpers.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTotal = exports.getQuantity = exports.getPrice = exports.toProducts = exports.uuid = exports.isActiveRoute = exports.jsonCopy = exports.randomEl = exports.scrollToAnchor = exports.getRoute = exports.debounce = exports.filterTask = exports._paginate = exports._direction = exports._sort = exports._search = exports.addTerms = exports.infiniteScroll = exports.isEmpty = exports.log = exports.makeRoute = void 0;

var _ramda = require("ramda");

var _data = _interopRequireDefault(require("data.task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var randomEl = function randomEl(list) {
  return list[Math.floor(Math.random() * list.length)];
};

exports.randomEl = randomEl;

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

var toProducts = function toProducts(cart) {
  return (0, _ramda.toPairs)(cart).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        product = _ref2[0],
        genders = _ref2[1];

    return [product, (0, _ramda.toPairs)(genders)];
  });
};

exports.toProducts = toProducts;

var getPrice = function getPrice(mdl, title, genders) {
  return mdl.state.prices[title] * getQuantity(genders);
};

exports.getPrice = getPrice;

var getQuantity = function getQuantity(xs) {
  return (0, _ramda.reduce)(_ramda.add, 0, (0, _ramda.filter)((0, _ramda.compose)((0, _ramda.equals)("Number"), _ramda.type), (0, _ramda.flatten)(xs)));
};

exports.getQuantity = getQuantity;

var getTotal = function getTotal(mdl, products) {
  return getQuantity(products.map(function (p) {
    return getPrice(mdl, p[0], p[1]);
  }));
};

exports.getTotal = getTotal;
});

;require.register("Utils/http.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.parseHttpSuccess = exports.parseHttpError = void 0;

var _data = _interopRequireDefault(require("data.task"));

var _secrets = require("../../.secrets.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var updatePayPalAuth = function updatePayPalAuth(mdl) {
  return function (paypal) {
    return mdl.state.paypal = paypal;
  };
};

var onProgress = function onProgress(mdl) {
  return function (e) {
    if (e.lengthComputable) {
      mdl.state.loadingProgress.max = e.total;
      mdl.state.loadingProgress.value = e.loaded;
      m.redraw();
    }
  };
};

function onLoad() {
  return false;
}

var onLoadStart = function onLoadStart(mdl) {
  return function (e) {
    mdl.state.isLoading(true);
    return false;
  };
};

var onLoadEnd = function onLoadEnd(mdl) {
  return function (e) {
    mdl.state.isLoading(false);
    mdl.state.loadingProgress.max = 0;
    mdl.state.loadingProgress.value = 0;
    return false;
  };
};

var xhrProgress = function xhrProgress(mdl) {
  return {
    config: function config(xhr) {
      xhr.onprogress = onProgress(mdl);
      xhr.onload = onLoad;
      xhr.onloadstart = onLoadStart(mdl);
      xhr.onloadend = onLoadEnd(mdl);
    }
  };
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
            }, xhrProgress(mdl))).then(parseHttpSuccess(mdl)(res), parseHttpError(mdl)(rej));
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

var backEndUrl = "".concat(_secrets.BackEnd.baseUrl, "/").concat(_secrets.BackEnd.APP_ID, "/").concat(_secrets.BackEnd.API_KEY, "/");
var backEnd = {
  unregistered: _secrets.BackEnd.unregistered,
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
var paypalUrl = "".concat(_secrets.Paypal.sandbox.baseUrl, "/");
var paypal = {
  getTokenTask: function getTokenTask(mdl) {
    return HttpTask(_secrets.Paypal.sandbox.headers())("POST")(mdl)(paypalUrl + "v1/oauth2/token/")("grant_type=client_credentials").map(updatePayPalAuth(mdl));
  },
  getTask: function getTask(mdl) {
    return function (url) {
      return HttpTask(_secrets.Paypal.sandbox.headers(mdl))("GET")(mdl)(paypalUrl + url)(null);
    };
  },
  postTask: function postTask(mdl) {
    return function (url) {
      return function (dto) {
        return HttpTask(_secrets.Paypal.sandbox.headers(mdl))("POST")(mdl)(paypalUrl + url)(dto);
      };
    };
  },
  putTask: function putTask(mdl) {
    return function (url) {
      return function (dto) {
        return HttpTask(_secrets.Paypal.sandbox.headers(mdl))("PUT")(mdl)(paypalUrl + url)(dto);
      };
    };
  }
};
var store = {
  baseurl: "https://sette-bambini.herokuapp.com/",
  getTask: function getTask(mdl) {
    return function (url) {
      return HttpTask()("GET")(mdl)(store.baseurl + url)(null);
    };
  },
  postTask: function postTask(mdl) {
    return function (url) {
      return function (dto) {
        return HttpTask()("POST")(mdl)(store.baseurl + url)(dto);
      };
    };
  },
  putTask: function putTask(mdl) {
    return function (url) {
      return function (dto) {
        return HttpTask()("PUT")(mdl)(store.baseurl + url)(dto);
      };
    };
  }
};
var http = {
  store: store,
  backEnd: backEnd,
  paypal: paypal,
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
  if (key in exports && exports[key] === _helpers[key]) return;
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
  if (key in exports && exports[key] === _http[key]) return;
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
  if (key in exports && exports[key] === _validation[key]) return;
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
  if (key in exports && exports[key] === _storage[key]) return;
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
exports.saveStorageTask = exports.getDbStorageTask = exports.saveDbStorageTask = exports.saveLocalStorageTask = exports.getSessionStorageTask = exports.getLocalStorageTask = void 0;

var _data = _interopRequireDefault(require("data.task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getLocalStorageTask = function getLocalStorageTask(key) {
  return new _data["default"](function (rej, res) {
    return localStorage.getItem(key) ? rej("nothing here") : res(localStorage.getItem(key));
  });
};

exports.getLocalStorageTask = getLocalStorageTask;

var getSessionStorageTask = function getSessionStorageTask(key) {
  return new _data["default"](function (rej, res) {
    return sessionStorage.getItem(key) ? rej("nothing here") : res(sessionStorage.getItem(key));
  });
};

exports.getSessionStorageTask = getSessionStorageTask;

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
  return mdl.http.backEnd.gettTask(mdl)("data/Accounts/".concat(mdl.user.account.objectId));
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

;require.register("index.images.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frontImgs = exports.productImages = exports.burpImgs = exports.blanketImgs = exports.collectionImgs = void 0;
var collectionImgs = [{
  src: "https://sette-bambini.sirv.com/Images/collection1.jpg?scale.option=fill&format=webp"
}, {
  src: "https://sette-bambini.sirv.com/Images/collection2.jpg?scale.option=fill&format=webp"
}, {
  src: "https://sette-bambini.sirv.com/Images/collection3.jpg?scale.option=fill&format=webp"
}, {
  src: "https://sette-bambini.sirv.com/Images/collection4.jpg?scale.option=fill&format=webp"
}, {
  src: "https://sette-bambini.sirv.com/Images/collection5.jpg?scale.option=fill&format=webp"
}, {
  src: "https://sette-bambini.sirv.com/Images/collection6.jpg?scale.option=fill&format=webp"
}, {
  src: "https://sette-bambini.sirv.com/Images/collection7.jpg?scale.option=fill&format=webp"
}, {
  src: "https://sette-bambini.sirv.com/Images/collection8.jpg?scale.option=fill&format=webp"
}, {
  src: "https://sette-bambini.sirv.com/Images/collection9.jpg?scale.option=fill&format=webp"
}, {
  src: "https://sette-bambini.sirv.com/Images/collection10.jpg?scale.option=fill&format=webp"
}];
exports.collectionImgs = collectionImgs;
var blanketImgs = [{
  src: "https://sette-bambini.sirv.com/Images/blankets1.jpg?scale.option=fill&format=webp"
}, {
  src: "https://sette-bambini.sirv.com/Images/blankets2.jpg?scale.option=fill&format=webp"
}, {
  src: "https://sette-bambini.sirv.com/Images/blankets3.jpg?scale.option=fill&format=webp"
}, {
  src: "https://sette-bambini.sirv.com/Images/blankets4.jpg?scale.option=fill&format=webp"
}];
exports.blanketImgs = blanketImgs;
var burpImgs = [{
  src: "https://sette-bambini.sirv.com/Images/burp1.jpg?scale.option=fill&format=webp"
}, {
  src: "https://sette-bambini.sirv.com/Images/burp2.jpg?scale.option=fill&format=webp"
}, {
  src: "https://sette-bambini.sirv.com/Images/burp3.jpg?scale.option=fill&format=webp"
}, {
  src: "https://sette-bambini.sirv.com/Images/burp4.jpg?scale.option=fill&format=webp"
}];
exports.burpImgs = burpImgs;
var productImages = {
  Wraps: blanketImgs,
  "Christening Blankets": blanketImgs,
  "Burp Rags": burpImgs,
  Collections: collectionImgs
};
exports.productImages = productImages;
var frontImgs = [].concat(burpImgs, blanketImgs, collectionImgs);
exports.frontImgs = frontImgs;
});

;require.register("index.js", function(exports, require, module) {
"use strict";

var _app = _interopRequireDefault(require("./app.js"));

var _index = _interopRequireDefault(require("Models/index.js"));

var _funConfig = require("@boazblake/fun-config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_funConfig.FunConfig.configure();

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
    var lastProfile = _index["default"].settings.screenSize;
    _index["default"].settings.screenSize = getProfile(w);
    if (lastProfile != _index["default"].settings.screenSize) m.redraw();
  }

  return requestAnimationFrame(checkWidth);
};

_index["default"].settings.screenSize = getProfile(winW);
checkWidth(winW);

if (sessionStorage.getItem("sb-user")) {
  _index["default"].user = JSON.parse(sessionStorage.getItem("sb-user"));

  _index["default"].state.isAuth(true);
}

if (localStorage.getItem("sb-cart")) {
  _index["default"].cart = JSON.parse(localStorage.getItem("sb-cart"));
}

m.route(root, "/", (0, _app["default"])(_index["default"]));
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  require("./index.js");
});
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.m = require("mithril");
window.Stream = require("mithril-stream");


});})();require('___globals___');


//# sourceMappingURL=app.js.map