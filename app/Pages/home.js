import { frontImgs } from "index.images.js"
import { SlideUp } from "Styles/animations"

const Home = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".frow frow-center justify-evenly",
        { id: "home-page" },
        frontImgs.map((img) =>
          m("img.Sirv", {
            oncreate: SlideUp,
            "data-src": `${img}?w=500&scale.option=fill`,
          })
        )
      ),
  }
}

export default Home
