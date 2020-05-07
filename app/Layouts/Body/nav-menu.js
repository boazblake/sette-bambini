import NavLink from "Components/nav-link"
import { SlideInLeft } from "Styles/animations.js"
import { isActiveRoute } from "Utils/index.js"
let state = {
  onHover: () => {},
  selected: () => {},
}

const NavItem = () => {
  return {
    view: ({ attrs: { mdl, href, link, classList } }) =>
      m(`li.nav-item`, m(NavLink, { mdl, state, href, link, classList })),
  }
}

const NavMenu = () => {
  let routes = (mdl) => mdl.Routes.filter((r) => r.group.includes("menu"))
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        `.navMenu.animated`,
        {
          oncreate: SlideInLeft,
        },
        m(
          ".navMenuOverlay",
          {
            onclick: (e) => {
              mdl.state.showNavMenu(false)
            },
          },
          m(`ul.nav`, { id: "" }, [
            mdl.state.isAuth()
              ? m(NavLink, {
                  state,
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
                    classList: `${isActiveRoute("/login")} button para`,
                  }),

                  m(NavItem, {
                    mdl,
                    href: "/register",
                    link: "Register",
                    classList: `${isActiveRoute("/register")} button para`,
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
