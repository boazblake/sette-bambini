const Account = (mdl) => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".frow-container frow-center", [m("h2", "Welcome ", mdl.user.name)]),
  }
}

export default Account
