import request from '@/utils/request'
// import store from '@/store/index'
// 用户登录接口请求
export const login = data => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data
})
// 验证码接口请求
export const sendSms = mobile => request({
  url: `/v1_0/sms/codes/${mobile}`,
  method: 'GET'
})
// 获取用户自己信息
export const getUserInfo = () => request({
  url: '/v1_0/user',
  method: 'GET'
  // headers: {
  //     Authorization: `Bearer ${store.state.user.token}`
  // }
})
// 获取用户频道列表channels
export const getUserChannels = () => request({
  url: '/v1_0/user/channels',
  method: 'GET'
})
