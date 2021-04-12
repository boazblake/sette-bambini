const Faq = (mdl) => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".frow-container frow-center",

        `The blankets are crocheted using wool yarn by Valerie in Whitney, Texas. The burp cloths are machine sewn and top stitched by Margaret in Houston. Once the items are ready, they are matched together for color, design and visual appeal by the creators.`,
        m("p.bold", "Typical questions asked about products:"),
        m(
          "ul",
          m("li", " Is the item durable?"),
          m("li", "Is this item easy to use? "),
          m(
            "li",
            "Is this item easy to use? What are the dimensions of this item?"
          )
        )
      ),
  }
}

export default Faq
