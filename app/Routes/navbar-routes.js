import m from "mithril"
import Layout from "../Layouts/index.js"
import BurpRags from "../Pages/burp-rags.js"
import BabyTowels from "../Pages/blankets.js"

const NavbarRoutes = [
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
]

export default NavbarRoutes
