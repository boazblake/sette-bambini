export const NavLink = () => {
  return {
    view: ({ attrs: { mdl, href, link, classList } }) =>
      m(m.route.Link, { href, class: `${classList}` }, link),
  }
}

export default NavLink
