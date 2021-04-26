import { Orders } from "Components/orders.js"
import { PriceAdjustment } from "./prices.js"
import { Users } from "./users.js"

const Dashboard = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(
        ".frow-container",
        m("h2", "Welcome ", mdl.user.name),
        m(
          "Button",
          { onclick: (e) => mdl.togglePriceModal(mdl) },
          mdl.state.showPriceModal() ? "Hide Prices" : "Show Prices"
        ),
        m(
          "Button",
          { onclick: (e) => mdl.toggleUserModal(mdl) },
          mdl.state.showUserModal() ? "Hide Users" : "Show Users"
        ),
        mdl.state.showPriceModal() && m(PriceAdjustment, { mdl }),
        mdl.state.showUserModal() && m(Users, { mdl }),
        m(Orders, { mdl })
      )
    },
  }
}

export default Dashboard
