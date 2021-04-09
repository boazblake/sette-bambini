import { frontImgs } from "index.images.js"
import { SlideUp } from "Styles/animations"

const Home = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".frow frow-center justify-evenly",
        { id: "masonry" },
        frontImgs.map((src) =>
          m("img.Sirv", {
            oncreate: SlideUp,
            src,
          })
        )
      ),
  }
}

export default Home
