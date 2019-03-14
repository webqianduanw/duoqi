<template>
<div class="flexBox">
  <div class="aboutUs container">
    <img class="img" src="./img/about.png"/>
    <div class="title">多贝</div>
    <div class="text">{{version}}</div>
  </div>
  <tab-bar class="footer" :active="1"></tab-bar>
</div>
</template>

<script>
  // import getUrlPara from 'assets/js/getUrlPara'
  // let version = decodeURIComponent(getUrlPara('version'))
   import tabBar from '@/components/tab_bar/Index'
  export default {
    components: {
      tabBar
    },
    name: 'app',
    data() {
      return {
        version:''
      }
    },
    mounted() {
      // nativeAppFun("obtainHeader",{"obtainHeader":"true"},"")//公共请求头获取标识
      window.configCallBack = () => { //页面初始化
          this.init()
      };
      let version = this.$Utils.urlAnalytical().version || ""
      this.version = version
      // this.init()
    },
    methods: {
      init(){
        this.$Utils.h5_pvuv_maidian_fn('bs_ym_bbgly', $.now(), '',  window.parseAppInfo)
    },
    },
    // 页面离开埋点
    destroyed () {
      this.$Utils.h5_pvuv_maidian_fn('bs_ym_bbgly', '', $.now(), window.parseAppInfo)
    }
  }
</script>

<style scoped lang='scss'>
  @function vw($px) {
    @return ($px / 7.5) * 100vw;
  }
  .aboutUs{
    .img{
      width: vw(1.92);
      display: block;
      margin: 45px auto 0;
    }
    .title{
      font-size: 16px;
      color: #101930;
      text-align: center;
    }
    .text{
      text-align: center;
      color: #A9AFB9;
      font-size: 12px;
      padding-top: 5px;
    }
    .content{
      text-align: justify;
      text-indent: 2em;
      color: #101930;
      font-size: 14px;
      margin: 10px 20px;
    }
  }
</style>
