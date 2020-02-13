import { RouteConfig } from "vue-router";
const routePaths = [
  {
    path: "/",
    name: "Home",
    view: "Home"
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    view: "About"
  },
  {
    path: "/requests",
    name: "requests",
    view: "Requests"
  }
];
export default routePaths;
