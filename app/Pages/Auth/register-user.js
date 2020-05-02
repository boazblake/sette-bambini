import { validateUserRegistrationTask } from "./Validations"

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
}

const resetState = () => {
  state.data = jsonCopy(dataModel)
  state.errors = {}
  state.httpError = undefined
  state.isSubmitted = false
}

const onError = (error) => {
  console.log("error with http calll", error)
  state.httpError = error.message
  state.isSubmitted = false
}

const onSuccess = (data) => {
  console.log("succes with registering", data, state)
}

export const validateForm = (mdl) => (data) => {
  const onValidationError = (errs) => {
    state.errors = errs
    console.log("failed - state", state)
  }

  const onSuccess = (data) => {
    state.errors = {}
    console.log("reg s", data)
  }

  state.isSubmitted = true
  validateUserRegistrationTask(data.userModel)
    .chain(registerUser(mdl))
    .fork(onValidationError, onSuccess)
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
      m(
        ".form-group ",
        isSubmitted && { class: errors.name ? "has-error" : "has-success" },
        [
          m("label.bold", { for: "reg-name" }, [
            "Name",
            m("span.span required", "*"),
          ]),
          m("input.form-input", {
            id: "reg-name",
            type: "text",
            placeholder: "Name",
            onkeyup: (e) => (data.name = e.target.value),
            value: data.name,
          }),
          errors.name && m("p.form-input-hint", errors.name),
        ]
      ),
      m(
        ".form-group",
        isSubmitted && { class: errors.email ? "has-error" : "has-success" },
        [
          m("label.bold", { for: "reg-email" }, [
            "Email",
            m("span.span required", "*"),
          ]),
          m("input.form-input", {
            id: "reg-email",
            type: "email",
            placeholder: "Email",
            onkeyup: (e) => (data.email = e.target.value),
            value: data.email,
          }),
          errors.email && m("p.form-input-hint", errors.email),
        ]
      ),
      m(
        ".form-group",
        isSubmitted && {
          class: errors.confirmEmail ? "has-error" : "has-success",
        },
        [
          m("label.bold", { for: "confirmEmail" }, [
            "Confirm Email",
            m("span.span required", "*"),
          ]),
          m("input.form-input", {
            id: "confirmEmail",
            type: "email",
            placeholder: "Email",
            onkeyup: (e) => (data.confirmEmail = e.target.value),
            value: data.confirmEmail,
          }),
          errors.confirmEmail && m("p.form-input-hint", errors.confirmEmail),
        ]
      ),
      m(
        ".form-group",
        isSubmitted && {
          class: errors.password ? "has-error" : "has-success",
        },
        [
          m("label.bold", { for: "reg-pass" }, [
            "Password",
            m("span.span required", "*"),
          ]),
          m("input.form-input", {
            id: "reg-pass",
            type: "password",
            placeholder: "must contain and not contain",
            onkeyup: (e) => (data.password = e.target.value),
            value: data.password,
          }),
          errors.password && m("p.form-input-hint", errors.password),
        ]
      ),
      m(
        ".form-group",
        isSubmitted && {
          class: errors.confirmPassword ? "has-error" : "has-success",
        },
        [
          m("label.bold", { for: "pass-confirm" }, [
            "Confirm Password",
            m("span.span required", "*"),
          ]),
          m("input.form-input", {
            id: "pass-confirm",
            type: "password",
            placeholder: "must contain and not contain",
            onkeyup: (e) => (data.confirmPassword = e.target.value),
            value: data.confirmPassword,
          }),
          errors.confirmPassword &&
            m("p.form-input-hint", errors.confirmPassword),
        ]
      ),
    ],
  }
}

export const Register = () => {
  return {
    view: ({ attrs: { mdl } }) => [
      m(".frow centered", [
        m("h1.title", mdl.state.route.name),
        m(
          "form.auth-form",
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
              httpError: state.httpError,
            }),
            m(
              "input",
              {
                type: "submit",
                form: `register-form`,
                onclick: () => validateForm(mdl)(state.data),
                class: mdl.state.isLoading() && "loading",
              },
              "Register"
            ),
          ]
        ),
      ]),

      state.httpError && m(".toast toast-error", state.httpError),
    ],
  }
}

export default Register
