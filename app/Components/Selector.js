const Selector = () => {
  const state = {
    quantity: null,
    gender: "Select a Gender",
  }

  const addToCart = (mdl) => (product) => (state) =>
    (mdl.cart[product][state.gender] += parseInt(state.quantity))

  return {
    view: ({ attrs: { mdl, product } }) =>
      m(
        ".frow",
        m(".frow content-center gutters row-between pt-20", [
          m(
            ".col-sm-1-3",
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
            ".col-sm-1-3",
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
                  m("option", { value: "m" }, "Male"),
                  m("option", { value: "f" }, "Female"),
                  m("option", { value: "u" }, "Uni"),
                ]
              )
            )
          ),
          m(
            ".col-sm-1-3",
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
