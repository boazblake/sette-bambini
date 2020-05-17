import { ShoppingBagLine } from "@mithril-icons/clarity/cjs/index"
import {
  add,
  compose,
  toPairs,
  flatten,
  filter,
  reduce,
  type,
  equals,
  view,
  lensIndex,
  propEq,
} from "ramda"

const getQuantity = (xs) =>
  reduce(add, 0, filter(compose(equals("Number"), type), flatten(xs)))

const getPrice = (mdl, title, genders) => {
  /*
  get realprice from mdl.state.currency, title, getQuantity(title, genders)
*/
  // console.log("wtf", title, genders)

  let price = mdl.state.prices[title] * getQuantity(genders)
  if (mdl.state.currency() !== "$") {
    //price = convertPriceToCurrency(mdl.state.currency(), price)
  }

  return price
}

const products = (cart) =>
  toPairs(cart).map(([product, genders]) => [product, toPairs(genders)])

const Gender = () => {
  return {
    view: ({
      attrs: {
        mdl,
        gender: [sex, quantity],
      },
    }) => {
      return m(".", [
        m("img", { src: "https://via.placeholder.com/80" }),
        m("h4", `${sex} : ${quantity}`),
      ])
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
      return m(".shadow-light ", [
        m(
          "h3",
          `${title}: ${getQuantity(
            genders
          )} @ ${mdl.state.currency()} ${getPrice(mdl, title, genders)}`
        ),
        m(
          ".frow",
          genders.map((gender) => m(Gender, { mdl, gender }))
        ),
      ])
    },
  }
}

const getTotal = (mdl, currency, products) => {
  const getTotalPrice = products.map((p) => getPrice(mdl, p[0], p[1]))

  return `Total of ${getQuantity(products)} for ${currency}: ${getQuantity(
    getTotalPrice
  )}`
}

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
            m(
              ".shadow-dark",
              m(
                "h1.bold",
                getTotal(mdl, mdl.state.currency(), products(mdl.cart))
              )
            ),
          ]
        )
      ),
  }
}

export default CartModal
