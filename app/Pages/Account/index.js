import { AccountAddress } from "./address.js"
import { PastOrders } from "./orders.js"
import { PriceAdjustment } from "./prices.js"

const Account = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(".frow-container frow-center", [
        m("h2", "Welcome ", mdl.user.name),
        m(AccountAddress, { mdl }),
        m(PastOrders, { mdl }),
        mdl.user.isAdmin && m(PriceAdjustment, { mdl }),
        m("section"),
        m("section"),
      ])
    },
  }
}

export default Account
