import NavLink from "Components/nav-link.js"
import { isActiveRoute } from "Utils/index.js"
import { propEq } from "ramda"
import { SlideDown, SlideUp } from "Styles/animations"

const SubNavBar = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      let routes = (mdl) =>
        mdl.Routes.filter(
          (r) => r.route == mdl.state.route.route
        )[0].children.map((r) => mdl.Routes.filter(propEq("id", r))[0])
      return (
        routes(mdl).any() &&
        m(
          ".sub-navbar animated",
          {
            oncreate: SlideDown,
            onbeforeremove: SlideUp,
            id: "sub-navbar",
          },
          m("nav.frow row-around", [
            routes(mdl).map((r) =>
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
