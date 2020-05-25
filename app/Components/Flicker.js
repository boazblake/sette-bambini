import Flickity from "flickity"

const Flicker = () => {
  return {
    oncreate: ({ dom }) =>
      new Flickity(dom, {
        freeScroll: true,
        contain: true,
        wrapAround: true,
      }),
    view: ({ attrs: { mdl, data } }) => {
      return m(".main-carousel.animated", [
        data.map((src) => {
          mdl.addToCart.id(src)
          return m(".carousel-cell", m("img", { src }))
        }),
      ])
    },
  }
}

export default Flicker
