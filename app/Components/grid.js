import cssSlidy from "Utils/slider"

const Fig = {
  view: ({ children, attrs: { id } }) => m(`figure#${id}-slidy`, children),
}

const Grid = {
  oncreate: ({ dom, attrs: { id } }) =>
    cssSlidy({ slidyContainerSelector: dom, slidySelector: `#${id}-slidy` }),
  view: ({ children, attrs: { id, maxheight, height, overflow } }) =>
    m(
      `#${id}`,
      { style: { overflow, maxHeight: maxheight, height } },
      m(Fig, { id }, children)
    ),
}

export default Grid
