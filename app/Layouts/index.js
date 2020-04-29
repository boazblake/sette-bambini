import Header from "./header.js"
import Body from "./body.js"
import Footer from "./footer.js"

const Layout = () => {
  return {
    view: ({ children, attrs: { mdl } }) =>
      m(".layout", { id: "layout" }, [
        m(Header, { mdl }),
        m(Body, { mdl, children }),
        m(Footer, { mdl }),
      ]),
  }
}

export default Layout
