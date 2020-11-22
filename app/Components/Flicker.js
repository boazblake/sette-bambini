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
        data.map((img) => {
          console.log(img)
          mdl.addToCart.id(img.src)
          return m(".carousel-cell", m("img", img))
        }),
      ])
    },
  }
}

export default Flicker
