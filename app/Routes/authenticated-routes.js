import Default from "Pages/default.js"
import Account from "Pages/account.js"
import Layout from "Layouts/index.js"
import { scrollToAnchor } from "Utils"

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
]

export default AuthenticatedRoutes
