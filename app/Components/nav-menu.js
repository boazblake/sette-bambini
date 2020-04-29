import NavLink from "./nav-link"
import { SlideInRight, SlideOutLeft } from "../Styles/animations.js"
const isActiveRoute = (route) => (m.route.get() == route ? "bold" : "")

const NavItem = () => {
  return {
    view: ({ attrs: { mdl, href, link, classList } }) =>
      m(`li.nav-item`, m(NavLink, { mdl, href, link, classList })),
  }
}

const NavMenu = () => {
  const state = {
    status: (mdl) => (mdl.state.showNavMenu() ? "navMenuShow" : "navMenuHide"),
  }
  let routes = (mdl) => mdl.Routes.filter((r) => r.group.includes("menu"))

  return {
    view: ({ attrs: { mdl } }) =>
      m(
        `.${state.status(mdl)}`,
        {
          oncreate: SlideInRight,
          onbeforeremove: SlideOutLeft,
        },
        m(
          ".navMenuOverlay",
          {
            onclick: () => mdl.state.showNavMenu(!mdl.state.showNavMenu()),
          },
          m(
            `ul.nav`,
            { id: "" },
            routes(mdl).map((r) =>
              m(NavLink, {
                mdl,
                href: r.route,
                link: r.name,
                classList: isActiveRoute(r.route),
              })
            )
          )
        )
      ),
  }
}

export default NavMenu
