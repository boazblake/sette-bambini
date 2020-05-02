import { jsonCopy } from "Utils"
import { validateLoginTask } from "./Validations.js"

const loginUser = (mdl) => ({ email, password }) =>
  mdl.http.backEnd.postTask(mdl)("users/login")({
    login: email,
    password: password,
  })

const validateForm = (mdl) => (data) => {
  const onError = (errs) => {
    state.errors = errs
    console.log("failed - state", state)
  }

  const onSuccess = (data) => {
    state.errors = {}
    console.log("login s", data)
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
}

const resetState = () => {
  state.data = jsonCopy(dataModel)
  state.errors = {}
  state.httpError = undefined
  state.isSubmitted = false
}

export const Login = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".frow centered", [
        m("h1.title", mdl.state.route.name),
        m(
          "form.auth-form frow centered",
          {
            role: "form",
            id: "Login-form",
            onsubmit: (e) => e.preventDefault(),
          },
          [
            m(
              ".form-group",
              state.isSubmitted && {
                class: state.errors.email ? "has-error" : "has-success",
              },
              [
                m("label.bold", { for: "reg-email" }, "Email"),
                m("input.form-input", {
                  id: "reg-email",
                  type: "email",
                  placeholder: "Email",
                  onkeyup: (e) => {
                    state.data.userModel.email = e.target.value
                    console.log(state.data)
                  },
                  value: state.data.userModel.email,
                }),
                state.errors.email &&
                  m("p.form-input-hint", state.errors.email),
              ]
            ),
            m(
              ".form-group",
              state.isSubmitted && {
                class: state.errors.password ? "has-error" : "has-success",
              },
              [
                m("label.bold", { for: "reg-pass" }, "Password"),
                m("input.form-input", {
                  id: "reg-pass",
                  type: "password",
                  placeholder: "must contain and not contain",
                  onkeyup: (e) =>
                    (state.data.userModel.password = e.target.value),
                  value: state.data.userModel.password,
                }),
                state.errors.password &&
                  m("p.form-input-hint", state.errors.password),
              ]
            ),
            state.httpError && m(".toast toast-error", state.httpError),
          ],
          m(
            "input",
            {
              type: "submit",
              form: `login-form`,
              onclick: () => validateForm(mdl)(state.data),
              class: mdl.state.isLoading() && "loading",
            },
            "Login"
          )
        ),
      ]),
  }
}

export default Login
