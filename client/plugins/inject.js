import axios from './axios'
import api from './api'
import consts from './const'

// 全局ajax
global.ajax = axios

export default {
  install: (Vue, options) => {
    // 需要挂载的都放在这里
    Vue.prototype.$ajax = axios
    Vue.prototype.$api = api
    Vue.prototype.$const = consts
  }
}
