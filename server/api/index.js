import Express from 'express'

const router = Express.Router()

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

export default router
