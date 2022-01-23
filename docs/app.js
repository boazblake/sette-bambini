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
require.register("Components/Hamburger.js", function(exports, require, module) {
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
      return mdl.state.isAuth() ? m("span", [m("span", "Welcome ".concat(mdl.user.name.split(" ")[0])), m(".icon-click", m(_index.BarsLine))]) : m(".icon-click", m(_index.BarsLine));
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
  var state = {
    error: Stream(null)
  };

  var ResetState = function ResetState() {
    state.quantity = 1;
    state.gender = "Gender";
  };

  var saveToStorage = function saveToStorage(mdl) {
    var onError = function onError(e) {
      console.log("Error saving", e.message);
      state.error(e.message);
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
      return m(".frow", m(".frow content-center gutters row-between pt-20 md-columns", [state.error() && m("code.warning", state.error()), m(".col-xs-1-3.col-md-1-4", m("h2.pb-10", "$".concat(mdl.state.prices[product]))), m(".col-xs-1-3.col-md-1-4", m("label", m("select", {
        value: state.quantity,
        onchange: function onchange(e) {
          return state.quantity = e.target.value;
        }
      }, [m("option", {
        value: 1
      }, 1), m("option", {
        value: 2
      }, 2), m("option", {
        value: 3
      }, 3), m("option", {
        value: 4
      }, 4), m("option", {
        value: 5
      }, 5), m("option", {
        value: 6
      }, 6), m("option", {
        value: 7
      }, 7), m("option", {
        value: 8
      }, 8), m("option", {
        value: 9
      }, 9), m("option", {
        value: 10
      }, 10)]) // m("input", {
      //   type: "number",
      //   inputmode: "numeric",
      //   pattern: "[0-9]*",
      //   placeholder: "quantity",
      //   value: state.quantity,
      //   oninput: (e) => (state.quantity = e.target.value),
      // })
      )), m(".col-xs-1-3.col-md-1-4", m("label", m("select", {
        value: state.gender,
        onchange: function onchange(e) {
          return state.gender = e.target.value;
        }
      }, [m("option", {
        value: null
      }, "Gender"), m("option", {
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
      }), m(".col-xs-1", m("button.width-100", {
        disabled: state.quantity == undefined || state.gender == "Gender",
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

;require.register("Components/address.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountAddress = void 0;

var _Models = require("Models");

var _cjs = require("@mithril-icons/clarity/cjs");

var STATE = function STATE() {
  return {
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
};

var submitAddressTask = function submitAddressTask(mdl) {
  return function (data) {
    return mdl.http.back4App.putTask(mdl)("classes/Accounts/".concat(mdl.user.account.objectId))({
      address: data
    });
  };
};

var AccountAddress = function AccountAddress(_ref) {
  var mdl = _ref.attrs.mdl;
  var state = STATE();

  var toggleEditAddress = function toggleEditAddress(state) {
    return state.editAddress(!state.editAddress());
  };

  var submitAddress = function submitAddress(mdl) {
    return function (state) {
      var onError = function onError(errors) {
        return console.log("e", e);
      };

      var onSuccess = function onSuccess(_) {
        return mdl.user.address = state.address;
      };

      submitAddressTask(mdl)(state.address).fork(onError, onSuccess);
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
    onremove: function onremove() {
      return state = STATE();
    },
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

;require.register("Components/carousel.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Indicators = {
  view: function view(_ref) {
    var _ref$attrs = _ref.attrs,
        ident = _ref$attrs.ident,
        state = _ref$attrs.state,
        children = _ref.children;
    return m(".frow row-between", children.map(function (src, idx) {
      return m(".clickable.carousel-indicator", {
        id: "".concat(ident, "-").concat(idx),
        onclick: function onclick(e) {
          state.prevIdx(state.currentIdx());
          state.currentIdx(idx);
          state.currentId(ident);
          state.currentEl(e.composedPath()[3].children[0].children[state.currentIdx()]);
        }
      }, m("img.carousel-slide", {
        "class": state.currentIdx() == idx ? "is-active" : "",
        src: src,
        id: "".concat(ident, "-").concat(idx)
      }));
    }));
  }
};

var Carousel = function Carousel() {
  var state = {
    currentIdx: Stream(0),
    currentId: Stream(""),
    currentEl: Stream(null),
    prevIdx: Stream(0),
    indicators: Stream([]),
    coords: Stream({
      x: null,
      y: null
    })
  };

  var distanceToNext = function distanceToNext(dom) {
    return state.currentIdx() - state.prevIdx() >= 0 ? Array.from(dom.children).slice(state.prevIdx(), state.currentIdx()).reduce(function (acc, c) {
      return acc + c.clientWidth;
    }, 0) : ~Array.from(dom.children).slice(state.currentIdx(), state.prevIdx()).reduce(function (acc, c) {
      return acc + c.clientWidth;
    }, 0) + 1;
  };

  var intersectionObserver = new IntersectionObserver(function (entries, _) {
    entries.forEach(function (entry) {
      var target = entry.target; // console.log("intersectionObserver", target)

      var indicatorId = target.getAttribute("id");
      var indicator = state.indicators()[indicatorId];

      if (entry.intersectionRatio >= 0.25) {
        // console.log(target, indicator)
        target.classList.add("is-active");
        indicator === null || indicator === void 0 ? void 0 : indicator.classList.add("is-active");
      } else {
        // console.log(target, indicator)
        target.classList.remove("is-active");
        indicator === null || indicator === void 0 ? void 0 : indicator.classList.remove("is-active");
      }
    });
  });
  var mutationObserver = new MutationObserver(function (entry) {
    console.log(entry);
  });
  return {
    view: function view(_ref2) {
      var children = _ref2.children,
          ident = _ref2.attrs.ident;
      return m(".carousel-container", {
        oncreate: function oncreate(_ref3) {
          var dom = _ref3.dom;
          state.indicators(dom.children[1].children);
          state.currentEl(dom.children[0].children[state.currentIdx()]);
          state.coords(dom.getBoundingClientRect());
          intersectionObserver.observe(dom);
          mutationObserver.observe(dom, {
            childList: true,
            subTree: true,
            characterDataOldValue: true // pass old data to callback

          });
        }
      }, m(".carousel-wrapper.width-100", {
        id: ident,
        ontouchend: function ontouchend(e) {
          e.preventDefault();
          state.prevIdx(state.currentIdx());
          setTimeout(function () {
            var el = document.elementFromPoint(state.coords().x, state.coords().y);
            var idx = el.getAttribute("id") && parseInt(el.getAttribute("id").split("-")[1]);
            state.currentIdx(idx);
            state.currentId("".concat(ident, "-").concat(idx));
            state.currentEl(el);
            m.redraw();
          }, 1000);
        },
        onupdate: function onupdate(_ref4) {
          var dom = _ref4.dom;
          state.currentEl(dom.children[state.currentIdx()]);
          state.currentEl() instanceof Element && intersectionObserver.observe(state.currentEl());
          if (dom.id == state.currentId()) dom.scrollTo({
            left: dom.scrollLeft + distanceToNext(dom),
            behavior: "smooth"
          });
        }
      }, children.map(function (src, idx) {
        return m("img.carousel-slide", {
          src: src,
          id: "".concat(ident, "-").concat(idx)
        });
      })), m(Indicators, {
        ident: ident,
        state: state
      }, children));
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
      }, [m(".icon-click", m(_cjs.ShoppingBagLine, {
        width: "45px",
        height: "45px"
      })), (0, _helpers.getQuantity)((0, _helpers.toProducts)(mdl.cart)) ? m(".cart-pill", (0, _helpers.getQuantity)((0, _helpers.toProducts)(mdl.cart))) : null]);
    }
  };
};

var _default = CartIcon;
exports["default"] = _default;
});

;require.register("Components/grid.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getOverFlow = function getOverFlow(mdl, overflow) {
  console.log(mdl.settings.screenSize, mdl.settings.screenSize == "phone" ? "none" : overflow);
  return mdl.settings.screenSize == "phone" ? "none" : overflow;
};

var Fig = {
  view: function view(_ref) {
    var children = _ref.children,
        id = _ref.attrs.id;
    return m("figure#".concat(id, "-slidy"), {
      "flex-direction": "column",
      "justify-content": "center",
      "scroll-snap-align": "start"
    }, children);
  }
};
var Grid = {
  onremove: function onremove() {},
  view: function view(_ref2) {
    var children = _ref2.children,
        _ref2$attrs = _ref2.attrs,
        id = _ref2$attrs.id,
        maxheight = _ref2$attrs.maxheight,
        height = _ref2$attrs.height,
        overflow = _ref2$attrs.overflow,
        mdl = _ref2$attrs.mdl;
    return m("frow-row", {
      style: _defineProperty({
        width: "80%",
        "scroll-snap-type": " mandatory",
        "scroll-snap-points-y": " repeat(3rem)"
      }, "scroll-snap-type", " x mandatory")
    }, children.map(function (child) {
      return m(Fig, {
        id: id
      }, child);
    }));
  }
};
var _default = Grid;
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
          return e.type == "mouseover" ? showBorderStyle(e.target.style) : hideBorderStyle(e.target.style);
        })),
        href: href,
        "class": "nav-link ".concat(classList, " ").concat(mdl.state.navSelected() == link ? "is-active" : "")
      }, rest), link);
    }
  };
};

exports.NavLink = NavLink;
var _default = NavLink;
exports["default"] = _default;
});

;require.register("Components/orders.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Orders = void 0;

var _Utils = require("Utils");

var _cjs = require("@mithril-icons/clarity/cjs");

var _ramda = require("ramda");

var STATE = function STATE() {
  return {
    invoices: []
  };
};

var state = STATE();

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
  var userInvoices = "{\"userId\":\"".concat(mdl.user.objectId, "\"}");
  return mdl.state.route.id == "dashboard" ? "classes/Invoices" : "classes/Invoices?where=".concat(encodeURI(userInvoices));
};

var fetchInvoicesTask = function fetchInvoicesTask(mdl) {
  return mdl.http.back4App.getTask(mdl)(invoiceUrl(mdl)).map((0, _ramda.prop)("results")).map((0, _ramda.map)((0, _ramda.assoc)("isSelected", false)));
};

var onFetchInvoiceError = function onFetchInvoiceError(mdl) {
  return function (e) {
    return log("e")([e, mdl]);
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

var InvoiceCell = function InvoiceCell() {
  return {
    view: function view(_ref3) {
      var screenSize = _ref3.attrs.mdl.settings.screenSize,
          children = _ref3.children;
      return screenSize == "phone" ? m("tr", [m("td", {
        style: {
          width: "25%"
        }
      }, m("label", children[0].key)), children]) : m("td", {
        style: {
          width: "20%"
        }
      }, children);
    }
  };
};

var Invoice = function Invoice(_ref4) {
  var mdl = _ref4.attrs.mdl;
  return {
    view: function view(_ref5) {
      var invoice = _ref5.attrs.invoice;
      return [m("tr", m(InvoiceCell, {
        mdl: mdl
      }, m("", {
        key: "Date"
      }, (0, _Utils.formatDate)(invoice.purchaseTime))), m(InvoiceCell, {
        mdl: mdl
      }, m("", {
        key: "Order Id"
      }, invoice.orderID)), m(InvoiceCell, {
        mdl: mdl
      }, m("", {
        key: "Name"
      }, "".concat(invoice.shippingDestination.name.full_name, " "))), m(InvoiceCell, {
        mdl: mdl
      }, m("", {
        key: "Payment Status"
      }, invoice.status)), m(InvoiceCell, {
        mdl: mdl
      }, m("", {
        key: "Shipping Status",
        style: {
          width: "100%",
          borderBottom: "1px solid gold"
        }
      }, invoice.shippingStatus ? m("a", {
        href: invoice.shippingStatus
      }, "Shipping Status") : m("p", "Prepparing your order"))), m("td", m(_cjs.AngleLine, {
        "class": "clickable ".concat(!invoice.isSelected && "point-down"),
        onclick: function onclick() {
          return invoice.isSelected = !invoice.isSelected;
        },
        width: "16px"
      }))), invoice.isSelected && m("td", {
        colspan: 5,
        style: {
          width: "100%"
        }
      }, m("tr", m("td", m("label", "Shipping Destination"), "".concat(invoice.shippingDestination.address.address_line_1, " ").concat(invoice.shippingDestination.address.admin_area_2, " ").concat(invoice.shippingDestination.address.admin_area_1, " ").concat(invoice.shippingDestination.address.postal_code)), mdl.state.route.id == "dashboard" && m("td", m("button", "Update Shipping Status"))), m("table", {
        style: {
          width: "100%",
          borderBottom: "1px solid gold"
        }
      }, [m("thead", m("tr", [m("th", "Product"), m("th", "Quantities"), m("th", "Unit Price"), m("th", "Unit Total")])), m("tbody", Object.keys(invoice.cart).map(function (product) {
        return m("tr", [m("td", product), m("td", JSON.stringify(invoice.cart[product])), m("td", invoice.prices[product]), m("td", calcProductPrice(invoice, product))]);
      }), m("tr", m("th", "Order Total"), m("th", calcTotalPrice(invoice))))]))];
    }
  };
};

var Orders = function Orders() {
  return {
    onremove: state = STATE(),
    oninit: fetchInvoices,
    view: function view(_ref6) {
      var mdl = _ref6.attrs.mdl;
      return m("section.overflow-auto", {
        style: {
          minWidth: "100%",
          height: "75vh"
        }
      }, state.invoices.any() ? m("table.dash-table", mdl.settings.screenSize != "phone" && m("thead.dash-nav", m("tr.mb-5", [m("th", "Date"), m("th", "Order Id"), m("th", "Name"), m("th", "Payment Status"), m("th", "Shipping Status"), m("th")])), m("tbody", state.invoices.map(function (invoice) {
        return m(Invoice, {
          mdl: mdl,
          invoice: invoice
        });
      }))) : m("h2", "No Orders"));
    }
  };
};

exports.Orders = Orders;
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
  (0, _Utils.log)("makePaymentTask")(actions);
  return new _data["default"](function (rej, res) {
    return actions.order.capture().then(res, rej);
  });
};

var formatInvoice = function formatInvoice(_ref) {
  var user = _ref.user,
      cart = _ref.cart,
      prices = _ref.state.prices;
  return function (_ref2) {
    var orderID = _ref2.orderID,
        payerID = _ref2.payerID;
    return function (details) {
      (0, _Utils.log)("formatInvoice")(user);
      return {
        userId: user.objectId,
        orderID: orderID,
        payerID: payerID,
        purchaseTime: details.create_time,
        status: details.status,
        customer: details.payer,
        shippingDestination: details.purchase_units[0].shipping,
        cart: cart,
        prices: prices
      };
    };
  };
};

var setTempUser = function setTempUser(user) {
  return sessionStorage.setItem("sb-user-token", user["sessionToken"]);
};

var unSetTempUser = function unSetTempUser() {
  return sessionStorage.clear();
};

var updateCartTask = function updateCartTask(mdl) {
  return function (_) {
    (0, _Utils.log)("updateCartTask")();
    mdl.cart = (0, _Utils.jsonCopy)(_Models.newCart);
    return (0, _Utils.saveStorageTask)(mdl)("sb-cart")(mdl.cart);
  };
};

var saveUnregisteredInvoiceTask = function saveUnregisteredInvoiceTask(mdl) {
  return function (invoice) {
    return mdl.http.back4App.postTask(mdl)("login")({
      username: mdl.http.back4App.unregistered.email,
      password: btoa(mdl.http.back4App.unregistered.password)
    }).map(setTempUser).chain(function (_) {
      return saveInvoiceTask(mdl)(invoice);
    }).map(unSetTempUser);
  };
};

var addInvoiceTask = function addInvoiceTask(mdl) {
  return function (invoice) {
    (0, _Utils.log)("addInvoiceTask")(invoice);
    return mdl.state.isAuth() ? saveInvoiceTask(mdl)(invoice) : saveUnregisteredInvoiceTask(mdl)(invoice);
  };
};

var saveInvoiceTask = function saveInvoiceTask(mdl) {
  return function (invoice) {
    return mdl.http.back4App.postTask(mdl)("classes/Invoices")(invoice);
  };
};

var onSuccess = function onSuccess(mdl, state) {
  return function (_) {
    console.log("succc", state, _);
    setTimeout(function () {
      return state.isPaying = "success";
    });
  };
};

var onError = function onError(state) {
  return function (error) {
    (0, _Utils.log)("state")(state);
    state.error = error;
    setTimeout(function () {
      return state.isPaying = "failed";
    });
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
          display: "contents"
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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var makeProducts = function makeProducts(cart) {
  return (0, _ramda.toPairs)(cart).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        product = _ref2[0],
        genders = _ref2[1];

    return [product, (0, _ramda.toPairs)(genders)];
  });
};

var Product = function Product(_ref3) {
  var _ref3$attrs = _ref3.attrs,
      mdl = _ref3$attrs.mdl,
      _ref3$attrs$p = _slicedToArray(_ref3$attrs.p, 2),
      title = _ref3$attrs$p[0],
      genders = _ref3$attrs$p[1];

  var amount = (0, _helpers.getQuantity)(genders);
  var price = (0, _helpers.getPrice)(mdl, title, genders);
  return {
    view: function view(_ref4) {
      var _ref4$attrs = _ref4.attrs,
          mdl = _ref4$attrs.mdl,
          _ref4$attrs$p = _slicedToArray(_ref4$attrs.p, 2),
          title = _ref4$attrs$p[0],
          genders = _ref4$attrs$p[1];

      return amount ? m(".frow column-start", [m("h3", "".concat(amount, " ").concat(title, " for $").concat(price)), m(".frow cart-item row-around", m("img", {
        srcSet: _indexImages.productImages[title][0]
      }), genders.map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            sex = _ref6[0],
            quantity = _ref6[1];

        return quantity ? m(".", "".concat(sex, " : ").concat(quantity)) : null;
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

var CartModal = function CartModal(_ref7) {
  var mdl = _ref7.attrs.mdl;
  return {
    oninit: function oninit(_ref8) {
      var mdl = _ref8.attrs.mdl;
      return mdl.state.showNavModal(false);
    },
    view: function view(_ref9) {
      var mdl = _ref9.attrs.mdl;
      return m(".modalOverlay-right.animated", {
        onclick: function onclick(e) {
          mdl.state.showCartModal(false);
        }
      }, m(".modal", {
        style: {
          right: 0
        },
        id: "cart-modal"
      }, [m("h1.title text-center", "Shopping Cart"), getTotal(mdl, makeProducts(mdl.cart)) ? m(_navLink.NavLink, {
        mdl: mdl,
        href: "/cart",
        classList: "".concat((0, _helpers.isActiveRoute)("/cart"), " para button m-0"),
        link: "Update Cart"
      }) : null, makeProducts(mdl.cart).map(function (p) {
        return m(Product, {
          mdl: mdl,
          p: p
        });
      }), getTotal(mdl, makeProducts(mdl.cart)) ? m(".frow ", m(_navLink.NavLink, {
        mdl: mdl,
        href: "/checkout",
        classList: "".concat((0, _helpers.isActiveRoute)("/checkout"), " para button m-0"),
        link: ["Checkout", m("h1.bold text-center", "Total of ".concat((0, _helpers.getQuantity)(makeProducts(mdl.cart)), " for $").concat(getTotal(mdl, makeProducts(mdl.cart))))]
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
      }, mdl.settings.screenSize !== "desktop" && mdl.state.showNavModal() && m(_navModal["default"], {
        oncreate: _animations.SlideInLeft,
        onbeforeremove: _animations.SlideOutRight,
        mdl: mdl
      }), mdl.state.showCartModal() && m(_cartModal["default"], {
        oncreate: _animations.SlideInRight,
        onbeforeremove: _animations.SlideOutLeft,
        mdl: mdl
      }), m(PageTitle, {
        show: ![undefined, "/"].includes(m.route.get()),
        name: mdl.state.route.name
      }), m(".frow centered-column items-stretch", children));
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      return m("li.nav-item", m(_navLink["default"], _objectSpread(_objectSpread({
        mdl: mdl
      }, state), {}, {
        href: href,
        link: link,
        classList: classList
      })));
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
      }, [mdl.state.isAuth() ? [mdl.user.isAdmin && m(_navLink["default"], {
        mdl: mdl,
        href: "/dashboard/".concat(mdl.user.name),
        link: "Dashboard",
        classList: "".concat((0, _index.isActiveRoute)("/dashboard/".concat(mdl.user.name)), " button")
      }), m(_navLink["default"], {
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
      }, [m(_toolbar["default"], {
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
      return [m(".navbar.navbar2.hidden-xs", m("nav.frow row-around", SubNavRoutes(mdl).map(function (r) {
        return m(_navLink["default"], {
          mdl: mdl,
          href: r.route,
          link: r.name,
          classList: (0, _index.isActiveRoute)(r.route)
        });
      }))), m(".navbar.navbar1", {
        id: "navbar"
      }, m("nav.frow row-around", NavRoutes(mdl).map(function (r) {
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
      return m(".toolbar.my-5", m(".frow row-between nowrap", [m(".frow", [m(".navMenuButton visible-xs", {
        onclick: function onclick() {
          return mdl.state.showNavModal(true);
        }
      }, m(_Hamburger["default"], {
        mdl: mdl
      })), mdl.state.isAuth() ? [mdl.user.isAdmin && m(_navLink["default"], {
        mdl: mdl,
        href: "/dashboard/".concat(mdl.user.name),
        link: "Dashboard",
        classList: "".concat((0, _index.isActiveRoute)("/dashboard/".concat(mdl.user.name)), " button hidden-xs")
      }), m(_navLink["default"], {
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

var _Utils = require("Utils");

var _data = _interopRequireDefault(require("data.task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initApp = function initApp(_ref) {
  var mdl = _ref.attrs.mdl;
  return _data["default"].of(function (token) {
    return function (prices) {
      mdl.state.prices = prices;
      console.log("mdl", mdl.state);
      return token;
    };
  }).ap(mdl.http.back4App.getTask(mdl)("users/me")).ap(mdl.http.back4App.getTask(mdl)("classes/Prices").map(_Utils.parsePrices)).fork(function (_) {
    return m.route.set("/logout");
  }, function (isValid) {});
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
      }), m(_index2["default"], {
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
  prices: {
    Wraps: 60,
    Blankets: 100,
    Burpies: 60,
    Collections: 85
  },
  showUserModal: Stream(false),
  showPriceModal: Stream(false),
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
var dash = {
  state: {
    show: "prices"
  }
};
var Model = {
  dash: dash,
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
  toggleUserModal: function toggleUserModal(mdl) {
    return mdl.state.showUserModal(!mdl.state.showUserModal());
  },
  togglePriceModal: function togglePriceModal(mdl) {
    return mdl.state.showPriceModal(!mdl.state.showPriceModal());
  },
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
  Blankets: {
    Male: 0,
    Female: 0,
    Unisex: 0
  },
  Burpies: {
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

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

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

;require.register("Pages/Account/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _orders = require("Components/orders.js");

var Account = function Account() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".frow-container", m(_orders.Orders, {
        mdl: mdl
      }));
    }
  };
};

var _default = Account;
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
exports.createAccountTask = exports.registerUserTask = exports.loginTask = exports.loginUserTask = void 0;

var _Utils = require("Utils");

var _ramda = require("ramda");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mergeCarts = function mergeCarts(accnt) {
  return function (cart) {
    return (0, _ramda.mergeDeepWith)(_ramda.add, cart, accnt);
  };
};

var toAccountVM = function toAccountVM(mdl) {
  return function (accnts) {
    var cart = mergeCarts(accnts[0].cart)(mdl.cart);
    mdl.user.account = {
      objectId: accnts[0].objectId,
      cart: cart
    };
    mdl.user.address = accnts[0].address;
    mdl.cart = cart;
    setUserToken(mdl)(mdl.user);
    return cart;
  };
};

var setUserToken = function setUserToken(mdl) {
  return function (user) {
    sessionStorage.setItem("sb-user", JSON.stringify(user));
    sessionStorage.setItem("sb-user-token", user["sessionToken"]);
    mdl.state.isAuth(true);
    mdl.user = user;
    return mdl;
  };
};

var loginUserTask = function loginUserTask(mdl) {
  return function (_ref) {
    var email = _ref.email,
        password = _ref.password;
    var login = encodeURI("username=".concat(email, "&password=").concat(btoa(password)));
    return mdl.http.back4App.getTask(mdl)("login?".concat(login)).map(setUserToken(mdl));
  };
};

exports.loginUserTask = loginUserTask;

var getUserAccountTask = function getUserAccountTask(mdl) {
  return function (_) {
    var userAccount = encodeURI("where={\"userId\":\"".concat(mdl.user.objectId, "\"}"));
    return mdl.http.back4App.getTask(mdl)("classes/Accounts?".concat(userAccount)).map((0, _ramda.prop)("results")).map(toAccountVM(mdl));
  };
};

var loginTask = function loginTask(mdl) {
  return function (_ref2) {
    var email = _ref2.email,
        password = _ref2.password;
    return loginUserTask(mdl)({
      email: email,
      password: password
    }).chain(getUserAccountTask(mdl)).chain((0, _Utils.saveStorageTask)(mdl)("sb-cart"));
  };
};

exports.loginTask = loginTask;

var registerUserTask = function registerUserTask(mdl) {
  return function (_ref3) {
    var name = _ref3.name,
        email = _ref3.email,
        password = _ref3.password,
        isAdmin = _ref3.isAdmin;
    return mdl.http.back4App.postTask(mdl)("users")({
      username: email,
      name: name,
      email: email,
      password: btoa(password),
      isAdmin: isAdmin
    }).map(function (user) {
      return setUserToken(mdl)(_objectSpread({
        name: name,
        email: email,
        password: password,
        isAdmin: isAdmin
      }, user));
    });
  };
};

exports.registerUserTask = registerUserTask;

var createAccountTask = function createAccountTask(mdl) {
  mdl.user.account = {
    cart: mdl.cart,
    address: {}
  };
  return mdl.http.back4App.postTask(mdl)("classes/Accounts")({
    cart: mdl.cart,
    userId: mdl.user.objectId,
    address: {}
  }).map(function (_ref4) {
    var objectId = _ref4.objectId;
    mdl.user.account.objectId = objectId;
    return mdl;
  });
};

exports.createAccountTask = createAccountTask;
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

var _LogoLoader = _interopRequireDefault(require("Components/LogoLoader"));

var _mithril = _interopRequireDefault(require("mithril"));

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
      return function (_) {
        state.errors = {};

        _mithril["default"].route.set("/");
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
      return mdl.state.isLoading() ? (0, _mithril["default"])(_LogoLoader["default"], {
        mdl: mdl
      }) : (0, _mithril["default"])(".frow ", [state.showErrorMsg() && (0, _mithril["default"])("code.warning", state.errorMsg()), (0, _mithril["default"])("form.frow", {
        role: "form",
        id: "login-form",
        onsubmit: function onsubmit(e) {
          return e.preventDefault();
        }
      }, [(0, _mithril["default"])("input.auth-input", {
        "class": state.isSubmitted ? state.errors.email ? "has-error" : "has-success" : "",
        id: "reg-email",
        type: "email",
        placeholder: "Email",
        onkeyup: function onkeyup(e) {
          // state.isSubmitted && validateForm(mdl)(state.data)
          state.data.userModel.email = e.target.value;
        },
        value: state.data.userModel.email
      }), state.errors.email && (0, _mithril["default"])("p.auth-input-hint", state.errors.email), (0, _mithril["default"])("input.auth-input", {
        "class": state.isSubmitted ? state.errors.password ? "has-error" : "has-success" : "",
        id: "reg-pass",
        type: "password",
        placeholder: "Password",
        onkeyup: function onkeyup(e) {
          // state.isSubmitted && validateForm(mdl)(state.data)
          state.data.userModel.password = e.target.value;
        },
        value: state.data.userModel.password
      }), state.errors.password && (0, _mithril["default"])("p.auth-input-hint", state.errors.password)]), state.httpError && (0, _mithril["default"])(".toast toast-error", state.httpError)], (0, _mithril["default"])("a.button.auth-btn", {
        // type: "submit",
        form: "login-form",
        onclick: function onclick() {
          return validateForm(mdl)(state.data);
        },
        "class": mdl.state.isLoading() && "loading"
      }, "Login"), (0, _mithril["default"])(".auth-link", ["Need to ", (0, _mithril["default"])(_navLink["default"], {
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

var _LogoLoader = _interopRequireDefault(require("Components/LogoLoader"));

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
      state.errors = {};
      sessionStorage.setItem("sb-user-token", mdl.user["sessionToken"]);
      sessionStorage.setItem("sb-user", JSON.stringify(mdl.user));
      m.route.set("/");
    };

    state.isSubmitted = true;
    (0, _Validations.validateUserRegistrationTask)(data.userModel).chain((0, _fns.registerUserTask)(mdl)).chain(_fns.createAccountTask).fork(onError, onSuccess);
  };
};

exports.validateForm = validateForm;

var RegisterUser = function RegisterUser() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          data = _ref$attrs.data,
          errors = _ref$attrs.errors,
          isSubmitted = _ref$attrs.isSubmitted;
      return [mdl.state.isLoading() ? m(_LogoLoader["default"], {
        mdl: mdl
      }) : m("input.auth-input", {
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
      return [m(".frow", [state.showErrorMsg() && m("code.warning", state.errorMsg()), m("form.frow", {
        role: "form",
        id: "register-form",
        onsubmit: function onsubmit(e) {
          return e.preventDefault();
        }
      }, [m(RegisterUser, {
        mdl: mdl,
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

;require.register("Pages/Dashboard/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _orders = require("Components/orders.js");

var _prices = require("./prices.js");

var _users = require("./users.js");

var Dashboard = function Dashboard() {
  var components = {
    prices: _prices.Prices,
    users: _users.Users,
    orders: _orders.Orders
  };
  var navi = ["prices", "users", "orders"];
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".", {
        style: {
          minWidth: "100%",
          minHeight: "100%"
        }
      }, m("section.dash-nav.frow row-around", navi.map(function (nav) {
        return m("button", {
          "class": mdl.dash.state.show == nav ? "is-active" : "",
          onclick: function onclick(e) {
            return mdl.dash.state.show = nav;
          }
        }, nav.toUpperCase());
      })), m("section.frow mt-10", m(components[mdl.dash.state.show], {
        mdl: mdl
      })));
    }
  };
};

var _default = Dashboard;
exports["default"] = _default;
});

;require.register("Pages/Dashboard/prices.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Prices = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

var _ramda = require("ramda");

var _Utils = require("Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Prices = function Prices() {
  var getPrices = function getPrices(_ref) {
    var mdl = _ref.attrs.mdl;
    return mdl.http.back4App.getTask(mdl)("classes/Prices").map(_Utils.parsePrices).fork((0, _Utils.log)("error"), function (prices) {
      return mdl.state.prices = prices;
    });
  };

  var updatePrices = function updatePrices(mdl) {
    return mdl.http.back4App.postTask(mdl)("classes/Prices")(mdl.state.prices).fork((0, _Utils.log)("error"), (0, _Utils.log)("succes"));
  };

  return {
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return (0, _mithril["default"])("table.dash-table", (0, _ramda.without)("id", Object.keys(mdl.state.prices)).map(function (product) {
        return (0, _mithril["default"])("tr", (0, _mithril["default"])("td", (0, _mithril["default"])("label.col-xs-1-3", product)), (0, _mithril["default"])("td", (0, _mithril["default"])("input", {
          type: "number",
          value: mdl.state.prices[product],
          onkeyup: function onkeyup(e) {
            return mdl.state.prices[product] = parseInt(e.target.value);
          }
        })));
      }), (0, _mithril["default"])("button", {
        onclick: function onclick(e) {
          return updatePrices(mdl);
        }
      }, "update prices"));
    }
  };
};

exports.Prices = Prices;
});

;require.register("Pages/Dashboard/users.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Users = void 0;

var _ramda = require("ramda");

var _Utils = require("Utils");

var Users = function Users() {
  var state = {
    users: [],
    errors: null
  };

  var getUsers = function getUsers(_ref) {
    var mdl = _ref.attrs.mdl;
    return mdl.http.back4App.getTask(mdl)("Users").map((0, _ramda.prop)("results")).map((0, _ramda.filter)((0, _ramda.prop)("name"))).fork((0, _Utils.log)("error"), function (u) {
      return state.users = u;
    });
  };

  var updateUserAdminLevel = function updateUserAdminLevel(mdl) {
    return function (user) {
      (0, _Utils.log)("user")(user);
      mdl.http.back4App.putTask(mdl)("Users/".concat(user.objectId))({
        isAdmin: user.isAdmin
      }).fork((0, _Utils.log)("error"), (0, _Utils.log)("succes"));
    };
  };

  return {
    oninit: getUsers,
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return m("table.dash-table", m("thead", m("th"), m("th", "is Admin")), state.users.map(function (user) {
        return m("tr.mt-5", m("td", m("label", user.name)), m("td.frow.text-center", m("input", {
          type: "checkbox",
          checked: user.isAdmin,
          onclick: function onclick() {
            user.isAdmin = !user.isAdmin;
            updateUserAdminLevel(mdl)(user);
          }
        })));
      }));
    }
  };
};

exports.Users = Users;
});

;require.register("Pages/about.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var About = function About(mdl) {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".frow-container frow-center", m("img", {
        srcSet: "https://m.media-amazon.com/images/I/81dk5K365jL.RM_SS200_.jpg"
      }), m("img", {
        srcSet: "https://m.media-amazon.com/images/I/21fsf1BwlkL._RI_AL_FMPNG_SS100_.png"
      }));
    }
  };
};

var _default = About;
exports["default"] = _default;
});

;require.register("Pages/blankets.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _carousel = _interopRequireDefault(require("Components/carousel.js"));

var _Selector = _interopRequireDefault(require("Components/Selector.js"));

var _indexImages = require("index.images.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Blankets = function Blankets() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".".concat(mdl.settings.screenSize != "phone" ? "px-10" : ""), m(".anchor-wrapper", m(".text-2halfx#wraps", m("h2.pb-10", "Wraps"))), m(".frow.gutters.mb-30", m(".col-sm-1-2", m(_carousel["default"], {
        ident: "wraps"
      }, _indexImages.blankets)), m(".mtl-15.col-sm-1-2", m("ul.frow-container px-30", [m("li.pb-10", 'Handcrafted 100% Pure Wool Carriage style Blanket 21" x 18"'), m("li.pb-10", "Machine wash and tumble dry."), m("li.pb-10", "Proudly made in Houston Texas USA")]), m(".mt-20", m(_Selector["default"], {
        mdl: mdl,
        product: "Wraps"
      })))), m(".anchor-wrapper", m(".text-2halfx#christening", m("h2.pb-10", "Blankets"))), m(".frow.gutters.mb-30", m(".col-sm-1-2", m(_carousel["default"], {
        ident: "christ"
      }, _indexImages.blankets)), m(".mtl-15.col-sm-1-2", m("ul.frow-container px-30", [m("li.pb-10", 'Handcrafted 100% Pure Wool Christening style Blanket 21" x 18"'), m("li.pb-10", "This is a specialty blanket not for general use. Care has been taken to secure the pearls and crystals."), m("li.pb-10", "babies should be supervised at all times when this blanket is in use."), m("li.pb-10", "Proudly made in Houston Texas USA")]), m(".mt-20", m(_Selector["default"], {
        mdl: mdl,
        product: "Blankets"
      })))));
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
        id: "masonry"
      }, [state.data.map(function (img) {
        return m("img.Sirv", {
          oncreate: SlideUp,
          "data-src": "".concat(img, "?w=500&scale.option=fill")
        });
      })]);
    }
  };
};

var _default = Blog;
exports["default"] = _default;
});

;require.register("Pages/burpies.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _carousel = _interopRequireDefault(require("Components/carousel.js"));

var _Selector = _interopRequireDefault(require("Components/Selector.js"));

var _indexImages = require("index.images.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Burpies = function Burpies() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".", {
        "class": mdl.settings.screenSize != "phone" && "px-10"
      }, m(".mb-30 frow gutters justify-between", {
        id: "Burpies"
      }, m(".col-sm-1-2", m(_carousel["default"], {
        ident: "burpies"
      }, _indexImages.burpies)), m(".mtl-15.col-sm-1-2", m("ul.frow-container px-30", m("li.pb-10", "Set of 7 handcrafted Burpies"), m("li.pb-10", "Each guranteed to be one of a kind"), m("li.pb-10", 'Double sided Flannel burp cloths 21" x 12"'), m("li.pb-10", "Thick and absorbent!"), m("li.pb-10", "No two cloths are the same!"), m("li.pb-10", "Proudly made in Houston Texas USA")), m("p.pb-10", "Gender neutral sets are available in gray, cream or yellow/ green. Please specify when ordering."), m(".mt-20", m(_Selector["default"], {
        mdl: mdl,
        product: "Burpies"
      })))));
    }
  };
};

var _default = Burpies;
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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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

      return quantity ? m("p.animated.frow row-start col-xs-1-4 ml-10", m("h4", "".concat(sex)), m("select", {
        value: quantity,
        onchange: function onchange(e) {
          return addToCart(mdl)(product, sex, e.target.value);
        }
      }, [m("option", {
        value: 0
      }, 0), m("option", {
        value: 1
      }, 1), m("option", {
        value: 2
      }, 2), m("option", {
        value: 3
      }, 3), m("option", {
        value: 4
      }, 4), m("option", {
        value: 5
      }, 5), m("option", {
        value: 6
      }, 6), m("option", {
        value: 7
      }, 7), m("option", {
        value: 8
      }, 8), m("option", {
        value: 9
      }, 9), m("option", {
        value: 10
      }, 10)]) // m("input", {
      //   type: "number",
      //   inputmode: "numeric",
      //   min: 0,
      //   placeholder: "quantity",
      //   value: quantity,
      //   onchange: (e) => addToCart(mdl)(product, sex, e.target.value),
      //   pattern: "[0-9]*",
      // })
      ) : null;
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

      return (0, _Utils.getQuantity)(genders) ? m(".frow m-10 row-start", {
        style: {
          width: mdl.settings.screenSize == "phone" ? "80%" : "40%"
        }
      }, m("h2", "".concat(title, ": $").concat(mdl.state.prices[title])), m("img", {
        style: {
          objectFit: "contain"
        },
        srcSet: _indexImages.productImages[title][0]
      }), genders.map(function (gender) {
        return m(Gender, {
          mdl: mdl,
          gender: gender,
          product: title
        });
      })) : null;
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
      return m(".frow.column-center", {
        style: {
          height: "100%"
        }
      }, m(".animated.frow.row-start.justify-center.column-center", (0, _Utils.toProducts)(mdl.cart).map(function (p) {
        return m(Product, {
          mdl: mdl,
          p: p
        });
      })), (0, _Utils.getTotal)(mdl, (0, _Utils.toProducts)(mdl.cart)) ? m(_navLink.NavLink, {
        mdl: mdl,
        href: "/checkout",
        classList: "".concat((0, _Utils.isActiveRoute)("/checkout"), " para button mt-20"),
        link: ["Proceed to Checkout", m("h1.bold text-center", "Total of ".concat((0, _Utils.getQuantity)((0, _Utils.toProducts)(mdl.cart)), " for $").concat((0, _Utils.getTotal)(mdl, (0, _Utils.toProducts)(mdl.cart))))]
      }) : m("h1.bold", "Your Cart is Empty"));
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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Product = function Product() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          _ref$attrs$p = _slicedToArray(_ref$attrs.p, 2),
          title = _ref$attrs$p[0],
          genders = _ref$attrs$p[1];

      var amount = (0, _helpers.getQuantity)(genders);
      var price = (0, _helpers.getPrice)(mdl, title, genders);
      return amount ? m(".frow m-10 row-start", {
        style: {
          width: mdl.settings.screenSize == "phone" ? "80%" : "20%"
        }
      }, m("h2.mb-10", "".concat(amount, " ").concat(title, " for $").concat(price)), m("img", {
        style: {
          style: {
            objectFit: "contain"
          },
          width: "100%"
        },
        srcSet: _indexImages.productImages[title][0]
      }), m(".frow", genders.map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            sex = _ref3[0],
            quantity = _ref3[1];

        return quantity ? m(".frow row-start ml-5", m("h4.pr-5", sex, " x"), quantity) : null;
      }))) : null;
    }
  };
};

var Checkout = function Checkout(_ref4) {
  var mdl = _ref4.attrs.mdl;
  var state = {
    isPaying: null
  };
  return {
    oninit: function oninit(_ref5) {
      var mdl = _ref5.attrs.mdl;
      return mdl.state.showNavModal(false);
    },
    view: function view(_ref6) {
      var mdl = _ref6.attrs.mdl;
      return m(".frow.column-center", {
        style: {
          height: "100%"
        }
      }, (0, _helpers.getTotal)(mdl, (0, _helpers.toProducts)(mdl.cart)) ? m(_navLink.NavLink, {
        mdl: mdl,
        href: "/cart",
        classList: "".concat((0, _helpers.isActiveRoute)("/cart"), " para button m-0"),
        link: "Update Cart"
      }) : null, m(".frow.row-start.justify-center", (0, _helpers.toProducts)(mdl.cart).map(function (p) {
        return m(Product, {
          mdl: mdl,
          p: p
        });
      }), (0, _helpers.getTotal)(mdl, (0, _helpers.toProducts)(mdl.cart)) ? [m("h1.bold text-center.mt-20.mb-20", "Total of ".concat((0, _helpers.getQuantity)((0, _helpers.toProducts)(mdl.cart)), " for $").concat((0, _helpers.getTotal)(mdl, (0, _helpers.toProducts)(mdl.cart)))), state.isPaying == "start" && m(_LogoLoader["default"]), m(_paypal.PayPal, {
        mdl: mdl,
        state: state
      })] : m("h1.bold", "Your Cart is Empty")));
    }
  };
};

var _default = Checkout;
exports["default"] = _default;
});

;require.register("Pages/collections.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _carousel = _interopRequireDefault(require("Components/carousel.js"));

var _Selector = _interopRequireDefault(require("Components/Selector.js"));

var _indexImages = require("index.images.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Collections = function Collections() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".", {
        "class": mdl.settings.screenSize != "phone" && "px-10"
      }, [m(".frow.gutters.mb-30", {
        id: "collections"
      }, [m(".col-sm-1-2", m(_carousel["default"], {
        ident: "collections"
      }, _indexImages.collections)), m(".mtl-15.col-sm-1-2", m("ul.frow-container px-30", [m("li.pb-10", "Each Collection comprise of hand selected blankets and Burpies"), m("li.pb-10", "Perfect for stroller, or car seat"), m("li.pb-10", '3 Double sided Flannel burp cloths 21" x 12"'), m("li.pb-10", "The coordinating crocheted blanket is a small coverup approximately 22 by 27 inches"), m("li.pb-10", "Each guranteed to be one of a kind"), m("li.pb-10", "Thick and absorbent!"), m("li.pb-10", "Proudly made in Houston Texas USA")]), m("p.pb-10", "Gender neutral sets are available in gray, cream or yellow/ green. Please specify when ordering."), m(".mt-20", m(_Selector["default"], {
        mdl: mdl,
        product: "Collections"
      })))])]);
    }
  };
};

var _default = Collections;
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

;require.register("Pages/faq.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Faq = function Faq(mdl) {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".frow-container frow-center", "The blankets are crocheted using wool yarn by Valerie in Whitney, Texas. The burp cloths are machine sewn and top stitched by Margaret in Houston. Once the items are ready, they are matched together for color, design and visual appeal by the creators.", m("p.bold", "Typical questions asked about products:"), m("ul", m("li", " Is the item durable?"), m("li", "Is this item easy to use? "), m("li", "Is this item easy to use? What are the dimensions of this item?")));
    }
  };
};

var _default = Faq;
exports["default"] = _default;
});

;require.register("Pages/home.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _indexImages = require("index.images.js");

var Home = function Home() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".masonry", {
        style: {
          height: "100vh",
          width: "100vw"
        }
      }, _indexImages.AllImages.map(function (srcSet) {
        return m(".masonry-item", m("img.masonry-image", {
          style: {
            height: "100%",
            width: "100%"
          },
          srcSet: srcSet
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

var _Dashboard = _interopRequireDefault(require("Pages/Dashboard"));

var _index2 = _interopRequireDefault(require("Layouts/index.js"));

var _Utils = require("Utils");

var _cart = require("Models/cart");

var _ramda = require("ramda");

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
  id: "dashboard",
  name: "Dashboard",
  // icon: Icons.logo,
  route: "/dashboard/:name",
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
    }, m(_Dashboard["default"], {
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
    console.log("loggout", mdl);
    var routes = ["account", "checkout", "cart"];
    var currentRoute = m.route.get();
    routes.map(function (r) {
      return currentRoute.includes(r);
    }).map(log("???")).contains(true) ? m.route.set("/") : m.route.set(currentRoute);
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

var _burpies = _interopRequireDefault(require("Pages/burpies.js"));

var _blankets = _interopRequireDefault(require("Pages/blankets.js"));

var _default2 = _interopRequireDefault(require("Pages/default.js"));

var _collections = _interopRequireDefault(require("Pages/collections.js"));

var _home = _interopRequireDefault(require("Pages/home.js"));

var _about = _interopRequireDefault(require("Pages/about.js"));

var _faq = _interopRequireDefault(require("Pages/faq.js"));

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
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
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
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
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
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
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
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
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
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
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
  id: "Burpies",
  name: "Burpies",
  // icon: Icons.search,
  route: "/Burpies",
  isNav: true,
  group: ["navbar"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_burpies["default"], {
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
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
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
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_collections["default"], {
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
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
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
  name: "Blankets",
  // icon: Icons.search,
  route: "/blankets/#christening",
  isNav: false,
  group: ["nav", "blankets"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
      top: 100,
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
  id: "about-us",
  name: "About Us",
  // icon: Icons.home,
  route: "/about-us",
  isNav: true,
  group: ["footer", "sub-navbar", "menu"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_about["default"], {
      mdl: mdl
    }));
  }
}, {
  id: "Contact Us",
  name: "Contact",
  // icon: Icons.search,
  route: "/contact-us",
  isNav: false,
  group: ["footer", "sub-navbar", "menu"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
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
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
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
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
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
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
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
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
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
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
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
  group: ["footer", "menu", "sub-navbar", "menu"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index2.scrollToAnchor)(mdl.state.anchor) : window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_index["default"], {
      mdl: mdl
    }, m(_faq["default"], {
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

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

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
exports.formatDate = exports.parsePrices = exports.getTotal = exports.getQuantity = exports.getPrice = exports.toProducts = exports.uuid = exports.isActiveRoute = exports.jsonCopy = exports.randomEl = exports.scrollToAnchor = exports.getRoute = exports.debounce = exports.filterTask = exports._paginate = exports._direction = exports._sort = exports._search = exports.addTerms = exports.infiniteScroll = exports.isEmpty = exports.log = exports.makeRoute = void 0;

var _ramda = require("ramda");

var _data = _interopRequireDefault(require("data.task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
  return m.route.get() == route ? "is-active" : "";
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

var toPriceModel = function toPriceModel(_ref3) {
  var Burpies = _ref3.Burpies,
      Wraps = _ref3.Wraps,
      Blankets = _ref3.Blankets,
      Collections = _ref3.Collections;
  return {
    Burpies: Burpies,
    Wraps: Wraps,
    Blankets: Blankets,
    Collections: Collections
  };
};

var parsePrices = (0, _ramda.compose)(toPriceModel, _ramda.last, (0, _ramda.prop)("results"));
exports.parsePrices = parsePrices;

var formatDate = function formatDate(date) {
  return date.split("T")[0];
};

exports.formatDate = formatDate;
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
              headers: _objectSpread({}, _headers),
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

var backEndLessUrl = "".concat(_secrets.BackEndLess.baseUrl, "/").concat(_secrets.BackEndLess.APP_ID, "/").concat(_secrets.BackEndLess.API_KEY, "/");
var backEnd = {
  unregistered: _secrets.BackEndLess.unregistered,
  getTask: function getTask(mdl) {
    return function (url) {
      return HttpTask(_secrets.BackEndLess.headers())("GET")(mdl)(backEndLessUrl + url)(null);
    };
  },
  postTask: function postTask(mdl) {
    return function (url) {
      return function (dto) {
        return HttpTask(_secrets.BackEndLess.headers())("POST")(mdl)(backEndLessUrl + url)(dto);
      };
    };
  },
  putTask: function putTask(mdl) {
    return function (url) {
      return function (dto) {
        return HttpTask(_secrets.BackEndLess.headers())("PUT")(mdl)(backEndLessUrl + url)(dto);
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
var back4App = {
  getTask: function getTask(mdl) {
    return function (url) {
      return HttpTask(_secrets.Back4App.headers(mdl, _secrets.Back4App))("GET")(mdl)("".concat(_secrets.Back4App.baseUrl, "/").concat(url))(null);
    };
  },
  postTask: function postTask(mdl) {
    return function (url) {
      return function (dto) {
        return HttpTask(_secrets.Back4App.headers(mdl, _secrets.Back4App))("POST")(mdl)("".concat(_secrets.Back4App.baseUrl, "/").concat(url))(dto);
      };
    };
  },
  putTask: function putTask(mdl) {
    return function (url) {
      return function (dto) {
        return HttpTask(_secrets.Back4App.headers(mdl, _secrets.Back4App))("PUT")(mdl)("".concat(_secrets.Back4App.baseUrl, "/").concat(url))(dto);
      };
    };
  }
};
var http = {
  store: store,
  backEnd: backEnd,
  back4App: back4App,
  paypal: paypal,
  HttpTask: HttpTask,
  getTask: getTask,
  lookupLocationTask: lookupLocationTask
};
var _default = http;
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
    return mdl.http.back4App.putTask(mdl)("classes/Accounts/".concat(mdl.user.account.objectId))({
      cart: JSON.parse(cart)
    });
  };
};

exports.saveDbStorageTask = saveDbStorageTask;

var getDbStorageTask = function getDbStorageTask(mdl) {
  return mdl.http.back4App.gettTask(mdl)("classes/Accounts/".concat(mdl.user.account.objectId));
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
exports.AllImages = exports.productImages = exports.burpies = exports.blankets = exports.collections = void 0;
var collections = ["images/collections/collection0.webp", "images/collections/collection1.webp", "images/collections/collection2.webp", "images/collections/collection3.webp", "images/collections/collection4.webp", "images/collections/collection5.webp", "images/collections/collection6.webp", "images/collections/collection7.webp", "images/collections/collection8.webp"];
exports.collections = collections;
var blankets = ["images/blankets/blankets0.webp", "images/blankets/blankets1.webp", "images/blankets/blankets2.webp", "images/blankets/blankets3.webp"];
exports.blankets = blankets;
var burpies = ["images/burps/burp0.webp", "images/burps/burp1.webp", "images/burps/burp2.webp", "images/burps/burp3.webp"];
exports.burpies = burpies;
var productImages = {
  Wraps: blankets,
  Blankets: blankets,
  Burpies: burpies,
  Collections: collections
};
exports.productImages = productImages;
var AllImages = [].concat(burpies, blankets, collections);
exports.AllImages = AllImages;
});

;require.register("index.js", function(exports, require, module) {
"use strict";

var _app = _interopRequireDefault(require("./app.js"));

var _index = _interopRequireDefault(require("Models/index.js"));

var _funConfig = require("@boazblake/fun-config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

window.onstorage = function () {
  console.log("location", JSON.parse(window.localStorage.getItem("sb-cart")));
  console.log("session", JSON.parse(window.sessionStorage.getItem("sb-user")));
};

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
      navigator.serviceWorker.register("./sw.js").then(function (registration) {
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