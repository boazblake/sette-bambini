import { NavLink } from "Components/nav-link"
import {
  isActiveRoute,
  getTotal,
  getQuantity,
  toProducts,
  saveStorageTask,
} from "Utils"
import { productImages } from "index.images.js"

const saveToStorage = (mdl) => {
  const onError = (e) => console.log("Error saving", e)
  const onSuccess = (s) => {
    console.log("success saving", s)
  }

  saveStorageTask(mdl)("sb-cart")(mdl.cart).fork(onError, onSuccess)
}

const addToCart = (mdl) => (product, sex, quantity) => {
  console.log(product, sex, quantity)
  mdl.cart[product][sex] = parseInt(quantity) ? parseInt(quantity) : 0
  saveToStorage(mdl)
}

const Gender = () => {
  return {
    view: ({
      attrs: {
        mdl,
        product,
        gender: [sex, quantity],
      },
    }) => {
      let selector = (mdl) =>
        mdl.settings.screenSize == "desktop" ? "td" : "tr"
      return quantity
        ? m(
            `${selector(mdl)}.animated.frow row-around mt-10`,
            m(
              "label.col-xs-1-4",
              m("h4", `${sex}`),
              m("input", {
                type: "number",
                inputmode: "numeric",
                min: 0,
                placeholder: "quantity",
                value: quantity,
                onchange: (e) => addToCart(mdl)(product, sex, e.target.value),
                pattern: "[0-9]*",
              })
            )
          )
        : null
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
      return getQuantity(genders)
        ? m(".frow mt-10 items-baseline justify-evenly", [
            m("h2", `${title}  `),
            m("h4", `($${mdl.state.prices[title]})`),

            m(
              "table",
              m(
                "tr.animated.frow cart-item",

                m("img", {
                  style: { width: "40%" },
                  srcSet: productImages[title][0],
                }),

                m(
                  "table",
                  genders.map((gender) =>
                    m(Gender, {
                      mdl,
                      gender,
                      product: title,
                    })
                  )
                )
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
      m(`.animated.frow-container frow-center`, [
        toProducts(mdl.cart).map((p) =>
          m(Product, {
            mdl,
            p,
          })
        ),

        m(
          ".frow-center",
          getTotal(mdl, toProducts(mdl.cart))
            ? m(NavLink, {
                mdl,
                href: `/checkout`,
                classList: `${isActiveRoute(`/checkout`)} para button mt-20`,
                link: [
                  "Proceed to Checkout",
                  m(
                    "h1.bold text-center",
                    `Total of ${getQuantity(
                      toProducts(mdl.cart)
                    )} for ${getTotal(mdl, toProducts(mdl.cart))}`
                  ),
                ],
              })
            : m("h1.bold", "Your Cart is Empty")
        ),
      ]),
  }
}

export default Cart
