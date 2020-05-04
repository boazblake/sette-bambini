import NavLink from "./nav-link.js"
import {
  AlertSolid,
  ShoppingBagLine,
  BarsLine,
} from "@mithril-icons/clarity/cjs/index"
import Logo from "./Logo"
const isActiveRoute = (route) => (m.route.get() == route ? "bold" : "")

const ToolBar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".toolbar",
        m(".frow row-between row-center", [
          m(".frow", [
            m(
              ".navMenuButton visible-xs",
              {
                onclick: () => mdl.state.showNavMenu(true),
              },
              m(BarsLine)
            ),
            mdl.state.isAuth()
              ? m(NavLink, {
                  mdl,
                  href: `/account/${mdl.user.name}`,
                  link: "Your Account",
                  classList: `${isActiveRoute(
                    `/account/${mdl.user.name}`
                  )} button hidden-xs`,
                })
              : m(".frow hidden-xs", [
                  m(NavLink, {
                    mdl,
                    href: "/login",
                    link: "Login",
                    classList: `${isActiveRoute("/login")} button`,
                  }),

                  m(NavLink, {
                    mdl,
                    href: "/register",
                    link: "Register",
                    classList: `${isActiveRoute("/register")} button`,
                  }),
                ]),
          ]),
          m(NavLink, {
            mdl,
            href: "/",
            classList: "logo",
            link: m(Logo, { id: "toolbar-logo", class: "frow row-center" }),
          }),
          m(NavLink, {
            mdl,
            href: "/cart",
            classList: "shadow",
            link: m(ShoppingBagLine),
          }),
        ])
      ),
  }
}

export default ToolBar
