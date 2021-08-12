/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store/index'
import jsonBig from 'json-bigint'
// 创建一个axios实例对象
const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net',
  transformResponse: [function(data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return data
    }
  }]

})
// const jsonStr = '{ "art_id": 1245953273786007552 }'
// console.log(JSON.parse(jsonStr))
// console.log(jsonBig.parse(jsonStr))
// console.log(jsonBig.parse(jsonStr).art_id.toString())

// 添加请求拦截器
request.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // console.log(config)
  const { user } = store.state
  // console.log(user)
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 配置响应拦截器

// 暴露出去
export default request
