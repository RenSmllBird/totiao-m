/**
 * 封装 axios 请求模块
 */
import axios from 'axios'

// 创建一个axios实例对象
const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net'

})

// 配置请求拦截器

// 配置响应拦截器

// 暴露出去
export default request
