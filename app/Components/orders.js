import { formatDate } from "Utils"
import { AngleLine } from "@mithril-icons/clarity/cjs"
import { assoc, map, add, prop } from "ramda"

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
  return mdl.state.route.id == "dashboard"
    ? "classes/Invoices"
    : `classes/Invoices?where=${encodeURI(userInvoices)}`
}

const fetchInvoicesTask = (mdl) =>
  mdl.http.back4App
    .getTask(mdl)(invoiceUrl(mdl))
    .map(prop("results"))
    .map(map(assoc("isSelected", false)))

const onFetchInvoiceError = (mdl) => (e) => log("e")([e, mdl])

const onFetchInvoiceSuccess = (_) => (invoices) => (state.invoices = invoices)

const fetchInvoices = ({ attrs: { mdl } }) =>
  fetchInvoicesTask(mdl).fork(
    onFetchInvoiceError(mdl),
    onFetchInvoiceSuccess(mdl)
  )

const InvoiceCell = () => {
  return {
    view: ({
      attrs: {
        mdl: {
          settings: { screenSize },
        },
      },
      children,
    }) =>
      screenSize == "phone"
        ? m("tr", [m("td", children[0].key), children])
        : children,
  }
}

const Invoice = ({ attrs: { mdl } }) => {
  return {
    view: ({ attrs: { invoice } }) => {
      return [
        m(
          "tr.invoice",
          m(
            InvoiceCell,
            { mdl },
            m("td", { key: "Date" }, formatDate(invoice.purchaseTime))
          ),
          m(
            InvoiceCell,
            { mdl },
            m("td", { key: "order Id" }, invoice.orderID)
          ),
          m(
            InvoiceCell,
            { mdl },
            m(
              "td",
              { key: "shipping Destination" },
              `${invoice.shippingDestination.name.full_name} ${invoice.shippingDestination.address.address_line_1} ${invoice.shippingDestination.address.admin_area_2} ${invoice.shippingDestination.address.admin_area_1} ${invoice.shippingDestination.address.postal_code}`
            )
          ),
          m(
            InvoiceCell,
            { mdl },
            m("td", { key: "payment status" }, invoice.status)
          ),
          m(
            InvoiceCell,
            { mdl },
            m(
              "td",
              { key: "Shipping Status" },
              invoice.shippingStatus
                ? m("a", { href: invoice.shippingStatus }, "Shipping Status")
                : m("p", "Prepparing your order")
            )
          ),

          m(
            "td",
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
      m(
        "section.overflow-auto",
        {
          style: {
            height: "400px",
          },
        },
        [
          m("h3", "Orders"),
          state.invoices.any()
            ? m("table", { style: { width: "100%" } }, [
                mdl.settings.screenSize != "phone" &&
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
        ]
      ),
  }
}
