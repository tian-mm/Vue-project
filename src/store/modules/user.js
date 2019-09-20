// 子的state,mutations,actions,getters
import {
  RECEIVE_USER,
  RESECT_USER,
} from '../mutation-types'

// 引入axios
import {
  reqLoginOut,
} from '../../api'


const state = {
    // 用户信息
    user: {}
  }
    const mutations = {
      // 更新用户信息
      [RECEIVE_USER](state, user) {
        state.user = user
      },
      // 重置用户的所有信息(清除用户信息)
      [RESECT_USER](state) {
        state.user = {}
      }

    }
    const actions = {
      // 退出-->清除用户的所有信息
      async getLoginOut({
        commit
      }) {
        const result = await reqLoginOut()
        if (result.code === 0) {
          commit(RESECT_USER)
        } else {
          alert('发送请求失败')
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