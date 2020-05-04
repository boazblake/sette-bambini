const touchEnd = () => {
  consolelog("enm")
}
const touchStart = () => {
  console.log("atrt")
}

export const NavLink = () => {
  return {
    view: ({ attrs: { mdl, href, link, classList = "nav-link", ...rest } }) =>
      m(
        m.route.Link,
        {
          ontouchstart: touchStart,
          ontouchend: touchEnd,
          href,
          class: `${classList}`,
          ...rest,
        },
        link
      ),
  }
}

export default NavLink
