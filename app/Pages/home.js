import Task from "data.task"
import Masonry from "Components/Masonry"

const fetchBurpRagsTask = (mdl) =>
  Task.of([
    { imgSrc: 320, title: "", description: "" },
    { imgSrc: 250, title: "", description: "" },
    { imgSrc: 220, title: "", description: "" },
    { imgSrc: 200, title: "", description: "" },
    { imgSrc: 250, title: "", description: "" },
    { imgSrc: 320, title: "", description: "" },
    { imgSrc: 320, title: "", description: "" },
  ])

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
      m(".frow-container frow-center", { id: "home-page" }, [
        m(Masonry, { data: state.data }),
      ]),
  }
}

export default Home
