import { getToken } from '@/utils'
export function routerBeforeEachFunc (to, from, next) {
  // 页面拦截、权限处理
  if (getToken() !== null) {
    next()
  } else {
    if (to.name === 'LOGIN') { // 防止无限循环
      next()
      return
    }
    next({
      name: 'LOGIN'
    })
  }
}

export function routerAfterEachFunc (to, from) {
}
