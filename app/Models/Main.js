import Routes from "../Routes/index.js"
import { Data } from "./mock-data"
import { jsonCopy } from "Utils"
import http from "Utils/http"
import { newCart } from "./cart"

const currencies = { $: "US Dollar", "£": "British Pound" }

const state = {
  prices: {
    Wraps: 60,
    Blankets: 100,
    Burpies: 60,
    Collections: 85,
  },
  showUserModal: Stream(false),
  showPriceModal: Stream(false),
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

const dash = {
  state: {
    show: "prices",
  },
}

const Model = {
  dash,
  currencies,
  addToCart,
  http,
  Data,
  Routes,
  state,
  user,
  cart: jsonCopy(newCart),
  data,
  errors,
  settings,
  paypal: {},
  toggleUserModal: (mdl) => mdl.state.showUserModal(!mdl.state.showUserModal()),
  togglePriceModal: (mdl) =>
    mdl.state.showPriceModal(!mdl.state.showPriceModal()),
  toggleAuthModal: (mdl) => mdl.state.showAuthModal(!mdl.state.showAuthModal()),
  toggleCurrencies: (mdl) => (currency) => mdl.state.currency(currency),
}

export default Model
