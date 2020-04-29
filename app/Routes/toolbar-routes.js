import m from "mithril"
import Layout from "../Layouts/index.js"
import Default from "../Pages/default.js"
import Home from "../Pages/home.js"

const ToolbarRoutes = [
  {
    id: "sette-bambini",
    name: "Sette Bambini",
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
    id: "cart",
    name: "cart",
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
    id: "login",
    name: "Account Login",
    // icon: Icons.search,
    route: "/login",
    isNav: false,
    group: ["toolbar"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor && scrollToAnchor(mdl.state.anchor)
    },
    component: (mdl) => m(Layout, { mdl }, m(Default, { mdl })),
  },
]

export default ToolbarRoutes
