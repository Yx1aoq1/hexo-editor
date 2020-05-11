import cache from './cache'
import { CACHE_NAME } from '../const'

export default (socket) => {
  socket.on('syncArticle', (article) => {
    if (article.key) {
      cache.put(CACHE_NAME + article.key, article)
    } else {
      cache.put(CACHE_NAME, article)
    }
    socket.emit('syncEnd', 'finished')
  })
}
