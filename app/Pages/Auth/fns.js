import { log } from "Utils/index"
import { saveStorageTask } from "Utils/storage"
import { mergeDeepWith, add } from "ramda"

const mergeCarts = (accnt) => (cart) => mergeDeepWith(add, cart, accnt)

const toAccountVM = (mdl) => (accnts) => {
  let cart = mergeCarts(JSON.parse(accnts[0].cart))(mdl.cart)
  mdl.user.account = { objectId: accnts[0].objectId, cart }
  mdl.cart = cart
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
      password: password,
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
  mdl.http.backEnd.postTask(mdl)("users/register")({
    name,
    email,
    password,
    isAdmin,
  })

export const createAccountTask = (mdl) =>
  mdl.http.backEnd.postTask(mdl)("data/Accounts")({
    cart: JSON.stringify(mdl.cart),
    userId: mdl.user.objectId,
  })

export const linkAccountTask = (mdl) =>
  mdl.http.backEnd.postTask(mdl)(
    `data/Users/${mdl.user.objectId}/account%3AAccounts%3A1`
  )([mdl.user.account.objectId])
