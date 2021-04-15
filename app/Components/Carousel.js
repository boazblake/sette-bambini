import { DotCircleLine } from "@mithril-icons/clarity"

const Indicators = {
  view: ({ attrs: { currentIdx }, children }) =>
    m(
      ".frow",
      children.map((_, idx) =>
        m(
          ".clickable.carousel-indicator",
          {
            class: () => {
              console.log(idx, currentIdx())
              return currentIdx() == idx ? "is-active" : ""
            },
            onclick: (e) => currentIdx(idx),
          },
          m(DotCircleLine)
        )
      )
    ),
}

const Carousel = () => {
  let currentIdx = Stream(0)
  let currentEl = Stream(null)
  let indicators = Stream([])

  let observer = new IntersectionObserver(
    (entries, _) => {
      entries.forEach((entry) => {
        const { target } = entry
        const indicatorId = target.getAttribute("id")
        let indicator = indicators()[indicatorId]
        if (entry.intersectionRatio >= 0.25) {
          target.classList.add("is-active")
          indicator.classList.add("is-active")
        } else {
          target.classList.remove("is-active")
          indicator.classList.remove("is-active")
        }
      })
    },
    {
      rootMargin: "0px",
      threshold: 0.25,
    }
  )

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
              currentEl().scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
              })
            },
          },
          children
        ),
        m(Indicators, { currentIdx }, children)
      ),
  }
}

export default Carousel
