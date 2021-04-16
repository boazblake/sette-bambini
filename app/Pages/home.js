import { AllImages } from "index.images.js"

const Home = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".masonry",
        {
          style: { height: "100vh", width: "100vw" },
        },
        AllImages.map((srcSet) =>
          m(
            ".masonry-item",
            m("img.masonry-image", {
              style: { height: "100%", width: "100%" },
              srcSet,
            })
          )
        )
      ),
  }
}

export default Home
