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
      return quantity
        ? m(".", [
            m("img", { src: "https://via.placeholder.com/80" }),
            m("h4", `${sex} : ${quantity}`),
          ])
        : null
    },
  }
}

const Product = ({
  attrs: {
    mdl,
    p: [title, genders],
  },
}) => {
  let amount = getQuantity(genders)

  let price = getPrice(mdl, title, genders)

  return {
    view: ({
      attrs: {
        mdl,
        p: [title, genders],
      },
    }) => {
      return amount
        ? m(".frow row-around", [
            m("h3", `${title}: ${amount} for ${mdl.state.currency()} ${price}`),
            m(
              ".frow",
              genders.map((gender) => m(Gender, { mdl, gender }))
            ),
          ])
        : null
    },
  }
}

const getTotal = (mdl, currency, products) => {
  const getTotalPrice = getQuantity(
    products.map((p) => getPrice(mdl, p[0], p[1]))
  )
  return getTotalPrice
    ? m(
        "h1.bold",
        `Total of ${getQuantity(products)} for ${currency}: ${getTotalPrice}`
      )
    : m("h1.m-30", "Your Cart is Empty")
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
            m(".", getTotal(mdl, mdl.state.currency(), products(mdl.cart))),
          ]
        )
      ),
  }
}

export default CartModal
