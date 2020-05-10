let cache = []

export default {
  put (key, value) {
    cache[key] = value
  },
  get (key, callback) {
    return callback(cache[key])
  }
}
