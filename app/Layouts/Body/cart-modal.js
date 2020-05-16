import { ShoppingBagLine } from "@mithril-icons/clarity/cjs/index"
import { toPairs } from "ramda"

const Product = () => {
  return {
    view: ({ attrs: mdl, p }) => {
      console.log("p", p)
      return m(".")
    },
  }
}

const products = (cart) =>
  toPairs(cart).map(([product, genders]) => [product, toPairs(genders)])

const CartModal = ({ attrs: { mdl } }) => {
  return {
    oninit: ({ attrs: { mdl } }) => mdl.state.showNavModal(false),
    view: ({ attrs: { mdl } }) =>
      m(
        ".modalOverlay-right.animated",
        {
          onclick: (e) => {
            mdl.state.showCartModal(false)
          },
        },
        m(
          `.modal`,
          {
            style: { right: 0 },
            id: "cart-modal",
          },

          [
            m("h1.title", "Shopping Cart"),

            products(mdl.cart).map((p) => m(Product, { mdl, p })),
          ]
        )
      ),
  }
}

export default CartModal
