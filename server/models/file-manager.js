/* eslint-disable camelcase */
import fs from 'hexo-fs'
import Article from './article'
import { SUFFIX } from '../const'

export default class Manager {
  constructor (base_dir) {
    this.base_dir = base_dir
    this.post_dir = base_dir + '/source/_posts/'
    this.draft_dir = base_dir + '/source/_drafts/'
    this.trash_dir = base_dir + '/source/_trash/'
    this.mkdir(this.draft_dir)
    this.mkdir(this.trash_dir)
    this.mkdir(base_dir + '/source/images/')
  }

  mkdir (dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
  }

  getPathByWorkspace (workspace) {
    switch (workspace) {
      case 'posts':
        return this.post_dir
      case 'drafts':
        return this.draft_dir
      case 'trash':
        return this.trash_dir
      default:
        return this.base_dir
    }
  }

  getItems (workspace) {
    switch (workspace) {
      case 'posts':
        return fs.listDir(this.post_dir, [])
      case 'drafts':
        return fs.listDir(this.draft_dir, [])
      case 'trash':
        return fs.listDir(this.trash_dir, [])
      default:
        return Promise.resolve([])
    }
  }

  savePost (article, workspace) {
    const dir = this.getPathByWorkspace(workspace)
    Article.parseJson(article).saveTo(dir)
  }

  movePost (article, origin, target) {
    const filename = article.filename + SUFFIX
    const oldPath = this.getPathByWorkspace(origin) + filename
    const newPath = this.getPathByWorkspace(target) + filename
    fs.rename(oldPath, newPath)
      .then((err) => {
        if (err) {
          console.err(err)
        }
      })
  }

  deletePost (article) {
    const path = this.trash_dir + article.filename + SUFFIX
    console.log(path)
    fs.unlink(path)
      .then((err) => {
        if (err) {
          console.err(err)
        }
      })
  }
}
