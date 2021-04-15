const getRatio = (dom) => {} //dom.style.naturalWidth / dom.style.naturalHeight / 100

const Image = () => {
  let _dom
  return {
    oncreate: ({ dom }) => {
      console.log(dom, dom.style.naturalWidth / dom.style.naturalHeight / 100)
      _dom = dom
    },
    view: ({ attrs: { src } }) =>
      m("img", {
        src,
        style: { aspectRatio: getRatio() },
      }),
  }
}

const Grid = () => {
  return {
    view: ({ children }) =>
      m(
        ".mason-grid",
        children.map((src) => m(Image, { src }))
      ),
  }
}

export default Grid
