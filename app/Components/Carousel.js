const Carousel = () => {
  return {
    oncreate: ({ dom }) => Sirv.viewer.getInstance(dom),
    view: ({ attrs: { mdl, data } }) => {
      return m(
        ".Sirv",
        data.map((img) => {
          mdl.addToCart.id(img.src)
          return m("", { "data-type": "zoom", "data-src": img })
        })
      )
    },
  }
}

export default Carousel
