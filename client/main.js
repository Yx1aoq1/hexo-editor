import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from '@/plugins/router'
import store from '@/plugins/store'
import inject from '@/plugins/inject'
import App from './App'
import '@/directives'
import '@/filters'
import '@/mixins'
import '@/styles/index.less'

global.vbus = new Vue()
Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(inject)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
})
