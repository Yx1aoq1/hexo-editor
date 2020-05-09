module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV)
  const presets = api.env('server')
    ? ['@babel/preset-env']
    : ['@vue/app', '@babel/preset-env']
  
  return {
    presets
  }
}

