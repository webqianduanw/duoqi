<template>
  <div class="page" v-wechat-title="$route.meta.title">
    <van-cell-group>
      <van-cell title="单元格" value="内容" :imgurl="$Utils.formatTime(Date.parse(new Date()),4)" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
  </div>
</template>

<script>
// import moduleName from 'module'

export default {
  name: '',
  components: {

  },
  data () {
    return {
      imgurl:''
    }
  },
  methods: {
    obj(){
      return console.log(1)
    },
    appstoe(){
//       var text = "，"
//         // var reg = /[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]/;
//         var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
//  if(reg.test(text)){
//   alert('是中文标点符号');
//  }else{
//   alert('不是中文标点符号');
//  }


        var _t = this;
        // this.$toast("111")
        const params = {
            url : '/auth/web/appAuthSupplement/v1/labelInfo',
            data : {
                "labelType": "maritalStatus"
            }
        }
        this.$sentRequest.post(params,res=>{
            console.log(res);
            this.$toast(JSON.stringify(res));
        },true)
    }
  },
  created () {

  },
  mounted () {
    this.obj()
    this.appstoe()
  },
  updated () {

  },
  destroyed: function () {
    alert(1)
}
}
</script>

<style lang="scss">

</style>
