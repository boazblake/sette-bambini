let currentIdx = Stream(0)
let currentEl = Stream(null)
let prevIdx = Stream(currentIdx())
let indicators = Stream([])

const distanceToNext = (dom) => {
  let res =
    currentIdx() - prevIdx() >= 0
      ? Array.from(dom.children)
          .slice(prevIdx(), currentIdx())
          .reduce((acc, c) => acc + c.clientWidth, 0)
      : ~Array.from(dom.children)
          .slice(currentIdx(), prevIdx())
          .reduce((acc, c) => acc + c.clientWidth, 0) + 1

  return res
}

let observer = new IntersectionObserver((entries, _) => {
  entries.forEach((entry) => {
    const { target } = entry
    const indicatorId = target.getAttribute("id")
    let indicator = indicators()[indicatorId]
    if (entry.intersectionRatio >= 0.25) {
      target.classList.add("is-active")
      indicator?.classList.add("is-active")
    } else {
      target.classList.remove("is-active")
      indicator?.classList.remove("is-active")
    }
  })
})

const Indicators = {
  view: ({ attrs: { currentIdx }, children }) =>
    m(
      ".frow row-between",
      children.map((src, idx) =>
        m(
          ".clickable.carousel-indicator",
          {
            onclick: (e) => {
              prevIdx(currentIdx())
              currentIdx(idx)
              currentEl(e.path[3].children[0].children[currentIdx()])
            },
          },
          m("img.carousel-slide", {
            class: currentIdx() == idx ? "is-active" : "",
            src,
            id: idx,
          })
        )
      )
    ),
}

const Carousel = () => {
  return {
    view: ({ children, attrs: { mdl } }) =>
      m(
        ".carousel-container",
        {
          oncreate: ({ dom }) => {
            indicators(dom.children[1].children)
            currentEl(dom.children[0].children[currentIdx()])
            observer.observe(currentEl())
          },
        },
        m(
          ".carousel-wrapper",
          {
            ontouch: ({ target }) => {
              currentIdx(
                Math.round(
                  (target.scrollLeft / target.scrollWidth) * children.length
                )
              )
            },
            onupdate: ({ dom }) => {
              currentEl(dom.children[currentIdx()])
              observer.observe(currentEl())
              dom.scrollTo({
                left: dom.scrollLeft + distanceToNext(dom),
                behavior: "smooth",
              })
            },
          },
          children.map((src, idx) => m("img.carousel-slide", { src, id: idx }))
        ),
        m(Indicators, { currentIdx }, children)
      ),
  }
}

export default Carousel
