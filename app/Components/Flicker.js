import Flickity from "flickity"

const Flicker = () => {
  return {
    oncreate: ({ dom }) =>
      new Flickity(dom, {
        freeScroll: true,
        contain: true,
        wrapAround: true,
      }),
    view: ({ attrs: { mdl, data } }) =>
      m(".main-carousel", [
        data.map((src) => m(".carousel-cell", m("img", { src }))),
      ]),
  }
}

export default Flicker
