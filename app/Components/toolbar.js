/*
contains
  logo -> center -> home link

  mobile:
  hamburger -> left
  cart -> right
  [[hamburger] , [LOGO] ,[cart] ]

  tablet+
  login/reg -> left
  social media -> right
  cart -> right
  [[login/register] , [LOGO] , [social-media, cart] ]

*/

import NavLink from "./nav-link.js"
import {
  ShoppingBagLine,
  MenuLine,
  LockLine,
} from "@mithril-icons/clarity/cjs/index"
import Logo from "./Logo"

const ToolBar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m("nav.navbar.toolbar", [
        m("nav.navbar-section.toolbar-section", [
          mdl.settings.profile == "desktop"
            ? m(
                "a",
                {
                  onclick: () =>
                    mdl.state.showNavMenu(!mdl.state.showNavMenu()),
                },
                m(LockLine)
              )
            : m(
                "a",
                {
                  onclick: () =>
                    mdl.state.showNavMenu(!mdl.state.showNavMenu()),
                },
                m(MenuLine)
              ),
        ]),
        m("nav.navbar-center.toolbar-center", [
          m(NavLink, {
            mdl,
            href: "/",
            link: m("icon", { width: "12px" }, Logo),
          }),
        ]),
        m("nav.navbar-section.toolbar-section", [
          m(NavLink, {
            mdl,
            href: "/cart",
            link: m(ShoppingBagLine),
          }),
        ]),
      ]),
  }
}

export default ToolBar
