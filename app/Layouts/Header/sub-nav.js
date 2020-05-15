import NavLink from "Components/nav-link.js"
import { isActiveRoute } from "Utils/index.js"
import { SlideDown, SlideUp } from "Styles/animations"

const SubNavBar = () => {
  return {
    view: ({ attrs: { mdl, subRoutes } }) => {
      return (
        subRoutes(mdl).any() &&
        m(
          ".sub-navbar animated",
          {
            oncreate: SlideDown,
            onbeforeremove: SlideUp,
            id: "sub-navbar",
          },
          m("nav.frow row-around", [
            subRoutes(mdl).map((r) =>
              m(NavLink, {
                mdl,
                href: r.route,
                link: r.name,
                classList: isActiveRoute(r.route),
              })
            ),
          ])
        )
      )
    },
  }
}

export default SubNavBar
