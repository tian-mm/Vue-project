// 子的state,mutations,actions,getters

import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT
} from '../mutation-types'
// 引入vue
import Vue from 'vue'
// 引入axios
import {
  reqGoods,
  reqRatings,
  reqInfo
} from '../../api'

const state = {
  // 点餐状态数据
  goods: [],
  //评价状态数据
  ratings: [],
  // 商家
  info: {},
  // 定义一个数组,用来保存购物车中已选食物对象的数组
  foodArr: []
}
const mutations = {
  // 点餐(包括分类和食品)
  [RECEIVE_GOODS](state, {
    goods
  }) {
    state.goods = goods
  },
  // 评价
  [RECEIVE_RATINGS](state, {
    ratings
  }) {
    state.ratings = ratings
  },
  // 商家信息
  [RECEIVE_INFO](state, {
    info
  }) {
    state.info = info
  },
  // food对象的加的操作
  [ADD_FOOD_COUNT](state, {
    food
  }) {
    // 判断当下food对象有没有count,如果没有,当点击的时候为其添加一个count属性,并为其赋值
    if (!food.count) {
      // food.count = 1   不可以,数据显示不出来
      // 将count转化为响应式数据
      // 为响应式对象添加一个属性，确保新属性也是响应式的，并且能够触发视图更新。这必须用于为响应式对象添加新属性，因为 Vue 无法检测到普通属性的添加
      Vue.set(food, 'count', 1)

      //将当前添加的食物对象添加到数组中
      state.foodArr.push(food)
    } else {
      food.count++
    }
  },
  // food对象的减的操作
  [REDUCE_FOOD_COUNT](state, {
    food
  }) {
    if (food.count > 0) {
      food.count--
      //判断食物的数量是不是等于0,如果是,则从数组中移除
      if (food.count === 0) {
        // 根据当前的食物对象,在数组中寻找-->根据相对应的索引进行删除
        state.foodArr.splice(state.foodArr.indexOf(food), 1)
      }
    }
  }
}
const actions = {
  // 点餐的请求
  async getGoods({
    commit
  }) {
    const result = await reqGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {
        goods
      })
    }
  },
  // 评论的请求
  async getRatings({
    commit
  }) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {
        ratings
      })
    }
  },
  // 商家的请求
  async getInfo({
    commit
  }) {
    const result = await reqInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {
        info
      })
    }
  },
  // 修改food对象中的count
  updateFoodCount({
    commit
  }, {
    isAddCount,
    food
  }) {
    if (isAddCount) {
      // 加
      commit(ADD_FOOD_COUNT, {
        food
      })
    } else {
      // 减
      commit(REDUCE_FOOD_COUNT, {
        food
      })
    }

  }
}
const getters = {
  // 得出总数量
  totalCount(state) {
    return state.foodArr.reduce((pre, food) => pre + food.count, 0)
  },
  // 得出总价格
  totalPrice(state) {
    return state.foodArr.reduce((pre, food) => pre + food.price, 0)
  },

  // 总商家评论数
  totalRatingsCount(state){
    return state.ratings.length
  },
  // 总商家推荐评论数
  positiveRatingsCount(state) {
    // 遍历出每一个rating对象,判断rating对象的rateType属性是否等于0,如果是0,则累加1
    return state.ratings.reduce((pre, rating) => pre + (rating.rateType === 0 ? 1:0), 0)
  }
}
// 暴露出去
export default {
  state,
  mutations,
  actions,
  getters
}