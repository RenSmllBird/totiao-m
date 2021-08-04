import request from '@/utils/request'

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
