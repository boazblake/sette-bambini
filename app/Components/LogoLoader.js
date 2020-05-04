import Logo from "./Logo"

const LogoLoader = () => {
  return {
    view: ({ attrs: { mdl } }) => m(".logoLoader", m(".heartbeat", m(Logo))),
  }
}

export default LogoLoader
