/*
封装axios请求模块
*/

import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

request.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})
export default request
