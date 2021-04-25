import { AccountAddress } from "./address.js"
import { Orders } from "./orders.js"
import { PriceAdjustment } from "./prices.js"

const Account = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(".frow-container", [
        m("h2", "Welcome ", mdl.user.name),
        m(
          "Button",
          { onclick: (e) => mdl.togglePriceModal(mdl) },
          mdl.state.showPriceModal() ? "Hide Prices" : "Show Prices"
        ),
        mdl.user.isAdmin &&
          mdl.state.showPriceModal() &&
          m(PriceAdjustment, { mdl }),
        m(Orders, { mdl }),
        m("section"),
        m("section"),
      ])
    },
  }
}

export default Account
