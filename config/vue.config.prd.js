const LodashPlugin = require('lodash-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

/* eslint-disable no-useless-escape */
const FILE_NAME_REG = /^([^\@]*)\@?([^\.]+)(\.(js|css))$/
const EXTRACT_STYLES = [
  {
    type: 'css',
    oneofs: ['vue-modules', 'vue', 'normal-modules', 'normal']
  },
  {
    type: 'postcss',
    oneofs: ['vue-modules', 'vue', 'normal-modules', 'normal']
  },
  {
    type: 'scss',
    oneofs: ['vue-modules', 'vue', 'normal-modules', 'normal']
  },
  {
    type: 'sass',
    oneofs: ['vue-modules', 'vue', 'normal-modules', 'normal']
  },
  {
    type: 'less',
    oneofs: ['vue-modules', 'vue', 'normal-modules', 'normal']
  },
  {
    type: 'stylus',
    oneofs: ['vue-modules', 'vue', 'normal-modules', 'normal']
  }
]

function setCssPublicPath (config, extractStyles) {
  for (let i = 0, len = extractStyles.length; i < len; i++) {
    let style = extractStyles[i]
    for (let j = 0, jlen = style.oneofs.length; j < jlen; j++) {
      config.module.rule(style.type)
        .oneOf(style.oneofs[j])
        .use('extract-css-loader')
        .tap((options) => {
          return {}
        })
    }
  }
}

module.exports = {
  configureWebpack (config) {
    config.entry.app = ['babel-polyfill', './src/main.js']
    config.output.filename = 'js/[name]@[chunkhash].js'
    config.output.chunkFilename = 'js/[id]@[chunkhash].js'
    /* 设置optimization */
    config.optimization.runtimeChunk = {
      name: 'manifest'
    }
    config.optimization.splitChunks.cacheGroups.vendors.name = 'vendor'
    config.optimization.splitChunks.cacheGroups.common.name = 'common'
  },
  chainWebpack (config) {
    /* config.plugin('lodash') */
    config
      .plugin('lodash')
      .use(LodashPlugin)
    /* config.plugin('extract-css') */
    config.plugin('extract-css') // 重命名提取的css
      .tap(args => {
        return [{
          filename: 'css/[name]@[contenthash].css',
          chunkFilename: 'css/[name]@[contenthash].css'
        }]
      })
    setCssPublicPath(config, EXTRACT_STYLES)
    /* config.plugin('manifest') */
    config
      .plugin('manifest') // 生成相应manifest
      .use(ManifestPlugin, [{
        fileName: 'ver/manifest.json'
      }])
    /* config.plugin('versions') */
    config
      .plugin('versions') // 生成相应版本号文件
      .use(ManifestPlugin, [{
        fileName: 'ver/versions.json',
        serialize (manifest) {
          return JSON.stringify(manifest, null, 2)
        },
        filter (file) {
          return /.*\.(js|css)$/.test(file.path) && !/\S+\/chunk-[0-9a-z]+@[0-9a-z]+\.(css|js)$/.test(file.path)
        },
        generate (seed, files) {
          return files.reduce((manifest, file) => {
            manifest[file.name] = file.path.match(FILE_NAME_REG)[2]
            return manifest
          }, seed)
        }
      }])
  }
}
