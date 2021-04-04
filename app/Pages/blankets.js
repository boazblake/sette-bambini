import Flicker from "Components/Flicker.js"
import Carousel from "Components/Carousel.js"
import Selector from "Components/Selector.js"
import { blankets } from "index.images.js"

console.log(blankets.gallery)

const Blankets = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".frow-container frow-center", [
        m(".mb-30", { id: "wraps" }, [
          m(".text-2halfx", m("h2.pb-10", "Wraps")),
          m(Carousel, { mdl, data: blankets }),
          m(".mt-20", m(Selector, { mdl, product: "Wraps" })),
          m("ul", [
            m(
              "li.pb-10",
              'Handcrafted 100% Pure Wool Carriage style Blanket 21" x 18"'
            ),
            m("li.pb-10", "Machine wash and tumble dry."),
            m("li.pb-10", "Proudly made in Houston Texas USA"),
          ]),
        ]),
        m(
          ".mb-30",
          { id: "christening" },
          m(".text-2halfx", m("h2.pb-10", "Christening Blankets")),
          m(Carousel, { mdl, data: blankets }),
          m(".mt-20", m(Selector, { mdl, product: "Christening Blankets" })),
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
          ])
        ),
      ]),
  }
}

export default Blankets
