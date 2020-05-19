import Task from "data.task"
import { BackEnd } from "./.secrets.js"
import mdl from "../Models.js"

function onProgress(e) {
  if (e.lengthComputable) {
    mdl.state.loadingProgress.max = e.total
    mdl.state.loadingProgress.value = e.loaded
    m.redraw()
  }
}

function onLoad() {
  return false
}

function onLoadStart() {
  mdl.state.isLoading(true)
  return false
}

function onLoadEnd() {
  mdl.state.isLoading(false)
  mdl.state.loadingProgress.max = 0
  mdl.state.loadingProgress.value = 0
  return false
}

const xhrProgress = {
  config: (xhr) => {
    xhr.onprogress = onProgress
    xhr.onload = onLoad
    xhr.onloadstart = onLoadStart
    xhr.onloadend = onLoadEnd
  },
}

export const parseHttpError = (mdl) => (rej) => (e) => {
  mdl.state.isLoading(false)
  return rej(e.response)
}

export const parseHttpSuccess = (mdl) => (res) => (data) => {
  mdl.state.isLoading(false)
  return res(data)
}

const getUserToken = () =>
  window.sessionStorage.getItem("user-token")
    ? window.sessionStorage.getItem("user-token")
    : ""

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
        ...xhrProgress,
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

const nhtsaUrl = "http://localhost:3001/nhtsa/api/"
const nhtsa = {
  get: (mdl) => (url) => getTask(mdl)(nhtsaUrl + "/" + url),
}

const backEndUrl = `${BackEnd.baseUrl}/${BackEnd.APP_ID}/${BackEnd.API_KEY}/`
const backEnd = {
  getTask: (mdl) => (url) =>
    HttpTask(BackEnd.headers())("GET")(mdl)(backEndUrl + url)(null),
  postTask: (mdl) => (url) => (dto) =>
    HttpTask(BackEnd.headers())("POST")(mdl)(backEndUrl + url)(dto),
  putTask: (mdl) => (url) => (dto) =>
    HttpTask(BackEnd.headers())("PUT")(mdl)(backEndUrl + url)(dto),
}

const http = {
  backEnd,
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
