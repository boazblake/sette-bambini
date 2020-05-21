import NavLink from "Components/nav-link"
import { isActiveRoute } from "Utils/index.js"

let state = {
  onHover: () => {},
  selected: () => {},
}

let cart = {
  Wraps: { Male: 0, Female: 0, Unisex: 0 },
  "Christening Blankets": { Male: 0, Female: 0, Unisex: 0 },
  "Burp Rags": { Male: 0, Female: 0, Unisex: 0 },
}

const NavItem = () => {
  return {
    view: ({ attrs: { mdl, href, link, classList } }) =>
      m(`li.nav-item`, m(NavLink, { mdl, state, href, link, classList })),
  }
}

const NavModal = () => {
  let routes = (mdl) => mdl.Routes.filter((r) => r.group.includes("menu"))
  return {
    oncreate: ({ attrs: { mdl } }) => {
      mdl.state.showCartModal(false)
    },
    view: ({ attrs: { mdl } }) =>
      m(
        ".modalOverlay-left.animated",
        {
          onclick: (e) => {
            mdl.state.showNavModal(false)
          },
        },
        m(
          `.modal`,
          {
            id: "nav-modal",
          },

          m(`ul.nav`, { id: "" }, [
            mdl.state.isAuth()
              ? [
                  m(NavLink, {
                    state,
                    mdl,
                    href: `/account/${mdl.user.name}`,
                    link: "Your Account",
                    classList: `${isActiveRoute(
                      `/account/${mdl.user.name}`
                    )} button`,
                  }),
                  m(NavLink, {
                    mdl,
                    href: "/logout",
                    link: "Logout",
                    onclick: () => {
                      localStorage.clear()
                      sessionStorage.clear()
                      mdl.state.isAuth(false)
                      mdl.user = {}
                      mdl.cart = cart
                      m.route.set(m.route.get())
                    },
                    classList: "bold auth-link",
                  }),
                ]
              : m(".frow.justify-start", [
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

export default NavModal
