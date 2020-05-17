const Selector = () => {
  const state = {}
  const ResetState = () => {
    state.quantity = null
    state.gender = "Select a Gender"
  }

  const addToCart = (mdl) => (product) => (state) => {
    mdl.cart[product][state.gender] += parseInt(state.quantity)
    //if (mdl.state.isAuth()) => save to db
    //and always save to localStorage
    localStorage.setItem("sb-cart", JSON.stringify(mdl.cart))
    ResetState()
    console.log(JSON.parse(localStorage.getItem("sb-cart")))
  }

  return {
    oninit: () => ResetState(),
    view: ({ attrs: { mdl, product } }) =>
      m(
        ".frow",
        m(".frow content-center gutters row-between pt-20", [
          m(
            ".col-sm-1-4",
            m(
              "h2.pb-10",
              `${mdl.state.currency()} ${mdl.state.prices[product]}`
            )
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
                onchange: (e) => (state.quantity = e.target.value),
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
      ),
  }
}

export default Selector
