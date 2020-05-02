import NavLink from "./nav-link"
import { SlideInLeft, SlideOutRight } from "../Styles/animations.js"

const isActiveRoute = (route) => (m.route.get() == route ? "bold" : "")

const NavItem = () => {
  return {
    view: ({ attrs: { mdl, href, link, classList } }) =>
      m(`li.nav-item`, m(NavLink, { mdl, href, link, classList })),
  }
}

const NavMenu = () => {
  const state = {
    status: (mdl) => (mdl.state.showNavMenu() ? "navMenuShow" : "navMenuHide"),
  }
  let routes = (mdl) => mdl.Routes.filter((r) => r.group.includes("menu"))

  return {
    view: ({ attrs: { mdl } }) =>
      m(
        `.${state.status(mdl)}`,
        {
          oncreate: SlideInLeft,
          onbeforeremove: SlideOutRight,
        },
        m(
          ".navMenuOverlay",
          {
            onclick: () => mdl.state.showNavMenu(false),
          },
          m(`ul.nav`, { id: "" }, [
            mdl.state.isAuth()
              ? m(NavLink, {
                  mdl,
                  href: `/account/${mdl.user.name}`,
                  link: "Your Account",
                  classList: `${isActiveRoute(
                    `/account/${mdl.user.name}`
                  )} button`,
                })
              : m(".frow", [
                  m(NavItem, {
                    mdl,
                    href: "/login",
                    link: "Login",
                    classList: `${isActiveRoute("/login")} button`,
                  }),

                  m(NavItem, {
                    mdl,
                    href: "/register",
                    link: "Register",
                    classList: `${isActiveRoute("/register")} button`,
                  }),
                ]),
            routes(mdl).map((r) =>
              m(NavItem, {
                mdl,
                href: r.route,
                link: r.name,
                classList: isActiveRoute(r.route),
              })
            ),
          ])
        )
      ),
  }
}

export default NavMenu
