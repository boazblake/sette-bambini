import { NavLink } from "Components/nav-link"
import { isActiveRoute } from "Utils/helpers"
import {
  add,
  compose,
  toPairs,
  flatten,
  filter,
  reduce,
  type,
  equals,
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
        ? m(".frow column-start mt-10", [
            m(
              "span.underline",
              m(
                "h3.mb-10",
                `${amount} ${title} for ${mdl.state.currency()} ${price}`
              )
            ),
            m(
              ".frow cart-item row-around",
              genders.map((gender) => m(Gender, { mdl, gender }))
            ),
          ])
        : null
    },
  }
}

const getTotal = (mdl, products) => {
  const getTotalPrice = getQuantity(
    products.map((p) => getPrice(mdl, p[0], p[1]))
  )
  return getTotalPrice
}

const Cart = ({ attrs: { mdl } }) => {
  return {
    oninit: ({ attrs: { mdl } }) => mdl.state.showNavModal(false),
    view: ({ attrs: { mdl } }) =>
      m(`.frow-container frow-center`, [
        getTotal(mdl, products(mdl.cart))
          ? m(NavLink, {
              mdl,
              href: `/cart`,
              classList: `${isActiveRoute(`/cart`)} para button m-0`,
              link: "Update Cart",
            })
          : null,

        products(mdl.cart).map((p) => m(Product, { mdl, p })),

        getTotal(mdl, products(mdl.cart)) ? "" : ".frow centered-column",
        m(NavLink, {
          mdl,
          href: `/checkout`,
          classList: `${isActiveRoute(`/checkout`)} mt-50`,
          link: getTotal(mdl, products(mdl.cart))
            ? [
                m(
                  "h1.bold text-center.mt-20",
                  `Total of ${getQuantity(
                    products(mdl.cart)
                  )} for ${mdl.state.currency()}: ${getTotal(
                    mdl,
                    products(mdl.cart)
                  )}`
                ),
              ]
            : m("h1.bold", "Your Cart is Empty"),
        }),
      ]),
  }
}

export default Cart
