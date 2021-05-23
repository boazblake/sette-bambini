import Header from "./Header/index.js"
import Body from "./Body/index.js"
import Footer from "./footer.js"
import { parsePrices, log } from "Utils"
import Task from "data.task"

const initApp = ({ attrs: { mdl } }) =>
  Task.of((token) => (prices) => {
    mdl.state.prices = prices
    console.log("mdl", mdl.state)
    return token
  })
    .ap(mdl.http.back4App.getTask(mdl)(`users/me`))
    .ap(mdl.http.back4App.getTask(mdl)("classes/Prices").map(parsePrices))
    .fork(
      (_) => m.route.set("/logout"),
      (isValid) => {}
    )

const Layout = () => {
  return {
    oninit: initApp,
    view: ({ children, attrs: { mdl } }) =>
      m(
        ".layout",
        { id: "layout", role: "main" },
        m(Header, { mdl }),
        m(Body, { mdl, children }),
        m(Footer, { mdl })
      ),
  }
}

export default Layout
