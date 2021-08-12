//  文章接口模块
import request from '@/utils/request'

// 获取频道的文章列表
export const getArticles = params => request({
  url: '/v1_1/articles',
  method: 'GET',
  params
})

// 获取新闻文章详情
export const getArticleById = id => request({
  url: `/v1_0/articles/${id}`,
  method: 'GET'
})
