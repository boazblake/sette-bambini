import Task from "data.task"

const getLocalStorageTask = (key) =>
  new Task((rej, res) =>
    localStorage.getItem(key)
      ? rej("nothing here")
      : res(localStorage.getItem(key))
  )

export { getLocalStorageTask }
