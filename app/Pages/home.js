import { frontImgs } from "index.images.js"
import m from "mithril"
import { animate,SlideInUp } from "Styles/animations"

const Home = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".frow-container", { id: "home-page" },
        frontImgs.map(img => m('img.col-xs-1-3 col-sm-1-3 col-md-1-3', { src: img.src })))
  }
}

export default Home
