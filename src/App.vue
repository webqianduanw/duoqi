<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>
<script>
  import jquery from 'jquery';
  window.$ = window.jQuery = jquery;
  export default {
    name: 'app',
    data() {
      return {
        parseAppInfo:{}
      }
    },
    created () {
      // window.configCallBack = () => {
      //      this.inteIndex()
      // };
      // nativeAppFun("hiddenBack",{"hiddenBack":"true"},"")//去掉返回按钮的方法
    },
    mounted() {
      this.$Utils.nativeAppFun("obtainHeader",{"obtainHeader":"true"},"")//公共请求头获
      window.parseAppInfo = {
        "appVersion": window.nativeApiData.appVersion ||"",
        "userId":window.nativeApiData.userId||"",
        "systemVersion":window.nativeApiData.systemVersion||"",
        "deviceId":window.nativeApiData.deviceId||"",
        "channelId":window.nativeApiData.channel||"",
        "deviceType":window.nativeApiData.deviceType||"",
        "netType":window.nativeApiData.netType||"",
        "longitude":window.nativeApiData.longitude||"",
        "latitude":window.nativeApiData.latitude||"",
        "userAddress":window.nativeApiData.userAddress||"",
        "wifiMac":window.nativeApiData.wifiMac||"",
        "wifiName":window.nativeApiData.wifiName||"",
        "applyTime":$.now()||"",
        "province":window.nativeApiData.province||"",
        "city":window.nativeApiData.city||"",
        "county":window.nativeApiData.county||""
      }
    },
    methods: {
      // inteIndex(){
        // alert(JSON.stringify(window.nativeApiData))
      // }
    }
  }
</script>
<style lang="scss">
body,
html {
  width: 100%;
  height: 100%;
  #app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
