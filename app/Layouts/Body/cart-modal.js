import { ShoppingBagLine } from "@mithril-icons/clarity/cjs/index"

const CartModal = () => {
  return {
    oninit: ({ attrs: { mdl } }) => mdl.state.showNavModal(false),
    view: ({ attrs: { mdl } }) =>
      m(
        ".modalOverlay.animated",
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

          [m("h1.title", "Shopping Cart")]
        )
      ),
  }
}

export default CartModal
