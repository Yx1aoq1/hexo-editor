import Express from 'express'
import article from './article'
const router = Express.Router()

router.use('/article', article)

export default router
