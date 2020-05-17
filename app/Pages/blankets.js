import Flicker from "Components/Flicker.js"
import Selector from "Components/Selector.js"

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
    onremove: () => {
      state.errors = {}
      state.data = []
    },
    view: ({ attrs: { mdl } }) =>
      m(".frow-container frow-center", [
        m(
          ".mb-30",
          { id: "christening" },
          m(Flicker, { mdl, data: state.data }),
          m(".mt-20", m(Selector, { mdl, product: "Christening Blankets" }))
        ),
        m(".mb-30", { id: "wraps" }, [
          m(Flicker, { mdl, data: state.data }),
          m(".mt-20", m(Selector, { mdl, product: "Wraps" })),
        ]),
      ]),
  }
}

export default Blankets
