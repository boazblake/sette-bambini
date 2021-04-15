import Grid from "Components/grid.js"
import Selector from "Components/Selector.js"
import { burpWrags } from "index.images.js"
import { SlideUp } from "Styles/animations"

// let imgs = burpWrags.map((src, id) => m("img.carousel-slide", { id, src }))

const BurpRags = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".frow-container frow-center",
        m(
          ".frow.mb-30",
          { id: "burps" },
          m(".col-md-1-2", m(Grid, { mdl }, burpWrags)),
          m(
            ".col-md-1-2",
            m("ul", [
              m("li.pb-10", "Set of 7 handcrafted burp rags"),
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
            m(".mt-20", m(Selector, { mdl, product: "Burp Rags" }))
          )
        )
      ),
  }
}

export default BurpRags
