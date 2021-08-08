import request from '@/utils/request'

// 获取全部频道列表
export const getAllChannels = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})

// 批量修改用户频道列表
export const addUserChannels = data => request({
  url: '/v1_0/user/channels',
  method: 'PATCH',
  data: {
    channels: [data]
  }
})

// 删除指定用户频道
export const delUserChannel = id => request({
  url: `/v1_0/user/channels/${id}`,
  method: 'DELETE'
})
