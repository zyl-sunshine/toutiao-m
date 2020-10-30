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
    methods: 'GET',
    url: '/app/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
