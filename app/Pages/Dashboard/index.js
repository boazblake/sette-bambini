import { Orders } from "Components/orders.js"
import { Prices } from "./prices.js"
import { Users } from "./users.js"

const Dashboard = () => {
  const components = {
    prices: Prices,
    users: Users,
    orders: Orders,
  }

  const navi = ["prices", "users", "orders"]

  return {
    view: ({ attrs: { mdl } }) => {
      return m(
        ".",
        { style: { minWidth: "100%" } },
        m(
          "section.frow row-around",
          navi.map((nav) =>
            m(
              "button",
              {
                class: mdl.dash.state.show == nav ? "is-active" : "",
                onclick: (e) => (mdl.dash.state.show = nav),
              },
              nav.toUpperCase()
            )
          )
        ),
        m("section.frow mt-10", m(components[mdl.dash.state.show], { mdl }))
      )
    },
  }
}

export default Dashboard
