import m from "mithril"
import Layout from "../Layouts/index.js"
import Default from "../Pages/default.js"
import Home from "../Pages/home.js"
import Login from "../Pages/Auth/login-user.js"
import Register from "../Pages/Auth/register-user.js"
import Logo from "Components/Logo"

const ToolbarRoutes = [
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
]

export default ToolbarRoutes
