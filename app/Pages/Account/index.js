import { Orders } from "Components/orders.js"

const Account = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(".frow-container", m("h2", "Orders"), m(Orders, { mdl }))
    },
  }
}

export default Account
