import Task from "data.task"
import { BackEndLess, Paypal, Back4App } from "../../.secrets.js"

const updatePayPalAuth = (mdl) => (paypal) => (mdl.state.paypal = paypal)

const onProgress = (mdl) => (e) => {
  if (e.lengthComputable) {
    mdl.state.loadingProgress.max = e.total
    mdl.state.loadingProgress.value = e.loaded
    m.redraw()
  }
}

function onLoad() {
  return false
}

const onLoadStart = (mdl) => (e) => {
  mdl.state.isLoading(true)
  return false
}

const onLoadEnd = (mdl) => (e) => {
  mdl.state.isLoading(false)
  mdl.state.loadingProgress.max = 0
  mdl.state.loadingProgress.value = 0
  return false
}

const xhrProgress = (mdl) => ({
  config: (xhr) => {
    xhr.onprogress = onProgress(mdl)
    xhr.onload = onLoad
    xhr.onloadstart = onLoadStart(mdl)
    xhr.onloadend = onLoadEnd(mdl)
  },
})

export const parseHttpError = (mdl) => (rej) => (e) => {
  mdl.state.isLoading(false)
  return rej(e.response)
}

export const parseHttpSuccess = (mdl) => (res) => (data) => {
  mdl.state.isLoading(false)
  return res(data)
}

// const getUserToken = () =>
//   window.sessionStorage.getItem("user-token")
//     ? window.sessionStorage.getItem("user-token")
//     : ""

const HttpTask = (_headers) => (method) => (mdl) => (url) => (body) => {
  mdl.state.isLoading(true)
  return new Task((rej, res) =>
    m
      .request({
        method,
        url,
        headers: {
          "content-type": "application/json",
          ..._headers,
        },
        body,
        withCredentials: false,
        ...xhrProgress(mdl),
      })
      .then(parseHttpSuccess(mdl)(res), parseHttpError(mdl)(rej))
  )
}

const lookupLocationTask = (query) => {
  return new Task((rej, res) =>
    m
      .request({
        method: "GET",
        url: `https://nominatim.openstreetmap.org/search?q=${query}&format=json`,
      })
      .then(res, rej)
  )
}

const getTask = (mdl) => (url) => HttpTask({})("GET")(mdl)(url)(null)

const backEndLessUrl = `${BackEndLess.baseUrl}/${BackEndLess.APP_ID}/${BackEndLess.API_KEY}/`
const backEnd = {
  unregistered: BackEndLess.unregistered,
  getTask: (mdl) => (url) =>
    HttpTask(BackEndLess.headers())("GET")(mdl)(backEndLessUrl + url)(null),
  postTask: (mdl) => (url) => (dto) =>
    HttpTask(BackEndLess.headers())("POST")(mdl)(backEndLessUrl + url)(dto),
  putTask: (mdl) => (url) => (dto) =>
    HttpTask(BackEndLess.headers())("PUT")(mdl)(backEndLessUrl + url)(dto),
}

const paypalUrl = `${Paypal.sandbox.baseUrl}/`

const paypal = {
  getTokenTask: (mdl) =>
    HttpTask(Paypal.sandbox.headers())("POST")(mdl)(
      paypalUrl + "v1/oauth2/token/"
    )(`grant_type=client_credentials`).map(updatePayPalAuth(mdl)),
  getTask: (mdl) => (url) =>
    HttpTask(Paypal.sandbox.headers(mdl))("GET")(mdl)(paypalUrl + url)(null),
  postTask: (mdl) => (url) => (dto) =>
    HttpTask(Paypal.sandbox.headers(mdl))("POST")(mdl)(paypalUrl + url)(dto),
  putTask: (mdl) => (url) => (dto) =>
    HttpTask(Paypal.sandbox.headers(mdl))("PUT")(mdl)(paypalUrl + url)(dto),
}

const store = {
  baseurl: "https://sette-bambini.herokuapp.com/",
  getTask: (mdl) => (url) => HttpTask()("GET")(mdl)(store.baseurl + url)(null),
  postTask: (mdl) => (url) => (dto) =>
    HttpTask()("POST")(mdl)(store.baseurl + url)(dto),
  putTask: (mdl) => (url) => (dto) =>
    HttpTask()("PUT")(mdl)(store.baseurl + url)(dto),
}

const back4App = {
  getTask: (mdl) => (url) =>
    HttpTask(Back4App.headers())("GET")(mdl)(`${Back4App.baseUrl}/${url}`)(
      null
    ),
  postTask: (mdl) => (url) => (dto) =>
    HttpTask(Back4App.headers())("POST")(mdl)(`${Back4App.baseUrl}/${url}`)(
      dto
    ),
  putTask: (mdl) => (url) => (dto) =>
    HttpTask(Back4App.headers())("PUT")(mdl)(`${Back4App.baseUrl}/${url}`)(dto),
}

const http = {
  store,
  backEnd,
  back4App,
  paypal,
  HttpTask,
  getTask,
  lookupLocationTask,
}

export default http

// const makeQuery = (string) => JSON.parse(JSON.stringify(string))

// const parseQLResponse = (mdl) => ({ data, errors }) => {
//   mdl.state.isLoading(false)
//   return errors ? Promise.reject(errors) : Promise.resolve(data)
// }

// const postQl = (mdl) => (query) => {
//   mdl.state.isLoading(true)
//   return new Task((rej, res) =>
//     m
//       .request({
//         method: 'POST',
//         // url: graphQl,
//         withCredentials: false,
//         ...xhrProgress,
//         data: makeQuery(query),
//         headers: {
//           Authorization: `Bearer ${mdl.state.token}`,
//           'cache-control': 'no-cache',
//           'x-apikey': '64fecd3f0cbb54d46d7f7260b86b8ad45d31b',
//           'content-type': 'application/json',
//         },
//       })
//       .then(parseQLResponse(mdl))
//       .then(parseHttpSuccess(mdl)(res), parseHttpError(mdl)(rej))
//   )
// }

// const postTask = (mdl) => (url) => ({ dto }) => {
//   mdl.state.isLoading(true)
//   return new Task((rej, res) =>
//     m
//       .request({
//         method: 'POST',
//         url: `${url}`,
//         body: dto,
//         headers: { 'user-token': getUserToken() },
//         withCredentials: false,
//         ...xhrProgress,
//       })
//       .then(parseHttpSuccess(mdl)(res), parseHttpError(mdl)(rej))
//   )
// }

// const putTask = (mdl) => (url) => ({ dto }) => {
//   mdl.state.isLoading(true)
//   return new Task((rej, res) =>
//     m
//       .request({
//         method: 'PUT',
//         url: `${url}`,
//         body: dto,
//         headers: { 'user-token': getUserToken() },
//         withCredentials: false,
//         ...xhrProgress,
//       })
//       .then(parseHttpSuccess(mdl)(res), parseHttpError(mdl)(rej))
//   )
// }

// const getTask = (mdl) => (url) => {
//   mdl.state.isLoading(true)
//   return new Task((rej, res) =>
//     m
//       .request({
//         method: 'GET',
//         url: `${url}`,
//         headers: { 'user-token': getUserToken() },
//         withCredentials: false,
//         ...xhrProgress,
//       })
//       .then(parseHttpSuccess(mdl)(res), parseHttpError(mdl)(rej))
//   )
// }

// const deleteTask = (mdl) => (url) => (id) => {
//   mdl.state.isLoading(true)
//   return new Task((rej, res) =>
//     m
//       .request({
//         method: 'DELETE',
//         url: `${url}/${id}`,
//         headers: { 'user-token': getUserToken() },
//         withCredentials: false,
//         ...xhrProgress,
//       })
//       .then(parseHttpSuccess(mdl)(res), parseHttpError(mdl)(rej))
//   )
// }
