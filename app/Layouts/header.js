import NavBar from "Components/navbar.js"
import ToolBar from "Components/toolbar.js"
import ProgressBar from "Components/ProgressBar.js"

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
        ]
      ),
  }
}

export default Header
