<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div class="root"  v-wechat-title="$route.meta.title">
    </div>
    <van-cell-group>
  <van-cell title="单元格" value="内容" />
    <van-cell title="单元格" value="内容" label="描述信息" />
  </van-cell-group>
  </div>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { Cell, CellGroup } from 'vant';
export default {
  name: 'home',
  components: {
    HelloWorld,
    Cell,
    CellGroup
  }
}
</script>
