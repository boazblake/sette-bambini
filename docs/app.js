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
import Flickity from "flickity"

const Flicker = () => {
  return {
    oncreate: ({ dom }) =>
      new Flickity(dom, {
        freeScroll: true,
        contain: true,
        wrapAround: true,
      }),
    view: ({ attrs: { mdl, data } }) => {
      return m(".main-carousel.animated", [
        data.map((src) => {
          mdl.addToCart.id(src)
          return m(".carousel-cell", m("img", { src }))
        }),
      ])
    },
  }
}

export default Flicker

});

;require.register("Components/Hamburger.js", function(exports, require, module) {
import { BarsLine } from "@mithril-icons/clarity/cjs/index"

const Hamburger = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      mdl.state.isAuth()
        ? m("span", [
            m("span", `Welcome ${mdl.user.name.split(" ")[0]}`),
            m(BarsLine),
          ])
        : m(BarsLine),
  }
}

export default Hamburger

});

;require.register("Components/Logo.js", function(exports, require, module) {
const LogoSVG = m(
  "svg[version='1.0'][xmlns='http://www.w3.org/2000/svg'][width='34.000000pt'][height='34.000000pt'][viewBox='0 0 220.000000 220.000000'][preserveAspectRatio='xMidYMid meet']",
  [
    m(
      "metadata",
      " Created by potrace 1.11, written by Peter Selinger 2001-2013 "
    ),
    m(
      "g[transform='translate(0.000000,220.000000) scale(0.100000,-0.100000)'][fill='$color5'][stroke='none']",
      m(
        "path[d='M736 2120 c-214 -68 -333 -297 -267 -511 37 -116 119 -207 238 -261 70 -33 236 -33 306 0 123 56 209 154 242 276 20 75 13 73 118 31 92 -37 164 -84 253 -169 46 -43 84 -82 84 -86 0 -4 -25 -10 -55 -13 -172 -18 -307 -159 -322 -337 l-6 -70 -32 0 c-53 0 -183 -38 -261 -75 -78 -38 -245 -158 -303 -219 l-35 -36 -32 46 c-39 55 -52 89 -62 169 -6 55 -9 60 -32 60 -20 0 -26 -6 -28 -30 -2 -16 1 -55 8 -85 29 -134 126 -248 273 -320 69 -34 97 -42 178 -50 148 -15 259 9 366 79 81 53 110 86 93 106 -18 22 -26 19 -74 -20 -57 -46 -160 -93 -232 -106 -113 -18 -268 12 -357 72 -26 17 -47 34 -47 38 0 14 113 115 180 163 123 86 281 148 380 148 34 0 38 -3 60 -50 31 -66 98 -132 168 -167 71 -35 182 -43 261 -20 59 17 57 23 20 -76 -50 -134 -186 -301 -310 -380 -78 -50 -210 -102 -295 -117 -112 -20 -301 -9 -399 23 -123 40 -227 107 -325 206 -115 117 -174 220 -217 382 -26 98 -24 292 5 391 27 95 62 174 102 233 34 50 36 78 5 83 -15 2 -30 -13 -58 -57 -161 -251 -177 -575 -42 -846 91 -184 212 -306 390 -395 133 -66 236 -90 390 -90 235 0 430 78 599 239 118 114 183 219 232 376 20 67 37 100 65 132 162 179 110 457 -106 564 -35 17 -72 43 -81 58 -89 136 -278 275 -446 327 -41 13 -58 23 -58 35 0 39 -41 146 -76 196 -97 141 -292 206 -458 153z m267 -68 c65 -29 141 -104 174 -171 25 -49 28 -68 28 -151 0 -77 -4 -104 -22 -142 -30 -66 -105 -143 -172 -175 -49 -25 -68 -28 -151 -28 -83 0 -102 3 -151 28 -67 32 -142 109 -172 175 -31 67 -31 216 0 284 40 86 115 155 206 189 68 26 191 21 260 -9z m788 -737 c101 -36 165 -107 195 -214 32 -116 -10 -236 -109 -310 -65 -48 -104 -61 -182 -61 -120 0 -219 60 -270 164 -82 167 -3 359 172 422 51 18 141 17 194 -1z']"
      )
    ),
  ]
)

const Logo = () => {
  return {
    view: ({ attrs }) =>
      m(
        ".logo",
        { ...attrs },
        m(".frow row-center", [
          m("h1.title.logo-text", { id: "logo-sette" }, "SETTE"),
          m("icon.icon", { id: "logo-svg" }, LogoSVG),
          m("h1.title.logo-text", { id: "logo-bambini" }, "BAMBINI"),
        ])
      ),
  }
}

export default Logo

});

;require.register("Components/LogoLoader.js", function(exports, require, module) {
import Logo from "./Logo"

const LogoLoader = () => {
  return {
    view: ({ attrs: { mdl } }) => m(".logoLoader", m(".heartbeat", m(Logo))),
  }
}

export default LogoLoader

});

;require.register("Components/Masonry/brick.js", function(exports, require, module) {
const Brick = () => {
  let _dom = null
  return {
    view: ({ attrs: { classList, data, parent, redraw } }) =>
      m(
        ".brick",
        {
          class: classList,
        },
        m(".content", [
          data.title && m("h3.title", data.title),
          m(".description", [
            m("img", {
              onload: (x) => {
                // console.log("brick image onload", x, _dom)
                // m.redraw()
              },
              oncreate: ({ dom }) => {
                _dom = dom
                // console.log("brick image oncreate", dom)
                // console.log("brick image oncreate and complete", parent, dom)
                if (parent) {
                  redraw(parent)(dom)
                }
              },
              src: `https://via.placeholder.com/${data.imgSrc}`,
            }),

            m("p", data.description),
          ]),
        ])
      ),
  }
}

export default Brick

});

;require.register("Components/Masonry/index.js", function(exports, require, module) {
import Brick from "./brick"

const resizeGridItem = (dom) => (item) => {
  let grid = dom

  let rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
  )
  let rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
  )
  let rowSpan = Math.ceil(
    (item.querySelector(".content").getBoundingClientRect().height + rowGap) /
      (rowHeight + rowGap)
  )

  return (item.style.gridRowEnd = "span " + rowSpan)
}

const onResize = (dom) => Array.from(dom.children).map(resizeGridItem(dom))

const resizeAllGridItems = (dom) => {
  window.addEventListener("resize", (x) => onResize(dom))
  return onResize(dom)
}

const Masonry = () => {
  let _dom = null
  return {
    oncreate: ({ dom }) => {
      _dom = dom
      resizeAllGridItems(dom)
    },
    view: ({ attrs: { data } }) =>
      m(
        ".grid",
        data.map((brick) =>
          m(Brick, {
            classList: "item",
            data: brick,
            parent: _dom,
            redraw: resizeGridItem,
          })
        )
      ),
  }
}

export default Masonry

});

;require.register("Components/Modal.js", function(exports, require, module) {
import { SlideInLeft, SlideOutRight } from "Styles/animations"
const Modal = {
  oncreate: SlideInLeft,
  onbeforeremove: SlideOutRight,
  view: ({ attrs: { classList, isActive, close, title, content, footer } }) => {
    console.log("MODAL", classList, isActive, close, title, content, footer)
    return m(
      `section.modal.${classList}`,
      { class: isActive ? "active" : "", id: "modal" },
      [
        m("a.modal-overlay", {
          "aria-label": "Close",
          onclick: () => close(),
        }),
        m(".modal-container", { role: "document" }, [
          m(".modal-header", [
            m("a.btn btn-clear float-right", {
              id: "modal-close",
              "aria-label": "Close",
              onclick: () => close(),
            }),
            m(".modal-title h3", title),
          ]),
          m(".modal-body", m(".content", content)),
          m(".modal-footer", footer),
        ]),
      ]
    )
  },
}

export default Modal

});

;require.register("Components/Selector.js", function(exports, require, module) {
import { saveStorageTask } from "Utils/storage"
import { AddToCartOut } from "Styles/animations"

const Selector = () => {
  const state = {}
  const ResetState = () => {
    state.quantity = null
    state.gender = "Select a Gender"
  }

  const saveToStorage = (mdl) => {
    const onError = (e) => console.log("Error saving", e)
    const onSuccess = (s) => {
      ResetState()
    }

    saveStorageTask(mdl)("sb-cart")(mdl.cart).fork(onError, onSuccess)
  }

  const addToCart = (mdl) => (product) => (state) => {
    mdl.addToCart.show(product)
    mdl.cart[product][state.gender] += parseInt(state.quantity)
    saveToStorage(mdl)
  }
  return {
    oninit: () => ResetState(),
    view: ({ attrs: { mdl, product } }) => {
      return m(
        ".frow",
        m(".frow content-center gutters row-between pt-20", [
          m(
            ".col-sm-1-4",
            m("h2.pb-10", `${mdl.state.currency()}${mdl.state.prices[product]}`)
          ),
          m(
            ".col-sm-1-4",
            m(
              "label",
              m("input", {
                type: "number",
                inputmode: "numeric",
                pattern: "[0-9]*",
                placeholder: "quantity",
                value: state.quantity,
                oninput: (e) => (state.quantity = e.target.value),
              })
            )
          ),
          m(
            ".col-sm-1-4",
            m(
              "label",

              m(
                "select",
                {
                  value: state.gender,
                  onchange: (e) => (state.gender = e.target.value),
                },
                [
                  m("option", { value: null }, "Select a Gender"),
                  m("option", { value: "Male" }, "Male"),
                  m("option", { value: "Female" }, "Female"),
                  m("option", { value: "Unisex" }, "Unisex"),
                ]
              )
            )
          ),
          mdl.addToCart.show() == product &&
            m(".animated", {
              oncreate: AddToCartOut,
              id: "add-to-cart-img",
              style: {
                "background-image": `url(${mdl.addToCart.id()})`,
              },
            }),
          m(
            ".col-sm-1-4",
            m(
              "button",
              {
                disabled:
                  state.quantity == undefined ||
                  state.gender == "Select a Gender",
                onclick: () => addToCart(mdl)(product)(state),
              },

              "Add To Bag"
            )
          ),
        ])
      )
    },
  }
}

export default Selector

});

;require.register("Components/Single_Carousel.js", function(exports, require, module) {
import { ArrowLine } from "@mithril-icons/clarity/cjs/index"

const show = (dir, idx, cid) => {
  let slideNum
  if (dir == "prev") {
    slideNum = idx == 0 ? 3 : idx - 1
  }

  if (dir == "next") {
    slideNum = idx == 3 ? 0 : idx + 1
  }

  console.log(dir, idx, `${cid}-slide-${slideNum}`)
  return `${cid}-slide-${slideNum}`
}

const Carousel = () => {
  return {
    onupdate: (o, n) => console.log(o, n),
    view: ({ attrs: { cid, data } }) =>
      m(".carousel", { role: "document" }, [
        data.map((item, idx) =>
          m("input.carousel-locator", {
            id: `${cid}-slide-${idx}`,
            type: "radio",
            name: "carousel-radio",
            hidden: true,
            checked: true,
          })
        ),
        m(
          ".carousel-container",
          data.map((item, idx) =>
            m("figure.carousel-item", [
              m(
                "label.item-next btn btn-action btn-lg",
                { for: show("next", idx, cid) },
                [m("i.icon icon-arrow-right", m(".point-right", m(ArrowLine)))]
              ),
              m("img.img-responsive rounded", { src: item }),
              m(
                "label.item-prev btn btn-action btn-lg",
                { for: show("prev", idx, cid) },
                [m("i.icon icon-arrow-left", m(".point-left", m(ArrowLine)))]
              ),
            ])
          )
        ),
        m(
          ".carousel-nav",
          data.map((item, idx) =>
            m("label.nav-item text-hide c-hand", {
              for: `${cid}-slide-${idx}`,
            })
          )
        ),
      ]),
  }
}

export default Carousel

});

;require.register("Components/cart-icon.js", function(exports, require, module) {
import { ShoppingBagLine } from "@mithril-icons/clarity/cjs"
import { toPairs } from "ramda"
import { toProducts, getQuantity } from "Utils/helpers"

const itemAddedToCart = (mdl) => {
  let res = ""
  if (mdl.addToCart.show()) {
    res = "ping"

    setTimeout(() => {
      res = ""
      mdl.addToCart.show(null)
      m.redraw()
    }, 500)

    return res
  }
}

const CartIcon = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".animated.clickable",
        {
          id: "cart-icon",
          onupdate: () => mdl.addToCart.show(null),
          class: itemAddedToCart(mdl),
          onclick: () => mdl.state.showCartModal(true),
        },
        [
          m(ShoppingBagLine, {
            width: "45px",
            height: "45px",
          }),

          getQuantity(toProducts(mdl.cart))
            ? m(".cart-pill", getQuantity(toProducts(mdl.cart)))
            : null,
        ]
      ),
  }
}

export default CartIcon

});

;require.register("Components/icons/Logo.js", function(exports, require, module) {
"use strict"
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, "__esModule", { value: true })
var mithril_1 = __importDefault(require("mithril"))
var Logo = {
  view: function (_a) {
    var attrs = _a.attrs
    return mithril_1.default(
      "svg",
      __assign(
        {
          version: 1.1,
          width: 36,
          height: 36,
          viewBox: "0 0 36 36",
          preserveAspectRatio: "xMidYMid meet",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
        },
        attrs
      ),
      mithril_1.default("title", {}, "logo"),
      mithril_1.default("path", {
        d:
          "M736 2120 c-214 -68 -333 -297 -267 -511 37 -116 119 -207 238 -261 70 -33 236 -33 306 0 123 56 209 154 242 276 20 75 13 73 118 31 92 -37 164 -84 253 -169 46 -43 84 -82 84 -86 0 -4 -25 -10 -55 -13 -172 -18 -307 -159 -322 -337 l-6 -70 -32 0 c-53 0 -183 -38 -261 -75 -78 -38 -245 -158 -303 -219 l-35 -36 -32 46 c-39 55 -52 89 -62 169 -6 55 -9 60 -32 60 -20 0 -26 -6 -28 -30 -2 -16 1 -55 8 -85 29 -134 126 -248 273 -320 69 -34 97 -42 178 -50 148 -15 259 9 366 79 81 53 110 86 93 106 -18 22 -26 19 -74 -20 -57 -46 -160 -93 -232 -106 -113 -18 -268 12 -357 72 -26 17 -47 34 -47 38 0 14 113 115 180 163 123 86 281 148 380 148 34 0 38 -3 60 -50 31 -66 98 -132 168 -167 71 -35 182 -43 261 -20 59 17 57 23 20 -76 -50 -134 -186 -301 -310 -380 -78 -50 -210 -102 -295 -117 -112 -20 -301 -9 -399 23 -123 40 -227 107 -325 206 -115 117 -174 220 -217 382 -26 98 -24 292 5 391 27 95 62 174 102 233 34 50 36 78 5 83 -15 2 -30 -13 -58 -57 -161 -251 -177 -575 -42 -846 91 -184 212 -306 390 -395 133 -66 236 -90 390 -90 235 0 430 78 599 239 118 114 183 219 232 376 20 67 37 100 65 132 162 179 110 457 -106 564 -35 17 -72 43 -81 58 -89 136 -278 275 -446 327 -41 13 -58 23 -58 35 0 39 -41 146 -76 196 -97 141 -292 206 -458 153z m267 -68 c65 -29 141 -104 174 -171 25 -49 28 -68 28 -151 0 -77 -4 -104 -22 -142 -30 -66 -105 -143 -172 -175 -49 -25 -68 -28 -151 -28 -83 0 -102 3 -151 28 -67 32 -142 109 -172 175 -31 67 -31 216 0 284 40 86 115 155 206 189 68 26 191 21 260 -9z m788 -737 c101 -36 165 -107 195 -214 32 -116 -10 -236 -109 -310 -65 -48 -104 -61 -182 -61 -120 0 -219 60 -270 164 -82 167 -3 359 172 422 51 18 141 17 194 -1z",
      }),
      mithril_1.default("path", {
        d: "M25,15.5H11a1,1,0,0,0,0,2H25a1,1,0,0,0,0-2Z",
        class: "clr-i-outline clr-i-outline-path-2",
      }),
      mithril_1.default("path", {
        d: "M21.75,20.5h-7.5a1,1,0,0,0,0,2h7.5a1,1,0,0,0,0-2Z",
        class: "clr-i-outline clr-i-outline-path-3",
      }),
      mithril_1.default("path", {
        d: "M11.28,12.5H24.72a1,1,0,0,0,0-2H11.28a1,1,0,0,0,0,2Z",
        class: "clr-i-outline clr-i-outline-path-4",
      }),
      mithril_1.default("rect", {
        x: 0,
        y: 0,
        width: 36,
        height: 36,
        "fill-opacity": 0,
      })
    )
  },
}
exports.default = Logo

});

;require.register("Components/nav-link.js", function(exports, require, module) {
const handlers = (types, fn) =>
  types.reduce((acc, type) => Object.assign(acc, { [type]: fn }), {})

export const NavLink = () => {
  return {
    view: ({ attrs: { mdl, href, link, classList, ...rest } }) =>
      m(
        m.route.Link,
        {
          ...handlers(["onclick", "onmouseover", "onmouseout"], (e) =>
            console.log(e.type)
          ),
          href,
          class: `nav-link ${classList} ${
            mdl.state.navSelected() == link && "shadow"
          }`,
          ...rest,
        },
        link
      ),
  }
}

export default NavLink

});

;require.register("Layouts/Body/cart-modal.js", function(exports, require, module) {
import { NavLink } from "Components/nav-link"
import { isActiveRoute, getQuantity, getPrice } from "Utils/helpers"
import { toPairs } from "ramda"

const products = (cart) =>
  toPairs(cart).map(([product, genders]) => [product, toPairs(genders)])

const Gender = () => {
  return {
    view: ({
      attrs: {
        mdl,
        gender: [sex, quantity],
      },
    }) => {
      return quantity
        ? m(".", [
            m("img", { src: "https://via.placeholder.com/80" }),
            m("h4", `${sex} : ${quantity}`),
          ])
        : null
    },
  }
}

const Product = ({
  attrs: {
    mdl,
    p: [title, genders],
  },
}) => {
  let amount = getQuantity(genders)

  let price = getPrice(mdl, title, genders)

  return {
    view: ({
      attrs: {
        mdl,
        p: [title, genders],
      },
    }) => {
      return amount
        ? m(".frow column-start", [
            m("h3", `${amount} ${title} for ${mdl.state.currency()}${price}`),
            m(
              ".frow cart-item row-around",
              genders.map((gender) => m(Gender, { mdl, gender }))
            ),
          ])
        : null
    },
  }
}

const getTotal = (mdl, products) => {
  const getTotalPrice = getQuantity(
    products.map((p) => getPrice(mdl, p[0], p[1]))
  )
  return getTotalPrice
}

const CartModal = ({ attrs: { mdl } }) => {
  return {
    oninit: ({ attrs: { mdl } }) => mdl.state.showNavModal(false),
    view: ({ attrs: { mdl } }) =>
      m(
        ".modalOverlay-right.animated",
        {
          onclick: (e) => {
            mdl.state.showCartModal(false)
          },
        },
        m(
          `.modal`,
          {
            style: { right: 0 },
            id: "cart-modal",
          },

          [
            m("h1.title text-center", "Shopping Cart"),
            getTotal(mdl, products(mdl.cart))
              ? m(NavLink, {
                  mdl,
                  href: `/cart`,
                  classList: `${isActiveRoute(`/cart`)} para button m-0`,
                  link: "Update Cart",
                })
              : null,

            products(mdl.cart).map((p) => m(Product, { mdl, p })),

            getTotal(mdl, products(mdl.cart))
              ? m(
                  ".frow ",
                  m(NavLink, {
                    mdl,
                    href: `/checkout`,
                    classList: `${isActiveRoute(`/checkout`)} para button m-0`,
                    link: [
                      "Proceed to Checkout",
                      m(
                        "h1.bold text-center",
                        `Total of ${getQuantity(
                          products(mdl.cart)
                        )} for ${mdl.state.currency()}${getTotal(
                          mdl,
                          products(mdl.cart)
                        )}`
                      ),
                    ],
                  })
                )
              : m(".frow centered-column", m("h1.bold", "Your Cart is Empty")),
            ,
          ]
        )
      ),
  }
}

export default CartModal

});

;require.register("Layouts/Body/index.js", function(exports, require, module) {
import CartModal from "./cart-modal.js"
import NavModal from "./nav-modal.js"
import {
  SlideOutRight,
  SlideOutLeft,
  SlideInRight,
  SlideInLeft,
} from "Styles/animations.js"
import { propEq } from "ramda"

let isShowingProducts = (mdl) =>
  mdl.Routes.filter((r) => r.route == mdl.state.route.route)[0]
    .children.map((r) => mdl.Routes.filter(propEq("id", r))[0])
    .any()

let isShowingRoutes = (mdl) => mdl.settings.screenSize !== "phone"

const getStyle = (mdl) => ({
  marginTop: isShowingRoutes(mdl)
    ? isShowingProducts(mdl)
      ? "180px"
      : "140px"
    : isShowingProducts(mdl)
    ? "140px"
    : "100px",
})

const Body = () => {
  return {
    view: ({ attrs: { mdl, children } }) =>
      m(
        ".body",
        {
          id: "body",
          style: getStyle(mdl),
        },
        m(".frow column-center items-stretch", [
          mdl.settings.screenSize !== "desktop" &&
            mdl.state.showNavModal() &&
            m(NavModal, {
              oncreate: SlideInLeft,
              onbeforeremove: SlideOutRight,
              mdl,
            }),
          mdl.state.showCartModal() &&
            m(CartModal, {
              oncreate: SlideInRight,
              onbeforeremove: SlideOutLeft,
              mdl,
            }),
          [
            m(
              ".text-4x",
              m("h1.title.mb-20.text-center", mdl.state.route.name)
            ),
            children,
          ],
        ])
      ),
  }
}

export default Body

});

;require.register("Layouts/Body/nav-modal.js", function(exports, require, module) {
import NavLink from "Components/nav-link"
import { isActiveRoute } from "Utils/index.js"

let state = {
  onHover: () => {},
  selected: () => {},
}

let cart = {
  Wraps: { Male: 0, Female: 0, Unisex: 0 },
  "Christening Blankets": { Male: 0, Female: 0, Unisex: 0 },
  "Burp Rags": { Male: 0, Female: 0, Unisex: 0 },
}

const NavItem = () => {
  return {
    view: ({ attrs: { mdl, href, link, classList } }) =>
      m(`li.nav-item`, m(NavLink, { mdl, state, href, link, classList })),
  }
}

const NavModal = () => {
  let routes = (mdl) => mdl.Routes.filter((r) => r.group.includes("menu"))
  return {
    oncreate: ({ attrs: { mdl } }) => {
      mdl.state.showCartModal(false)
    },
    view: ({ attrs: { mdl } }) =>
      m(
        ".modalOverlay-left.animated",
        {
          onclick: (e) => {
            mdl.state.showNavModal(false)
          },
        },
        m(
          `.modal`,
          {
            id: "nav-modal",
          },

          m(`ul.nav`, { id: "" }, [
            mdl.state.isAuth()
              ? [
                  m(NavLink, {
                    state,
                    mdl,
                    href: `/account/${mdl.user.name}`,
                    link: "Your Account",
                    classList: `${isActiveRoute(
                      `/account/${mdl.user.name}`
                    )} button`,
                  }),
                  m(NavLink, {
                    mdl,
                    href: "/logout",
                    link: "Logout",
                    onclick: () => {
                      // localStorage.clear()
                      // sessionStorage.clear()
                      // mdl.state.isAuth(false)
                      // mdl.user = {}
                      // mdl.cart = cart
                      // m.route.set(m.route.get())
                    },
                    classList: "bold auth-link",
                  }),
                ]
              : m(".frow.justify-start", [
                  m(NavItem, {
                    mdl,
                    href: "/login",
                    link: "Login",
                    classList: `${isActiveRoute("/login")} button para`,
                  }),

                  m(NavItem, {
                    mdl,
                    href: "/register",
                    link: "Register",
                    classList: `${isActiveRoute("/register")} button para`,
                  }),
                ]),
            routes(mdl).map((r) =>
              m(NavItem, {
                mdl,
                href: r.route,
                link: r.name,
                classList: isActiveRoute(r.route),
              })
            ),
          ])
        )
      ),
  }
}

export default NavModal

});

;require.register("Layouts/Header/ProgressBar.js", function(exports, require, module) {
const ProgressBar = () => {
  return {
    view: ({
      attrs: {
        mdl: {
          state: {
            loadingProgress: { value, max },
          },
        },
      },
    }) =>
      m(
        ".progress-bar",
        m("progress.progress-bar", {
          id: "progressbar",
          value: value ? value() : 0,
          max: max ? max() : 0,
        })
      ),
  }
}

export default ProgressBar

});

;require.register("Layouts/Header/index.js", function(exports, require, module) {
import NavBar from "./navbar.js"
import SubNavBar from "./sub-nav.js"
import ToolBar from "./toolbar.js"
import ProgressBar from "./ProgressBar.js"
import { propEq } from "ramda"

const Header = ({ attrs: { mdl } }) => {
  let subRoutes = (mdl) =>
    mdl.Routes.filter((r) => r.route == mdl.state.route.route)[0].children.map(
      (r) => mdl.Routes.filter(propEq("id", r))[0]
    )

  return {
    view: ({ attrs: { mdl } }) => {
      return m(
        "nav.header",
        {
          id: "header",
          style: { maxHeight: subRoutes(mdl).any() ? "140px" : "100px" },
        },
        [
          mdl.state.isLoading() && m(ProgressBar, { mdl }),
          m(ToolBar, { mdl }),
          m(NavBar, { mdl }),
          m(SubNavBar, {
            mdl,
            subRoutes,
          }),
        ]
      )
    },
  }
}

export default Header

});

;require.register("Layouts/Header/navbar.js", function(exports, require, module) {
import NavLink from "Components/nav-link.js"
import { isActiveRoute } from "Utils/index.js"

const NavBar = () => {
  let ProductRoutes = (mdl) =>
    mdl.Routes.filter((r) => r.group.includes("navbar"))
  let SidebarRoutes = (mdl) =>
    mdl.Routes.filter((r) => r.group.includes("menu"))
  return {
    view: ({ attrs: { mdl } }) => [
      m(
        ".navbar.navbar1",
        { id: "navbar" },

        m(
          "nav.frow row-around",
          ProductRoutes(mdl).map((r) => {
            return m(NavLink, {
              mdl,
              href: r.route,
              link: r.name,
              classList: isActiveRoute(r.route),
            })
          })
        )
      ),
      m(
        ".navbar.navbar2.hidden-xs",
        m(
          "nav.frow row-around",
          SidebarRoutes(mdl).map((r) => {
            return m(NavLink, {
              mdl,
              href: r.route,
              link: r.name,
              classList: isActiveRoute(r.route),
            })
          })
        )
      ),
    ],
  }
}

export default NavBar

});

;require.register("Layouts/Header/sub-nav.js", function(exports, require, module) {
import NavLink from "Components/nav-link.js"
import { isActiveRoute } from "Utils/index.js"
import { SlideDown, SlideUp } from "Styles/animations"

const SubNavBar = () => {
  return {
    view: ({ attrs: { mdl, subRoutes } }) => {
      return (
        subRoutes(mdl).any() &&
        m(
          ".sub-navbar animated",
          {
            oncreate: SlideDown,
            onbeforeremove: SlideUp,
            id: "sub-navbar",
          },
          m("nav.frow row-around", [
            subRoutes(mdl).map((r) =>
              m(NavLink, {
                mdl,
                href: r.route,
                link: r.name,
                classList: isActiveRoute(r.route),
              })
            ),
          ])
        )
      )
    },
  }
}

export default SubNavBar

});

;require.register("Layouts/Header/toolbar.js", function(exports, require, module) {
import NavLink from "Components/nav-link.js"
import Hamburger from "Components/Hamburger.js"
import Logo from "Components/Logo"
import { isActiveRoute } from "Utils/index.js"
import CartIcon from "Components/cart-icon"

const ToolBar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".toolbar.my-5",
        m(".frow row-between row-center", [
          m(".frow", [
            m(
              ".navMenuButton visible-xs",
              {
                onclick: () => mdl.state.showNavModal(true),
              },
              m(Hamburger, { mdl })
            ),
            mdl.state.isAuth()
              ? [
                  m(NavLink, {
                    mdl,
                    href: `/account/${mdl.user.name}`,
                    link: "Your Account",
                    classList: `${isActiveRoute(
                      `/account/${mdl.user.name}`
                    )} button hidden-xs`,
                  }),
                  m(NavLink, {
                    mdl,
                    href: "/logout",
                    link: "Logout",
                    classList: "bold auth-link hidden-xs",
                  }),
                ]
              : m(".frow hidden-xs", [
                  m(NavLink, {
                    mdl,
                    href: "/login",
                    link: "Login",
                    classList: `${isActiveRoute("/login")} button auth-link`,
                  }),

                  m(NavLink, {
                    mdl,
                    href: "/register",
                    link: "Register",
                    classList: `${isActiveRoute("/register")} button auth-link`,
                  }),
                ]),
          ]),
          m(NavLink, {
            mdl,
            href: "/",
            classList: "logo",
            link: m(Logo, { id: "toolbar-logo", class: "frow row-center" }),
          }),
          m(CartIcon, { mdl }),
        ])
      ),
  }
}

export default ToolBar

});

;require.register("Layouts/footer.js", function(exports, require, module) {
import NavLink from "Components/nav-link.js"
import { isActiveRoute } from "Utils/index.js"

const Footer = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      let routes = mdl.Routes.filter((r) => r.group.includes("footer"))
      return m(
        "footer.frow content-end items-end",
        { id: "footer" },
        m(
          ".frow row-container",
          routes.map((r) =>
            m(NavLink, {
              mdl,
              href: r.route,
              link: r.name,
              classList: isActiveRoute(r.route),
            })
          )
        )
      )
    },
  }
}

export default Footer

});

;require.register("Layouts/index.js", function(exports, require, module) {
import Header from "./Header/index.js"
import Body from "./Body/index.js"
import Footer from "./footer.js"
import LogoLoader from "Components/LogoLoader"

const Layout = () => {
  return {
    view: ({ children, attrs: { mdl } }) =>
      m(
        ".layout",
        { id: "layout", role: "main" },
        m(Header, { mdl }),
        mdl.state.isLoading() ? m(LogoLoader) : m(Body, { mdl, children }),
        m(Footer, { mdl })
      ),
  }
}

export default Layout

});

;require.register("Models/Main.js", function(exports, require, module) {
import Routes from "../Routes/index.js"
import { Data } from "./mock-data"
import { jsonCopy } from "Utils"
import http from "Utils/http"
import { newCart } from "./cart"

const currencies = { $: "US Dollar", "£": "British Pound" }

const state = {
  currency: Stream("$"),
  prices: {
    Wraps: 35,
    "Christening Blankets": 55,
    "Burp Rags": 15,
  },
  showAuthModal: Stream(false),
  showNavModal: Stream(false),
  showCartModal: Stream(false),
  paginate: {
    page: Stream(1),
    total_pages: Stream(0),
    total_results: Stream(0),
  },
  query: Stream(""),
  isLoading: Stream(false),
  loadingProgress: {
    max: Stream(null),
    value: Stream(null),
  },
  dragging: {},
  isAuth: Stream(false),
  navSelected: Stream(""),
}
const user = {}
const settings = {}
const data = {}
const errors = {}

const addToCart = {
  id: Stream(null),
  show: Stream(null),
}

const Model = {
  currencies,
  addToCart,
  http,
  Data,
  Routes,
  state,
  user,
  cart: jsonCopy(newCart),
  data,
  errors,
  settings,
  toggleAuthModal: (mdl) => mdl.state.showAuthModal(!mdl.state.showAuthModal()),
  toggleCurrencies: (mdl) => (currency) => mdl.state.currency(currency),
}

export default Model

});

;require.register("Models/cart.js", function(exports, require, module) {
export const newCart = {
  Wraps: { Male: 0, Female: 0, Unisex: 0 },
  "Christening Blankets": { Male: 0, Female: 0, Unisex: 0 },
  "Burp Rags": { Male: 0, Female: 0, Unisex: 0 },
}

});

;require.register("Models/index.js", function(exports, require, module) {
export * from "./cart.js"
export * from "./states.js"
import Model from "./Main"
export default Model

});

;require.register("Models/mock-data.js", function(exports, require, module) {
import { range, traverse } from "ramda"
import { log } from "Utils"

const getImg = ({ width, height }) => [
  `https://loremflickr.com/${width}/${height}`,
]

export const Data = (size) => (amount) => {
  let arr = [...Array(amount).keys()]
  let res = arr.traverse((_) => getImg(size), Array.of)
  console.log(res)
  return res[0]
  // return []
}

});

;require.register("Models/states.js", function(exports, require, module) {
export const states = {
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
  WY: "Wyoming",
}

export const stateDict = (state) => states[state]

});

;require.register("Pages/Auth/Validations.js", function(exports, require, module) {
import { curryN, identity, lensProp, mergeAll } from "ramda"
import { Success } from "data.validation"
import { validate, isRequired, emailFormat } from "Utils"

const ValidateRegistration = Success(curryN(3, identity))
const ValidateLogin = Success(curryN(2, identity))

const nameLense = lensProp("name")
const passwordLense = lensProp("password")
const passwordConfirmLense = lensProp("confirmPassword")
const emailLense = lensProp("email")
const emailConfirmLense = lensProp("confirmEmail")

const NAME_REQUIRED_MSG = "A Name is required"
const PASSWORD_REQUIRED_MSG = "A Password is required"
const EMAIL_REQUIRED_MSG = "An Email is required"
const EMAILS_MUST_MATCH = "Emails do not match"
const INVALID_EMAIL_FORMAT = "Email must be a valid format"
const PASSWORDS_MUST_MATCH = "Passwords do not match"

const inputsMatch = (input1) => (input2) => input2 === input1

const validateName = (data) =>
  Success(data).apLeft(validate(isRequired, nameLense, NAME_REQUIRED_MSG, data))

const validateEmails = (data) =>
  Success(data)
    .apLeft(validate(isRequired, emailLense, EMAIL_REQUIRED_MSG, data))
    .apLeft(validate(isRequired, emailConfirmLense, EMAIL_REQUIRED_MSG, data))
    .apLeft(
      validate(
        inputsMatch(data.confirmEmail),
        emailLense,
        EMAILS_MUST_MATCH,
        data
      )
    )
    .apLeft(
      validate(
        inputsMatch(data.email),
        emailConfirmLense,
        EMAILS_MUST_MATCH,
        data
      )
    )
    .apLeft(
      validate(emailFormat, emailConfirmLense, INVALID_EMAIL_FORMAT, data)
    )
    .apLeft(validate(emailFormat, emailLense, INVALID_EMAIL_FORMAT, data))

const validateEmail = (data) =>
  Success(data)
    .apLeft(validate(isRequired, emailLense, EMAIL_REQUIRED_MSG, data))
    .apLeft(validate(emailFormat, emailLense, INVALID_EMAIL_FORMAT, data))

const validatePasswords = (data) =>
  Success(data)
    .apLeft(validate(isRequired, passwordLense, PASSWORD_REQUIRED_MSG, data))
    .apLeft(
      validate(isRequired, passwordConfirmLense, PASSWORD_REQUIRED_MSG, data)
    )
    .apLeft(
      validate(
        inputsMatch(data.password),
        passwordConfirmLense,
        PASSWORDS_MUST_MATCH,
        data
      )
    )
    .apLeft(
      validate(
        inputsMatch(data.confirmPassword),
        passwordLense,
        PASSWORDS_MUST_MATCH,
        data
      )
    )

const validatePassword = (data) =>
  Success(data).apLeft(
    validate(isRequired, passwordLense, PASSWORD_REQUIRED_MSG, data)
  )

export const validateUserRegistrationTask = (data) =>
  ValidateRegistration.ap(validateName(data))
    .ap(validateEmails(data))
    .ap(validatePasswords(data))
    .failureMap(mergeAll)
    .toTask()

export const validateLoginTask = (data) =>
  ValidateLogin.ap(validateEmail(data))
    .ap(validatePassword(data))
    .failureMap(mergeAll)
    .toTask()

});

;require.register("Pages/Auth/fns.js", function(exports, require, module) {
import { log } from "Utils/index"
import { saveStorageTask } from "Utils/storage"
import { mergeDeepWith, add } from "ramda"

const mergeCarts = (accnt) => (cart) => mergeDeepWith(add, cart, accnt)

const toAccountVM = (mdl) => (accnts) => {
  let cart = mergeCarts(JSON.parse(accnts[0].cart))(mdl.cart)
  mdl.user.account = { objectId: accnts[0].objectId, cart }
  mdl.user.address = JSON.parse(accnts[0].address)
  mdl.cart = cart
  return cart
}

const setUserToken = (mdl) => (user) => {
  sessionStorage.setItem("sb-user", JSON.stringify(user))
  sessionStorage.setItem("sb-user-token", user["user-token"])
  mdl.state.isAuth(true)
  mdl.user = user
  return user
}

export const loginUserTask = (mdl) => ({ email, password }) =>
  mdl.http.backEnd
    .postTask(mdl)("users/login")({
      login: email,
      password: password,
    })
    .map(setUserToken(mdl))

const getUserAccountTask = (mdl) => (_) =>
  mdl.http.backEnd
    .getTask(mdl)(`data/Accounts?where=userId%3D'${mdl.user.objectId}'`)
    .map(toAccountVM(mdl))

export const loginTask = (mdl) => ({ email, password }) =>
  loginUserTask(mdl)({ email, password })
    .chain(getUserAccountTask(mdl))
    .chain(saveStorageTask(mdl)("sb-cart"))

export const registerUserTask = (mdl) => ({ name, email, password, isAdmin }) =>
  mdl.http.backEnd.postTask(mdl)("users/register")({
    name,
    email,
    password,
    isAdmin,
  })

export const createAccountTask = (mdl) =>
  mdl.http.backEnd.postTask(mdl)("data/Accounts")({
    cart: JSON.stringify(mdl.cart),
    userId: mdl.user.objectId,
  })

export const linkAccountTask = (mdl) =>
  mdl.http.backEnd.postTask(mdl)(
    `data/Users/${mdl.user.objectId}/account%3AAccounts%3A1`
  )([mdl.user.account.objectId])

});

;require.register("Pages/Auth/login-user.js", function(exports, require, module) {
import NavLink from "Components/nav-link"
import { jsonCopy } from "Utils"
import { validateLoginTask } from "./Validations.js"
import { loginTask } from "./fns.js"

const validateForm = (mdl) => (data) => {
  const onError = (errs) => {
    if (errs) {
      state.errors = errs
      state.errorMsg(errs.message)
      state.showErrorMsg(true)
      console.log("failed - state", state)
    } else {
      state.errorMsg("Issue with logging in. Have you registered?")
      state.showErrorMsg(true)
      console.log("failed - other?", state)
    }
  }

  const onSuccess = (mdl) => (account) => {
    state.errors = {}
    mdl.user.account = account
    m.route.set("/")
  }

  state.isSubmitted = true

  validateLoginTask(data.userModel)
    .chain(loginTask(mdl))
    .fork(onError, onSuccess(mdl))
}

const userModel = {
  name: "",
  email: "",
  password: "",
  confirmEmail: "",
  confirmPassword: "",
  isAdmin: false,
}

const dataModel = { userModel }

const state = {
  isSubmitted: false,
  errors: {},
  httpError: undefined,
  data: jsonCopy(dataModel),
  showErrorMsg: Stream(false),
  errorMsg: Stream(""),
}

const resetState = () => {
  state.data = jsonCopy(dataModel)
  state.errors = {}
  state.httpError = undefined
  state.isSubmitted = false
  state.showErrorMsg(false)
  state.errorMsg("")
}

export const Login = () => {
  return {
    onremove: () => resetState(),
    view: ({ attrs: { mdl } }) =>
      m(
        ".frow centered pt-30",
        [
          state.showErrorMsg() && m("code.warning", state.errorMsg()),
          m(
            "form.frow-container frow-center",
            {
              role: "form",
              id: "Login-form",
              onsubmit: (e) => e.preventDefault(),
            },
            [
              m("input.auth-input", {
                class: state.isSubmitted
                  ? state.errors.email
                    ? "has-error"
                    : "has-success"
                  : "",
                id: "reg-email",
                type: "email",
                placeholder: "Email",
                onkeyup: (e) => {
                  // state.isSubmitted && validateForm(mdl)(state.data)
                  state.data.userModel.email = e.target.value
                },
                value: state.data.userModel.email,
              }),
              state.errors.email && m("p.auth-input-hint", state.errors.email),

              m("input.auth-input", {
                class: state.isSubmitted
                  ? state.errors.password
                    ? "has-error"
                    : "has-success"
                  : "",
                id: "reg-pass",
                type: "password",
                placeholder: "Password",
                onkeyup: (e) => {
                  // state.isSubmitted && validateForm(mdl)(state.data)
                  state.data.userModel.password = e.target.value
                },
                value: state.data.userModel.password,
              }),
              state.errors.password &&
                m("p.auth-input-hint", state.errors.password),
            ]
          ),
          state.httpError && m(".toast toast-error", state.httpError),
        ],
        m(
          "a.button.auth-btn",
          {
            // type: "submit",
            form: `login-form`,
            onclick: () => validateForm(mdl)(state.data),
            class: mdl.state.isLoading() && "loading",
          },
          "Login"
        ),
        m(".auth-link", [
          "Need to ",
          m(NavLink, {
            mdl,
            href: "/register",
            link: "register",
            classList: "bold",
          }),
          " ?",
        ])
      ),
  }
}

export default Login

});

;require.register("Pages/Auth/register-user.js", function(exports, require, module) {
import NavLink from "Components/nav-link"
import { jsonCopy, log } from "Utils"
import { validateUserRegistrationTask } from "./Validations"
import {
  loginUserTask,
  registerUserTask,
  createAccountTask,
  linkAccountTask,
} from "./fns.js"

const userModel = {
  name: "",
  email: "",
  password: "",
  confirmEmail: "",
  confirmPassword: "",
  isAdmin: false,
}

const dataModel = { userModel }

const state = {
  isSubmitted: false,
  errors: {},
  httpError: undefined,
  data: jsonCopy(dataModel),
  showErrorMsg: Stream(false),
  errorMsg: Stream(""),
}

const resetState = () => {
  state.data = jsonCopy(dataModel)
  state.errors = {}
  state.httpError = undefined
  state.isSubmitted = false
  state.showErrorMsg(false)
  state.errorMsg("")
}

export const validateForm = (mdl) => (data) => {
  const onError = (errs) => {
    if (errs) {
      state.errors = errs
      state.errorMsg(errs.message)
      state.showErrorMsg(true)
      console.log("failed - state", state)
    } else {
      state.errorMsg("There seems to be a problem please contact web support")
      state.showErrorMsg(true)
      console.log("failed - state", state)
    }
  }

  const onSuccess = (mdl) => (data) => {
    state.errors = {}
    sessionStorage.setItem("sb-user-token", mdl.user["user-token"])
    sessionStorage.setItem("sb-user", JSON.stringify(mdl.user))
    m.route.set("/")
  }

  state.isSubmitted = true
  validateUserRegistrationTask(data.userModel)
    .chain(registerUserTask(mdl))
    .chain((_) =>
      loginUserTask(mdl)({
        email: data.userModel.email,
        password: data.userModel.password,
      })
    )
    .chain((_) => createAccountTask(mdl))
    .chain((accnt) => {
      mdl.user.account = accnt
      return linkAccountTask(mdl)
    })
    .fork(onError, onSuccess(mdl))
}

const RegisterUser = () => {
  return {
    view: ({ attrs: { data, errors, isSubmitted } }) => [
      m("input.auth-input", {
        class: isSubmitted ? (errors.name ? "has-error" : "has-success") : "",
        id: "reg-name",
        type: "text",
        placeholder: "Full Name",
        onkeyup: (e) => (data.name = e.target.value),
        value: data.name,
      }),
      errors.name && m("p.auth-input-hint", errors.name),

      m("input.auth-input", {
        class: isSubmitted ? (errors.email ? "has-error" : "has-success") : "",
        id: "reg-email",
        type: "email",
        placeholder: "Email",
        onkeyup: (e) => (data.email = e.target.value),
        value: data.email,
      }),
      errors.email && m("p.auth-input-hint", errors.email),

      m("input.auth-input", {
        id: "confirmEmail",
        class: isSubmitted
          ? errors.confirmEmail
            ? "has-error"
            : "has-success"
          : "",
        type: "email",
        placeholder: "Confirm Email",
        onkeyup: (e) => (data.confirmEmail = e.target.value),
        value: data.confirmEmail,
      }),
      errors.confirmEmail && m("p.auth-input-hint", errors.confirmEmail),

      m("input.auth-input", {
        class: isSubmitted
          ? errors.password
            ? "has-error"
            : "has-success"
          : "",
        id: "reg-pass",
        type: "password",
        placeholder: "Password",
        onkeyup: (e) => (data.password = e.target.value),
        value: data.password,
      }),
      errors.password && m("p.auth-input-hint", errors.password),

      m("input.auth-input", {
        class: isSubmitted
          ? errors.confirmPassword
            ? "has-error"
            : "has-success"
          : "",
        id: "pass-confirm",
        type: "password",
        placeholder: "Confirm Password",
        onkeyup: (e) => (data.confirmPassword = e.target.value),
        value: data.confirmPassword,
      }),
      errors.confirmPassword && m("p.auth-input-hint", errors.confirmPassword),
    ],
  }
}

export const Register = () => {
  return {
    onremove: () => resetState(),
    view: ({ attrs: { mdl } }) => [
      m(".frow centered pt-30", [
        state.showErrorMsg() && m("code.warning", state.errorMsg()),
        m(
          "form.frow-container column-center",
          {
            role: "form",
            id: "Register-form",
            onsubmit: (e) => e.preventDefault(),
          },
          [
            m(RegisterUser, {
              data: state.data.userModel,
              errors: state.errors,
              isSubmitted: state.isSubmitted,
            }),
            m(
              "a.button.auth-btn",
              {
                form: `register-form`,
                onclick: () => validateForm(mdl)(state.data),
                class: mdl.state.isLoading() && "loading",
              },
              "Register"
            ),
            m(".auth-link", [
              "Need to ",
              m(NavLink, {
                mdl,
                href: "/login",
                link: "Login",
                classList: "bold",
              }),
              " ?",
            ]),
          ]
        ),
      ]),

      state.httpError && m(".toast toast-error", state.httpError),
    ],
  }
}

export default Register

});

;require.register("Pages/account.js", function(exports, require, module) {
import { PencilLine } from "@mithril-icons/clarity/cjs"
import { states, stateDict } from "Models"

const submitAddressTask = (mdl) => (data) => {
  console.log(data)
  return mdl.http.backEnd.putTask(mdl)(
    `data/Accounts/${mdl.user.account.objectId}`
  )({
    address: JSON.stringify(data),
  })
}

const Account = () => {
  const state = {
    address: { street1: "", street2: "", city: "", state: "", zip: "" },
    editAddress: Stream(false),
    showAddress: Stream(false),
    errors: {},
  }
  const toggleEditAddress = (state) => state.editAddress(!state.editAddress())

  const submitAddress = (mdl) => (state) => {
    const onError = (errors) => console.log("e", e)
    const onSuccess = (mdl) => (s) => {
      mdl.user.address = JSON.parse(s.address)
    }
    submitAddressTask(mdl)(state.address).fork(onError, onSuccess(mdl))
  }

  return {
    oninit: ({ attrs: { mdl } }) => {
      state.address = mdl.user.address
      if (state.address) {
        state.showAddress(true)
        state.editAddress(false)
      } else {
        state.address = {}
        state.showAddress(false)
        state.editAddress(false)
      }
    },
    view: ({ attrs: { mdl } }) => {
      console.log('wtf',Object.keys(state.address).length)
      return m(".frow-container frow-center", [
        m("h2", "Welcome ", mdl.user.name),

        m("section.m-5", [
          m(
            "span.frow row-start",
            m("h3.pr-10", "Shipping Address"),
            m(PencilLine, {
              class: "clickable",
              onclick: () => toggleEditAddress(state),
              width: "16px",
            }),
            Object.keys(state.address).length
            ? m('pre', `${state.address.street1} ${state.address.street2||''} ${state.address.city} ${state.address.state} ${state.address.zip}`)
            : m("h4", "No Address on File")
          ),
          state.editAddress() &&
            m(
              "form.frow column-start m-5 px-20",
              {
                oninput: (e) => {
                  console.log(mdl, state)
                  state.address[e.target.id] = e.target.value
                },
              },
              [
                m("input.col-xs-1-2", {
                  type: "text",
                  id: "street1",
                  placeholder: "street1",
                  value: state.address.street1,
                }),
                m("input.col-xs-1-2", {
                  type: "text",
                  id: "street2",
                  placeholder: "street2",
                  value: state.address.street2,
                }),
                m(".frow row", [
                  m("input.col-xs-1-3", {
                    type: "text",
                    id: "city",
                    placeholder: "city",
                    value: state.address.city,
                  }),
                  m(
                    ".col-xs-1-3",

                    m(
                      "select",
                      {
                        id: "state",
                        placeholder: "state",
                        value: state.address.state || "state",
                      },
                      Object.keys(states).map((state) => [
                        m(
                          "option",
                          { key: "placeholder", value: "state" },
                          "state"
                        ),
                        m(
                          "option",
                          {
                            key: state,
                            placeholder: "state",
                            value: stateDict(state),
                          },
                          `${stateDict(state)}`
                        ),
                      ]),
                      state.address.state || "state"
                    )
                  ),
                  m("input.col-xs-1-3", {
                    type: "number",
                    inputmode: "numeric",
                    pattern: "[0-9]*",
                    id: "zip",
                    value: state.address.zip,
                    placeholder: "zip",
                  }),
                ]),
                m(
                  "a.button",
                  {
                    type: "submit",
                    class: "clickable",
                    onclick: () => submitAddress(mdl)(state),
                  },
                  "Submit"
                ),
              ]
            ),
        ]),
        m("section", [m("h3", "Past Orders")]),
        m("section"),
        m("section"),
      ])
    },
  }
}

export default Account

});

;require.register("Pages/blankets.js", function(exports, require, module) {
import Flicker from "Components/Flicker.js"
import Selector from "Components/Selector.js"
import { AddToCartOut } from "Styles/animations"

const Blankets = () => {
  const state = {
    errors: {},
    data: [
      "https://source.unsplash.com/random/800x600",
      "https://source.unsplash.com/random/800x600",
      "https://source.unsplash.com/random/800x600",
      "https://source.unsplash.com/random/800x600",
    ],
  }

  return {
    oninit: () => {
      // console.log("init blankets")
    },
    onremove: () => {
      state.errors = {}
      state.data = []
    },
    view: ({ attrs: { mdl } }) =>
      m(".frow-container frow-center", [
        m(".mb-30", { id: "wraps" }, [
          m(".text-2halfx", m("h2.pb-10", "Wraps")),
          m(Flicker, { mdl, data: state.data }),
          m(".mt-20", m(Selector, { mdl, product: "Wraps" })),
          m("ul", [
            m(
              "li.pb-10",
              'Handcrafted 100% Pure Wool Carriage style Blanket 21" x 18"'
            ),
            m("li.pb-10", "Machine wash and tumble dry."),
            m("li.pb-10", "Proudly made in Houston Texas USA"),
          ]),
        ]),
        m(
          ".mb-30",
          { id: "christening" },
          m(".text-2halfx", m("h2.pb-10", "Christening Blankets")),
          m(Flicker, { mdl, data: state.data }),
          m(".mt-20", m(Selector, { mdl, product: "Christening Blankets" })),
          m("ul", [
            m(
              "li.pb-10",
              'Handcrafted 100% Pure Wool Christening style Blanket 21" x 18"'
            ),
            m(
              "li.pb-10",
              "This is a specialty blanket not for general use. Care has been taken to secure the pearls and crystals."
            ),
            m(
              "li.pb-10",
              "babies should be supervised at all times when this blanket is in use."
            ),
            m("li.pb-10", "Proudly made in Houston Texas USA"),
          ])
        ),
      ]),
  }
}

export default Blankets

});

;require.register("Pages/blog.js", function(exports, require, module) {
import Task from "data.task"
import Masonry from "Components/Masonry"

const fetchBurpRagsTask = (mdl) =>
  Task.of([
    {
      imgSrc: 220,
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      imgSrc: 0,
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      imgSrc: 220,
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      imgSrc: 200,
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      imgSrc: 250,
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      imgSrc: 220,
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      imgSrc: 2,
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ])

const onPageInit = (state) => ({ attrs: { mdl } }) => {
  const onError = (s) => (error) => {
    s.errors.init = error
    console.log("errror", error)
  }

  const onSuccess = (s) => (data) => {
    s.data = data
  }

  fetchBurpRagsTask(mdl).fork(onError(state), onSuccess(state))
}

const Blog = () => {
  const state = {
    errors: {},
    data: [],
  }
  return {
    oninit: onPageInit(state),
    onremove: () => {
      state.errors = {}
      state.data = []
    },
    view: ({ attrs: { mdl } }) =>
      m(".frow-container frow-center", { id: "blog-page" }, [
        m(Masonry, { data: state.data }),
      ]),
  }
}

export default Blog

});

;require.register("Pages/burp-rags.js", function(exports, require, module) {
import Flicker from "Components/Flicker.js"
import Selector from "Components/Selector.js"

const BurpRags = () => {
  const state = {
    errors: {},
    data: [
      "https://source.unsplash.com/random/800x600",
      "https://source.unsplash.com/random/800x600",
      "https://source.unsplash.com/random/800x600",
      "https://source.unsplash.com/random/800x600",
    ],
  }
  return {
    onremove: () => {
      state.errors = {}
      state.data = []
    },
    view: ({ attrs: { mdl } }) =>
      m(".frow-container frow-center", [
        m(".mb-30", { id: "burps" }, [
          m(Flicker, { mdl, data: state.data }),
          m(".mt-20", m(Selector, { mdl, product: "Burp Rags" })),
          m("ul", [
            m("li.pb-10", "Set of 7 handcrafted burp rags"),
            m("li.pb-10", "Each guranteed to be one of a kind"),
            m("li.pb-10", 'Double sided Flannel burp cloths 21" x 12"'),
            m("li.pb-10", "Thick and absorbent!"),
            m("li.pb-10", "No two cloths are the same!"),
            m("li.pb-10", "Proudly made in Houston Texas USA"),
          ]),
          m(
            "p.pb-10",
            "Gender neutral sets are available in gray, cream or yellow/ green. Please specify when ordering."
          ),
        ]),
      ]),
  }
}

export default BurpRags

});

;require.register("Pages/cart.js", function(exports, require, module) {
import { NavLink } from "Components/nav-link"
import { isActiveRoute, getTotal, getQuantity, toProducts } from "Utils/helpers"
import { saveStorageTask } from "Utils/storage"
const saveToStorage = (mdl) => {
  const onError = (e) => console.log("Error saving", e)
  const onSuccess = (s) => {
    console.log("success saving", s)
  }

  saveStorageTask(mdl)("sb-cart")(mdl.cart).fork(onError, onSuccess)
}

const addToCart = (mdl) => (product, sex, quantity) => {
  console.log(product, sex, quantity)
  mdl.cart[product][sex] = parseInt(quantity) ? parseInt(quantity) : 0
  saveToStorage(mdl)
}

const Gender = () => {
  return {
    view: ({
      attrs: {
        mdl,
        product,
        gender: [sex, quantity],
      },
    }) => {
      return quantity
        ? m(".animated.frow row-around mt-10", [
            m("img", { src: "https://via.placeholder.com/80" }),

            // m(
            // ".col-xs-1-4",
            m(
              "label.col-xs-1-4",
              m("h4", `${sex}`),
              m("input", {
                type: "number",
                inputmode: "numeric",
                min: 0,
                placeholder: "quantity",
                value: quantity,
                onchange: (e) => addToCart(mdl)(product, sex, e.target.value),
                pattern: "[0-9]*",
              })
              // )
            ),
          ])
        : null
    },
  }
}

const Product = () => {
  return {
    view: ({
      attrs: {
        mdl,
        p: [title, genders],
      },
    }) => {
      return getQuantity(genders)
        ? m(".frow mt-10 items-baseline justify-evenly", [
            m("h2", `${title}  `),
            m("h4", `(${mdl.state.currency()}${mdl.state.prices[title]})`),
            m(
              ".animated.frow cart-item column-start",
              genders.map((gender) =>
                m(Gender, {
                  mdl,
                  gender,
                  product: title,
                })
              )
            ),
          ])
        : null
    },
  }
}

const Cart = ({ attrs: { mdl } }) => {
  return {
    oninit: ({ attrs: { mdl } }) => mdl.state.showNavModal(false),
    view: ({ attrs: { mdl } }) =>
      m(`.animated.frow-container frow-center`, [
        toProducts(mdl.cart).map((p) =>
          m(Product, {
            mdl,
            p,
          })
        ),

        getTotal(mdl, toProducts(mdl.cart))
          ? m(
              ".frow centered-column",
              m(NavLink, {
                mdl,
                href: `/checkout`,
                classList: `${isActiveRoute(`/checkout`)} button para mt-20`,
                link: [
                  "Proceed to Checkout",
                  m(
                    "h1.bold text-center white",
                    `Total of ${getQuantity(
                      toProducts(mdl.cart)
                    )} for ${mdl.state.currency()}${getTotal(
                      mdl,
                      toProducts(mdl.cart)
                    )}`
                  ),
                ],
              })
            )
          : m("h1.bold", "Your Cart is Empty"),
      ]),
  }
}

export default Cart

});

;require.register("Pages/checkout.js", function(exports, require, module) {
import { NavLink } from "Components/nav-link"
import {
  isActiveRoute,
  getTotal,
  getQuantity,
  getPrice,
  toProducts,
} from "Utils/helpers"

const CheckoutButtons = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".frow centered-column mt-30", [
        m("h2.pb-10", "Select a Checkout Option"),
        m("img", {
          src:
            "https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppcmcvdam.png",
        }),
      ]),
  }
}

const Gender = () => {
  return {
    view: ({
      attrs: {
        mdl,
        gender: [sex, quantity],
      },
    }) => {
      return quantity
        ? m(".", [
            m("img", { src: "https://via.placeholder.com/80" }),
            m("h4", `${sex} : ${quantity}`),
          ])
        : null
    },
  }
}

const Product = ({
  attrs: {
    mdl,
    p: [title, genders],
  },
}) => {
  let amount = getQuantity(genders)

  let price = getPrice(mdl, title, genders)

  return {
    view: ({
      attrs: {
        mdl,
        p: [title, genders],
      },
    }) => {
      return amount
        ? m(".frow column-start mt-10", [
            m(
              "span.underline",
              m(
                "h3.mb-10",
                `${amount} ${title} for ${mdl.state.currency()}${price}`
              )
            ),
            m(
              ".frow cart-item row-around",
              genders.map((gender) => m(Gender, { mdl, gender }))
            ),
          ])
        : null
    },
  }
}

const Cart = ({ attrs: { mdl } }) => {
  return {
    oninit: ({ attrs: { mdl } }) => mdl.state.showNavModal(false),
    view: ({ attrs: { mdl } }) =>
      m(`.frow-container frow-center`, [
        getTotal(mdl, toProducts(mdl.cart))
          ? m(NavLink, {
              mdl,
              href: `/cart`,
              classList: `${isActiveRoute(`/cart`)} para button m-0`,
              link: "Update Cart",
            })
          : null,

        toProducts(mdl.cart).map((p) => m(Product, { mdl, p })),

        getTotal(mdl, toProducts(mdl.cart))
          ? [
              m(
                ".frow centered-column",
                m(NavLink, {
                  mdl,
                  href: `/checkout`,
                  classList: `${isActiveRoute(`/checkout`)} mt-50`,
                  link: [
                    m(
                      "h1.bold text-center.mt-20",
                      `Total of ${getQuantity(
                        toProducts(mdl.cart)
                      )} for ${mdl.state.currency()}${getTotal(
                        mdl,
                        toProducts(mdl.cart)
                      )}`
                    ),
                  ],
                })
              ),
              m(CheckoutButtons, { mdl }),
            ]
          : m("h1.bold", "Your Cart is Empty"),
      ]),
  }
}

export default Cart

});

;require.register("Pages/default.js", function(exports, require, module) {
const Default = (mdl) => {
  return {
    view: ({ attrs: { mdl } }) => m(".frow-container frow-center"),
  }
}

export default Default

});

;require.register("Pages/home.js", function(exports, require, module) {
import Task from "data.task"
import Masonry from "Components/Masonry"

const fetchBurpRagsTask = (mdl) =>
  Task.of([
    { imgSrc: 320, title: "", description: "" },
    { imgSrc: 250, title: "", description: "" },
    { imgSrc: 220, title: "", description: "" },
    { imgSrc: 200, title: "", description: "" },
    { imgSrc: 250, title: "", description: "" },
    { imgSrc: 320, title: "", description: "" },
    { imgSrc: 320, title: "", description: "" },
  ])

const onPageInit = (state) => ({ attrs: { mdl } }) => {
  const onError = (s) => (error) => {
    s.errors.init = error
    console.log("errror", error)
  }

  const onSuccess = (s) => (data) => {
    s.data = data
  }

  fetchBurpRagsTask(mdl).fork(onError(state), onSuccess(state))
}

const Home = () => {
  const state = {
    errors: {},
    data: [],
  }
  return {
    oninit: onPageInit(state),
    onremove: () => {
      state.errors = {}
      state.data = []
    },
    view: ({ attrs: { mdl } }) =>
      m(".frow-container frow-center", { id: "home-page" }, [
        m(Masonry, { data: state.data }),
      ]),
  }
}

export default Home

});

;require.register("Routes/authenticated-routes.js", function(exports, require, module) {
import Default from "Pages/default.js"
import Home from "Pages/home.js"
import Account from "Pages/account.js"
import Layout from "Layouts/index.js"
import { scrollToAnchor, jsonCopy } from "Utils"
import { newCart } from "Models/cart"

const AuthenticatedRoutes = [
  {
    id: "account",
    name: "Account",
    // icon: Icons.logo,
    route: "/account/:name",
    position: ["toolbar"],
    group: ["authenticated"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(Account, { mdl })),
  },
  {
    id: "profile-page",
    name: "Profile Page",
    // icon: Icons.home,
    route: "/account/:name/profile",
    position: ["settings-nav"],
    group: ["authenticated"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      console.log(
        "profile page login on match",
        mdl,
        args,
        path,
        fullroute,
        isAnchor,
        !mdl.state.isAuth()
      )
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
  },
  {
    id: "manage-users",
    name: "Manage Users",
    // icon: Icons.users,
    route: "/account/:name/user-management",
    position: ["settings-nav"],
    group: ["authenticated", "admin"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
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
      !mdl.user.isAdmin && m.route.set(m.route.get())
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
  },
  {
    id: "logout",
    name: "",
    // icon: Icons.users,
    route: "/logout",
    position: [],
    group: ["authenticated", "admin"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      })

      localStorage.clear()
      sessionStorage.clear()
      mdl.cart = jsonCopy(newCart)
      mdl.state.isAuth(false)
      mdl.user = {}
      m.route.set(m.route.get())
      console.log("loggout", mdl)
    },
    component: (mdl) => m(Layout, { mdl }, m(Home, { mdl })),
  },
]

export default AuthenticatedRoutes

});

;require.register("Routes/index.js", function(exports, require, module) {
import AuthenticatedRoutes from "./authenticated-routes.js"
import MainRoutes from "./main-routes.js"
import { flatten } from "ramda"

const Routes = flatten([MainRoutes, AuthenticatedRoutes])
export default Routes

});

;require.register("Routes/main-routes.js", function(exports, require, module) {
import Layout from "Layouts/index.js"
import BurpRags from "Pages/burp-rags.js"
import BabyBlankets from "Pages/blankets.js"
import Default from "Pages/default.js"
import Blog from "Pages/blog.js"
import Home from "Pages/home.js"
import Cart from "Pages/cart.js"
import Checkout from "Pages/checkout.js"
import Logo from "Components/Logo"
import Login from "Pages/Auth/login-user.js"
import Register from "Pages/Auth/register-user.js"
import { scrollToAnchor } from "Utils/index.js"

const Routes = [
  {
    id: "sette-bambini",
    name: m(Logo),
    // icon: Icons.home,
    route: "/",
    isNav: true,
    group: ["toolbar"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(Home, { mdl })),
  },
  {
    id: "login",
    name: "Account Login",
    // icon: Icons.search,
    route: "/login",
    isNav: false,
    group: [],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(Login, { mdl })),
  },
  {
    id: "register",
    name: "Register Account",
    // icon: Icons.search,
    route: "/register",
    isNav: false,
    group: [],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(Register, { mdl })),
  },
  {
    id: "cart",
    name: "Cart",
    // icon: Icons.search,
    route: "/cart",
    isNav: false,
    group: [],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(Cart, { mdl })),
  },
  {
    id: "checkout",
    name: "Check Out",
    // icon: Icons.search,
    route: "/checkout",
    isNav: false,
    group: ["toolbar"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(Checkout, { mdl })),
  },
  {
    id: "burp-rags",
    name: "Burp Rags",
    // icon: Icons.search,
    route: "/burp-rags",
    isNav: true,
    group: ["navbar"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(BurpRags, { mdl })),
  },
  {
    id: "blankets",
    name: "Blankets",
    // icon: Icons.search,
    route: "/blankets",
    isNav: false,
    group: ["navbar", "blankets"],
    children: ["wraps-blankets", "christ-blankets"],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(BabyBlankets, { mdl })),
  },
  {
    id: "wraps-blankets",
    name: "Wraps",
    // icon: Icons.search,
    route: "/blankets/#wraps",
    isNav: false,
    group: ["sub-navbar", "blankets"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(BabyBlankets, { mdl })),
  },
  {
    id: "christ-blankets",
    name: "Christening Blankets",
    // icon: Icons.search,
    route: "/blankets/#christening",
    isNav: false,
    group: ["sub-navbar", "blankets"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(BabyBlankets, { mdl })),
  },
  {
    id: "blog",
    name: "Blog",
    // icon: Icons.home,
    route: "/blog",
    isNav: true,
    group: ["footer", "menu"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(Blog, { mdl })),
  },
  {
    id: "about-us",
    name: "About Us",
    // icon: Icons.home,
    route: "/about-us",
    isNav: true,
    group: ["footer"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
  },
  {
    id: "Contact Us",
    name: "Contact",
    // icon: Icons.search,
    route: "/contact-us",
    isNav: false,
    group: ["footer"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
  },
  {
    id: "returns",
    name: "Returns Policy",
    // icon: Icons.search,
    route: "/returns",
    isNav: false,
    group: ["footer", "menu"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
  },
  {
    id: "tos",
    name: "Terms of Service",
    // icon: Icons.search,
    route: "/terms-of-service",
    isNav: false,
    group: ["footer"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
  },
  {
    id: "privacy-policy",
    name: "Privacy Policy",
    // icon: Icons.search,
    route: "/privacy-policy",
    isNav: false,
    group: ["footer"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
  },
  {
    id: "partnerships",
    name: "Partnerships",
    // icon: Icons.search,
    route: "/partnerships",
    isNav: false,
    group: ["footer", "menu"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
  },
  {
    id: "safety-information",
    name: "Safety Information",
    // icon: Icons.search,
    route: "/safety-information",
    isNav: false,
    group: ["footer", "menu"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
  },
  {
    id: "faq",
    name: "FAQ",
    // icon: Icons.search,
    route: "/faq",
    isNav: false,
    group: ["footer", "menu"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
  },
]

export default Routes

});

;require.register("Styles/animations.js", function(exports, require, module) {
export const SlideInLeft = ({ dom }) => dom.classList.toggle("slideInLeft")
export const SlideInRight = ({ dom }) => dom.classList.toggle("slideInRight")
export const AddToCart = ({ dom }) => dom.classList.toggle("slide-out-tr")

export const AddToCartOut = ({ dom }) => {
  AddToCart({ dom })
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}

export const SlideOutRight = ({ dom }) => {
  dom.classList.replace("slideInLeft", "slideOutLeft")
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}

export const SlideOutLeft = ({ dom }) => {
  dom.classList.replace("slideInRight", "slideOutRight")
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}

export const SlideDown = ({ dom }) => {
  dom.style.opacity = 0
  dom.classList.toggle("slideInDown")
  dom.style.opacity = 1
}

export const SlideUp = ({ dom }) => {
  dom.classList.replace("slideInDown", "slideOutUp")
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve()
    }, 300)
  })
}

export const SlideChildrenInRight = ({ dom }) => {
  let children = [...dom.children]

  return children.map((child, idx) => {
    child.style.opacity = 0
    setTimeout(() => {
      child.classList.toggle("slideInLeft")
      child.style.opacity = 1
    }, (idx + 1) * 10)
  })
}

export const StretchInLeft = (idx) => ({ dom }) => {
  dom.style.opacity = 0
  return setTimeout(() => {
    dom.classList.toggle("stretchRight")
    dom.style.opacity = 1
  }, idx * 100 + 20)
}

export const SlideChildrenInDown = (idx) => ({ dom }) => {
  dom.style.opacity = 0
  setTimeout(() => {
    dom.classList.toggle("slideDown")
    dom.style.opacity = 1
  }, (idx + 1) * 200)
}

export const animate = (dir) => ({ dom }) => {
  dom.style.opacity = 0
  setTimeout(() => {
    dom.classList.toggle(dir)
    dom.style.opacity = 1
  }, 200)
}

export const RemoveChildrenOut = ({ dom }) =>
  new Promise(() => {
    ;[...dom.children].reverse().map((child, idx) => {
      return setTimeout(() => {
        child.style.display = "none"
      }, idx * 100)
    })
  })

});

;require.register("Utils/helpers.js", function(exports, require, module) {
import {
  compose,
  last,
  join,
  values,
  props,
  assoc,
  test,
  prop,
  filter,
  sortBy,
  toLower,
  identity,
  reverse,
  slice,
  split,
  trim,
  max,
  toPairs,
  min,
  add,
  map,
  flatten,
  reduce,
  type,
  equals,
} from "ramda"
import Task from "data.task"

export const makeRoute = compose(join("-"), split(" "), trim(), toLower())
export const log = (m) => (v) => {
  console.log(m, v)
  return v
}

export const isEmpty = (data) => data.length == 0

export const infiniteScroll = (mdl) => (e) => {
  let route = mdl.state.route
  let length = mdl.data[route].data.length
  let setpoint = 10 * length * mdl.state.scrollPos
  if (e.target.scrollTop - mdl.state.scrollPos >= setpoint) {
    mdl.state.scrollPos++ + e.target.scrollTop
  }
}

export const addTerms = (item) => {
  const terms = compose(join(" "), values, props(["uuid", "id", "name"]))(item)

  return assoc("_terms", terms, item)
}

const byTerms = (query) => compose(test(new RegExp(query, "i")), prop("name"))

export const _search = (query) => compose(filter(byTerms(query)))

export const _sort = (p) => sortBy(compose(toLower, toString, prop(p)))

export const _direction = (dir) => (dir == "asc" ? identity : reverse)

export const _paginate = (offset) => (limit) => (data) =>
  slice(
    max(0, min(offset, data.length)),
    min(offset + limit, data.length),
    data
  )

export const filterTask = (query) => (prop) => (direction) => (offset) => (
  limit
) =>
  compose(
    Task.of,
    map(_paginate(offset)(limit)),
    map(_direction(direction)),
    map(_sort(prop)),
    _search(query)
  )

export const debounce = (wait, now) => (fn) => {
  let timeout = undefined
  return function () {
    let context = this
    let args = arguments
    let later = function () {
      timeout = undefined
      if (!now) fn.apply(context, args)
    }
    let callNow = now && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    console.log(fn)
    if (callNow) fn.apply(context, args)
  }
}

export const getRoute = () => last(m.route.get().split("/"))

export const scrollToAnchor = (anchor) => {
  let is = (el) => el !== undefined && el !== null
  //if you pass an undefined anchor it will scroll to the top of the body
  let targetEl = is(anchor) ? document.getElementById(anchor) : document.body
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop
  let target = is(targetEl) ? targetEl.getBoundingClientRect().top : 0

  return window.scroll({
    top: target + scrollTop - 150,
    left: 0,
    behavior: "smooth",
  })
}

export const jsonCopy = (src) => JSON.parse(JSON.stringify(src))

export const isActiveRoute = (route) => (m.route.get() == route ? "bold" : "")

export const uuid = () => {
  return "xxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const toProducts = (cart) =>
  toPairs(cart).map(([product, genders]) => [product, toPairs(genders)])

export const getPrice = (mdl, title, genders) => {
  /*
  get realprice from mdl.state.currency, title, getQuantity(title, genders)
*/
  // console.log("wtf", title, genders)

  let price = mdl.state.prices[title] * getQuantity(genders)
  if (mdl.state.currency() !== "$") {
    //price = convertPriceToCurrency(mdl.state.currency(), price)
  }

  return price
}

export const getQuantity = (xs) =>
  reduce(add, 0, filter(compose(equals("Number"), type), flatten(xs)))

export const getTotal = (mdl, products) =>
  getQuantity(products.map((p) => getPrice(mdl, p[0], p[1])))

});

;require.register("Utils/http.js", function(exports, require, module) {
import Task from "data.task"
import { BackEnd } from "./.secrets.js"

const onProgress = (mdl) => (e) => {
  if (e.lengthComputable) {
    mdl.state.loadingProgress.max = e.total
    mdl.state.loadingProgress.value = e.loaded
    m.redraw()
  }
}

function onLoad() {
  return false
}

const onLoadStart = (mdl) => (e) => {
  mdl.state.isLoading(true)
  return false
}

const onLoadEnd = (mdl) => (e) => {
  mdl.state.isLoading(false)
  mdl.state.loadingProgress.max = 0
  mdl.state.loadingProgress.value = 0
  return false
}

const xhrProgress = (mdl) => ({
  config: (xhr) => {
    xhr.onprogress = onProgress(mdl)
    xhr.onload = onLoad
    xhr.onloadstart = onLoadStart(mdl)
    xhr.onloadend = onLoadEnd(mdl)
  },
})

export const parseHttpError = (mdl) => (rej) => (e) => {
  mdl.state.isLoading(false)
  return rej(e.response)
}

export const parseHttpSuccess = (mdl) => (res) => (data) => {
  mdl.state.isLoading(false)
  return res(data)
}

const getUserToken = () =>
  window.sessionStorage.getItem("user-token")
    ? window.sessionStorage.getItem("user-token")
    : ""

const HttpTask = (_headers) => (method) => (mdl) => (url) => (body) => {
  mdl.state.isLoading(true)
  return new Task((rej, res) =>
    m
      .request({
        method,
        url,
        headers: {
          "content-type": "application/json",
          ..._headers,
        },
        body,
        withCredentials: false,
        ...xhrProgress(mdl),
      })
      .then(parseHttpSuccess(mdl)(res), parseHttpError(mdl)(rej))
  )
}

const lookupLocationTask = (query) => {
  return new Task((rej, res) =>
    m
      .request({
        method: "GET",
        url: `https://nominatim.openstreetmap.org/search?q=${query}&format=json`,
      })
      .then(res, rej)
  )
}

const getTask = (mdl) => (url) => HttpTask({})("GET")(mdl)(url)(null)

const nhtsaUrl = "http://localhost:3001/nhtsa/api/"
const nhtsa = {
  get: (mdl) => (url) => getTask(mdl)(nhtsaUrl + "/" + url),
}

const backEndUrl = `${BackEnd.baseUrl}/${BackEnd.APP_ID}/${BackEnd.API_KEY}/`
const backEnd = {
  getTask: (mdl) => (url) =>
    HttpTask(BackEnd.headers())("GET")(mdl)(backEndUrl + url)(null),
  postTask: (mdl) => (url) => (dto) =>
    HttpTask(BackEnd.headers())("POST")(mdl)(backEndUrl + url)(dto),
  putTask: (mdl) => (url) => (dto) =>
    HttpTask(BackEnd.headers())("PUT")(mdl)(backEndUrl + url)(dto),
}

const http = {
  backEnd,
  HttpTask,
  getTask,
  lookupLocationTask,
}

export default http

// const makeQuery = (string) => JSON.parse(JSON.stringify(string))

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

});

;require.register("Utils/index.js", function(exports, require, module) {
export * from "./helpers.js"
export * from "./http.js"
export * from "./validation.js"
export * from "./storage.js"

});

;require.register("Utils/storage.js", function(exports, require, module) {
import Task from "data.task"

const getLocalStorageTask = (key) =>
  new Task((rej, res) =>
    localStorage.getItem(key)
      ? rej("nothing here")
      : res(localStorage.getItem(key))
  )

const saveLocalStorageTask = (key) => (value) => {
  localStorage.setItem(key, JSON.stringify(value))
  return Task.of(localStorage.getItem(key))
}

const saveDbStorageTask = (mdl) => (cart) =>
  mdl.http.backEnd.putTask(mdl)(`data/Accounts/${mdl.user.account.objectId}`)({
    cart,
  })

const getDbStorageTask = (mdl) =>
  mdl.http.backEnd.gettTask(mdl)(`data/Accounts/${mdl.account.objectId}`)

const saveStorageTask = (mdl) => (key) => (value) => {
  return mdl.state.isAuth()
    ? saveLocalStorageTask(key)(value).chain(saveDbStorageTask(mdl))
    : saveLocalStorageTask(key)(value)
}

export {
  getLocalStorageTask,
  saveLocalStorageTask,
  saveDbStorageTask,
  getDbStorageTask,
  saveStorageTask,
}

});

;require.register("Utils/validation.js", function(exports, require, module) {
import {
  compose,
  curry,
  isEmpty,
  isNil,
  length,
  gte,
  test,
  not,
  view,
  set,
  contains,
  map,
  toUpper,
} from 'ramda'
import { Success, Failure } from 'data.validation'
import Maybe from 'data.maybe'

export const getOrElse = (val) => (x) => x.getOrElse(val)

export const validate = curry((rule, lens, msg, data) =>
  rule(view(lens, data)) ? Success(data) : Failure([set(lens, msg, {})])
)

export const isRequired = compose(
  not,
  isEmpty
)

export const IsNotNil = compose(
  not,
  isNil
)

export const isNotNullOrEmpty = (data) => !isNullOrEmpty(data)

export const isNullOrEmpty = (data) => isNil(data) || isEmpty(data)

export const maxLength = (max) =>
  compose(
    gte(max),
    length
  )

export const maxSize = curry((max, value) => gte(max, value))

export const emailFormat = test(/@/)

export const onlyAlpha = test(/^[a-zA-Z]*$/)

export const onlyAlphaNumeric = test(/^[a-zA-Z0-9]*$/)

export const onlyAlphaNumericUnderscore = test(/^[a-zA-Z0-9_]*$/)

export const onlyAlphaNumericSpace = test(/^[a-zA-Z0-9\s]*$/)

export const onlyAlphaNumericSpaceUnderscore = test(/^[a-zA-Z0-9_\s]*$/)

export const onlyAlphaNumericSpaceSpecial = test(
  /^[a-zA-Z0-9_.~!*''();:@&=+$,/?#[%-\]+\s]*$/
)

export const phoneFormat = test(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)

export const urlFormat = test(/^[a-zA-Z0-9_.~!*''();:@&=+$,/?#[%-\]+]*$/)

export const onlyNumeric = test(/^[0-9]*$/)

export const maxLengthNullable = (max) =>
  compose(
    getOrElse(false),
    map(gte(max)),
    map(length),
    Maybe.fromNullable
  )

export const unique = curry((keys, value) => {
  let lookup = Maybe.fromNullable(keys)
  return !contains(
    toUpper(value.toString()),
    map((y) => toUpper(y.toString()), lookup.getOrElse([]))
  )
})

export const inDateRange = curry((start, end, value) => {
  if (value == null || value === '') {
    return true
  }

  return new Date(start) <= new Date(value) && new Date(value) < new Date(end)
})

export const allCaps = (str) => str.toUpperCase() === str

export const isNilOrEmptyOrAtom = (item) =>
  isNil(item) || isEmpty(item) || item === '{$type:atom}'

});

;require.register("app.js", function(exports, require, module) {
const toRoutes = (mdl) => (acc, route) => {
  acc[route.route] = {
    onmatch: (args, path, fullroute) => {
      if (route.group.includes("authenticated") && !mdl.state.isAuth()) {
        mdl.route.set(m.route.get())
      }
      mdl.state.route = route
      mdl.state.anchor = path.split("#")[1]
      let isAnchor = Boolean(mdl.state.anchor)
      route.onmatch(mdl, args, path, fullroute, isAnchor)
    },
    render: () => route.component(mdl),
  }
  return acc
}

const App = (mdl) => mdl.Routes.reduce(toRoutes(mdl), {})

export default App

});

;require.register("index.js", function(exports, require, module) {
import App from "./app.js"
import Model from "Models/index.js"
import { FunConfig } from "fun-config"

FunConfig.configure()
const root = document.body
let winW = window.innerWidth

if (module.hot) {
  module.hot.accept()
}

if ('production' !== "production") {
  console.log("Looks like we are in development mode!")
} else {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((registration) => {
          console.log("⚙️ SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("🧟 SW registration failed: ", registrationError)
        })
    })
  }
}

// set display profiles
const getProfile = (w) => {
  if (w < 668) return "phone"
  if (w < 920) return "tablet"
  return "desktop"
}

const checkWidth = (winW) => {
  const w = window.innerWidth
  if (winW !== w) {
    winW = w
    var lastProfile = Model.settings.screenSize
    Model.settings.screenSize = getProfile(w)
    if (lastProfile != Model.settings.screenSize) m.redraw()
  }
  return requestAnimationFrame(checkWidth)
}

Model.settings.screenSize = getProfile(winW)

checkWidth(winW)

if (sessionStorage.getItem("sb-user")) {
  Model.user = JSON.parse(sessionStorage.getItem("sb-user"))
  //fetch cart from db? do i really??
  Model.state.isAuth(true)
}
if (localStorage.getItem("sb-cart")) {
  Model.cart = JSON.parse(localStorage.getItem("sb-cart"))
}

m.route(root, "/", App(Model))

});

;require.register("initialize.js", function(exports, require, module) {
document.addEventListener("DOMContentLoaded", () => {
  require("./index.js")
})

});

;require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.m = require("mithril");
window.Stream = require("mithril-stream");


});})();require('___globals___');

