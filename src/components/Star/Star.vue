<template>
  <div class="star" :class="`star-`+ size" >
    <span class="star-item" :class="cls" v-for="(cls,index) in starCls" :key="index"></span>
  </div>
</template>

<script>
export default {
  // 声明接收
  props: {
    size: Number,
    score: Number
  },
  computed: {
    starCls() {
      /* 星星的多少-->由评分决定 */
      // 定义一个存放类的数组
      let starCls = [];
      // 获取到传送过来的评分score
      const { score } = this;
      //并取整  如: 3.7 --> 取整之后是3
      const scoreInit = Math.floor(score);
      // 遍历所有整数的星星
      for (let i = 0; i < scoreInit; i++) {
        // 遍历出每一个整数的,将类名'on'存放在starCls数组中
        starCls.push("on");
      }
      // 得出半颗的星星
      if (score * 10 - scoreInit * 10 >= 5) {
        starCls.push("half");
      }
      // 当数组的长度<5 -> 则半个星
      while (starCls.length < 5) {
        starCls.push("off");
      }
      return starCls;
    }
  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.star // 2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star48_on')
      &.half
        bg-image('./images/stars/star48_half')
      &.off
        bg-image('./images/stars/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star36_on')
      &.half
        bg-image('./images/stars/star36_half')
      &.off
        bg-image('./images/stars/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star24_on')
      &.half
        bg-image('./images/stars/star24_half')
      &.off
        bg-image('./images/stars/star24_off')
</style>