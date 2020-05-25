import Routes from "./Routes/index.js"
import { Data } from "./mock-data"
import { jsonCopy } from "Utils"
import http from "./Utils/http"

const currencies = { $: "US Dollar", "£": "British Pound" }

const state = {
  currency: Stream("$"),
  prices: {
    Wraps: 35,
    "Christening Blankets": 55,
    "Burp Rags": 15,
  },
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

const addToCart = {
  id: Stream(null),
  show: Stream(null),
}

const Model = {
  currencies,
  addToCart,
  http,
  Data,
  Routes,
  state,
  user,
  cart: {
    Wraps: { Male: 0, Female: 0, Unisex: 0 },
    "Christening Blankets": { Male: 0, Female: 0, Unisex: 0 },
    "Burp Rags": { Male: 0, Female: 0, Unisex: 0 },
  },
  data,
  errors,
  settings,
  toggleAuthModal: (mdl) => mdl.state.showAuthModal(!mdl.state.showAuthModal()),
  toggleCurrencies: (mdl) => (currency) => mdl.state.currency(currency),
}

export default Model
