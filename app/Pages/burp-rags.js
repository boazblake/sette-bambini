import Flicker from "Components/Flicker.js"
import Selector from "Components/Selector.js"

const BurpRags = () => {
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
    onremove: () => {
      state.errors = {}
      state.data = []
    },
    view: ({ attrs: { mdl } }) =>
      m(".frow-container frow-center", [
        m(
          ".mb-30",
          { id: "burps" },
          m(Flicker, { mdl, data: state.data }),
          m(".mt-20", m(Selector, { mdl, product: "burps" }))
        ),
      ]),
  }
}

export default BurpRags
