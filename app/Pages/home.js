import { frontImgs } from "index.images.js"
import m from "mithril"

const Home = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".frow-container", { id: "home-page" },
        frontImgs.map(img => m('img', { src: img.src })))
  }
}

export default Home
