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
      return quantity
        ? m(
            "p.animated.frow row-start col-xs-1-4 ml-10",
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
        ? m(
            ".frow m-10 row-start",
            {
              style: {
                width: mdl.settings.screenSize == "phone" ? "80%" : "40%",
              },
            },
            m("h2", `${title}: $${mdl.state.prices[title]}`),

            m("img", {
              style: { objectFit: "contain" },
              srcSet: productImages[title][0],
            }),

            genders.map((gender) =>
              m(Gender, {
                mdl,
                gender,
                product: title,
              })
            )
          )
        : null
    },
  }
}

const Cart = ({ attrs: { mdl } }) => {
  return {
    oninit: ({ attrs: { mdl } }) => mdl.state.showNavModal(false),
    view: ({ attrs: { mdl } }) =>
      m(
        ".frow-container",
        { style: { height: "100%" } },
        m(
          "animated.frow.row-start",
          toProducts(mdl.cart).map((p) =>
            m(Product, {
              mdl,
              p,
            })
          )
        ),
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
                  )} for $${getTotal(mdl, toProducts(mdl.cart))}`
                ),
              ],
            })
          : m("h1.bold", "Your Cart is Empty")
      ),
  }
}

export default Cart
