// 引入data.json
import data from './data.json'
// 引入
const Mock = require('mockjs')
Mock.mock('/goods',{code:0,data:data.goods})
Mock.mock('/ratings',{code:0,data:data.ratings})
Mock.mock('/info',{code:0,data:data.info})


