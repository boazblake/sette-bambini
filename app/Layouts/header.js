import NavBar from "Components/navbar.js"
import ToolBar from "Components/toolbar.js"

const Header = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        "header.header",
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
