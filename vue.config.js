const path = require('path')
const buildConfig = require('./config')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: resolve('dist'),
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack (config) {
    buildConfig[process.env.NODE_ENV].configureWebpack(config)
  },
  chainWebpack (config) {
    config.plugins.delete('prefetch')

    config.plugin('provide')
      .use(webpack.ProvidePlugin, [
        {
          _: 'lodash'
        }
      ])
    
    /* 设置 resolve.alias */
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('mixins', resolve('src/mixins'))

    buildConfig[process.env.NODE_ENV].chainWebpack(config)
  }
}
