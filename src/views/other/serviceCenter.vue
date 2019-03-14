<template>
  <div class="content" id="content" v-wechat-title="$route.meta.title">
    <img src="./img/banner.png"/>
    <div class="sh" v-if="check == 0">
      <div class="queKinds">
        <p class="queTitle">问题分类</p>
        <ul>
          <li v-for="(item,index) in queClassify" :key="index">
            <img class="imgItem" :src="item.imgUrl" @click="fGoService(item,index)"/>
            <p>{{ item.title }}</p>
          </li>
        </ul>
      </div>
      <div class="line"></div>
      <div class="hot-que-wrap">
        <div class="hotQue van-hairline--bottom">
          <span>热门问题</span>
        </div>
        <ul class="hotQuestion">
          <li @click="toggle(index)" v-for="(item,index) of hotQue" :key="index" class="van-hairline--bottom">
            <p class="title"><span>{{ item.title }}</span><i :class="{ down:show == index }"></i></p>
            <p class="answer" v-show="show == index">{{ item.answer}}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 审核中显示 -->
    <div class="ss" v-if="check == 1">
      <ul class="hotQuestion">
        <li @click="toggle(index)" v-for="(item,index) of getReviewData" :key="index">
          <p class="title"><span>{{ item.title }}</span><i :class="{ down:show == index }"></i></p>
          <p class="answer" v-show="show == index">{{ item.answer }}</p>
        </li>
      </ul>
    </div>
    <div class="loadingMask" v-if="showLoading"><i class="loading"></i></div>
    <div v-cloak class="mainwrap">
      <a href="tel:400-181-8585" class="tel common">
        <img src="./img/tel.png"/>
        <span>呼叫客服</span>
      </a>
      <a href="javascript:;" @click="customerservice" class="online common">
        <img src="./img/online.png"/>
        <span>在线咨询</span>
      </a>
    </div>
  </div>
</template>

<script>
  window.onbeforeunload = function() {
      h5_pvuv_maidian_fn('bs_ym_bzzxy', '', $.now(), this.parseAppInfo3)
  }
  export default {
    name: 'app',
    data() {
      return {
        show: [false],
        check: '',
        showLoading: false,
        queClassify: [{
          "title": "认证问题",
          "imgUrl": require('./img/1.png')
        }, {
          "title": "借款问题",
          "imgUrl": require('./img/2.png')
        }, {
          "title": "还款问题",
          "imgUrl": require('./img/3.png')
        }, {
          "title": "额度评估",
          "imgUrl": require('./img/5.png')
        }, {
          "title": "异常问题",
          "imgUrl": require('./img/4.png')
        }, {
          "title": "其他问题",
          "imgUrl": require('./img/6.png')
        }],
        hotQue: [{
          "title": "扫脸后提示认证失败",
          "answer": "请您端正坐好竖直拿着手机，手机要和面部一个高度，不要躺卧，不要用头发或眼睛帽子等遮挡，再次尝试一下。您的扫脸认证次数是有限的，如果超限需要明天才能尝试了。"
        }, {
          "title": "人脸识别提示“竖直紧握手机”",
          "answer": "请您端正坐好竖直拿着手机，手机要和面部一个高度，不要躺卧，不要用头发或眼睛帽子等遮挡，再次尝试一下。您的扫脸认证次数是有限的，如果超限需要明天才能尝试了。"
        }, {
          "title": "运营商一直在认证中",
          "answer": "如果运营商一直在认证中，可能是因为您没有给多贝开通通知权限造成的，因为开通通知权限后，APP 才可以自动刷新。如果您用的是苹果手机，点击“设置-多贝”就可以开启通知权限了。如果是安卓手机，如果您的手机有“安全管家”这种应用，可以去“安全管家”中设置。设置完成后，关闭程序重新进入 APP 就可以了"
        }, {
          "title": "信用认证一直在认证中",
          "answer": "如果信用认证一直在认证中，可能是因为您没有给多开通通知权限造成的，因为开通通知权限后，APP 才可以自动刷新。如果您用的是苹果手机，点击“设置-多贝”就可以开启通知权限了。如果是安卓手机，如果您的手机有“安全管家”这种应用，可以去“安全管家”中设置。设置完成后，关闭程序重新进入 APP 就可以了"
        }, {
          "title": "借款失败是什么原因",
          "answer": "提交审核未通过，并不代表您信用不好，对客户的审核体系在不断优化中，您7天以后可以再试试；我们根据您信用等级给您推荐了一些优质的渠道，若是急需资金可以到我们贷款超市看看哦。"
        }, {
          "title": "支付宝还款账号经常变更",
          "answer": "因为财务结算原因，我方需要多个支付宝账号，只要是 APP 官方公布的支付宝账号都是安全的。请您放心。"
        }, {
          "title": "还款一直处于处理中",
          "answer": "若您是通过支付宝还款，请您还款后在立即还款下方\"我已支付宝还款\"点击进入提交支付宝还款的订单号，9:00-22:30期间一般1-2个小时左右处理一次，请您耐心等待下哦，若是银行卡一般处理时间需5-10分钟。"
        }, {
          "title": "银行卡还款失败",
          "answer": "如果您银行卡还款失败，请根据您在支付失败后的弹窗提示进行操作，如果按照提示操作还是不行，请您联系客服"
        }, {
          "title": "如何给多贝开通各项权限",
          "answer": "如果您用的是苹果手机，点击“设置-多贝”就可以开启各种权限了。如果是安卓手机，如果您的手机有“安全管家”这种应用，可以去“安全管家”中设置。设置完成后，关闭程序重新进入 APP 就可以了"
        }],
        getReviewData: [{
          "title": "更改注册手机号？",
          "answer": "注册的手机号相当于您的用户名，手机号是无法更改的"
        }, {
          "title": "更换主卡？",
          "answer": "打开APP，点“我的”-“银行卡管理”里面绑定一张新的银行卡，然后副卡的右上角有三条横线的，您点击下就可以自己更换（切换）主卡就可以"
        }, {
          "title": "解绑银行卡？",
          "answer": "若您只绑定一张银行卡是没办法解绑银行卡的哦，银行卡绑定最低数量是一张。若是绑定了多张银行卡，将要解绑的银行卡设置成副卡，然后副卡的右上角有三条横线的，操作解绑就可以"
        }, {
          "title": "银行卡签约失败？",
          "answer": "银行签约失败是因为您填写的信息有误，导致了签约失败"
        }, {
          "title": "收不到验证码？",
          "answer": "您好，验证码是移动、电信、联通等第三方给您发送的，收不到验证码建议您稍等再试，现在运营商也许比较繁忙。"
        }, {
          "title": "扫脸后提示认证失败",
          "answer": "请您端正坐好竖直拿着手机，手机要和面部一个高度，不要躺卧，不要用头发或眼睛帽子等遮挡，再次尝试一下。您的扫脸认证次数是有限的，如果超限需要明天才能尝试了。"
        },]
      }
    },
    mounted() {
       window.configCallBack = () => { //页面初始化 拿到APP传来的参数
            // alert(JSON.stringify(window.nativeApiData))
            this.init()
        };
    },
    methods: {

      init() {
        //页面进入埋点
        this.Utils.h5_pvuv_maidian_fn('bs_ym_bzzxy', $.now(), '', window.parseAppInfo)
      },
      customerservice(){
        // let id="12121";
        this.Utils.nativeAppFun("customerService",{"receptionGroupID":"kf_10508_1543804322968"},"")
      },

      fGoService(item, index) {
        this.$router.push({ path: '/serviceKinds?que='+ (index + 1) })
        // window.location.href = "serviceKinds?que=" + (index + 1)
      },
      toggle(e) {
        this.show = this.show == e ? -1 : e;
      },
      kefuOnline() {
        if (appVersion >= 120) {
          window.location.href = "/lsd-web/opennative?name=APP_CONTACT_CUSTOMER"
        } else {
          alert("版本过低请升级")
        }
      }
    },
    destroyed () {
      //页面离开埋点
      this.Utils.h5_pvuv_maidian_fn('bs_ym_bzzxy', '', $.now(), window.parseAppInfo)
    }
  }
</script>

<style scoped lang='scss'>
  @function vw($px) {
    @return ($px / 7.5) * 100vw;
  }

  .content {
    .hot-que-wrap {
      padding-bottom: vw(1.5);
    }
    .hotQue {
      height: vw(0.88);
      line-height: vw(0.88);
      color: #101930;
      font-size: 16px;
      margin-left: vw(.4);
      position: relative;
      font-weight: bold;
      span {
        &:after {
          content: '';
          position: absolute;
          background: #edeff0;
          width: 100%;
          height: 1px;
          left: 0;
          top: 11.73333vw;
          transform: scaleY(0.5);
          -webkit-transform: scaleY(0.5);
          transform-origin: 0 0;
          -webkit-transform-origin: 0 0;
          z-index: 1;
        }
      }
    }
    .line {
      width: vw(7.5);
      height: vw(0.2);
      background-color: #F8F9FF;
    }
    .queKinds {
      margin-top: vw(0.2);
      .queTitle {
        height: vw(0.88);
        line-height: vw(0.88);
        background: #fff;
        padding-left: vw(.4);
        color: #101930;
        font-size: 16px;
        font-weight: bold;
      }
      ul {
        background: #fff;
        display: -webkit-flex;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        li {
          position: relative;
          width: 33%;
          height: vw(1.4);
          .imgItem {
            position: absolute;
            top: vw(0.2);
            left: 50%;
            transform: translateX(-50%);
            -webkit-transform: translateX(-50%);
            margin: 0 auto;
            width: vw(0.6);
            height: vw(0.6);
          }
          a {
            position: absolute;
            top: vw(0.2);
            left: 50%;
            transform: translateX(-50%);
            -webkit-transform: translateX(-50%);
            margin: 0 auto;
            width: vw(0.6);
            height: vw(0.6);
            border-radius: 50%;
          }
          p {
            width: 100%;
            position: absolute;
            top: vw(0.9);
            left: 50%;
            transform: translateX(-50%);
            -webkit-transform: translateX(-50%);
            text-align: center;
            color: #333333;
            font-size: vw(0.24);
          }
        }
      }
    }
    .hotQuestion {
      width: vw(7.5);
      margin-top: vw(0.2);
      li {
        position: relative;
        font-size: 14px;
        color: #101930;
        .title {
          height: vw(0.88);
          line-height: vw(0.88);
          position: relative;
          margin-left: vw(0.4);
          &:before{
            content: '';
            display: inline-block;
            width: vw(.32);
            height: vw(.32);
            background: url("./img/b.png") no-repeat center;
            background-size: 100%;
            position: relative;
            top: 2px;
            margin-right: 5px;
          }
          .down {
            transform: translateY(-50%) rotate(180deg);
            transition: all 0.5s;
          }
          i {
            width: vw(.2);
            height: vw(0.12);
            -webkit-background-size: cover;
            background-size: cover;
            position: absolute;
            top: 50%;
            right: vw(0.4);
            // width: vw(0.28);
            // height: vw(0.16);
            background-image: url(./img/up.png);
            transform: translateY(-50%) rotate(0);
            transition: all 0.5s;
          }
        }
        .answer {
          font-size: 12px;
          padding: vw(0.2) vw(0.4);
          text-align: Justify;
          background-color: #F7F7F7;
          color: #969696;
        }
      }
      li:after {
        content: '';
        position: absolute;
        background: #edeff0;
        width: 94.5%;
        height: 1px;
        left: vw(0.4);
        top: vw(0.88);
        transform: scaleY(0.5);
        -webkit-transform: scaleY(0.5);
        transform-origin: 0 0;
        -webkit-transform-origin: 0 0;
        z-index: 1;
      }
    }
    .kefuOnline {
      position: fixed;
      bottom: vw(1);
      right: 0;
      z-index: 2;
      a {
        width: vw(1.06);
        height: vw(0.92);
      }
    }
  }

  .mainwrap {
    position: fixed;
    z-index: 6;
    bottom: 0;
    left: 0;
    width: 100%;
    height: vw(1.2);
    background: #fff;
    box-shadow: 0 0 4px 1px #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0 vw(.4);
    .common{
      width: vw(3.2);
      height: vw(.8);
      border-radius: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: vw(.3);
        margin-right: 5px;
      }
    }
    .tel {
      border: 1px solid #477bfb;
      color: #477bfb;
    }
    .online {
      background: #477bfb;
      color: #fff;
    }
  }
</style>
