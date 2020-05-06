import NavLink from "Components/nav-link.js"
const isActiveRoute = (route) => (m.route.get() == route ? "bold" : "")

const SubNavBar = () => {
  let routes = (mdl) => mdl.Routes.filter((r) => r.group.includes("menu"))
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".sub-navbar",
        m("nav.frow row-around hidden-xs", { id: "sub-navbar" }, [
          routes(mdl).map((r) =>
            m(NavLink, {
              mdl,
              href: r.route,
              link: r.name,
              classList: isActiveRoute(r.route),
            })
          ),
        ])
      ),
  }
}

export default SubNavBar
