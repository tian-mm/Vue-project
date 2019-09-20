<template>
  <div class="ratings-filter">
    <div class="rating-type border-1px">
      <span class="block" :class="{active:selectType === 2} " @click="setType(2)">
        全部
        <span class="count">{{totalRatingsCount}}</span>
      </span>
      <span class="block" :class="{active:selectType === 0} " @click="setType(0)">
        推荐
        <span class="count">{{positiveRatingsCount}}</span>
      </span>
      <span class="block" :class="{active:selectType === 1} " @click="setType(1)">
        吐槽
        <span class="count">{{totalRatingsCount-positiveRatingsCount}}</span>
      </span>
    </div>
    <div class="switch" :class="{on: onlyText}" @click="toggle">
      <span class="iconfont icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>


<script>
//     border-1px(rgba(7, 17, 27, 0.1))
    // font-size 0
import {mapGetters} from 'vuex'
export default {
  props:{
    // 是否显示有内容评论的
    onlyText:Boolean,
    // selectType:有三种情况-->1:吐槽 2:全部 0:推荐 (自己定义的)
    selectType:Number
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['totalRatingsCount','positiveRatingsCount'])
  },
  methods: {
    setType(type){
      this.$eventBus.$emit('setSelectType',type)
    },
    toggle(){
      this.$eventBus.$emit('toggleOnlyText')
    }
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.ratings-filter
  .rating-type
    padding 18px 0
    margin 0 18px
    .block
      display inline-block
      padding 8px 12px
      margin-right 8px
      line-height 16px
      border-radius 1px
      font-size 12px
      color rgb(77, 85, 93)
      background rgba(77, 85, 93, 0.2)
      &.active
        background $green
        color #fff
      .count
        margin-left 2px
        font-size 8px
  .switch
    padding 12px 18px
    line-height 24px
    border-bottom 1px solid rgba(7, 17, 27, 0.1)
    color rgb(147, 153, 159)
    font-size 0
    &.on
      .icon-check_circle
        color $green
    .icon-check_circle
      display inline-block
      vertical-align top
      margin-right 4px
      font-size 24px
    .text
      display inline-block
      vertical-align top
      font-size 12px
</style>



