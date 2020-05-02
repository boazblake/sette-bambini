import NavLink from "Components/nav-link.js"
const isActiveRoute = (route) => (m.route.get() == route ? "bold" : "")

const Footer = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      let routes = mdl.Routes.filter((r) => r.group.includes("other"))
      return m(
        "nav",
        { id: "footer" },
        m(
          ".frow row-around",
          routes.map((r) =>
            m(NavLink, {
              mdl,
              href: r.route,
              link: r.name,
              classList: isActiveRoute(r.route),
            })
          )
        )
      )
    },
  }
}

export default Footer
