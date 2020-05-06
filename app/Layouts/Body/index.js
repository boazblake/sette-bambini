import NavMenu from "./nav-menu.js"
import { SlideOutRight } from "Styles/animations.js"

const Body = () => {
  return {
    view: ({ attrs: { mdl, children } }) =>
      m(
        ".body.mt-20",
        { id: "body" },
        m(".frow column-center items-stretch", [
          mdl.settings.screenSize !== "desktop" &&
            mdl.state.showNavMenu() &&
            m(NavMenu, { onbeforeremove: SlideOutRight, mdl }),
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
