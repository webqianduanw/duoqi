<template>
  <van-tabbar :fixed="isFixed" v-model="idx" @change="selecTab">
    <van-tabbar-item v-for="item in icon" :key="item.name">
       <span>{{item.name}}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active?item.active:item.normal"
        >
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
// import moduleName from 'module'
import { Tabbar, TabbarItem } from 'vant'

export default {
  name: '',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      idx: 0,
      radio: 1,
      isFixed: false,
      icon: [
        {
          name: '借钱',
          normal: require('../../assets/img/invest.png'),
          active: require('../../assets/img/invest_active.png')
        },
        {
          name: '认证',
          normal: require('../../assets/img/new.png'),
          active: require('../../assets/img/new_active.png')
        },
        {
          name: '我的',
          normal: require('../../assets/img/my.png'),
          active: require('../../assets/img/my_active.png')
        }
      ]
    }
  },
  methods: {
    selecTab (index) {
      switch (index) {
        case 0:
          this.$router.push({
            path: '/about'
          })
          break
        case 1:
          this.$router.push({
            path: '/versionManger'
          })
          break
        case 2:
          this.idx = 0
          // 先判断是否绑定手机号码，如没有绑定则先去绑定
          const userinfo = this.$Utils.getData('userinfo')
          if (!userinfo.phone) {
            this.$dialog.confirm({
              title: '提示',
              message: '您尚未绑定手机号，请先绑定手机号码?',
              confirmButtonText: '去绑定'
            }).then(() => {
              // on confirm
              this.$router.push({
                path: '/bindPhone'
              })
            }).catch(() => {
              // on cancel
            })
          } else {
            this.idx = this.active = 2
            this.$router.push({
              path: '/usercenter'
            })
          }
          break
        default:
          break
      }
    }
  },
  created () {
    this.idx = this.active
  },
  mounted () {

  },
  updated () {

  }
}
</script>

<style lang="css">

</style>
