import { frontImgs } from "index.images.js"
import {SlideInUp} from 'Styles/animations'

const Home = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".frow-container", { id: "home-page" },
        frontImgs.map(img => m('img.Sirv', {'data-src': img.src })))
  }
}

export default Home
