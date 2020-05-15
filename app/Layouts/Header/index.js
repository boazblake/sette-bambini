import NavBar from "./navbar.js"
import SubNavBar from "./sub-nav.js"
import ToolBar from "./toolbar.js"
import ProgressBar from "./ProgressBar.js"
import { propEq } from "ramda"

const Header = ({ attrs: { mdl } }) => {
  let subRoutes = (mdl) =>
    mdl.Routes.filter((r) => r.route == mdl.state.route.route)[0].children.map(
      (r) => mdl.Routes.filter(propEq("id", r))[0]
    )

  return {
    view: ({ attrs: { mdl } }) => {
      return m(
        "nav.header",
        {
          id: "header",
          style: { maxHeight: subRoutes(mdl).any() ? "140px" : "100px" },
        },
        [
          mdl.state.isLoading() && m(ProgressBar, { mdl }),
          m(ToolBar, { mdl }),
          m(NavBar, { mdl }),
          m(SubNavBar, {
            mdl,
            subRoutes,
          }),
        ]
      )
    },
  }
}

export default Header
