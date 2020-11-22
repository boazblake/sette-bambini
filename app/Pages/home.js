import { frontImgs } from "index.images.js"
import m from "mithril"
import { animate,SlideInUp } from "Styles/animations"

const Home = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".frow", { id: "home-page" },
        frontImgs.map(img => m('img.col-md-1-3.animate', { oncreate: SlideInUp, style: { 'max-width': '40%' }, src: img.src })))
  }
}

export default Home
