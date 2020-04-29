const Default = (mdl) => {
  return {
    view: ({ attrs: { mdl } }) => m(".empty", m("h1", mdl.state.route.name)),
  }
}

export default Default
