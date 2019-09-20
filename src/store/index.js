// 仓库
// 引入vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 引入四个对象
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 引入模块
import msite from '../store/modules/msite'
import shop from '../store/modules/shop'
import user from '../store/modules/user'

// 声明使用
Vue.use(Vuex)

// 暴露仓库
export default new Vuex.Store({
  state,   //总的state
  mutations,  //总的mutations
  actions,    //总的actions
  getters,    //总的getters
  modules:{    //总的模块modules
  // msite;msite
    msite,    //单个的模块,模块名字
    shop,
    user
  }
})