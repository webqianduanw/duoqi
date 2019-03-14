import Vue from 'vue'
import Router from 'vue-router'
import other from './router/other'
import index from './router/index'

Vue.use(Router)
export default new Router({
  routes: [ 
    ...other ,//静态模块的内容
    ...index //首页相关路由
  ]
});
