import { CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE } from '../index'
import { get } from 'lodash'

export function requestSuccessFunc (requestObj) {
  CONSOLE_REQUEST_ENABLE && console.info('requestInterceptorFunc', `url: ${requestObj.url}`, requestObj)
  // 处理权限，请求发送监控

  return requestObj
}

export function requestFailFunc (requestError) {
  // 发送请求失败处理

  return Promise.reject(requestError)
}

export function responseSuccessFunc (responseObj) {
  CONSOLE_RESPONSE_ENABLE && console.log('requestInterceptorFunc', `data: `, responseObj.data)

  return responseObj.data
}

export function responseFailFunc (responseError) {
  if (responseError.response) {
    switch (responseError.response.status) {
      case 403:
        location.reload()
        break
      case 401:
        responseError.message = '未授权，请重新登录'
        break
      default:
        responseError.message = get(responseError, 'response.data.msg', '出错啦')
    }
  } else { // 无返回的默认提示
    responseError.message = `网络问题，请刷新重试`
  }

  // 超时提示
  if (responseError.message.includes('timeout')) {
    responseError.message = '请求超时，请刷新重试'
  }

  // 全局错误提示
  if (responseError.config && !responseError.config.noShowDefaultError) {
    global.vbus.$emit('global.$Message.error', responseError.message)
  }

  return Promise.reject(responseError)
}
