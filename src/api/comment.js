/* 评论 */

import request from '../utils/request'

/* 获取所有的评论回复 */
export const getAllComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

/* 添加评论 */
export const addComments = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}

/* 对评论点赞 */
export const addCommentLiking = id => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: id
    }
  })
}
/* 取消对评论点赞 */
export const deleteCommentLiking = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`
  })
}
