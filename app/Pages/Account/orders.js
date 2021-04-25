import { log } from "Utils"
import { AngleLine } from "@mithril-icons/clarity/cjs"
import { assoc, map, add, prop } from "ramda"
import m from "mithril"

const STATE = () => ({
  invoices: [],
})

let state = STATE()

const calcProductPrice = ({ prices, cart }, product) => {
  return parseInt(prices[product]) * Object.values(cart[product]).reduce(add, 0)
}

const calcTotalPrice = (invoice) =>
  Object.keys(invoice.cart)
    .map((product) => calcProductPrice(invoice, product))
    .reduce(add, 0)

const invoiceUrl = (mdl) => {
  let userInvoices = `{"userId":"${mdl.user.objectId}"}`
  return mdl.user.isAdmin
    ? "classes/Invoices"
    : `classes/Invoices?where=${encodeURI(userInvoices)}`
}

const fetchInvoicesTask = (mdl) =>
  mdl.http.back4App
    .getTask(mdl)(invoiceUrl(mdl))
    .map(prop("results"))
    .map(map(assoc("isSelected", false)))

const onFetchInvoiceError = (mdl) => (e) => console.log("e", e, mdl)

const onFetchInvoiceSuccess = (_) => (invoices) => (state.invoices = invoices)

const fetchInvoices = ({ attrs: { mdl } }) =>
  fetchInvoicesTask(mdl).fork(
    onFetchInvoiceError(mdl),
    onFetchInvoiceSuccess(mdl)
  )

const Invoice = ({ attrs: { mdl } }) => {
  const rowOrTd = (mdl) => (mdl.settings.screenSize == "phone" ? "tr" : "td")

  return {
    view: ({ attrs: { invoice } }) => {
      console.log(invoice)
      return [
        m(
          "tr.invoice",
          m(rowOrTd(mdl), invoice.purchaseTime),
          m(rowOrTd(mdl), invoice.orderID),
          m(
            rowOrTd(mdl),
            `${invoice.shippingDestination.name.full_name} ${invoice.shippingDestination.address.address_line_1} ${invoice.shippingDestination.address.admin_area_2} ${invoice.shippingDestination.address.admin_area_1} ${invoice.shippingDestination.address.postal_code}`
          ),
          m(rowOrTd(mdl), invoice.status),
          m(
            rowOrTd(mdl),
            invoice.shippingStatus
              ? m("a", { href: invoice.shippingStatus }, "Shipping Status")
              : m("p", "Prepparing your order")
          ),
          m(
            rowOrTd(mdl),
            m(AngleLine, {
              class: `clickable ${!invoice.isSelected && "point-down"}`,
              onclick: () => (invoice.isSelected = !invoice.isSelected),
              width: "16px",
            })
          )
        ),
        invoice.isSelected &&
          m(
            "td",
            { colspan: 5, style: { width: "100%" } },
            m(
              "table",
              { style: { width: "100%", borderBottom: "1px solid gold" } },
              [
                m(
                  "thead",
                  m("tr", [
                    m("th", "product"),
                    m("th", "quantities"),
                    m("th", "unit price"),
                    m("th", "unit total"),
                  ])
                ),
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
              ]
            )
          ),
      ]
    },
  }
}

export const Orders = () => {
  return {
    onremove: (state = STATE()),
    oninit: fetchInvoices,
    view: ({ attrs: { mdl } }) =>
      m("section", [
        m("h3", "Orders"),
        state.invoices.any()
          ? m("table", { style: { width: "100%" } }, [
              m(
                "thead",
                m("tr", [
                  m("th", "Date"),
                  m("th", "order Id"),
                  m("th", "shipping Destination"),
                  m("th", "payment status"),
                  m("th", "shipping status"),
                  m("th"),
                ])
              ),
              m(
                "tbody",
                state.invoices.map((invoice) => m(Invoice, { mdl, invoice }))
              ),
            ])
          : m("h2", "No Orders"),
      ]),
  }
}
