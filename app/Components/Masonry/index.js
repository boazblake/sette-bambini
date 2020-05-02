import Brick from "./brick"

const resizeGridItem = (dom) => (item) => {
  let grid = dom

  let rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
  )
  let rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
  )
  let rowSpan = Math.ceil(
    (item.querySelector(".content").getBoundingClientRect().height + rowGap) /
      (rowHeight + rowGap)
  )

  return (item.style.gridRowEnd = "span " + rowSpan)
}

const onResize = (dom) => Array.from(dom.children).map(resizeGridItem(dom))

const resizeAllGridItems = (dom) => {
  window.addEventListener("resize", (x) => onResize(dom))
  return onResize(dom)
}

const Masonry = () => {
  let _dom = null
  return {
    oncreate: ({ dom }) => {
      _dom = dom
      resizeAllGridItems(dom)
    },
    view: ({ attrs: { data } }) =>
      m(
        ".grid",
        data.map((brick) =>
          m(Brick, {
            classList: "item",
            data: brick,
            parent: _dom,
            redraw: resizeGridItem,
          })
        )
      ),
  }
}

export default Masonry
