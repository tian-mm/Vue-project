#项目笔记
##一.配置相关(2版本):
1.项目自动打开  config-->index.js-->autoOpenBrowser: true,
2.关闭eslint检查  .eslintignore -->找到rules对象
##项目搭建与准备
1. vue init webpack gshop 通过脚手架2下载对应的webpack 项目(eslint)
2.创建对应的目录
  - api目录:里面就是ajax相关的代码,index.js--根据接口发送请求的js代码,ajax.js--封装后的ajax代码
  - common目录:公共的静态资源,如:mixins.styl文件
    - common目录中stylus目录---mixins.styl----混合
  - components目录:普通组件
  - filter目录:格式化(过滤器相关)的代码
  - mock目录:mock.js相关的js代码
  - pages目录:路由组件
  - router目录:配置路由的
  - store目录:vuex状态管理数据的相关代码
  - static目录css目录----reset.css重置样式的文件,iconfont.css图标字体的样式文件(直接引入,也可以通过在线的方式引入)----static目录中的reset.css文件在index.html中引入,图标字体在线引入也在该文件中
  - 
##项目知识点:
###登录页面
1.登录页面底部Footer隐藏?
  在路由文件中,在底部对应的路由中,添加一个meta对象,在meta对象中isShowFooter:true --> 只有为true对应的路由才显示(在$route.meta);
###外卖页面
1.头部插槽
  - 将Header单独抽成一个组件(公共组件)
  - 在main.js入口文件中引入Header组件,并将Header组件注册为一个全局的组件,每一个组件都可以使用(哪个组件使用,放在哪个组将中)
  - Vue.component('Header',Header)  第一个组件名,第二个是注册哪个组件
  - <slot name="left">  -->相当于挖坑  在Header组件中
  - <span class="header_search" slot="left"></span>   -->相当于填坑(在外卖首页组件中)
2.轮播图
下载:yarn add swiper 
引入:import Swiper from swiper
引入样式:import 'swiper/dist/css/swiper.css'
3.底部
 - 点击FooterGuide.vue组件中相关的链接就会跳转到指定的路由组件界面(上面的)
 - 使用了编程式路由跳转
  - 为每个a标签添加了动态的类样式
    :class="{'on':$route.path==='/msite'}" @click="goto('/msite')" 四个
    在methods:{
    goto(path){
     使用的是replace方法跳转------编程式路由
    }
    }
4.发送请求
脚手架2版本解决跨域:
  - 在config文件-->index.js 的module.exports这个对象中的proxyTable对象中解决跨域(写配置)
  ``
  proxyTable: {
  '/api': { // 匹配所有以 '/api'开头的请求路径
    target: 'http://localhost:3000', // 代理目标的基础路径
    changeOrigin: true, // 支持跨域
    pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
      '^/api': ''
    }
  }
}
``

#项目转化为3版本
##配置相关:
补充: 
1)查看全局的包安装在那个文件: npm get prefix
2)3版本-->在印记中文-->vue-cli
1)安装:
  - 安装之前先卸载2版本 : yarn global remove vue-cli
  - 安装3版本脚手架:npm install -g @vue/cli
  -  下载webpack项目: vue create 项目名字
  - 此命令可以3版本和2版本都可以使用: npm install -g @vue/cli-init
2)自动打开浏览器:
  - 在package.json --> scripts对象 --> "serve": "vue-cli-service serve --open",
3)2版本的rules --> 在3版本的package.json中
4)启动项目: npm run serve /  yarn serve
5)配置跨域:
6)
https://blog.csdn.net/xfcy514728/article/details/80277653 表单验证

##知识点
###轮播图(使用swiper插件):
1.注意:
  - 当数据数据获取到,页面加载完毕之后再创建对象,轮播图才会有效果;
  - vm.$nextTick(callback) -->callback里面的内容在页面加载完毕之后才会执行
2.
  - 在外卖组件发送异步请求,获取到食品分类的,但是注意的问题要处理轮播图等页面加载完毕之后再显示
  - 有三种解决方案:
    - 1)在watch里面:使用定时器(但是定时器的事件问题无法确定)
    - 2)watch中使用vm.$nextTick(callback) ,callback里面的内容在页面加载完毕之后才会执行
    - 3)配合await和async使用,获取完数据之后,使用vm.$nextTick(callback),在callback中new swiper
###实现滑动效果(采用的是better-scroll插件)
###当后台没有接口的时候,前端自己模拟假的数据,发送请求(使用Mock)
  - 它的作用是生成随机数据,拦截ajax请求
  - mock.server.js文件生成之后再main.js文件中引入
###表单验证(使用的是vee-validate插件)
###vuex模块化之后
  - 在组件中取state中的数据和之前不一样了
    - ...mapState({address:state(总的state)=>state.msite(模块名).属性名})
###使用better-scroll插件实现购物车滑动出现的问题?
  - 更新版本,拿到数据,当页面加载完之后,再用滑动对象
  - 在计算属性中,计算属性相关属性发生变化,就会new一个滑动对象,使用单例模式
  - 使用单例模式,会出现滑动问题,使用refresh()对象-->重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
    
