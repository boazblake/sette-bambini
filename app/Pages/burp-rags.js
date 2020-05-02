import Task from "data.task"
import Masonry from "Components/Masonry"

const fetchBurpRagsTask = (mdl) =>
  Task.of(
    [...Array(10).keys()].map((k) => ({
      imgSrc: 250,
      title: "",
      description: "",
    }))
  )

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

const BurpRags = () => {
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
      m(".frow-container frow-center", [m(Masonry, { data: state.data })]),
  }
}

export default BurpRags
