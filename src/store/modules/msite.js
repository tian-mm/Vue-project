// 子的state,mutations,actions,getters
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
} from '../mutation-types'

// 引入axios
import {
  reqAddress,
  reqcategorys,
  reqShops,
} from '../../api'


const state = {
    // 纬度
    latitude: '40.10038',
    // 经度
    longitude: '116.36867',
    // 地址
    address: {},
    // 食品分类列表
    categorys: [],
    // 商铺列表
    shops: []
  }
  const mutations = {
      /* 修改状态数据:需要把之前的状态数据传过来,需要把最新的数据传过来 */

      // 修改地址的方法
      [RECEIVE_ADDRESS](state, address) {
        state.address = address
      },
      // 修改食品分类状态数据的方法
      [RECEIVE_CATEGORYS](state, categorys) {
        state.categorys = categorys
      },
      // 修改商铺状态数据的方法
      [RECEIVE_SHOPS](state, shops) {
        state.shops = shops
      }
    }
    const actions = {
        /* 发送异步请求:需要调用mutations对象中的方法进行修改状态,所以使用commit拿到mutations对象里面的方法;
         需要state对象里面的状态数据,发送请求的参数,所以需要通过state拿到 */
        // 获取地址
        async getAddress({
          commit,
          state
        }) {
          //  从state对象中获取状态参数
          const {
            latitude,
            longitude
          } = state
          // 发送请求
          const result = await reqAddress(latitude, longitude)

          // 判断(为0==>说明请求成功)
          if (result.code === 0) {
            // 获取到data数据
            const address = result.data
            // 将最新数据address传送给mutations对象
            commit(RECEIVE_ADDRESS, address)
          }
        },
        // 获取食品分类
        async getCategorys({
          commit
        }, fn) {
          const result = await reqcategorys()
          if (result.code === 0) {
            const categorys = result.data
            console.log(categorys)
            commit(RECEIVE_CATEGORYS, categorys)
            typeof fn === 'function' && fn()
          }

        },


        // 获取商铺列表
        async getShops({
          commit,
          state
        }) {
          const {
            latitude,
            longitude
          } = state
          const result = await reqShops(latitude, longitude)
          if (result.code === 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS, shops)
          }
        }

      }
      const getters = {

      }

// 暴露出去
export default {
  state,
  mutations,
  actions,
  getters
}