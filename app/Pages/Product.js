const Product = () => {
  return {
    oncreate: ({ dom }) => imagesLoaded(dom, (x) => m.redraw()),
    view: ({ attrs: { classList, size } }) =>
      m(
        ".product",
        {
          class: classList,
        },
        m(".content", [
          m("h3.title", "Title"),
          m(
            ".description",
            m("img", {
              src: `https://via.placeholder.com/${size}`,
            })
          ),
        ])
      ),
  }
}

export default Product
