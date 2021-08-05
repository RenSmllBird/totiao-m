/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store/index'

// 创建一个axios实例对象
const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net'

})

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
