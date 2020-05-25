const Account = (mdl) => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".frow-container frow-center", [
        m("h2", "Welcome ", mdl.user.name),

        m("section", [m("h3", "Past Orders")]),
        m("section", []),
        m("section"),
        m("section"),
      ]),
  }
}

export default Account
