import Layout from "Layouts/index.js"
import BurpRags from "Pages/burp-rags.js"
import BabyBlankets from "Pages/blankets.js"
import Default from "Pages/default.js"
import Collections from "Pages/collections.js"
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
    id: "collections",
    name: "Collections",
    // icon: Icons.search,
    route: "/collections",
    isNav: false,
    group: ["navbar", "collections"],
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
    component: (mdl) => m(Layout, { mdl }, m(Collections, { mdl })),
  },
  {
    id: "wraps-blankets",
    name: "Wraps",
    // icon: Icons.search,
    route: "/blankets/#wraps",
    isNav: false,
    group: ["nav", "blankets"],
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
    group: ["nav", "blankets"],
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
  // {
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
    group: ["footer", "sub-navbar", "menu"],
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
    group: ["footer", "sub-navbar", "menu"],
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
    group: ["footer", "menu", "sub-navbar", "menu"],
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
