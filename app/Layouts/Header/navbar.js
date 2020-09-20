import NavLink from "Components/nav-link.js"
import { isActiveRoute } from "Utils/index.js"

const NavBar = () => {
  let NavRoutes = (mdl) => mdl.Routes.filter((r) => r.group.includes("navbar"))
  let SubNavRoutes = (mdl) =>
    mdl.Routes.filter((r) => r.group.includes("sub-navbar"))
  return {
    view: ({ attrs: { mdl } }) => [
      m(
        ".navbar.navbar1",
        { id: "navbar" },

        m(
          "nav.frow row-around",
          NavRoutes(mdl).map((r) => {
            return m(NavLink, {
              mdl,
              href: r.route,
              link: r.name,
              classList: isActiveRoute(r.route),
            })
          })
        )
      ),
      m(
        ".navbar.navbar2.hidden-xs",
        m(
          "nav.frow row-around",
          SubNavRoutes(mdl).map((r) => {
            return m(NavLink, {
              mdl,
              href: r.route,
              link: r.name,
              classList: isActiveRoute(r.route),
            })
          })
        )
      ),
    ],
  }
}

export default NavBar
