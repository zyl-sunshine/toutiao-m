/*
 *文章列表模块
 */
import request from '../utils/request'

export const getArticleList = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
