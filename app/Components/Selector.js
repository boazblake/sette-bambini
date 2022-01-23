import { saveStorageTask } from "Utils/storage"
import { AddToCartOut } from "Styles/animations"

const Selector = () => {
  const state = {
    error: Stream(null),
  }

  const ResetState = () => {
    state.quantity = 1
    state.gender = "Gender"
  }

  const saveToStorage = (mdl) => {
    const onError = (e) => {
      console.log("Error saving", e.message)
      state.error(e.message)
    }
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
        m(".frow content-center gutters row-between pt-20 md-columns", [
          state.error() && m("code.warning", state.error()),
          m(
            ".col-xs-1-3.col-md-1-4",
            m("h2.pb-10", `$${mdl.state.prices[product]}`)
          ),
          m(
            ".col-xs-1-3.col-md-1-4",
            m(
              "label",

              m(
                "select",
                {
                  value: state.quantity,
                  onchange: (e) => (state.quantity = e.target.value),
                },
                [
                  m("option", { value: 1 }, 1),
                  m("option", { value: 2 }, 2),
                  m("option", { value: 3 }, 3),
                  m("option", { value: 4 }, 4),
                  m("option", { value: 5 }, 5),
                  m("option", { value: 6 }, 6),
                  m("option", { value: 7 }, 7),
                  m("option", { value: 8 }, 8),
                  m("option", { value: 9 }, 9),
                  m("option", { value: 10 }, 10),
                ]
              )
              // m("input", {
              //   type: "number",
              //   inputmode: "numeric",
              //   pattern: "[0-9]*",
              //   placeholder: "quantity",
              //   value: state.quantity,
              //   oninput: (e) => (state.quantity = e.target.value),
              // })
            )
          ),
          m(
            ".col-xs-1-3.col-md-1-4",
            m(
              "label",

              m(
                "select",
                {
                  value: state.gender,
                  onchange: (e) => (state.gender = e.target.value),
                },
                [
                  m("option", { value: null }, "Gender"),
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
            ".col-xs-1",
            m(
              "button.width-100",
              {
                disabled:
                  state.quantity == undefined || state.gender == "Gender",
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
