const BurpRags = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".container", [
        m("h1", mdl.state.route.name),
        m(".products", mdl.mockData),
      ]),
  }
}

export default BurpRags
