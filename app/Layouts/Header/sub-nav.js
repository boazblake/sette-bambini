import NavLink from "Components/nav-link.js"
import { isActiveRoute } from "Utils/index.js"
import { propEq } from "ramda"

const SubNavBar = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      let routes = (mdl) =>
        mdl.Routes.filter(
          (r) => r.route == mdl.state.route.route
        )[0].children.map((r) => mdl.Routes.filter(propEq("id", r))[0])
      return m(
        ".sub-navbar",
        m("nav.frow row-around", { id: "sub-navbar" }, [
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
    },
  }
}

export default SubNavBar
