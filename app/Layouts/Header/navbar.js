import NavLink from "Components/nav-link.js"
import { isActiveRoute } from "Utils/index.js"

const NavBar = () => {
  let ProductRoutes = (mdl) =>
    mdl.Routes.filter((r) => r.group.includes("navbar"))
  let SidebarRoutes = (mdl) =>
    mdl.Routes.filter((r) => r.group.includes("menu"))
  return {
    view: ({ attrs: { mdl } }) => [
      m(
        ".navbar.navbar1",
        { id: "navbar" },

        m(
          "nav.frow row-around",
          ProductRoutes(mdl).map((r) => {
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
          SidebarRoutes(mdl).map((r) => {
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
