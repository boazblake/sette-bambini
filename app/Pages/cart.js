import Selector from "Components/Selector"
import { NavLink } from "Components/nav-link"
import {
  isActiveRoute,
  getTotal,
  getQuantity,
  getPrice,
  toProducts,
} from "Utils/helpers"

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

const Cart = ({ attrs: { mdl } }) => {
  return {
    oninit: ({ attrs: { mdl } }) => mdl.state.showNavModal(false),
    view: ({ attrs: { mdl } }) =>
      m(`.frow-container frow-center`, [
        toProducts(mdl.cart).map((p) => m(Product, { mdl, p })),

        getTotal(mdl, toProducts(mdl.cart))
          ? m(
              ".frow centered-column",
              m(NavLink, {
                mdl,
                href: `/checkout`,
                classList: `${isActiveRoute(`/checkout`)} button para mt-20`,
                link: [
                  "Proceed to Checkout",
                  m(
                    "h1.bold text-center white",
                    `Total of ${getQuantity(
                      toProducts(mdl.cart)
                    )} for ${mdl.state.currency()}: ${getTotal(
                      mdl,
                      toProducts(mdl.cart)
                    )}`
                  ),
                ],
              })
            )
          : m("h1.bold", "Your Cart is Empty"),
      ]),
  }
}

export default Cart
