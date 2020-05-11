import Express from 'express'
import article from './article'
import common from './common'

const router = Express.Router()

router.use('/article', article)
router.use('/', common)

export default router
