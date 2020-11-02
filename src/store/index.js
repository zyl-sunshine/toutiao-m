import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user'),
    // user: JSON.parse(window.localStorage.getItem('user'))
    // 获取屏幕的高度
    screenHeight: document.documentElement.clientHeight,
    // tab搜索栏的高度
    tabHeight: 0,
    // 导航栏的高度
    navTabHeight: 0,
    // 底部导航栏的高度
    tabbarHeight: 0
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // window.localStorage.setItem('user', JSON.stringify(data))
      setItem('user', data)
    },
    getNavHeight(state, obj) {
      state.tabHeight = obj.tabHeight
      state.navTabHeight = obj.navTabHeight
    },
    getTabbarHeight(state, h) {
      state.tabbarHeight = h
    }
  },
  actions: {},
  modules: {}
})
