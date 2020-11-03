/*
 *获取全部频道列表模块
 */
import request from '../utils/request'

/* 获取全部列表 */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
/* 添加频道 */
export const addUserChannel = channels => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}
/* 删除频道 */
export const deleteUserChannel = channelsId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelsId}`
  })
}
