import NavMenu from "Components/nav-menu.js"

const Body = () => {
  return {
    view: ({ attrs: { mdl, children } }) =>
      m(
        ".body",
        { id: "body" },
        m(".frow column-center items-stretch", [
          mdl.settings.profile !== "desktop" &&
            mdl.state.showNavMenu() &&
            m(NavMenu, { mdl }),
          [m("h1.title", mdl.state.route.name), children],
        ])
      ),
  }
}

export default Body
