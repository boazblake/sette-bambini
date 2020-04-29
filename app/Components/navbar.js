import NavLink from "./nav-link.js"
const isActiveRoute = (route) => (m.route.get() == route ? "bold" : "")

const NavBar = () => {
  let routes = (mdl) => mdl.Routes.filter((r) => r.group.includes("navbar"))
  return {
    view: ({ attrs: { mdl } }) =>
      m("nav.navbarBkg", { id: "navbar" }, [
        routes(mdl).map((r) =>
          m(NavLink, {
            mdl,
            href: r.route,
            link: r.name,
            classList: isActiveRoute(r.route),
          })
        ),
      ]),
  }
}

export default NavBar
