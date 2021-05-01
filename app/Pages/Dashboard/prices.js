import m from "mithril"
import { without } from "ramda"
import { log, parsePrices } from "Utils"

export const Prices = () => {
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
      m(
        "table.dash-table",
        without("id", Object.keys(mdl.state.prices)).map((product) =>
          m(
            "tr",
            m("td", m("label.col-xs-1-3", product)),
            m(
              "td",
              m("input", {
                type: "number",
                value: mdl.state.prices[product],
                onkeyup: (e) =>
                  (mdl.state.prices[product] = parseInt(e.target.value)),
              })
            )
          )
        ),
        m("button", { onclick: (e) => updatePrices(mdl) }, "update prices")
      ),
  }
}
