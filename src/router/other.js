 const ServiceKinds = () => import("../views/other/serviceKinds.vue").then(m => m.default);
const VersionManger = () =>
  import("../views/other/versionManger.vue").then(m => m.default);
 import About from "../views/other/about.vue";
 import ServiceCenter from "../views/other/serviceCenter";
 import Home from '../views/Home.vue'
// Vue.use(Router);
export default [
  // {
  //   path: "/",
  //   name: "home",
  //   meta: {
  //     title: "home"
  //   },
  //   component: Home
  // },
  {
    path: "/home1",
    name: "home1",
    meta: {
      title: "home1"
    },
    component: () => import("../views/About.vue")
  },
  {
    path: "/about",
    name: "about",
    meta: {
      title: "关于我们"
    },
    component: About
  },
  {
    path: "/serviceCenter",
    name: "serviceCenter",
    meta: {
      title: "服务中心"
    },
    component: ServiceCenter
  },
  {
    path: "/serviceKinds",
    name: "serviceKinds",
    meta: {
      title: "服务中心"
    },
    component: ServiceKinds
  },
  {
    path: "/versionManger",
    name: "versionManger",
    meta: {
      title: "服务中心"
    },
    component: VersionManger
  }
];
