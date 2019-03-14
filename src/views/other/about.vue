<template>
    <div class="flexBox">
    <pull-refresh :refreshing="isRefreshing" :on-refresh="onRefresh">
      <div class="aboutUs container" v-wechat-title="$route.meta.title">
        <img class="img" src="./img/about.png"/>
        <div class="title">{{names}}</div>
        <div class="text">可信赖的借款平台</div>
        <div class="content">
          多贝是一款深受年轻朋友的喜爱的产品，公司注重每位用户的产品体验。
        </div>
        <div class="content">
          今年，公司获得高额融资，大量资金投入产品技术研发和风控系统升级。目前形成了极速认证、大数据审核、智能下款的流程闭环。同时不断加强自身风控能力，降低风险和成本，优化业务流程，实现营收快速增长。
        </div>
      </div>
    </pull-refresh>
    <tab-bar class="footer" :active="0"></tab-bar>
  </div>
</template>

<script>
  import tabBar from '@/components/tab_bar/Index'
  import pullRefresh from '../../components/refresh/pullRefresh'
 import axios from 'axios'
  export default {
    components:{
      tabBar,
      pullRefresh
    },
    name: 'app',
    data() {
      return {
        isRefreshing: false,
        names:'',
        responseTimeMs:0
      }
    },
    created () {
      window.configCallBack = () => {
           this.inteIndex()
      };
      // nativeAppFun("hiddenBack",{"hiddenBack":"true"},"")//去掉返回按钮的方法
    },
    mounted() {

    },
    methods: {
      onRefresh() {
            this.isRefreshing = true;
            setTimeout(() => {
                this.isRefreshing = false;
                this.about();
            }, this.responseTimeMs)
        },
        about(){
          const params = {
                url : '/auth/web/appAuthSupplement/v1/labelInfo',
                data : {
                    "labelType": "maritalStatus"
                }
            }

            let sendDate = (new Date()).getTime();
            this.$sentRequest.post(params,res=>{
                // console.log(res);
                this.names = '多贝'
                let receiveDate = (new Date()).getTime()
                this.responseTimeMs = receiveDate -sendDate
                console.log(this.responseTimeMs)
                // this.$toast(JSON.stringify(res));
            },true,msg => {
              console.log(msg)
              this.$toast(msg)
            })
        },
      inteIndex(){
        // alert(JSON.stringify(window.nativeApiData))
      }
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
      margin: 50px auto 10px;
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
