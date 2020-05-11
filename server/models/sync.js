import cache from './cache'
import { CACHE_NAME, CHUNK_SIZE } from '../const'

export default (socket) => {
  let dist = ''
  socket.on('syncArticle', (article) => {
    const data = article.data
    let text = ''
    for (let i in data) {
      if (data[i] === null) {
        text += dist.slice((i * CHUNK_SIZE), (i * CHUNK_SIZE) + CHUNK_SIZE)
        continue
      }
      if (data[i].pos !== null) {
        text += dist.slice(data[i].pos, data[i].pos + CHUNK_SIZE)
      } else if (data[i].data) {
        text += data[i].data
      }
    }
    dist = text
    article.content = dist
    if (article.key) {
      cache.put(CACHE_NAME + article.key, article)
    } else {
      cache.put(CACHE_NAME, article)
    }
    socket.emit('syncEnd', 'finished')
  })
}
