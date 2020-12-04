import { AccountAddress } from "./Address.js"
import { PastOrders } from "./orders.js"

const Account = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(".frow-container frow-center", [
        m("h2", "Welcome ", mdl.user.name),
        m(AccountAddress, { mdl }),
        m(PastOrders, { mdl }),
        m("section"),
        m("section"),
      ])
    },
  }
}

export default Account
