const Swiper = () => {
  return {
    oncreate: ({ dom }) =>
      new Flickity(dom, {
        freeScroll: true,
        contain: true,
        contain: true,
        wrapAround: true,
        fullscreen: true,
        fade: true,
      }),
    view: ({ attrs: { mdl, data } }) =>
      m(".main-carousel", [
        data.map((src) => m(".carousel-cell", m("img", { src }))),
      ]),
  }
}

export default Swiper
