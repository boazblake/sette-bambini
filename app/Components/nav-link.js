const touchEnd = () => {
  state.touch(false)
  // console.log("end")
}
const touchStart = () => {
  // console.log("start")
  state.touch(true)
}

const state = {
  touch: Stream(false),
}

export const NavLink = () => {
  return {
    view: ({ attrs: { mdl, href, link, classList = "nav-link", ...rest } }) =>
      m(
        m.route.Link,
        {
          ontouchstart: touchStart,
          onmousedown: touchStart,
          ontouchend: touchEnd,
          on: touchEnd,
          href,
          class: `${classList} ${state.touch() && "shadow"}`,
          ...rest,
        },
        link
      ),
  }
}

export default NavLink
