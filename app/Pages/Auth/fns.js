import { saveStorageTask, log } from "Utils"
import { mergeDeepWith, add } from "ramda"

const mergeCarts = (accnt) => (cart) => mergeDeepWith(add, cart, accnt)

const toAccountVM = (mdl) => (accnts) => {
  let cart = mergeCarts(JSON.parse(accnts[0].cart))(mdl.cart)
  mdl.user.account = { objectId: accnts[0].objectId, cart }
  mdl.user.address = JSON.parse(accnts[0].address)
  mdl.cart = cart
  setUserToken(mdl)(mdl.user)
  return cart
}

const setUserToken = (mdl) => (user) => {
  sessionStorage.setItem("sb-user", JSON.stringify(user))
  sessionStorage.setItem("sb-user-token", user["user-token"])
  mdl.state.isAuth(true)
  mdl.user = user
  return user
}

export const loginUserTask = (mdl) => ({ email, password }) =>
  mdl.http.backEnd
    .postTask(mdl)("users/login")({
      login: email,
      password: btoa(password),
    })
    .map(setUserToken(mdl))

const getUserAccountTask = (mdl) => (_) =>
  mdl.http.backEnd
    .getTask(mdl)(`data/Accounts?where=userId%3D'${mdl.user.objectId}'`)
    .map(toAccountVM(mdl))

export const loginTask = (mdl) => ({ email, password }) =>
  loginUserTask(mdl)({ email, password })
    .chain(getUserAccountTask(mdl))
    .chain(saveStorageTask(mdl)("sb-cart"))

export const registerUserTask = (mdl) => ({ name, email, password, isAdmin }) =>
  mdl.http.back4App
    .postTask(mdl)("users")({
      name,
      email,
      password: btoa(password),
      isAdmin,
    })
    .map(log("regiser user"))

export const createAccountTask = (mdl) =>
  mdl.http.backEnd.postTask(mdl)("data/Accounts")({
    cart: JSON.stringify(mdl.cart),
    userId: mdl.user.objectId,
  })

export const linkAccountTask = (mdl) =>
  mdl.http.backEnd.postTask(mdl)(
    `data/Users/${mdl.user.objectId}/account%3AAccounts%3A1`
  )([mdl.user.account.objectId])
