import Header from "./header.js"
import Body from "./body.js"
import Footer from "./footer.js"
import LogoLoader from "Components/LogoLoader"

const Layout = () => {
  return {
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
