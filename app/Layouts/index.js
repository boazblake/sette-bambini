import Header from "./Header/index.js"
import Body from "./Body/index.js"
import Footer from "./footer.js"
import LogoLoader from "Components/LogoLoader"
import { log } from "Utils"
import Task from "data.task"

const initApp = ({ attrs: { mdl } }) =>
  Task.of((token) => (prices) => {
    mdl.state.prices = prices
    return token
  })
    .ap(mdl.http.back4App.getTask(mdl)(`users/me`))
    .ap(mdl.http.store.getTask(mdl)("prices"))
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
        mdl.state.isLoading() ? m(LogoLoader) : m(Body, { mdl, children }),
        m(Footer, { mdl })
      ),
  }
}

export default Layout
