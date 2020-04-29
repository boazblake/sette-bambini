import Stream from "mithril-stream"
import Routes from "./Routes/index.js"

const state = {
  showNavMenu: Stream(false),
  paginate: {
    page: Stream(1),
    total_pages: Stream(0),
    total_results: Stream(0),
  },
  query: Stream(""),
  isLoading: Stream(false),
  loadingProgress: {
    max: Stream(null),
    value: Stream(null),
  },
  dragging: {},
  isAuth: Stream(false),
}
const user = {}
const settings = {}
const data = {}
const errors = {}

const mockData = [
  m("img.product", {
    src: "https://via.placeholder.com/250",
  }),
  m("img.product", {
    src: "https://via.placeholder.com/250",
  }),
  m("img.product", {
    src: "https://via.placeholder.com/250",
  }),
  m("img.product", {
    src: "https://via.placeholder.com/250",
  }),
  m("img.product", {
    src: "https://via.placeholder.com/250",
  }),
  m("img.product", {
    src: "https://via.placeholder.com/250",
  }),
]

const Model = {
  mockData,
  Routes,
  state,
  user,
  data,
  errors,
  settings,
}
export default Model
