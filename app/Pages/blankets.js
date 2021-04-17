import Carousel from "Components/carousel.js"
import Selector from "Components/Selector.js"
import { blankets } from "index.images.js"

const Blankets = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".frow-container frow-center",
        m(".text-2halfx", m("h2.pb-10", "Wraps")),
        m(
          ".frow.gutters.mb-30",
          { id: "wraps" },
          m(".col-sm-1-2", m(Carousel, blankets)),
          m(
            ".mtl-15.col-sm-1-2",
            m("ul", [
              m(
                "li.pb-10",
                'Handcrafted 100% Pure Wool Carriage style Blanket 21" x 18"'
              ),
              m("li.pb-10", "Machine wash and tumble dry."),
              m("li.pb-10", "Proudly made in Houston Texas USA"),
            ]),
            m(".mt-20", m(Selector, { mdl, product: "Wraps" }))
          )
        ),
        m(".text-2halfx", m("h2.pb-10", "Blankets")),
        m(
          ".frow.gutters.mb-30",
          { id: "christening" },
          m(".col-sm-1-2", m(Carousel, blankets)),
          m(
            ".mtl-15.col-sm-1-2",
            m("ul", [
              m(
                "li.pb-10",
                'Handcrafted 100% Pure Wool Christening style Blanket 21" x 18"'
              ),
              m(
                "li.pb-10",
                "This is a specialty blanket not for general use. Care has been taken to secure the pearls and crystals."
              ),
              m(
                "li.pb-10",
                "babies should be supervised at all times when this blanket is in use."
              ),
              m("li.pb-10", "Proudly made in Houston Texas USA"),
            ]),
            m(".mt-20", m(Selector, { mdl, product: "Blankets" }))
          )
        )
      ),
  }
}

export default Blankets
