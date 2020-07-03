import Express from 'express'
import common from './common'
import article from './article'
import { responseClient, checkToken } from '../utils'

const router = Express.Router()

// 接口拦截，验证是否已登录
router.use('/', (req, res, next) => {
  const url = req.originalUrl
  if (url.indexOf('login') > -1) {
    next()
  } else {
    if (!checkToken(req)) {
      responseClient(res, 401, '身份信息已过期，请重新登录')
      return
    }
    next()
  }
})

router.use('/', common)
router.use('/article', article)

export default router
