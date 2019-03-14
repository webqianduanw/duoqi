<template>
  <div class="flexBox">
    <pull-refresh :refreshing="isRefreshing" :on-refresh="onRefresh">
    <div class="container positionR" v-wechat-title="$route.meta.title">
      <div class="index_page">
        <div class="index_left">
          <span></span><span>多贝分期</span>
        </div>
        <div class="index_content positionA">

        </div>
      </div>
    </div>
    </pull-refresh>
    <tab-bar class="footer" :active="0"></tab-bar>
  </div>
</template>

<script>
// import moduleName from 'module'
import tabBar from '@/components/tab_bar/Index'
import pullRefresh from '../../components/refresh/pullRefresh'
export default {
  name: '',
  components: {
    tabBar,
    pullRefresh
  },
  data () {
    return {
      isRefreshing:false,
      responseTimeMs:0
    }
  },
  methods: {
    onRefresh() {
      this.isRefreshing = true;
      setTimeout(() => {
          this.isRefreshing = false;
          // this.about();
      }, this.responseTimeMs)
    },

  },
  created () {

  },
  mounted () {

  },
  updated () {

  }
}
</script>
<style lang="scss" scoped>
.container{
  height: 100%;
}
  .index_page{
    width: 100%;
    height: 260px;
    background: url('img/index_bg.png') no-repeat;
    background-size: 100% 100%;

    .index_left{
      padding-top: 52px;
      height: 26px;
      line-height: 26px;
      flex:1;
      display: flex;
      display: -webkit-flex; /* Safari */
      padding: 52px 20px 0 20px;
      span{
        justify-content: flex-start;
        flex-direction: row;
        align-items: flex-start;

        &:nth-of-type(1){
          width: 20px;
          height: 20px;
          background: url('./img/index_logo.png') no-repeat;
          background-size: 100% 100%;
        }
        &:nth-of-type(2){
          padding-left: 10px;
          font-size:18px;
          font-weight:normal;
          color:rgba(255,255,255,1);

        }
      }

    }
    .index_content{
      height: 268px;
      width: 90%;
      margin:0 auto;
      border-radius: 5px;
      background: #fff;
      left: 0;
      right: 0;
      top: 98px;
      -webkit-box-shadow: #e5e5e5 0px 0px 10px;
      -moz-box-shadow: #e5e5e5 0px 0px 10px;
      box-shadow: #e5e5e5 0px 0px 10px;
    }
  }
</style>
