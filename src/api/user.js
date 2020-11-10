import request from '../utils/request'
// import store from '@/store'
// 登录请求
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 获取验证码
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`,
    data: mobile
  })
}

// 获取基本用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

// 关注用户
export const getFollowings = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消关注用户
export const getUnFollowings = id => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${id}`
  })
}

/* 获取用户个人资料 */
export const getUserProfile = id => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}
// 编辑提交用户个人资料
export const editUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}
// 编辑用户照片
export const editUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
