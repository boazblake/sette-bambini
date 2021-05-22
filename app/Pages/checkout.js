import { NavLink } from "Components/nav-link"
import { PayPal } from "Components/paypal"
import {
  isActiveRoute,
  getTotal,
  getQuantity,
  getPrice,
  toProducts,
} from "Utils/helpers"
import { productImages } from "index.images.js"
import LogoLoader from "Components/LogoLoader"

const Gender = () => {
  return {
    view: ({
      attrs: {
        mdl,
        gender: [sex, quantity],
        title,
      },
    }) => {
      return quantity ? m(".", [, m("h4", `${sex} : ${quantity}`)]) : null
    },
  }
}

const Product = () => {
  return {
    view: ({
      attrs: {
        mdl,
        p: [title, genders],
      },
    }) => {
      let amount = getQuantity(genders)

      let price = getPrice(mdl, title, genders)
      return amount
        ? m(".frow mt-10", [
            m(
              "span.underline",
              m("h3.mb-10", `${amount} ${title} for $${price}`)
            ),
            m(
              "table",
              {
                "table-layout": "fixed",
                style: { width: "100%" },
              },
              m(
                "tr",

                m(
                  "td",
                  {
                    style: {
                      width:
                        mdl.settings.screenSize == "desktop" ? "25%" : "50%",
                    },
                  },

                  m("img", {
                    style: {
                      width:
                        mdl.settings.screenSize == "desktop" ? "100%" : "50%",
                    },
                    srcSet: productImages[title][0],
                  })
                ),

                m(
                  "td",
                  m(
                    "table",
                    {
                      "table-layout": "fixed",
                    },
                    genders.map(([sex, quantity]) =>
                      m(
                        "tr",
                        m("th", m("h4", { style: {} }, sex)),
                        m("td", m("h4", { style: {} }, quantity))
                      )
                    )
                  )
                )
              )
            ),
          ])
        : null
    },
  }
}

const Checkout = ({ attrs: { mdl } }) => {
  const state = {
    isPaying: null,
  }
  return {
    oninit: ({ attrs: { mdl } }) => mdl.state.showNavModal(false),
    view: ({ attrs: { mdl } }) =>
      m(
        `.frow-container frow-center`,

        [
          getTotal(mdl, toProducts(mdl.cart))
            ? m(NavLink, {
                mdl,
                href: `/cart`,
                classList: `${isActiveRoute(`/cart`)} para button m-0`,
                link: "Update Cart",
              })
            : null,

          m(
            ".frow-centered",
            toProducts(mdl.cart).map((p) => m(Product, { mdl, p }))
          ),

          getTotal(mdl, toProducts(mdl.cart))
            ? [
                m(
                  "h1.bold text-center.mt-20.mb-20",
                  `Total of ${getQuantity(
                    toProducts(mdl.cart)
                  )} for $${getTotal(mdl, toProducts(mdl.cart))}`
                ),
                state.isPaying == "start" && m(LogoLoader),
                m(PayPal, { mdl, state }),
              ]
            : m("h1.bold", "Your Cart is Empty"),
        ]
      ),
  }
}

export default Checkout
