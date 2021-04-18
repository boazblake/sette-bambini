import { ShoppingBagLine } from "@mithril-icons/clarity/cjs"
import { toProducts, getQuantity } from "Utils/helpers"

const itemAddedToCart = (mdl) => {
  let res = ""
  if (mdl.addToCart.show()) {
    res = "ping"

    setTimeout(() => {
      res = ""
      mdl.addToCart.show(null)
      m.redraw()
    }, 500)

    return res
  }
}

const CartIcon = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".animated.clickable",
        {
          id: "cart-icon",
          onupdate: () => mdl.addToCart.show(null),
          class: itemAddedToCart(mdl),
          onclick: () => mdl.state.showCartModal(true),
        },
        [
          m(
            ".icon-click",
            m(ShoppingBagLine, {
              width: "45px",
              height: "45px",
            })
          ),

          getQuantity(toProducts(mdl.cart))
            ? m(".cart-pill", getQuantity(toProducts(mdl.cart)))
            : null,
        ]
      ),
  }
}

export default CartIcon
