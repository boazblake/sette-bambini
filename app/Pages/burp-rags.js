import Flicker from "Components/Flicker.js"
import Selector from "Components/Selector.js"

const BurpRags = () => {
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
        m(".mb-30", { id: "burps" }, [
          m(Flicker, { mdl, data: state.data }),
          m(".mt-20", m(Selector, { mdl, product: "Burp Rags" })),
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
        ]),
      ]),
  }
}

export default BurpRags
