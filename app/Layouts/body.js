import NavMenu from "Components/nav-menu.js"

const Body = () => {
  return {
    view: ({ attrs: { mdl, children } }) =>
      m(
        ".body",
        { id: "body" },
        m(".frow column-center items-stretch", [
          mdl.settings.screenSize !== "desktop" &&
            mdl.state.showNavMenu() &&
            m(NavMenu, { mdl }),
          [
            m(
              ".text-4x",
              m("h1.title.mb-20.text-center", mdl.state.route.name)
            ),
            children,
          ],
        ])
      ),
  }
}

export default Body
