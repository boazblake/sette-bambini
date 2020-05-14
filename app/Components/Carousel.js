import { ArrowLine } from "@mithril-icons/clarity/cjs/index"

const show = (dir, idx, cid) => {
  let slideNum
  if (dir == "prev") {
    slideNum = idx == 0 ? 3 : idx - 1
  }

  if (dir == "next") {
    slideNum = idx == 3 ? 0 : idx + 1
  }

  console.log(dir, idx, `${cid}-slide-${slideNum}`)
  return `${cid}-slide-${slideNum}`
}

const Carousel = () => {
  return {
    onupdate: (o, n) => console.log(o, n),
    view: ({ attrs: { cid, data } }) =>
      m(".carousel", { role: "document" }, [
        data.map((item, idx) =>
          m("input.carousel-locator", {
            id: `${cid}-slide-${idx}`,
            type: "radio",
            name: "carousel-radio",
            hidden: true,
            checked: true,
          })
        ),
        m(
          ".carousel-container",
          data.map((item, idx) =>
            m("figure.carousel-item", [
              m(
                "label.item-next btn btn-action btn-lg",
                { for: show("next", idx, cid) },
                [m("i.icon icon-arrow-right", m(".point-right", m(ArrowLine)))]
              ),
              m("img.img-responsive rounded", { src: item }),
              m(
                "label.item-prev btn btn-action btn-lg",
                { for: show("prev", idx, cid) },
                [m("i.icon icon-arrow-left", m(".point-left", m(ArrowLine)))]
              ),
            ])
          )
        ),
        m(
          ".carousel-nav",
          data.map((item, idx) =>
            m("label.nav-item text-hide c-hand", {
              for: `${cid}-slide-${idx}`,
            })
          )
        ),
      ]),
  }
}

export default Carousel
