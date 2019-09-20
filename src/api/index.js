/* 每一个函数的返回值都是一个promise对象 */
// 引入axios
import ajax from './ajax'
const URL = '/api'

/* export function reqAddress(latitude, longitude) {
  return ajax(URL + `/position/${latitude},${longitude}`)
} */

//根据经纬度获取位置详情
export const reqAddress = (latitude,longitude) =>  ajax(URL + `/position/${latitude},${longitude}`)
//获取食品分类列表
export const reqcategorys = () => ajax(URL + '/index_category')
// 根据经纬度获取商铺列表
export const reqShops = (latitude,longitude) => ajax(URL + `/shops`,{latitude,longitude})
// 发送短信验证码
export const reqSendCode = (phone) =>ajax(URL+`/sendcode`,{phone})
// 手机验证码登录(登录需要手机号,验证码)
export const reqLoginSms = (phone,code) =>ajax(URL + `/login_sms`,{phone,code},'POST')
// 用户密码登录(需要用户名,密码,图形验证码)
export const reqLoginPwd = ({name,pwd,captcha})=>ajax(URL+`/login_pwd`,{name,pwd,captcha},'POST')
// 自动登录(获取用户信息)
export const reqUserInfo = ()=>ajax(URL+`/userinfo`)
// 用户退出
export const reqLoginOut = ()=>ajax(URL+`/logout`)
// 点餐
export const reqGoods = ()=>ajax('/goods')
// 评价
export const reqRatings = ()=>ajax('/ratings')
// 商家
export const reqInfo = ()=>ajax('/info')