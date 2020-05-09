const path = require('path')
const webpack = require('webpack')
const config = require('./config/config.js')

function resolve (dir) {
  return path.join(__dirname, dir)
}

console.log(process.env.NODE_ENV)

module.exports = {
  outputDir: resolve('dist'),
  lintOnSave: false,
  productionSourceMap: false,
  pages: {
    index: {
      // page 的入口
      entry: 'client/main.js',
      // 模板来源
      template: 'public/index.html',
      // 输出文件名
      filename: 'index.html'
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: `http://${config.host}:${config.port}/api`
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
      .set('@', resolve('client'))
      .set('variables$', resolve('client/styles/variables.less'))
  }
}
