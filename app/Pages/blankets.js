import Task from "data.task"
import Masonry from "Components/Masonry"

const fetchBlanketsTask = (mdl) =>
  Task.of(
    [...Array(3).keys()].map((k) => ({
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

  console.log(mdl.Data)

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
      m(".frow-container frow-center", [
        // m(Masonry, { data: state.data })

        m("", { id: "christening" }, [
          m("h2", "Christening Blankets"),
          m(".frow row-around", [
            m("img.product.pb-10", {
              src: "https://via.placeholder.com/250",
            }),
          ]),
        ]),
        m("", { id: "wraps" }, [
          m("h2", "Wraps"),
          m(".frow row-around", [
            m("img.product.pb-10", {
              src: "https://via.placeholder.com/250",
            }),
          ]),
        ]),
      ]),
  }
}

export default Blankets
