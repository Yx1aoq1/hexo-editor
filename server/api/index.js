import Express from 'express'
import article from './article'
import { responseClient } from '../utils'
import { CONFIG } from '../const'
const router = Express.Router()

router.use('/article', article)

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === CONFIG.username && password === CONFIG.password) {
    req.session.username = username
    responseClient(res, 200, 'Success.', username)
  } else {
    responseClient(res, 500, 'Username or Password invalid.')
  }
})

export default router
