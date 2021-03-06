import NavLink from "Components/nav-link"
import { jsonCopy } from "Utils"
import { validateUserRegistrationTask } from "./Validations"
import { registerUserTask, createAccountTask } from "./fns.js"
import LogoLoader from "Components/LogoLoader"

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
    if (errs) {
      state.errors = errs
      state.errorMsg(errs.message)
      state.showErrorMsg(true)
      console.log("failed - state", state)
    } else {
      state.errorMsg("There seems to be a problem please contact web support")
      state.showErrorMsg(true)
      console.log("failed - state", state)
    }
  }

  const onSuccess = (mdl) => {
    state.errors = {}
    sessionStorage.setItem("sb-user-token", mdl.user["sessionToken"])
    sessionStorage.setItem("sb-user", JSON.stringify(mdl.user))
    m.route.set("/")
  }

  state.isSubmitted = true
  validateUserRegistrationTask(data.userModel)
    .chain(registerUserTask(mdl))
    .chain(createAccountTask)
    .fork(onError, onSuccess)
}

const RegisterUser = () => {
  return {
    view: ({ attrs: { mdl, data, errors, isSubmitted } }) => [
      mdl.state.isLoading()
        ? m(LogoLoader, { mdl })
        : m("input.auth-input", {
            class: isSubmitted
              ? errors.name
                ? "has-error"
                : "has-success"
              : "",
            id: "reg-name",
            type: "text",
            placeholder: "Full Name",
            onkeyup: (e) => (data.name = e.target.value),
            value: data.name,
          }),
      errors.name && m("p.auth-input-hint", errors.name),

      m("input.auth-input", {
        class: isSubmitted ? (errors.email ? "has-error" : "has-success") : "",
        id: "reg-email",
        type: "email",
        placeholder: "Email",
        onkeyup: (e) => (data.email = e.target.value),
        value: data.email,
      }),
      errors.email && m("p.auth-input-hint", errors.email),

      m("input.auth-input", {
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
      errors.confirmEmail && m("p.auth-input-hint", errors.confirmEmail),

      m("input.auth-input", {
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
      errors.password && m("p.auth-input-hint", errors.password),

      m("input.auth-input", {
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
      errors.confirmPassword && m("p.auth-input-hint", errors.confirmPassword),
    ],
  }
}

export const Register = () => {
  return {
    onremove: () => resetState(),
    view: ({ attrs: { mdl } }) => [
      m(".frow", [
        state.showErrorMsg() && m("code.warning", state.errorMsg()),
        m(
          "form.frow",
          {
            role: "form",
            id: "register-form",
            onsubmit: (e) => e.preventDefault(),
          },
          [
            m(RegisterUser, {
              mdl,
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
