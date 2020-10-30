import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user')
    // user: JSON.parse(window.localStorage.getItem('user'))
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // window.localStorage.setItem('user', JSON.stringify(data))
      setItem('user', data)
    }
  },
  actions: {},
  modules: {}
})
