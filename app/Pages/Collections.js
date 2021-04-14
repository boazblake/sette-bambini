import Carousel from "Components/carousel.js"
import Selector from "Components/Selector.js"
import { collections } from "index.images.js"

let imgs = collections.map((src, id) => m("img.carousel-slide", { id, src }))

const Collections = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".frow-container frow-center", [
        m(".frow.gutters.mb-30", { id: "collections" }, [
          m(".col-md-1-2", m(Carousel, { mdl }, imgs)),
          m(
            ".col-md-1-2",
            m("ul", [
              m(
                "li.pb-10",
                "Each Collection comprise of hand selected blankets and burp rags"
              ),
              m("li.pb-10", "Perfect for stroller, or car seat"),
              m("li.pb-10", '3 Double sided Flannel burp cloths 21" x 12"'),
              m(
                "li.pb-10",
                "The coordinating crocheted blanket is a small coverup approximately 22 by 27 inches"
              ),
              m("li.pb-10", "Each guranteed to be one of a kind"),
              m("li.pb-10", "Thick and absorbent!"),
              m("li.pb-10", "Proudly made in Houston Texas USA"),
            ]),

            m(
              "p.pb-10",
              "Gender neutral sets are available in gray, cream or yellow/ green. Please specify when ordering."
            ),
            m(".mt-20", m(Selector, { mdl, product: "Collections" }))
          ),
        ]),
      ]),
  }
}

export default Collections
