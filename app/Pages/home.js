import { ShoppingCartLine } from "@mithril-icons/clarity/cjs/index"
const Home = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".empty", [m(ShoppingCartLine), m("h1", mdl.state.route.name)]),
  }
}

export default Home
