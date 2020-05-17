import NavLink from "Components/nav-link.js"
import { ShoppingBagLine, BarsLine } from "@mithril-icons/clarity/cjs/index"
import Logo from "Components/Logo"
import { isActiveRoute } from "Utils/index.js"

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
              m(BarsLine)
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
          m(ShoppingBagLine, {
            onclick: () => mdl.state.showCartModal(true),
          }),
        ])
      ),
  }
}

export default ToolBar
