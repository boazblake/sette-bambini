export const loginUserTask = (mdl) => ({ email, password }) =>
  mdl.http.backEnd.postTask(mdl)("users/login?loadRelations=Account")({
    login: email,
    password: password,
  })
