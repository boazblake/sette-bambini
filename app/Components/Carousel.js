import { DotCircleLine } from "@mithril-icons/clarity"

const Indicators = {
  view: ({ attrs: { currentIdx }, children }) =>
    m(
      ".frow row-between",
      children.map((src, idx) =>
        m(
          ".clickable.carousel-indicator",
          {
            onclick: (e) => currentIdx(idx),
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
  let currentIdx = Stream(0)
  let currentEl = Stream(null)
  let indicators = Stream([])

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
              console.log(currentEl())
              observer.observe(currentEl())
              currentEl().scrollTo({
                top: 0,
                get behavior() {
                  return "smooth"
                },
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
