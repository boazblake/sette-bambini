import NavMenu from "Components/nav-menu.js"

const Body = () => {
  return {
    view: ({ attrs: { mdl, children } }) =>
      m(
        ".body",
        { id: "body" },
        m(".frow-container", [
          mdl.settings.profile !== "desktop" &&
            mdl.state.showNavMenu() &&
            m(NavMenu, { mdl }),
          children,
        ])
      ),
  }
}

export default Body
