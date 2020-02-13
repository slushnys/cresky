import Router, { RouteConfig } from "vue-router";
import paths from "./paths";
import Vue from "vue";

const route = (path: string, view: string, name: string): RouteConfig => {
  return {
    path,
    name: name || view,
    component: async () => await import(`@/views/${view}.vue`)
  };
};

Vue.use(Router);

const router = new Router({
  mode: "hash",
  routes: paths
    .map(path => route(path.path, path.view, path.name))
    .concat([{ path: "*", redirect: "/" }]),
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

export default router;
