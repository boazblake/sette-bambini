import CartModal from "./cart-modal.js"
import NavModal from "./nav-modal.js"
import {
  SlideOutRight,
  SlideOutLeft,
  SlideInRight,
  SlideInLeft,
} from "Styles/animations.js"

const Body = () => {
  return {
    view: ({ attrs: { mdl, children } }) =>
      m(
        ".body.mt-20",
        { id: "body" },
        m(".frow column-center items-stretch", [
          mdl.settings.screenSize !== "desktop" &&
            mdl.state.showNavModal() &&
            m(NavModal, {
              oncreate: SlideInLeft,
              onbeforeremove: SlideOutRight,
              mdl,
            }),
          mdl.state.showCartModal() &&
            m(CartModal, {
              oncreate: SlideInRight,
              onbeforeremove: SlideOutLeft,
              mdl,
            }),
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
