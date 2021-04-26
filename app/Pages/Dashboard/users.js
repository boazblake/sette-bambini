import { prop, filter } from "ramda"
import { log } from "Utils"

export const Users = () => {
  const state = {
    users: [],
    errors: null,
  }

  const getUsers = ({ attrs: { mdl } }) =>
    mdl.http.back4App
      .getTask(mdl)("Users")
      .map(prop("results"))
      .map(filter(prop("name")))
      .fork(log("error"), (u) => (state.users = u))

  const updateUserAdminLevel = (mdl) => (user) => {
    log("user")(user)
    mdl.http.back4App
      .putTask(mdl)(`Users/${user.objectId}`)({ isAdmin: user.isAdmin })
      .fork(log("error"), log("succes"))
  }

  return {
    oninit: getUsers,
    view: ({ attrs: { mdl } }) =>
      m("section", [
        m("h3", "Users"),
        m(
          "ul",
          state.users.map((user) =>
            m(
              ".frow input",
              m("label", user.name),
              m("input", {
                type: "checkbox",
                checked: user.isAdmin,
                onclick: () => {
                  user.isAdmin = !user.isAdmin
                  updateUserAdminLevel(mdl)(user)
                },
              })
            )
          )
        ),
      ]),
  }
}
