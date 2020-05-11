export default {
  set: (name, value, min, domain, path) => {
    const exp = new Date()
    exp.setTime(exp.getTime() + 60 * 1000 * min) // 过期时间
    const domainCon = domain ? `;domain=${domain}` : ''
    const pathCon = path ? `;path=${path}` : ''
    const expiresCon = min ? `;expires=${exp.toUTCString()}` : ''
    document.cookie = `${name}=${value}${domainCon}${pathCon}${expiresCon}`
  },

  get: (name) => {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    const arr = document.cookie.match(reg)
    if (arr) {
      return unescape(arr[2])
    } else {
      return null
    }
  },

  del: (name) => {
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    const cval = this.get(name)
    if (cval != null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
    }
  }
}
