import { BarsLine } from "@mithril-icons/clarity/cjs/index"

const Hamburger = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      mdl.state.isAuth()
        ? m("span", [
            m("span", `Welcome ${mdl.user.name.split(" ")[0]}`),
            m(BarsLine),
          ])
        : m(BarsLine),
  }
}

export default Hamburger
