import Layout from "../Layouts/index.js"
import Default from "../Pages/default.js"
import Blog from "../Pages/blog.js"

const OtherRoutes = [
  {
    id: "blog",
    name: "Blog",
    // icon: Icons.home,
    route: "/blog",
    isNav: true,
    group: ["other", "menu"],
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
    group: ["other", "menu"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor && scrollToAnchor(mdl.state.anchor)
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
  },
  {
    id: "Contact Us",
    name: "contact us",
    // icon: Icons.search,
    route: "/contact-us",
    isNav: false,
    group: ["other", "menu"],
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
    group: ["other", "menu"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor && scrollToAnchor(mdl.state.anchor)
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
  },
  {
    id: "tos",
    name: "Terms of service",
    // icon: Icons.search,
    route: "/terms-of-service",
    isNav: false,
    group: ["other", "menu"],
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
    group: ["other", "menu"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor && scrollToAnchor(mdl.state.anchor)
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
  },
  {
    id: "collaborations",
    name: "collaborations",
    // icon: Icons.search,
    route: "/collaborations",
    isNav: false,
    group: ["other", "menu"],
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
    group: ["other", "menu"],
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
    group: ["other", "menu"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor && scrollToAnchor(mdl.state.anchor)
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
  },
]

export default OtherRoutes
