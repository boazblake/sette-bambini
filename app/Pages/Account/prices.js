import { log } from "Utils"

const Prices = (mdl) =>
  Object.keys(mdl.state.prices).map((product) =>
    m(
      "label.col-xs-1-3",
      product,
      m("input", {
        type: "number",
        value: mdl.state.prices[product],
        onchange: (e) => (mdl.state.prices[product] = e.target.value),
      })
    )
  )

export const PriceAdjustment = () => {
  const getPrices = ({ attrs: { mdl } }) =>
    mdl.http.store
      .getTask(mdl)("prices")
      .fork(log("error"), ({ prices }) => (mdl.state.prices = prices))

  const updatePrices = (mdl) =>
    mdl.http.store
      .putTask(mdl)("prices")({ prices: mdl.state.prices })
      .fork(log("error"), ({ prices }) => (mdl.state.prices = prices))

  return {
    // oninit: getPrices,
    view: ({ attrs: { mdl } }) =>
      m("section", [
        m("h3", "Update Prices"),
        Prices(mdl),
        m("button", { onclick: (e) => updatePrices(mdl) }, "update prices"),
      ]),
  }
}
