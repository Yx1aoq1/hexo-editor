
module.exports = {
  configureWebpack (config) {
    config.output.filename = 'js/[name]@dev.js'
    config.output.chunkFilename = 'js/[id].chunk@dev.js'
  },
  chainWebpack (config) {}
}
