const Carousel = () => {
  return {
    oncreate: ({ dom }) =>
      new Swiper(dom, {
        loop: true,
        init: true,
        updateOnWindowResize: true,
        simulateTouch: true,
      }),
    view: () =>
      m("div", { class: "swiper-container" }, [
        m("div", { class: "swiper-wrapper" }, [
          m("div", { class: "swiper-slide" }, [
            m("img", { src: `https://loremflickr.com/500/900` }),
            m("img", { src: `https://loremflickr.com/500/900` }),
            m("img", { src: `https://loremflickr.com/500/900` }),
            m("img", { src: `https://loremflickr.com/500/900` }),
          ]),
        ]),
        m("div", { class: "swiper-pagination" }),
        m("div", { class: "swiper-button-prev" }),
        m("div", { class: "swiper-button-next" }),
        m("div", { class: "swiper-scrollbar" }),
      ]),
  }
}
export default Carousel
