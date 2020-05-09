import Vue from 'vue'
import VueRouter from 'vue-router'
import ROUTES from '@/routes'
import { ROUTER_DEFAULT_CONFIG } from '@/config'
import { routerBeforeEachFunc, routerAfterEachFunc } from '@/config/interceptors'

Vue.use(VueRouter)

// 注入默认配置和路由表
let routerInstance = new VueRouter({
  ...ROUTER_DEFAULT_CONFIG,
  routes: ROUTES
})
// 注入拦截器
routerInstance.beforeEach(routerBeforeEachFunc)
routerInstance.afterEach(routerAfterEachFunc)

export default routerInstance
