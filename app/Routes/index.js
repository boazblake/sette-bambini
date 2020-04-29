import ToolbarRoutes from "./toolbar-routes.js"
import AuthenticatedRoutes from "./authenticated-routes.js"
import NavbarRoutes from "./navbar-routes.js"
import OtherRoutes from "./other-routes.js"
import { flatten } from "ramda"

const Routes = flatten([
  ToolbarRoutes,
  NavbarRoutes,
  OtherRoutes,
  AuthenticatedRoutes,
])
export default Routes
