import { NavLink } from "Components/nav-link"
import { isActiveRoute, getQuantity, getPrice } from "Utils/helpers"
import { toPairs } from "ramda"
import { productImages } from "index.images.js"

const products = (cart) =>
  toPairs(cart).map(([product, genders]) => [product, toPairs(genders)])

const Gender = () => {
  return {
    view: ({
      attrs: {
        mdl,
        gender: [sex, quantity],
        title,
      },
    }) => {
      return quantity
        ? m(".", [
            m("img", {
              style: { width: "100px" },
              srcSet: productImages[title][0],
            }),
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
        ? m(".frow column-start", [
            m("h3", `${amount} ${title} for $${price}`),
            m(
              ".frow cart-item row-around",
              genders.map((gender) => m(Gender, { mdl, gender, title }))
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
            m("h1.title text-center", "Shopping Cart"),
            getTotal(mdl, products(mdl.cart))
              ? m(NavLink, {
                  mdl,
                  href: `/cart`,
                  classList: `${isActiveRoute(`/cart`)} para button m-0`,
                  link: "Update Cart",
                })
              : null,

            products(mdl.cart).map((p) => m(Product, { mdl, p })),

            getTotal(mdl, products(mdl.cart))
              ? m(
                  ".frow ",
                  m(NavLink, {
                    mdl,
                    href: `/checkout`,
                    classList: `${isActiveRoute(`/checkout`)} para button m-0`,
                    link: [
                      "Proceed to Checkout",
                      m(
                        "h1.bold text-center",
                        `Total of ${getQuantity(
                          products(mdl.cart)
                        )} for $${getTotal(mdl, products(mdl.cart))}`
                      ),
                    ],
                  })
                )
              : m(".frow centered-column", m("h1.bold", "Your Cart is Empty")),
            ,
          ]
        )
      ),
  }
}

export default CartModal
