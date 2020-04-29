import Task from "data.task"
import MasonBoard from "./mason-board.js"

const fetchBurpRagsTask = (mdl) => Task.of([250, 350, 450, 250, 350, 450])

const onPageInit = (state) => ({ attrs: { mdl } }) => {
  const onError = (s) => (error) => {
    s.errors.init = error
    console.log("errror", error)
  }

  const onSuccess = (s) => (data) => {
    s.data = data
  }

  fetchBurpRagsTask(mdl).fork(onError(state), onSuccess(state))
}

const Home = () => {
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
      m(".container", { id: "home-page" }, [
        m("h1.title", mdl.state.route.name),

        m(MasonBoard, { data: state.data }),
      ]),
  }
}

export default Home
