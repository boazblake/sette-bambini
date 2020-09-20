import Task from "data.task"
import Masonry from "Components/Masonry/index"

const fetchBurpRagsTask = (mdl) =>
  Task.of([
    { imgSrc: "images/1.jpeg", title: "", description: "" },
    { imgSrc: "images/2.jpeg", title: "", description: "" },
    { imgSrc: "images/3.jpeg", title: "", description: "" },
    { imgSrc: "images/4.jpeg", title: "", description: "" },
    { imgSrc: "images/5.jpeg", title: "", description: "" },
    { imgSrc: "images/6.jpeg", title: "", description: "" },
    { imgSrc: "images/7.jpeg", title: "", description: "" },
  ])

const onPageInit = (state) => ({ attrs: { mdl } }) => {
  const onError = (s) => (error) => {
    s.errors.init = error
    console.log("errror", error)
  }

  const onSuccess = (s) => (data) => {
    s.images = data
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
      state.images = []
    },
    view: ({ attrs: { mdl } }) =>
      m(".frow-center", { id: "home-page" }, [
        m(Masonry, { data: state.images }),
      ]),
  }
}

export default Home
