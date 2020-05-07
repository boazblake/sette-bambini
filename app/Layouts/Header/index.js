import NavBar from "./navbar.js"
import SubNavBar from "./sub-nav.js"
import ToolBar from "./toolbar.js"
import ProgressBar from "./ProgressBar.js"

const Header = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        "nav.header",
        {
          id: "header",
        },
        [
          mdl.state.isLoading() && m(ProgressBar, { mdl }),
          m(ToolBar, { mdl }),
          m(NavBar, { mdl }),
          m(
            ".",
            m(SubNavBar, {
              mdl,
            })
          ),
        ]
      ),
  }
}

export default Header
