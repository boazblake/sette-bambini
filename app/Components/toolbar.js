import NavLink from "./nav-link.js"
import { ShoppingBagLine, MenuLine } from "@mithril-icons/clarity/cjs/index"
import Logo from "./Logo"
const isActiveRoute = (route) => (m.route.get() == route ? "bold" : "")

const ToolBar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".toolbar",
        m("nav.frow row-between row-center", [
          m("nav.frow", [
            mdl.settings.profile == "desktop"
              ? mdl.state.isAuth()
                ? m(NavLink, {
                    mdl,
                    href: `/account/${mdl.user.name}`,
                    link: "Your Account",
                    classList: `${isActiveRoute(
                      `/account/${mdl.user.name}`
                    )} button`,
                  })
                : m(".frow", [
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
                  ])
              : m(
                  "a",
                  {
                    onclick: () => mdl.state.showNavMenu(true),
                  },
                  m(MenuLine)
                ),
          ]),
          m(NavLink, {
            mdl,
            href: "/",
            classList: "logo",
            link: m("icon", { width: "12px" }, Logo),
          }),
          m("nav.navbar-section.toolbar-section", [
            m(NavLink, {
              mdl,
              href: "/cart",
              link: m(ShoppingBagLine),
            }),
          ]),
        ])
      ),
  }
}

export default ToolBar
