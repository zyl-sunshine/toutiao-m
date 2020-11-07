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

/* 获取文章详情 */
export const getArticle = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 收藏文章
export const addCollectArticle = id => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target: id
    }
  })
}

// 取消收藏文章
export const deleteCollectArticle = id => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${id}`
  })
}

// 点赞文章
export const addLikeArticle = id => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: id
    }
  })
}
// 取消点赞文章
export const deleteLikeArticle = id => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${id}`
  })
}
