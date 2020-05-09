
module.exports = {
  configureWebpack (config) {
  },
  chainWebpack (config) {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
  }
}
