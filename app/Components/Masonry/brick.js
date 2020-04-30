const Brick = () => {
  return {
    view: ({ attrs: { classList, data } }) =>
      m(
        ".brick",
        {
          class: classList,
        },
        m(".content", [
          m("h3.title", data.title),
          m(".description", [
            m("img", {
              onload: (x) => m.redraw(),
              oncreate: ({ dom }) => {
                dom.complete && m.redraw()
              },
              src: `https://via.placeholder.com/${data.imgSrc}`,
            }),

            m("p", data.description),
          ]),
        ])
      ),
  }
}

export default Brick
