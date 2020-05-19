import Selector from "Components/Selector"
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
        product,
        gender: [sex, quantity],
      },
    }) => {
      return quantity
        ? m(".frow row-around", [
            m("img", { src: "https://via.placeholder.com/80" }),
            m("h4", `${sex} : ${quantity}`),
            m(Selector, { mdl, product }),
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
        ? m(".frow  mt-10", [
            m("h3", `${amount} ${title} for ${mdl.state.currency()} ${price}`),
            m(
              ".frow cart-item column-start",
              genders.map((gender) =>
                m(Gender, { mdl, gender, product: title })
              )
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
        products(mdl.cart).map((p) => m(Product, { mdl, p })),

        getTotal(mdl, products(mdl.cart)) ? "" : ".frow centered-column",
        m(NavLink, {
          mdl,
          href: getTotal(mdl, products(mdl.cart)) ? `/checkout` : m.route.get(),
          classList: `${isActiveRoute(`/checkout`)} button para mt-20`,
          link: getTotal(mdl, products(mdl.cart))
            ? [
                "Proceed to Checkout",
                m(
                  "h1.bold text-center white",
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
