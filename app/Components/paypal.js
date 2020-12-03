import Task from "data.task"
import { getTotal, toProducts } from "Utils/helpers"

const makePaymentTask = (actions) =>
  new Task((rej, res) => actions.order.capture().then(res, rej))

const formatInvoice = ({ cart }) => ({ orderID, payerID }) => (details) => ({
  orderID,
  payerID,
  purchaseTime: details.create_time,
  status: details.status,
  customer: JSON.stringify(details.payer),
  shipping: JSON.stringify(details.purchase_units[0].shipping),
  cart: JSON.stringify(cart),
})

const linkInvoiceTask = (mdl) => (invoice) =>
  mdl.http.backEnd.postTask(mdl)(
    `data/Users/${mdl.user.objectId}/invoice%3AInvoices%3A1`
  )([invoice.objectId])

const tolinkInvoiceTask = (mdl) => (invoice) =>
  mdl.state.isAuth() ? linkInvoiceTask(mdl)(invoice) : Task.of(invoice)

const saveInvoiceTask = (mdl) => (invoice) =>
  mdl.http.backEnd.postTask(mdl)("data/Invoices")(invoice)

const onSuccess = (mdl) => (details) => {
  console.log("actiosn capture details", purchase)
}

const onError = (error) => console.log("error", error)

export const PayPal = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".", {
        style: {
          maxHeight: "500px",
          overflowY: "auto",
          minWidth: "80vw",
        },
        oncreate: ({ dom }) =>
          paypal
            .Buttons({
              createOrder: (_, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: getTotal(mdl, toProducts(mdl.cart)),
                      },
                    },
                  ],
                })
              },
              onApprove: (data, actions) => {
                console.log("onapprove - data", data)
                console.log("onapprove - actions", actions)
                // This function captures the funds from the transaction.
                return makePaymentTask(actions)
                  .map(formatInvoice(mdl)(data))
                  .chain(saveInvoiceTask(mdl))
                  .chain(tolinkInvoiceTask(mdl))
                  .fork(onError, onSuccess(mdl))
              },
            })
            .render(dom),
      }),
  }
}
