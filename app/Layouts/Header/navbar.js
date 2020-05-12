import NavLink from "Components/nav-link.js"
import { isActiveRoute } from "Utils/index.js"

const NavBar = () => {
  let routes = (mdl) => mdl.Routes.filter((r) => r.group.includes("navbar"))
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".navbar",
        { id: "navbar" },
        m("nav.frow row-around", [
          routes(mdl).map((r) => {
            return m(NavLink, {
              mdl,
              href: r.route,
              link: r.name,
              classList: isActiveRoute(r.route),
            })
          }),
        ])
      ),
  }
}

export default NavBar
