<template>
  <div>
    <router-view></router-view>
    <!-- isShowFooter为true的时候显示Footer组件 -->
    <FooterGuide v-show="$route.meta.isShowFooter" />
  </div>
</template>

<script>
// 引入FootGuide组件
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";
// 引入ajax
import { reqUserInfo } from "./api";
import {RECEIVE_USER} from './store/mutation-types'

export default {
  components: {
    //注册组件
    FooterGuide
  },
  async mounted() {
    // 测试
    // this.$store.dispatch('getGoods')
    // this.$store.dispatch('getRatings')
    // this.$store.dispatch('getInfo')


    // 在App中发送请求
    this.$store.dispatch("getAddress");


    // 获取用户的信息(实现自动登录)
    const result = await reqUserInfo();
    // 判断
    if (result.code ===0 ){
       this.$store.commit(RECEIVE_USER,result.data)
    }
   
  }
};
</script>

<style  lang="stylus" rel="stylesheet/stylus" scoped></style>