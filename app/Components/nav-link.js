export const NavLink = () => {
  return {
    view: ({ attrs: { mdl, href, link, classList } }) =>
      m(m.route.Link, { href, class: `${classList}.nav-item.title` }, link),
  }
}

export default NavLink
