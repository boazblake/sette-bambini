import Product from "./Product"

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
  item.style.gridRowEnd = "span " + rowSpan
}

function resizeAllGridItems() {
  allItems = document.getElementsByClassName("item")
  for (x = 0; x < allItems.length; x++) {
    resizeGridItem(allItems[x])
  }
}

const Masonry = () => {
  return {
    oncreate: ({ dom }) => Array.from(dom.children).map(resizeGridItem(dom)),
    view: ({ attrs: { data } }) =>
      m(
        ".grid",
        {
          id: "grid",
          onresize: (x) => console.log("resize", x),
        },
        data.map((p) => m(Product, { classList: "item", size: p }))
      ),
  }
}

export default Masonry
