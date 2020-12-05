import Header from "./Header/index.js"
import Body from "./Body/index.js"
import Footer from "./footer.js"
import LogoLoader from "Components/LogoLoader"
import { log } from "Utils"
import Task from "data.task"

const initApp = ({ attrs: { mdl } }) =>
  Task.of((token) => (prices) => (mdl.state.prices = prices))
    .ap(
      mdl.http.backEnd.getTask(mdl)(
        `users/isvalidusertoken/${sessionStorage.getItem("sb-user-token")}`
      )
    )
    .ap(mdl.http.store.getTask(mdl)("prices"))
    .fork(log("e"), (isValid) => {
      !isValid ? () => {} : m.route.set("/logout")
    })

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
