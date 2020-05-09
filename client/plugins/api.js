import axios from './axios'
import { API_DEFAULT_CONFIG } from '@/config'
import API_CONFIG from '@/service/api'
import { assert } from '@/utils'
import { assign, isEmpty, pick } from 'lodash'

class MakeApi {
  constructor (options) {
    this.api = {}
    this.apiBuilder(options)
  }

  apiBuilder ({
    sep = '|',
    debug = false,
    config = {}
  }) {
    Object.keys(config).map(namespace => {
      this._apiSingleBuilder({
        namespace,
        sep,
        debug,
        config: config[namespace]
      })
    })
  }

  _apiSingleBuilder ({
    namespace,
    sep,
    debug,
    config
  }) {
    config.forEach(api => {
      const { name, params, method, path } = api
      const apiName = `${namespace}${sep}${name}`
      const apiUrl = path

      debug && assert(name, `${apiUrl}: 接口name属性不能为空`)
      debug && assert(apiUrl.indexOf('/') === 0, `${apiUrl}: 接口路径path，首字符应为/`)

      Object.defineProperty(this.api, apiName, {
        value (outerParams, outerOptions) {
          const _params = isEmpty(outerParams) ? params : assign({}, params, outerParams)
          const _data = pick(_params, Object.keys(params))
          const url = _replaceURLparams(apiUrl, _params)
          return axios(_normoalize(assign({
            url,
            method
          }, outerOptions), _data))
        }
      })
    })
  }
}

function _replaceURLparams (url, data) {
  return url.replace(/:([\w\d]+)/ig, (reg, key) => {
    return data[key]
  })
}

function _normoalize (options, data) {
  const method = options.method.toUpperCase()
  if (['POST', 'PUT', 'PATCH'].indexOf(method) > -1) {
    options.data = data
  } else {
    options.params = data
  }

  return options
}

export default new MakeApi({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG
})['api']
