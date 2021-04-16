import Carousel from "Components/grid.js"
import Selector from "Components/Selector.js"
import { burpies } from "index.images.js"

let imgs = burpies.map((srcSet, id) => m("img.slidy-img", { id, srcSet }))

const Burpies = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".frow-container frow-center",
        m(
          ".mb-30 frow gutters justify-between",
          { id: "Burpies" },
          m(
            ".col-md-1-2",
            m(
              Carousel,
              { id: "burp", height: "400px", overflow: "hidden" },
              imgs
            )
          ),
          m(
            ".col-md-1-2",
            m("ul", [
              m("li.pb-10", "Set of 7 handcrafted Burpies"),
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
            m(".mt-20", m(Selector, { mdl, product: "Burpies" }))
          )
        )
      ),
  }
}

export default Burpies
