const handlers = (types, fn) =>
  types.reduce((acc, type) => Object.assign(acc, { [type]: fn }), {})

const showBorderStyle = (style) => {
  style.border = "1px solid black"
  return style
}

const hideBorderStyle = (style) => {
  style.border = ""
  return style
}

export const NavLink = () => {
  return {
    view: ({ attrs: { mdl, href, link, classList, ...rest } }) =>
      m(
        m.route.Link,
        {
          style: {
            ...handlers(["onmouseover", "onmouseout"], (e) => {
              console.log(e)
              return e.type == "mouseover"
                ? showBorderStyle(e.target.style)
                : hideBorderStyle(e.target.style)
            }),
          },
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
