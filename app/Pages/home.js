import Grid from "Components/grid.js"
import { frontImgs } from "index.images.js"
import { SlideUp } from "Styles/animations"

const Home = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".gallery",
        {
          //   id: "masonry",
          style: { height: "100vh", width: "100vw" },
        },
        frontImgs.map((src) =>
          m(
            ".gallery-item",
            m("img.gallery-image", {
              style: { height: "100%", width: "100%" },
              oncreate: SlideUp,
              src,
            })
          )
        )
      ),
  }
}

export default Home
