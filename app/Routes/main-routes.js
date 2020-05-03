import Layout from "../Layouts/index.js"
import BurpRags from "../Pages/burp-rags.js"
import BabyTowels from "../Pages/blankets.js"
import Default from "../Pages/default.js"
import Blog from "../Pages/blog.js"
import Home from "../Pages/home.js"
import Logo from "Components/Logo"
import Login from "../Pages/Auth/login-user.js"
import Register from "../Pages/Auth/register-user.js"

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
      isAnchor && scrollToAnchor(mdl.state.anchor)
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
      isAnchor && scrollToAnchor(mdl.state.anchor)
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
      isAnchor && scrollToAnchor(mdl.state.anchor)
    },
    component: (mdl) => m(Layout, { mdl }, m(Register, { mdl })),
  },
  {
    id: "cart",
    name: "Cart",
    // icon: Icons.search,
    route: "/cart",
    isNav: false,
    group: ["toolbar"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor && scrollToAnchor(mdl.state.anchor)
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
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
      isAnchor && scrollToAnchor(mdl.state.anchor)
    },
    component: (mdl) => m(Layout, { mdl }, m(BurpRags, { mdl })),
  },
  {
    id: "blankets",
    name: "Baby Blankets",
    // icon: Icons.search,
    route: "/blankets",
    isNav: false,
    group: ["navbar"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor && scrollToAnchor(mdl.state.anchor)
    },
    component: (mdl) => m(Layout, { mdl }, m(BabyTowels, { mdl })),
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
      isAnchor && scrollToAnchor(mdl.state.anchor)
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
      isAnchor && scrollToAnchor(mdl.state.anchor)
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
      isAnchor && scrollToAnchor(mdl.state.anchor)
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
      isAnchor && scrollToAnchor(mdl.state.anchor)
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
      isAnchor && scrollToAnchor(mdl.state.anchor)
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
      isAnchor && scrollToAnchor(mdl.state.anchor)
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
  },
  {
    id: "partnerships",
    name: "partnerships",
    // icon: Icons.search,
    route: "/partnerships",
    isNav: false,
    group: ["footer", "menu"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor && scrollToAnchor(mdl.state.anchor)
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
      isAnchor && scrollToAnchor(mdl.state.anchor)
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
      isAnchor && scrollToAnchor(mdl.state.anchor)
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
  },
]

export default Routes
