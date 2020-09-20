import CartModal from "./cart-modal.js"
import NavModal from "./nav-modal.js"
import {
  SlideOutRight,
  SlideOutLeft,
  SlideInRight,
  SlideInLeft,
} from "Styles/animations.js"
import { propEq } from "ramda"

let isShowingProducts = (mdl) =>
  mdl.Routes.filter((r) => r.route == mdl.state.route.route)[0]
    .children.map((r) => mdl.Routes.filter(propEq("id", r))[0])
    .any()

let isShowingRoutes = (mdl) => mdl.settings.screenSize !== "phone"

const getStyle = (mdl) => ({
  marginTop: isShowingRoutes(mdl)
    ? isShowingProducts(mdl)
      ? "180px"
      : "140px"
    : isShowingProducts(mdl)
    ? "140px"
    : "100px",
})

const Body = () => {
  return {
    view: ({ attrs: { mdl, children } }) =>
      m(
        ".body",
        {
          id: "body",
          style: getStyle(mdl),
        },
        // m(".frow centered-column items-stretch", [
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
          m(".text-4x", m("h1.title.mb-20.text-center", mdl.state.route.name)),
          children,
        ]
        // ])
      ),
  }
}

export default Body
