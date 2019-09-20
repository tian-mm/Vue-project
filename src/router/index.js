// 引入vue
import Vue from 'vue'
//引入路由
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes'
// 声明使用
Vue.use(VueRouter)

// 暴露出去
export default new VueRouter({
  mode:"history",
  routes
})