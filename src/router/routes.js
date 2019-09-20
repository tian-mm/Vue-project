// 引入各种组件
// 引入外卖页面
import Msite from '../pages/Msite/Msite.vue'
// 引入订单页面
import Order from '../pages/Order/Order.vue'
// 引入我的页面
import Profile from '../pages/Profile/Profile.vue'
// 引入搜索页面
import Search from '../pages/Search/Search.vue'
// 引入登录页面
import Login from '../pages/Login/Login.vue'
// 引入Shop组件
import Shop from '../pages/Shop/Shop.vue'
// 引入点餐组件Goods
import Goods from '../pages/Shop/Goods/Goods.vue'
// 引入评价组件Ratings
import Ratings from '../pages/Shop/Ratings/Ratings.vue'
// 引入商家组件Info
import Info from '../pages/Shop/Info/Info.vue'


// 暴露出去路由
export default [
  {
    path:'/msite',
    component:Msite,
    meta:{
      isShowFooter:true
    }
  },
  {
    path:'/order',
    component:Order,
    meta:{
      isShowFooter:true
    }
  },
  {
    path:'/profile',
    component:Profile,
    meta:{
      isShowFooter:true
    }
  },
  {
    path:'/search',
    component:Search,
    meta:{
      isShowFooter:true
    }
  },
  {
    path:'/login',
    component:Login,
  },
  {
    path:'/shop',
    component:Shop,
    children:[
      {
        path:'/shop/goods',
        component:Goods
      },
      {
        path:'/shop/ratings',
        component:Ratings
      },
      {
        path:'/shop/info',
        component:Info
      },
      {
        path:'/shop',
        redirect:'/shop/goods'
      }
    ]
  },
  {
    path:'/',
    redirect:'/msite'
  }
]