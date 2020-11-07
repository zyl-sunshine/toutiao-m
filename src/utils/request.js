/*
封装axios请求模块
*/

import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // baseURL: 'http://api-toutiao-web.itheima.net/',

  transformResponse: [
    function(data) {
      try {
        return JSONBig.parse(data)
      } catch {
        return data
      }
    }
  ]
})
// 请求拦截器
request.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})
export default request
