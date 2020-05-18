import App from "./app.js"
import Model from "./Models.js"
import { isEmpty } from "ramda"
import { FP } from "FP"
FP.configure()

const root = document.body
let winW = window.innerWidth

if (module.hot) {
  module.hot.accept()
}

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!")
} else {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((registration) => {
          console.log("⚙️ SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("🧟 SW registration failed: ", registrationError)
        })
    })
  }
}

// set display profiles
const getProfile = (w) => {
  if (w < 668) return "phone"
  if (w < 920) return "tablet"
  return "desktop"
}

const checkWidth = (winW) => {
  const w = window.innerWidth
  if (winW !== w) {
    winW = w
    var lastProfile = Model.settings.screenSize
    Model.settings.screenSize = getProfile(w)
    if (lastProfile != Model.settings.screenSize) m.redraw()
  }
  return requestAnimationFrame(checkWidth)
}

Model.settings.screenSize = getProfile(winW)

checkWidth(winW)

if (localStorage.getItem("sb-user")) {
  Model.user = JSON.parse(localStorage.getItem("sb-user"))
  Model.state.isAuth(true)
  //fetch cart from db? do i really??
} else if (localStorage.getItem("sb-cart")) {
  Model.cart = JSON.parse(localStorage.getItem("sb-cart"))
}

m.route(root, "/", App(Model))
