import Task from "data.task"
import Product from "./Product"

const fetchBlanketsTask = (mdl) =>
  Task.of([...Array(10).keys()].map((k) => 250))

const onPageInit = (state) => ({ attrs: { mdl } }) => {
  const onError = (s) => (error) => {
    s.errors.init = error
    console.log("errror", error)
  }

  const onSuccess = (s) => (data) => {
    s.data = data
  }

  fetchBlanketsTask(mdl).fork(onError(state), onSuccess(state))
}

const Blankets = () => {
  const state = {
    errors: {},
    data: [],
  }

  return {
    oninit: onPageInit(state),
    onremove: () => {
      state.errors = {}
      state.data = []
    },
    view: ({ attrs: { mdl } }) =>
      m(".container", [
        m("h1.title", mdl.state.route.name),
        m(
          ".products",
          state.data.map((p) => m(Product, { classList: "", size: p }))
        ),
      ]),
  }
}

export default Blankets
