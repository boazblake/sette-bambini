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
          m("h3.title", data.title),
          m(".description", [
            m("img", {
              onload: (x) => {
                console.log("brick image onload", x, _dom)
                // m.redraw()
              },
              oncreate: ({ dom }) => {
                _dom = dom
                console.log("brick image oncreate", dom)
                console.log("brick image oncreate and complete", parent, dom)
                redraw(parent)(dom)
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
