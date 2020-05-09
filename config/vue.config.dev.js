module.exports = {
  configureWebpack (config) {
    config.output.filename = 'js/[name].js'
    config.output.chunkFilename = 'js/[id].chunk.js'
  },
  chainWebpack (config) {
  }
}
