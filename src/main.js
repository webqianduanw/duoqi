import Vue from 'vue'
import sentRequest from './utils/api'
import App from './App.vue'
import router from './router'
import store from './store'

import Util from './utils/utils'
import { Vant } from "./utils/vant"
import FastClick from "fastclick"
import VueWechatTitle from "vue-wechat-title"//自定义页面的title

import './assets/css/reset.less'
import 'lib-flexible/flexible.js'
if ("addEventListener" in document) {
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}
Vue.use(VueWechatTitle)
Vant(Vue)
Vue.config.productionTip = false
Vue.prototype.$Utils = Util
Vue.prototype.$sentRequest = sentRequest
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
