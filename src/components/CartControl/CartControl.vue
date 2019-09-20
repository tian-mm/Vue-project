<template>
  <div class="cartcontrol">
    <transition name="fade">
      <div
        class="iconfont icon-remove_circle_outline"
        v-show="food.count>0"
        @click.stop="updateFoodCount(false)"
      ></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="iconfont icon-add_circle" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
export default {
  // 声明引入food
  props: {
    food: Object
  },
  data() {
    return {};
  },
  methods: {
    updateFoodCount(isAddCount) {
      // 当点击的时候,count --> true为加/false为减
      // 当点击的时候,是直接修改food对象中的count属性
      this.$store.dispatch("updateFoodCount", { isAddCount, food: this.food }); //通过actions  --> mutations --> state 修改food对象中的count属性
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.cartcontrol
  font-size 0

  &., .cart-decrease
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0, 160, 220)
  .icon-remove_circle_outline
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color $green
    &.fade-enter-active, &.fade-leave-active
      transition all 0.8s
    &.fade-enter,&.fade-leave-to
      opacity 0s
      transform translateX(27px) rotate(180deg)
  .cart-count
    display inline-block
    vertical-align top
    width 12px
    padding-top 6px
    line-height 24px
    text-align center
    font-size 10px
    color rgb(147, 153, 159)
  .icon-add_circle
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color $green
</style>

