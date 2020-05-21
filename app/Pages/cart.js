import { NavLink } from "Components/nav-link"
import { isActiveRoute, getTotal, getQuantity, toProducts } from "Utils/helpers"
import { saveStorageTask } from "Utils/storage"
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
        ? m(".animated.frow row-around mt-10", [
            m("img", { src: "https://via.placeholder.com/80" }),
            m("h4", `${sex}`),
            m(
              ".col-xs-1-4",
              m(
                "label",
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
            ),
          ])
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
        ? m(".frow mt-10", [
            m(
              "h2",
              `${title} for ${mdl.state.currency()} ${mdl.state.prices[title]}`
            ),
            m(
              ".animated.frow cart-item column-start",
              genders.map((gender) =>
                m(Gender, {
                  mdl,
                  gender,
                  product: title,
                })
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
