const Indicators = {
  view: ({ attrs: { ident, state }, children }) =>
    m(
      ".frow row-between",
      children.map((src, idx) =>
        m(
          ".clickable.carousel-indicator",
          {
            id: `${ident}-${idx}`,
            onclick: (e) => {
              state.prevIdx(state.currentIdx())
              state.currentIdx(idx)
              state.currentId(ident)
              state.currentEl(
                e.composedPath()[3].children[0].children[state.currentIdx()]
              )
            },
          },
          m("img.carousel-slide", {
            class: state.currentIdx() == idx ? "is-active" : "",
            src,
            id: `${ident}-${idx}`,
          })
        )
      )
    ),
}

const Carousel = () => {
  const state = {
    currentIdx: Stream(0),
    currentId: Stream(""),
    currentEl: Stream(null),
    prevIdx: Stream(0),
    indicators: Stream([]),
  }

  const distanceToNext = (dom) => {
    let res =
      state.currentIdx() - state.prevIdx() >= 0
        ? Array.from(dom.children)
            .slice(state.prevIdx(), state.currentIdx())
            .reduce((acc, c) => acc + c.clientWidth, 0)
        : ~Array.from(dom.children)
            .slice(state.currentIdx(), state.prevIdx())
            .reduce((acc, c) => acc + c.clientWidth, 0) + 1

    return res
  }

  let observer = new IntersectionObserver((entries, _) => {
    entries.forEach((entry) => {
      const { target } = entry
      const indicatorId = target.getAttribute("id")
      let indicator = state.indicators()[indicatorId]
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
    view: ({ children, attrs: { ident } }) =>
      m(
        ".carousel-container",
        {
          oncreate: ({ dom }) => {
            state.indicators(dom.children[1].children)
            state.currentEl(dom.children[0].children[state.currentIdx()])
            observer.observe(state.currentEl())
          },
        },
        m(
          ".carousel-wrapper.width-100",
          {
            id: ident,
            ontouch: ({ target }) => {
              state.currentIdx(
                Math.round(
                  (target.scrollLeft / target.scrollWidth) * children.length
                )
              )
            },
            onupdate: ({ dom }) => {
              state.currentEl(dom.children[state.currentIdx()])
              observer.observe(state.currentEl())
              if (dom.id == state.currentId())
                dom.scrollTo({
                  left: dom.scrollLeft + distanceToNext(dom),
                  behavior: "smooth",
                })
            },
          },
          children.map((src, idx) =>
            m("img.carousel-slide", { src, id: `${ident}-${idx}` })
          )
        ),
        m(Indicators, { ident, state }, children)
      ),
  }
}

export default Carousel
