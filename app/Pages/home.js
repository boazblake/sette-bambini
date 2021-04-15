import { frontImgs } from "index.images.js"

const Home = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".masonry",
        {
          style: { height: "100vh", width: "100vw" },
        },
        frontImgs.map((src) =>
          m(
            ".masonry-item",
            m("img.masonry-image", {
              style: { height: "100%", width: "100%" },
              src,
            })
          )
        )
      ),
  }
}

export default Home
