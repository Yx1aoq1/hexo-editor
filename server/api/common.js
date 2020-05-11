import Express from 'express'
import { responseClient } from '../utils'
import { CONFIG } from '../const'
import fs from 'fs'

const router = Express.Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === CONFIG.username && password === CONFIG.password) {
    req.session.username = username
    responseClient(res, 200, 'Success.', username)
  } else {
    responseClient(res, 500, 'Username or Password invalid.')
  }
})

router.post('/image', (req, res, next) => {
  let fstream
  req.pipe(req.busboy)
  req.busboy.on('file', (fieldname, file, filename) => {
    fstream = fs.createWriteStream(CONFIG.base_dir + '/source/images/' + filename)
    file.pipe(fstream)
    fstream.on('close', () => {
      res.send('/images/' + filename)
    })
  })
})

export default router
