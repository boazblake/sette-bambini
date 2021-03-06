import NavLink from "Components/nav-link.js"
import { isActiveRoute } from "Utils/index.js"

const Footer = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      let routes = mdl.Routes.filter((r) => r.group.includes("footer"))
      return m(
        "footer.frow content-end items-end",
        { id: "footer" },
        m(
          ".frow row-container",
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
