import Express from 'express'
import config from '../../config/config'
import Article from '../models/article'
import { responseClient } from '../utils'
import Manager from '../models/file-manager'
import cache from '../models/cache'

const router = Express.Router()
const manager = new Manager(config.base_dir)

router.post('/list', (req, res) => {
  // if (!req.session.username) {
  //   responseClient(res, 401, '身份信息已过期，请重新登录')
  //   return
  // }
  const {
    workspace
  } = req.body
  const itemsPromise = manager.getItems(workspace)
  itemsPromise
    .then((files) => {
      let items = []
      for (let i = 0; i < files.length; i++) {
        const article = new Article(manager.getPathByWorkspace(workspace) + files[i])
        items.push(article.toJson())
        cache.put(article.hashCode(), article.toJson())
      }
      responseClient(res, 200, '成功', items)
    })
    .catch(err => {
      console.log(err)
      responseClient(res, 500, err)
    })
})

router.post('/update', (req, res) => {

})

router.get('/delete/:id', (req, res) => {

})

router.get('/detail/:id', (req, res) => {
  // if (!req.session.username) {
  //   responseClient(res, 401, '身份信息已过期，请重新登录')
  //   return
  // }
  const { id } = req.params
  cache.get(id, (article) => {
    if (!article) {
      article = {
        'title': 'Untitled',
        'date': '',
        'tags': [],
        'categories': '',
        'content': '',
        'key': ''
      }
    }
    responseClient(res, 200, '成功', article)
  })
})

router.post('/changeStatus', (req, res) => {

})

export default router
