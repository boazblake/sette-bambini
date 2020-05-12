import { jsonCopy } from "Utils"
import { validateLoginTask } from "./Validations.js"
import NavLink from "Components/nav-link"

const loginUser = (mdl) => ({ email, password }) =>
  mdl.http.backEnd.postTask(mdl)("users/login")({
    login: email,
    password: password,
  })

const validateForm = (mdl) => (data) => {
  const onError = (errs) => {
    state.errors = errs
    state.errorMsg(errs.message)
    state.showErrorMsg(true)
    console.log("failed - state", state)
  }

  const onSuccess = (data) => {
    state.errors = {}
    console.log("login s", data)
    mdl.state.isAuth(true)
    mdl.user = data
    m.route.set(`/account/${mdl.user.name}`)
  }

  state.isSubmitted = true

  validateLoginTask(data.userModel)
    .chain(loginUser(mdl))
    .fork(onError, onSuccess)
}

const userModel = {
  name: "",
  email: "",
  password: "",
  confirmEmail: "",
  confirmPassword: "",
  isAdmin: false,
}

const dataModel = { userModel }

const state = {
  isSubmitted: false,
  errors: {},
  httpError: undefined,
  data: jsonCopy(dataModel),
  showErrorMsg: Stream(false),
  errorMsg: Stream(""),
}

const resetState = () => {
  state.data = jsonCopy(dataModel)
  state.errors = {}
  state.httpError = undefined
  state.isSubmitted = false
  state.showErrorMsg(false)
  state.errorMsg("")
}

export const Login = () => {
  return {
    onremove: () => resetState(),
    view: ({ attrs: { mdl } }) =>
      m(
        ".frow centered pt-30",
        [
          state.showErrorMsg() && m("code.warning", state.errorMsg()),
          m(
            "form.frow-container frow-center",
            {
              role: "form",
              id: "Login-form",
              onsubmit: (e) => e.preventDefault(),
            },
            [
              m("input.form-input", {
                class: state.isSubmitted
                  ? state.errors.email
                    ? "has-error"
                    : "has-success"
                  : "",
                id: "reg-email",
                type: "email",
                placeholder: "Email",
                onkeyup: (e) => {
                  // state.isSubmitted && validateForm(mdl)(state.data)
                  state.data.userModel.email = e.target.value
                },
                value: state.data.userModel.email,
              }),
              state.errors.email && m("p.form-input-hint", state.errors.email),

              m("input.form-input", {
                class: state.isSubmitted
                  ? state.errors.password
                    ? "has-error"
                    : "has-success"
                  : "",
                id: "reg-pass",
                type: "password",
                placeholder: "Password",
                onkeyup: (e) => {
                  // state.isSubmitted && validateForm(mdl)(state.data)
                  state.data.userModel.password = e.target.value
                },
                value: state.data.userModel.password,
              }),
              state.errors.password &&
                m("p.form-input-hint", state.errors.password),
            ]
          ),
          state.httpError && m(".toast toast-error", state.httpError),
        ],
        m(
          "a.button.auth-btn",
          {
            // type: "submit",
            form: `login-form`,
            onclick: () => validateForm(mdl)(state.data),
            class: mdl.state.isLoading() && "loading",
          },
          "Login"
        ),
        m(".auth-link", [
          "Need to ",
          m(NavLink, {
            mdl,
            href: "/register",
            link: "register",
            classList: "bold",
          }),
          " ?",
        ])
      ),
  }
}

export default Login
