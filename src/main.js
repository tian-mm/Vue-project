import Vue from 'vue'
import App from './App'

// 引入路由器
import router from './router'
// 引入仓库
import store from './store'
// 引入Header组件
import Header from './components/Header/Header.vue'
// 引入Star组件
import Star from './components/Star/Star'
// 引入表单验证的插件(注册为了全局的插件)
import './validate.js'
// 引入mock
import './mock/mock.server.js'
// 引入过滤时间
import './filter'
// 引入Split,并注册为全局组件
import Split from './components/Split/Split.vue'
// 引入添加或减少CartControl组件,并组册为全局组件
import CartControl from './components/CartControl/CartControl.vue'

//将Header注册为全局组件(在每个组件都可以使用)
Vue.component('Header',Header)
// 将Star注册为全局组件
Vue.component('Star',Star)
// 将CartControl组册为全局组件
Vue.component('CartControl', CartControl)
// 将Split注册为全局组件
Vue.component('Split', Split)
// 引入MintUI按钮
import { Button } from 'mint-ui';
// 引入图片懒加载
import VueLazyload from 'vue-lazyload'
// 引入图片
import loading from './common/images/loading.gif'
Vue.component(Button.name, Button);


// 全局事件总线
Vue.prototype.$eventBus = new Vue()
// 懒加载配置对象
Vue.use(VueLazyload, {
  loading
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,    //注册路由器
  store    //注册仓库
})
