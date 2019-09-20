<template>
  <div>
    <div class="goods">
      <!-- 分类 -->
      <div class="menu-wrapper">
        <ul ref="LeftUL">
          <li
            class="menu-item"
            :class="{current:currentIndex === index}"
            v-for="(good,index) in goods"
            :key="index"
            @click="handleItem(index)"
          >
            <img class="icon" :src="good.icon" v-show="good.icon" />
            <span class="text bottom-border-1px">{{good.name}}</span>
          </li>
        </ul>
      </div>
      <!-- 食物 -->
      <div class="foods-wrapper">
        <ul ref="RightUL">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food,index) in good.foods"
                :key="index"
                @click="ShowFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 购物车 -->
      <ShopCart/>
    </div>
    <Food :food="food" ref="foodClose"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入滑动
import BScroll from "better-scroll";
// 引入CartControl组件
import CartControl from "../../../components/CartControl/CartControl.vue";
// 引入Food组件
import Food from "./Food.vue";
// 引入shop
import ShopCart from './ShopCart.vue'
export default {
  components: {
    Food,
    CartControl,
    ShopCart
  },
  data() {
    return {
      scrollY: 0, //竖向滑动的值
      tops: [], //里面存储的是右侧分类的li的总高度间隔值
      food:{}
    };
  },
  async mounted() {
    await this.$store.dispatch("getGoods");
    // 初始化滑动对象
    this._initScroll();
    //在页面初始化加载完毕之后,拿到分类li的值(定义一个方法)
    this._initTops();
  },
  computed: {
    ...mapState({
      goods: state => state.shop.goods
    }),
    currentIndex() {
      // 需要拿到距离,数组
      const { scrollY, tops } = this;
      // 判断当前滑动的距离是否在tops数组中
      let index = tops.findIndex(
        (top, index) => scrollY >= top && scrollY < tops[index + 1]
      );
      // 判断当前索引是否和右侧分类数组中索引一样
      if (this.index !== index && this.scrollLeft) {
        this.index = index;
        // 取到左边分类索引对应的li
        const li = this.$refs.LeftUL.children[index];
        // 左侧列表向上滑动
        // scrollToElement -->滚动到指定的目标元素
        this.scrollLeft.scrollToElement(li, 300);
      }
      return index;
    }
  },
  methods: {
    _initScroll() {
      // 左侧的分类滑动
      this.scrollLeft = new BScroll(".menu-wrapper", {
        click: true
      });
      // 右侧的食物滑动
      this.scrollRight = new BScroll(".foods-wrapper", {
        // BScroll会阻止原生click事件,click:true即可
        click: true,
        probeType: 1
      });
      // 计算scrollY值
      this.scrollRight.on("scroll", ({ x, y }) => {
        this.scrollY = Math.abs(y);
      });
      // 滚动结束-->不在计算scrollY
      this.scrollRight.on("scrollEnd", ({ x, y }) => {
        this.scrollY = Math.abs(y);
      });
    },
    _initTops() {
      // 初始化一个tops数组
      const tops = [];
      // 给一个初始的距离值
      let top = 0;
      tops.push(top);
      // 获取到右侧食物分类li的所有子元素
      const list = this.$refs.RightUL.children;
      // 遍历出所有的li
      Array.prototype.slice.call(list).forEach(li => {
        // 累加所有li的高度
        top += li.clientHeight;
        // 添加到tops数组中
        tops.push(top);
      });
      // 更新状态数据中的tops数组
      this.tops = tops;
    },
    // 点击左侧分类,右侧滑动
    handleItem(index) {
      // 根据当前点击左侧分类的索引,在tops中寻找对应的scrollY
      const scrollY = this.tops[index];
      // 有延迟,解决延迟问题
      this.scrollY = scrollY;
      // 让右侧滑动
      this.scrollRight.scrollTo(0, -scrollY, 300);
    },
    // 当点击的时候,Food组件显示
    ShowFood(food){
      // 修改状态数据中的food对象
      this.food = food
      this.$refs.foodClose.closeFood()
    }
  }
};
</script>
<style  lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../common/stylus/mixins.styl'
.goods
  display flex
  position absolute
  top 225px
  bottom 46px
  width 100%
  background #fff
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 56px
      padding 0 12px
      line-height 14px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background #fff
        color $green
        font-weight 700
        .text
          border-none()
      .icon
        display inline-block
        vertical-align top
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat
      .text
        display table-cell
        width 56px
        vertical-align middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc, .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc
          line-height 12px
          margin-bottom 8px
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px
</style>
