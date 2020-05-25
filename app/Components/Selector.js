import { saveStorageTask } from "Utils/storage"
import { AddToCartOut } from "Styles/animations"

const Selector = () => {
  const state = {}
  const ResetState = () => {
    state.quantity = null
    state.gender = "Select a Gender"
  }

  const saveToStorage = (mdl) => {
    const onError = (e) => console.log("Error saving", e)
    const onSuccess = (s) => {
      ResetState()
    }

    saveStorageTask(mdl)("sb-cart")(mdl.cart).fork(onError, onSuccess)
  }

  const addToCart = (mdl) => (product) => (state) => {
    mdl.addToCart.show(product)
    mdl.cart[product][state.gender] += parseInt(state.quantity)
    saveToStorage(mdl)
  }
  return {
    oninit: () => ResetState(),
    view: ({ attrs: { mdl, product } }) => {
      return m(
        ".frow",
        m(".frow content-center gutters row-between pt-20", [
          m(
            ".col-sm-1-4",
            m("h2.pb-10", `${mdl.state.currency()}${mdl.state.prices[product]}`)
          ),
          m(
            ".col-sm-1-4",
            m(
              "label",
              m("input", {
                type: "number",
                inputmode: "numeric",
                placeholder: "quantity",
                value: state.quantity,
                oninput: (e) => (state.quantity = e.target.value),
                pattern: "[0-9]*",
              })
            )
          ),
          m(
            ".col-sm-1-4",
            m(
              "label",

              m(
                "select",
                {
                  value: state.gender,
                  onchange: (e) => (state.gender = e.target.value),
                },
                [
                  m("option", { value: null }, "Select a Gender"),
                  m("option", { value: "Male" }, "Male"),
                  m("option", { value: "Female" }, "Female"),
                  m("option", { value: "Unisex" }, "Unisex"),
                ]
              )
            )
          ),
          mdl.addToCart.show() == product &&
            m(".animated", {
              oncreate: AddToCartOut,
              id: "add-to-cart-img",
              style: {
                "background-image": `url(${mdl.addToCart.id()})`,
              },
            }),
          m(
            ".col-sm-1-4",
            m(
              "button",
              {
                disabled:
                  state.quantity == undefined ||
                  state.gender == "Select a Gender",
                onclick: () => addToCart(mdl)(product)(state),
              },

              "Add To Bag"
            )
          ),
        ])
      )
    },
  }
}

export default Selector
