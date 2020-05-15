import Carousel from "Components/Carousel"

const Blankets = () => {
  const state = {
    errors: {},
    data: [
      "https://loremflickr.com/cache/resized/65535_49681641278_39a3783443_b_1000_1000_nofilter.jpg",
      "https://loremflickr.com/cache/resized/6043_6297055785_9f172cd858_b_1000_1000_nofilter.jpg",
      "https://loremflickr.com/cache/resized/65535_49805957881_9fd2435097_h_1000_1000_nofilter.jpg",
      "https://loremflickr.com/cache/resized/65535_49845303721_80df43c416_b_1000_1000_nofilter.jpg",
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
          m(".frow row-around", m(Carousel, { cid: "chr", data: state.data }))
        ),
        m("", { id: "wraps" }, [
          m("h2", "Wraps"),
          m(".frow row-around", m(Carousel, { cid: "chr", data: state.data })),
        ]),
      ]),
  }
}

export default Blankets
