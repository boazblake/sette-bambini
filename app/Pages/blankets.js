import Swiper from "Components/Swipe.js"

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
          m("h2.pb-10", "Christening Blankets"),
          m(Swiper, { mdl, data: state.data })
        ),
        m(".mb-30", { id: "wraps" }, [
          m("h2.pb-10", "Wraps"),
          m(Swiper, { mdl, data: state.data }),
        ]),
      ]),
  }
}

export default Blankets
