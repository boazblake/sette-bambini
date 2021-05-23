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
        ? m(
            ".frow m-10 row-start",
            {
              style: {
                width: mdl.settings.screenSize == "phone" ? "80%" : "40%",
              },
            },

            m("h2.mb-10", `${amount} ${title} for $${price}`),
            m("img", {
              style: {
                style: { objectFit: "contain" },
                width: "100%",
              },
              srcSet: productImages[title][0],
            }),

            m(
              ".frow",
              genders.map(([sex, quantity]) =>
                quantity
                  ? m(".frow row-start ml-5", m("h4.pr-5", sex, " x"), quantity)
                  : null
              )
            )
          )
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
        `.checkout`,
        { style: { height: "100%" } },
        getTotal(mdl, toProducts(mdl.cart))
          ? m(NavLink, {
              mdl,
              href: `/cart`,
              classList: `${isActiveRoute(`/cart`)} para button m-0`,
              link: "Update Cart",
            })
          : null,

        m(
          ".frow-container.frow.row-start",
          toProducts(mdl.cart).map((p) => m(Product, { mdl, p }))
        ),

        getTotal(mdl, toProducts(mdl.cart))
          ? [
              m(
                "h1.bold text-center.mt-20.mb-20",
                `Total of ${getQuantity(toProducts(mdl.cart))} for $${getTotal(
                  mdl,
                  toProducts(mdl.cart)
                )}`
              ),
              state.isPaying == "start" && m(LogoLoader),
              m(PayPal, { mdl, state }),
            ]
          : m("h1.bold", "Your Cart is Empty")
      ),
  }
}

export default Checkout
