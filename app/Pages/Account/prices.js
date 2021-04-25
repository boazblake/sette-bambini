import { without } from "ramda"
import { log, parsePrices } from "Utils"

const Prices = (mdl) =>
  without("id", Object.keys(mdl.state.prices)).map((product) =>
    m(
      "label.col-xs-1-3",
      product,
      m("input", {
        type: "number",
        value: mdl.state.prices[product],
        onkeyup: (e) => (mdl.state.prices[product] = parseInt(e.target.value)),
      })
    )
  )

export const PriceAdjustment = () => {
  const getPrices = ({ attrs: { mdl } }) =>
    mdl.http.back4App
      .getTask(mdl)("classes/Prices")
      .map(parsePrices)
      .fork(log("error"), (prices) => (mdl.state.prices = prices))

  const updatePrices = (mdl) =>
    mdl.http.back4App
      .postTask(mdl)("classes/Prices")(mdl.state.prices)
      .fork(log("error"), log("succes"))

  return {
    view: ({ attrs: { mdl } }) =>
      m("section", [
        m("h3", "Prices"),
        Prices(mdl),
        m("button", { onclick: (e) => updatePrices(mdl) }, "update prices"),
      ]),
  }
}
