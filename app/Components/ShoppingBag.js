import { ShoppingBagLine } from "@mithril-icons/clarity/cjs/index"

const ShoppingBag = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(ShoppingBagLine, {
        onclick: () => mdl.state.showCartModal(true),
      }),
  }
}

export default ShoppingBag
