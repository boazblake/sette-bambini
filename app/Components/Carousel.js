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
    coords: Stream({ x: null, y: null }),
  }

  const distanceToNext = (dom) =>
    state.currentIdx() - state.prevIdx() >= 0
      ? Array.from(dom.children)
          .slice(state.prevIdx(), state.currentIdx())
          .reduce((acc, c) => acc + c.clientWidth, 0)
      : ~Array.from(dom.children)
          .slice(state.currentIdx(), state.prevIdx())
          .reduce((acc, c) => acc + c.clientWidth, 0) + 1

  let intersectionObserver = new IntersectionObserver((entries, _) => {
    entries.forEach((entry) => {
      const { target } = entry
      // console.log("intersectionObserver", target)
      const indicatorId = target.getAttribute("id")
      let indicator = state.indicators()[indicatorId]
      if (entry.intersectionRatio >= 0.25) {
        // console.log(target, indicator)
        target.classList.add("is-active")
        indicator?.classList.add("is-active")
      } else {
        // console.log(target, indicator)
        target.classList.remove("is-active")
        indicator?.classList.remove("is-active")
      }
    })
  })

  let mutationObserver = new MutationObserver((entry) => {
    console.log(entry)
  })

  return {
    view: ({ children, attrs: { ident } }) =>
      m(
        ".carousel-container",
        {
          oncreate: ({ dom }) => {
            state.indicators(dom.children[1].children)
            state.currentEl(dom.children[0].children[state.currentIdx()])
            state.coords(dom.getBoundingClientRect())
            intersectionObserver.observe(dom)
            mutationObserver.observe(dom, {
              childList: true,
              subTree: true,
              characterDataOldValue: true, // pass old data to callback
            })
          },
        },
        m(
          ".carousel-wrapper.width-100",
          {
            id: ident,
            ontouchend: (e) => {
              e.preventDefault()

              state.prevIdx(state.currentIdx())
              setTimeout(() => {
                let el = document.elementFromPoint(
                  state.coords().x,
                  state.coords().y
                )
                let idx = parseInt(el.getAttribute("id").split("-")[1])
                state.currentIdx(idx)
                state.currentId(`${ident}-${idx}`)
                state.currentEl(el)
                m.redraw()
              }, 1000)
            },
            onupdate: ({ dom }) => {
              state.currentEl(dom.children[state.currentIdx()])
              intersectionObserver.observe(state.currentEl())
              if (dom.id == state.currentId())
                dom.scrollTo({
                  left: dom.scrollLeft + distanceToNext(dom),
                  behavior: "smooth",
                })
            },
          },
          children.map((src, idx) =>
            m("img.carousel-slide", {
              src,
              id: `${ident}-${idx}`,
            })
          )
        ),
        m(Indicators, { ident, state }, children)
      ),
  }
}

export default Carousel
