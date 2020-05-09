export function routerBeforeEachFunc (to, from, next) {
  // 页面拦截、权限处理
  next()
}

export function routerAfterEachFunc (to, from) {
}
