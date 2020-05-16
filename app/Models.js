import Routes from "./Routes/index.js"
import { Data } from "./mock-data"
import http from "./Utils/http"

const state = {
  showAuthModal: Stream(false),
  showNavModal: Stream(false),
  showCartModal: Stream(false),
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
  navSelected: Stream(""),
}
const user = {}
const settings = {}
const data = {}
const errors = {}
const cart = {
  wraps: { m: 0, f: 0, u: 0 },
  christs: { m: 0, f: 0, u: 0 },
  burps: { m: 0, f: 0, u: 0 },
}

const Model = {
  http,
  Data,
  Routes,
  state,
  user,
  cart,
  data,
  errors,
  settings,
  toggleAuthModal: (mdl) => mdl.state.showAuthModal(!mdl.state.showAuthModal()),
}
export default Model
