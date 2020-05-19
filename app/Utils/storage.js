import Task from "data.task"

const getLocalStorageTask = (key) =>
  new Task((rej, res) =>
    localStorage.getItem(key)
      ? rej("nothing here")
      : res(localStorage.getItem(key))
  )

const saveLocalStorageTask = (key) => (value) =>
  new Task((rej, res) => {
    localStorage.setItem(key, value)
    return res(localStorage.getItem(key))
  })

const saveDbStorageTask = (mdl) => (cart) =>
  mdl.http.backEnd.putTask(mdl)(`data/Accounts/${mdl.user.account.objectId}`)({
    cart,
  })

const getDbStorageTask = (mdl) =>
  mdl.http.backEnd.gettTask(mdl)(`data/Accounts/${mdl.account.objectId}`)

const saveToStorageTask = (mdl) => (key) => (value) => {
  return mdl.state.isAuth()
    ? saveLocalStorageTask(key)(value).chain(saveDbStorageTask(mdl))
    : saveLocalStorageTask(key)(value)
}

export {
  getLocalStorageTask,
  saveLocalStorageTask,
  saveDbStorageTask,
  getDbStorageTask,
  saveToStorageTask,
}
