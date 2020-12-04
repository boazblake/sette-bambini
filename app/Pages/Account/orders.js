import { log } from "Utils"
import { AngleLine } from "@mithril-icons/clarity/cjs"
import { assoc, map, add } from "ramda"

const state = {
  invoices: [],
}

const calcProductPrice = ({ prices, cart }, product) => {
  return parseInt(prices[product]) * Object.values(cart[product]).reduce(add, 0)
}

const calcTotalPrice = (invoice) =>
  Object.keys(invoice.cart)
    .map((product) => calcProductPrice(invoice, product))
    .reduce(add, 0)

const invoiceUrl = (mdl) => {
  log("mdl")(mdl)
  return mdl.user.isAdmin
    ? "data/Invoices"
    : `data/Invoices?where=ownerId%3D'${mdl.user.objectId}'`
}

const fetchInvoicesTask = (mdl) =>
  mdl.http.backEnd
    .getTask(mdl)(invoiceUrl(mdl))
    .map(map(assoc("isSelected", false)))

const onFetchInvoiceError = (mdl) => (e) => console.log("e", e, mdl)

const onFetchInvoiceSuccess = (_) => (invoices) => (state.invoices = invoices)

const fetchInvoices = ({ attrs: { mdl } }) =>
  fetchInvoicesTask(mdl).fork(
    onFetchInvoiceError(mdl),
    onFetchInvoiceSuccess(mdl)
  )

export const PastOrders = () => {
  return {
    oninit: fetchInvoices,
    view: ({ attrs: { mdl } }) =>
      m("section", [
        m("h3", "Past Orders"),
        m("table", [
          m(
            "thead",
            m("tr", [
              m("th", "Date"),
              m("th", "order Id"),
              m("th", "shipping"),
              m("th", "payment status"),
              m("th"),
            ])
          ),

          state.invoices.map((invoice) =>
            m("tbody", [
              m("tr", [
                m("td", invoice.purchaseTime),
                m("td", invoice.orderID),
                m(
                  "td",
                  `${invoice.shipping.name.full_name} ${invoice.shipping.address.address_line_1} ${invoice.shipping.address.admin_area_2} ${invoice.shipping.address.admin_area_1} ${invoice.shipping.address.postal_code}`
                ),
                m("td", invoice.status),
                m(
                  "td",
                  m(AngleLine, {
                    class: `clickable ${!invoice.isSelected && "point-down"}`,
                    onclick: () => (invoice.isSelected = !invoice.isSelected),
                    width: "16px",
                  })
                ),
              ]),
              invoice.isSelected &&
                m("table", [
                  m("thead", [
                    m("th", "product"),
                    m("th", "quantities"),
                    m("th", "unit price"),
                    m("th", "unit total"),
                  ]),
                  m(
                    "tbody",
                    Object.keys(invoice.cart).map((product) =>
                      m("tr", [
                        m("td", product),
                        m("td", JSON.stringify(invoice.cart[product])),
                        m("td", invoice.prices[product]),
                        m("td", calcProductPrice(invoice, product)),
                      ])
                    ),
                    m(
                      "tr",
                      m("th", "Order Total"),
                      m("th", calcTotalPrice(invoice))
                    )
                  ),
                ]),
            ])
          ),
        ]),
      ]),
  }
}
