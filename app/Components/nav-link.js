export const NavLink = () => {
  return {
    view: ({ attrs: { mdl, href, link, classList = "nav-link", ...rest } }) =>
      m(m.route.Link, { href, class: `${classList}`, ...rest }, link),
  }
}

export default NavLink
