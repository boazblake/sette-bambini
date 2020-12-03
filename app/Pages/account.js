import { log } from "Utils"
import { PencilLine } from "@mithril-icons/clarity/cjs"
import { states, stateDict } from "Models"
import { toPairs } from "ramda"

const submitAddressTask = (mdl) => (data) =>
  mdl.http.backEnd.putTask(mdl)(`data/Accounts/${mdl.user.account.objectId}`)({
    address: JSON.stringify(data),
  })

const AccountAddress = ({ attrs: { mdl } }) => {
  const state = {
    address: { street1: "", street2: "", city: "", state: "", zip: "" },
    editAddress: Stream(false),
    showAddress: Stream(false),
    errors: {},
  }

  const toggleEditAddress = (state) => state.editAddress(!state.editAddress())

  const submitAddress = (mdl) => (state) => {
    const onError = (errors) => console.log("e", e)
    const onSuccess = (mdl) => (s) => {
      mdl.user.address = JSON.parse(s.address)
    }
    submitAddressTask(mdl)(state.address).fork(onError, onSuccess(mdl))
  }

  state.address = mdl.user.address
  if (state.address) {
    state.showAddress(true)
    state.editAddress(false)
  } else {
    state.address = {}
    state.showAddress(false)
    state.editAddress(false)
  }
  return {
    view: ({ attrs: { mdl } }) =>
      m("section.m-5", [
        m(
          "span.frow row-start",
          m("h3.pr-10", "Shipping Address"),
          m(PencilLine, {
            class: "clickable",
            onclick: () => toggleEditAddress(state),
            width: "16px",
          }),
          Object.keys(state.address).length
            ? m(
                "pre",
                `${state.address.street1} ${state.address.street2 || ""} ${
                  state.address.city
                } ${state.address.state} ${state.address.zip}`
              )
            : m("h4", "No Address on File")
        ),
        state.editAddress() &&
          m(
            "form.frow column-start m-5 px-20",
            {
              oninput: (e) => {
                console.log(mdl, state)
                state.address[e.target.id] = e.target.value
              },
            },
            [
              m("input.col-xs-1-2", {
                type: "text",
                id: "street1",
                placeholder: "street1",
                value: state.address.street1,
              }),
              m("input.col-xs-1-2", {
                type: "text",
                id: "street2",
                placeholder: "street2",
                value: state.address.street2,
              }),
              m(".frow row", [
                m("input.col-xs-1-3", {
                  type: "text",
                  id: "city",
                  placeholder: "city",
                  value: state.address.city,
                }),
                m(
                  ".col-xs-1-3",

                  m(
                    "select",
                    {
                      id: "state",
                      placeholder: "state",
                      value: state.address.state || "state",
                    },
                    Object.keys(states).map((state) => [
                      m(
                        "option",
                        { key: "placeholder", value: "state" },
                        "state"
                      ),
                      m(
                        "option",
                        {
                          key: state,
                          placeholder: "state",
                          value: stateDict(state),
                        },
                        `${stateDict(state)}`
                      ),
                    ]),
                    state.address.state || "state"
                  )
                ),
                m("input.col-xs-1-3", {
                  type: "number",
                  inputmode: "numeric",
                  pattern: "[0-9]*",
                  id: "zip",
                  value: state.address.zip,
                  placeholder: "zip",
                }),
              ]),
              m(
                "a.button",
                {
                  type: "submit",
                  class: "clickable",
                  onclick: () => submitAddress(mdl)(state),
                },
                "Submit"
              ),
            ]
          ),
      ]),
  }
}

const fetchInvoicesTask = (mdl) =>
  mdl.http.backEnd.getTask(mdl)(
    `data/Invoices?where=ownerId%3D'${mdl.user.objectId}'`
  )

const PastOrders = () => {
  const state = {
    invoices: [],
  }
  const onError = (mdl) => (e) => console.log("e", e, mdl)
  const onSuccess = (mdl) => (invoices) => {
    console.log(mdl)
    state.invoices = invoices
  }

  const fetchInvoices = ({ attrs: { mdl } }) =>
    fetchInvoicesTask(mdl).fork(onError(mdl), onSuccess(mdl))
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
              m("th", "line items"),
              m("th", "shipping"),
              m("th", "payment status"),
            ])
          ),

          state.invoices.map((invoice) =>
            m(
              "tbody",
              m("tr", [
                m("td", invoice.purchaseTime),
                m("td", invoice.orderID),
                JSON.stringify(
                  toPairs(invoice.cart).map((category) => {
                    console.log(category, invoice.prices[category[0]])
                    category.price = invoice.prices[category[0]]
                    invoice.prices[category[0]]
                    Object.values(category)
                    console.log(category)
                  })
                ),

                m(
                  "td",
                  `${invoice.shipping.name.full_name} ${invoice.shipping.address.address_line_1} ${invoice.shipping.address.admin_area_2} ${invoice.shipping.address.admin_area_1} ${invoice.shipping.address.postal_code}`
                ),
                m("td", invoice.status),
              ])
            )
          ),
        ]),
      ]),
  }
}

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
