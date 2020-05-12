import { validateUserRegistrationTask } from "./Validations"
import NavLink from "Components/nav-link"
import { jsonCopy } from "Utils"

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

export const validateForm = (mdl) => (data) => {
  const onError = (errs) => {
    state.errors = errs
    state.errorMsg(errs.message)
    state.showErrorMsg(true)
    console.log("failed - state", state)
  }

  const onSuccess = (data) => {
    state.errors = {}
    mdl.user = data
    mdl.state.isAuth(true)
    m.route.set(`/account/${mdl.user.name}`)
    console.log("reg s", data)
  }

  state.isSubmitted = true
  validateUserRegistrationTask(data.userModel)
    .chain(registerUser(mdl))
    .fork(onError, onSuccess)
}

const registerUser = (mdl) => ({ name, email, password, isAdmin }) =>
  mdl.http.backEnd.postTask(mdl)("users/register")({
    name,
    email,
    password,
    isAdmin,
  })

const RegisterUser = () => {
  return {
    view: ({ attrs: { data, errors, isSubmitted } }) => [
      m("input.form-input", {
        class: isSubmitted ? (errors.name ? "has-error" : "has-success") : "",
        id: "reg-name",
        type: "text",
        placeholder: "Full Name",
        onkeyup: (e) => (data.name = e.target.value),
        value: data.name,
      }),
      errors.name && m("p.form-input-hint", errors.name),

      m("input.form-input", {
        class: isSubmitted ? (errors.email ? "has-error" : "has-success") : "",
        id: "reg-email",
        type: "email",
        placeholder: "Email",
        onkeyup: (e) => (data.email = e.target.value),
        value: data.email,
      }),
      errors.email && m("p.form-input-hint", errors.email),

      m("input.form-input", {
        id: "confirmEmail",
        class: isSubmitted
          ? errors.confirmEmail
            ? "has-error"
            : "has-success"
          : "",
        type: "email",
        placeholder: "Confirm Email",
        onkeyup: (e) => (data.confirmEmail = e.target.value),
        value: data.confirmEmail,
      }),
      errors.confirmEmail && m("p.form-input-hint", errors.confirmEmail),

      m("input.form-input", {
        class: isSubmitted
          ? errors.password
            ? "has-error"
            : "has-success"
          : "",
        id: "reg-pass",
        type: "password",
        placeholder: "Password",
        onkeyup: (e) => (data.password = e.target.value),
        value: data.password,
      }),
      errors.password && m("p.form-input-hint", errors.password),

      m("input.form-input", {
        class: isSubmitted
          ? errors.confirmPassword
            ? "has-error"
            : "has-success"
          : "",
        id: "pass-confirm",
        type: "password",
        placeholder: "Confirm Password",
        onkeyup: (e) => (data.confirmPassword = e.target.value),
        value: data.confirmPassword,
      }),
      errors.confirmPassword && m("p.form-input-hint", errors.confirmPassword),
    ],
  }
}

export const Register = () => {
  return {
    onremove: () => resetState(),
    view: ({ attrs: { mdl } }) => [
      m(".frow centered pt-30", [
        state.showErrorMsg() && m("code.warning", state.errorMsg()),
        m(
          "form.frow-container column-center",
          {
            role: "form",
            id: "Register-form",
            onsubmit: (e) => e.preventDefault(),
          },
          [
            m(RegisterUser, {
              data: state.data.userModel,
              errors: state.errors,
              isSubmitted: state.isSubmitted,
            }),
            m(
              "a.button.auth-btn",
              {
                form: `register-form`,
                onclick: () => validateForm(mdl)(state.data),
                class: mdl.state.isLoading() && "loading",
              },
              "Register"
            ),
            m(".auth-link", [
              "Need to ",
              m(NavLink, {
                mdl,
                href: "/login",
                link: "Login",
                classList: "bold",
              }),
              " ?",
            ]),
          ]
        ),
      ]),

      state.httpError && m(".toast toast-error", state.httpError),
    ],
  }
}

export default Register
