const Index = () => import("../views/index/index.vue").then(m => m.default);
export default [
  {
  path: "/",
    name: "index",
      meta: {
    title: "多贝分期"
  },
  component: Index
  }
]
