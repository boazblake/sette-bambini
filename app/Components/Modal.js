import { SlideInLeft, SlideOutRight } from "Styles/animations"
const Modal = {
  oncreate: SlideInLeft,
  onbeforeremove: SlideOutRight,
  view: ({ attrs: { classList, isActive, close, title, content, footer } }) => {
    console.log("MODAL", classList, isActive, close, title, content, footer)
    return m(
      `section.modal.${classList}`,
      { class: isActive ? "active" : "", id: "modal" },
      [
        m("a.modal-overlay", {
          "aria-label": "Close",
          onclick: () => close(),
        }),
        m(".modal-container", { role: "document" }, [
          m(".modal-header", [
            m("a.btn btn-clear float-right", {
              id: "modal-close",
              "aria-label": "Close",
              onclick: () => close(),
            }),
            m(".modal-title h3", title),
          ]),
          m(".modal-body", m(".content", content)),
          m(".modal-footer", footer),
        ]),
      ]
    )
  },
}

export default Modal
