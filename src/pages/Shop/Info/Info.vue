<template>
  <div class="shop-info">
    <div class="info-content">
      <section class="section">
        <h3 class="section-title">配送信息</h3>
        <div class="delivery">
          <div>
            <span class="delivery-icon">{{info.description}}</span>
            <span>由商家配送提供配送，约{{info.deliveryTime}}分钟送达，距离{{info.distance}}</span>
          </div>
          <div class="delivery-money">配送费￥{{info.deliveryPrice}}</div>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">活动与服务</h3>
        <div class="activity">
          <div
            class="activity-item"
            :class="classArr[support.type]"
            v-for="(support,index) in info.supports"
            :key="index"
          >
            <span class="content-tag">
              <span class="mini-tag">{{support.name}}</span>
            </span>
            <span class="activity-content">{{support.content}}</span>
          </div>
        </div>
      </section>
      <div class="split"></div>

      <section class="section">
        <h3 class="section-title">商家实景</h3>
        <div class="pic-wrapper">
          <ul class="pic-list" ref="imgul">
            <li class="pic-item" v-for="(pic,index) in info.pics" :key="index">
              <img width="120" height="90" :src="pic" />
            </li>
          </ul>
        </div>
      </section>
      <div class="split"></div>

      <section class="section">
        <h3 class="section-title">商家信息</h3>
        <ul class="detail">
          <li>
            <span class="bold">品类</span>
            <span>{{info.category}}</span>
          </li>
          <li>
            <span class="bold">商家电话</span>
            <span>{{info.phone}}</span>
          </li>
          <li>
            <span class="bold">地址</span>
            <span>{{info.address}}</span>
          </li>
          <li>
            <span class="bold">营业时间</span>
            <!-- 营业时间在vuex中没有找到 -->
            <span>{{info.workTime}}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>



<script>
import { mapState } from "vuex";
// 引入滑动对象
import BScroll from "better-scroll";
export default {
  data() {
    return {
      // 定义一个数组,用于存放类名
      // 1-->满减
      classArr: ["activity-green", "activity-red", "activity-orange"]
    };
  },
  computed: {
    ...mapState({
      info: state => state.shop.info
    })
  },
  mounted() {
    // 判断一下有没有pics对象,如果没有,不创建滑动对象
    if (!this.info.pics) {
      return;
    }
    // 页面加载完之后,初始化滑动对象
    this._initScroll();
  },
  watch: {
    info(val) {
      // 当页面加载完之后,再创建滑动对象
      this.$nextTick(() => {
        this._initScroll();
      });
    }
  },
  methods: {
    _initScroll() {
      // new 一个滑动对象(垂直滑动)
      new BScroll(".shop-info", {
        click: true
      });

      // 动态给ul设置
      const ul = this.$refs.imgul;
      // 定义每个li图片的宽度
      const liWidth = 120;
      // 定义的两个图片之间的间隔
      const space = 6;
      // 算出li的长度
      // const liSize = this.$refs.imgul.children.length
      const liSize = this.info.pics.length;
      // 得出ul的宽
      const ulWidth = (liWidth + space) * liSize - space + "px";
      // 设置ul的宽
      ul.style.width = ulWidth;

      // 水平滑动(商家照片)(水平滑动)
      new BScroll(".pic-wrapper", {
        click: true,
        scrollX: true // 水平滑动
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'
.shop-info
  position absolute
  top 225px
  bottom 0
  left 0
  width 100%
  background #fff
  overflow hidden
  .section
    padding 16px 14px 14px
    font-size 16px
    background-color #fff
    color #666
    border-bottom 1px solid #eee
    position relative
    .section-title
      color #000
      font-weight 700
      line-height 16px
      > .iconfont
        float right
        color #ccc
    .delivery
      margin-top 16px
      font-size 13px
      line-height 18px
      .delivery-icon
        width 55px
        font-size 11px
        margin-right 10px
        display inline-block
        text-align center
        color #fff
        background-color #0097ff
        padding 1px 0
        border-radius 4px
      .delivery-money
        margin-top 5px
    .activity
      margin-top 16px
      .activity-item
        margin-bottom 12px
        display flex
        font-size 13px
        align-items center
        &.activity-green
          .content-tag
            background-color rgb(112, 188, 70)
        &.activity-red
          .content-tag
            background-color rgb(240, 115, 115)
        &.activity-orange
          .content-tag
            background-color rgb(241, 136, 79)
        .content-tag
          display inline-block
          border-radius 2px
          width 36px
          height 18px
          margin-right 10px
          color #fff
          font-style normal
          position relative
          .mini-tag
            position absolute
            left 0
            top 0
            right -100%
            bottom -100%
            font-size 24px
            transform scale(0.5)
            transform-origin 0 0
            display flex
            align-items center
            justify-content center
    .pic-wrapper
      width 100%
      overflow hidden
      white-space nowrap
      margin-top 16px
      .pic-list
        font-size 0
        .pic-item
          display inline-block
          margin-right 6px
          width 120px
          height 90px
          &:last-child
            margin 0
    .detail
      margin-bottom -16px
      > li
        display flex
        justify-content space-between
        align-items center
        margin-right -10px
        padding 16px 12px 16px 0
        line-height 16px
        bottom-border-1px(#ddd)
        font-size 13px
        > .bold
          font-weight 700
          color #333
        &:last-child
          border-none()
</style>

