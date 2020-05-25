import Flicker from "Components/Flicker.js"
import Selector from "Components/Selector.js"
import { AddToCartOut } from "Styles/animations"

const Blankets = () => {
  const state = {
    errors: {},
    data: [
      "https://source.unsplash.com/random/800x600",
      "https://source.unsplash.com/random/800x600",
      "https://source.unsplash.com/random/800x600",
      "https://source.unsplash.com/random/800x600",
    ],
  }

  return {
    oninit: () => {
      // console.log("init blankets")
    },
    onremove: () => {
      state.errors = {}
      state.data = []
    },
    view: ({ attrs: { mdl } }) =>
      m(".frow-container frow-center", [
        m(".mb-30", { id: "wraps" }, [
          m("h2.pb-10", "Wraps"),
          m(Flicker, { mdl, data: state.data }),
          m(".mt-20", m(Selector, { mdl, product: "Wraps" })),
        ]),
        m(
          ".mb-30",
          { id: "christening" },
          m("h2.pb-10", "Christening Blankets"),
          m(Flicker, { mdl, data: state.data }),
          m(".mt-20", m(Selector, { mdl, product: "Christening Blankets" }))
        ),
      ]),
  }
}

export default Blankets
