import Swiper from "Components/Swipe.js"

const Blankets = () => {
  const state = {
    errors: {},
    data: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
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
          "",
          { id: "christening" },
          m("h2", "Christening Blankets"),
          m(Swiper, { mdl, data: state.data })
        ),
        m("", { id: "wraps" }, [
          m("h2", "Wraps"),
          m(Swiper, { mdl, data: state.data }),
        ]),
      ]),
  }
}

export default Blankets
