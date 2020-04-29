import Routes from "./Routes/index.js"
import Data from "./mock-data"
import http from "./Utils/http"

const state = {
  showAuthModal: Stream(false),
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

const Model = {
  http,
  Data,
  Routes,
  state,
  user,
  data,
  errors,
  settings,
  toggleAuthModal: (mdl) => mdl.state.showAuthModal(!mdl.state.showAuthModal()),
}
export default Model
