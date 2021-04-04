import Carousel from "Components/Carousel.js"
import Selector from "Components/Selector.js"
import { collections } from "index.images.js"

const Collections = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".frow-container frow-center", [
        m(".mb-30", { id: "collections" }, [
          m(Carousel, { mdl, data: collections }),
          m(".mt-20", m(Selector, { mdl, product: "Collections" })),
          m("ul", [
            m(
              "li.pb-10",
              "Each Collection comprise of hand selected blankets and burp rags"
            ),
            m("li.pb-10", "Each guranteed to be one of a kind"),
            m("li.pb-10", 'Double sided Flannel burp cloths 21" x 12"'),
            m("li.pb-10", "Thick and absorbent!"),
            m("li.pb-10", "No two cloths are the same!"),
            m("li.pb-10", "Proudly made in Houston Texas USA"),
          ]),
          m(
            "p.pb-10",
            "Gender neutral sets are available in gray, cream or yellow/ green. Please specify when ordering."
          ),
        ]),
      ]),
  }
}

export default Collections
