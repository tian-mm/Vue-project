/* 用于进行表单验证 */
// 引入vue
import Vue from 'vue'
// 引入vee-validate插件
import VeeValidate from 'vee-validate'
// 中文
import zh_CN from 'vee-validate/dist/locale/zh_CN'
//  声明使用
Vue.use(VeeValidate)

// 将表单验证的提示设置为中文,以键值对的方式验证,前面是属性名字,后面是对应的属性值的中文提示
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    phone: '手机号码',
    code:'短信验证码',
    name:'用户名',
    pwd:'密码',
    captcha:'图形验证码'

  }
});


// 扩展方法(测试手机号码)
VeeValidate.Validator.extend('phone', {
  getMessages: () => `请输入正确的手机号码`,
  validate: value => {
    return /[1]\d{10}/.test(value)
  }
});

VeeValidate.Validator.extend('code', {
  getMessages: () => `请输入正确的验证码`,
  validate: value => {
    return /\d{6}/.test(value)
  }
});

