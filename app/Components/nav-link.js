// const touchEnd = (state) => {
//   state.onHover(true)
//   // console.log("end")
// }
// const touchStart = (state) => {
//   state.onHover(false)
//   // console.log("start")
// }

export const NavLink = () => {
  return {
    view: ({ attrs: { mdl, href, link, classList, ...rest } }) =>
      m(
        m.route.Link,
        {
          // ontouchstart: (e) => touchStart(),
          // onmousedown: (e) => touchStart(state),
          // ontouchend: (e) => touchEnd(),
          // onmouseup: (e) => touchEnd(state),
          href,
          class: `nav-link ${classList} ${
            mdl.state.navSelected() == link && "shadow"
          }`,
          ...rest,
        },
        link
      ),
  }
}

export default NavLink
