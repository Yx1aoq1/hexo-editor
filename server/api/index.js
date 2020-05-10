import Express from 'express'
import article from './article'
const router = Express.Router()

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

router.use('/article', article)

export default router
