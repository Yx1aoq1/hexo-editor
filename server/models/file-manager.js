/* eslint-disable camelcase */
import fs from 'hexo-fs'
import Article from './article'
const suffix = '.md'

export default class Manager {
  constructor (base_dir) {
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
        return ''
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

  saveToDraft (article) {
    Article.parseJson(article).saveTo(this.draft_dir)
  }
  saveToPost (article) {
    Article.parseJson(article).saveTo(this.post_dir)
  }

  readFromDraft (title) {
    let path = this.draft_dir + title + suffix
    return (new Article(path)).toJson()
  }

  moveToPost (article, workspace) {
    const filename = article.filename + suffix
    const oldPath = this.getPathByWorkspace(workspace) + filename
    const newPath = this.post_dir + filename
    fs.rename(oldPath, newPath)
      .then((err) => {
        if (err) {
          console.err(err)
        }
      })
  }

  moveToDraft (article, workspace) {
    const draft_dir = this.draft_dir
    const filename = (article.filename ? article.filename : article.title) + suffix
    const oldPath = this.getPathByWorkspace(workspace) + filename
    const newPath = draft_dir + filename
    fs.rename(oldPath, newPath)
      .then((err) => {
        if (err) {
          console.err(err)
        }
      })
  }

  moveToTrash (article, workspace) {
    const trash_dir = this.trash_dir
    const filename = article.filename + suffix
    const oldPath = this.getPathByWorkspace(workspace) + filename
    const newPath = trash_dir + filename
    fs.rename(oldPath, newPath)
      .then((err) => {
        if (err) {
          console.err(err)
        }
      })
  }

  deletePost (article) {
    const path = this.trash_dir + article.filename + suffix
    console.log(path)
    fs.unlink(path)
      .then((err) => {
        if (err) {
          console.err(err)
        }
      })
  }
}
