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
      return quantity
        ? m(".", [
            m("img", {
              style: { width: "100px" },
              dataSrc: productImages[title][0],
            }),
            m("h4", `${sex} : ${quantity}`),
          ])
        : null
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
        ? m(".frow column-start mt-10", [
            m(
              "span.underline",
              m("h3.mb-10", `${amount} ${title} for $${price}`)
            ),
            m(
              ".frow cart-item row-around",
              genders.map((gender) => m(Gender, { mdl, gender, title }))
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

          toProducts(mdl.cart).map((p) => m(Product, { mdl, p })),

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
