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
  const { workspace } = req.body
  const itemsPromise = manager.getItems(workspace)
  itemsPromise
    .then((files) => {
      let items = []
      for (let i = 0; i < files.length; i++) {
        const article = new Article(manager.getPathByWorkspace(workspace) + files[i])
        items.push(article.toJson())
        cache.put(article.hashCode(), article.toJson())
      }
      responseClient(res, 200, 'success', items)
    })
    .catch(err => {
      console.log(err)
      responseClient(res, 500, err)
    })
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
        'date': +new Date(),
        'tags': [],
        'categories': '',
        'content': '',
        'key': ''
      }
    }
    responseClient(res, 200, 'success', article)
  })
})

router.get('/publish', (req, res) => {
  const { id, workspace } = req.query
  cache.get(id, (article) => {
    manager.moveToPost(article, workspace)
  })
  responseClient(res, 200, 'Already move to posts.')
})

router.get('/stash', (req, res) => {
  const { id, workspace } = req.query
  cache.get(id, (article) => {
    manager.moveToDraft(article, workspace)
  })
  responseClient(res, 200, 'Already move to drafts.')
})

router.get('/delete', (req, res) => {
  const { id, workspace } = req.query
  cache.get(id, (article) => {
    manager.moveToTrash(article, workspace)
  })
  responseClient(res, 200, 'Already move to trash.')
})

router.get('/deleteSource', (req, res) => {
  const { id } = req.query
  cache.get(id, (article) => {
    manager.deletePost(article)
  })
  responseClient(res, 200, 'success')
})

export default router
