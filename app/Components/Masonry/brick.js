const Brick = () => {
  let _dom = null
  return {
    view: ({ attrs: { classList, data, parent, redraw } }) =>
      m(
        ".brick",
        {
          class: classList,
        },
        m(".content", [
          data.title && m("h3.title", data.title),
          m(".description", [
            m("img", {
              onload: (x) => {
                // console.log("brick image onload", x, _dom)
                // m.redraw()
              },
              oncreate: ({ dom }) => {
                _dom = dom
                // console.log("brick image oncreate", dom)
                // console.log("brick image oncreate and complete", parent, dom)
                if (parent) {
                  redraw(parent)(dom)
                }
              },
              src: data.src, //`https://via.placeholder.com/${data.imgSrc}`,
            }),

            m("p", data.description),
          ]),
        ])
      ),
  }
}

export default Brick
