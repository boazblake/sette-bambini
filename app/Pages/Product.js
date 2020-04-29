const Product = () => {
  return {
    view: ({ attrs: { classList, size } }) =>
      m(
        ".product",
        {
          class: classList,
        },
        m(".content", [
          m("img", {
            src: `https://via.placeholder.com/${size}`,
          }),
        ])
      ),
  }
}

export default Product
