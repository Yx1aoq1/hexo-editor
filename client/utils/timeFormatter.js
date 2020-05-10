const DEFAULT_DATETIME_FORMAT = 'yyyy-MM-DD HH:mm:ss'

function prefixZero (val, len) {
  return (Array(len).join('0') + val).slice(-len)
}

function timeFormatter (timestamp = 0, format) {
  if (!timestamp) { return '-' }
  let tempFormat = format || DEFAULT_DATETIME_FORMAT
  const timeModifier = timestamp.toString().length >= 13
    ? 1
    : 1000 // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let date = new Date(timestamp * timeModifier) // 项目中默认的时间戳是秒级（即10位）
  let opt = {
    'y+': date.getFullYear() + '',
    'M+': prefixZero(date.getMonth() + 1, 2),
    'D+': prefixZero(date.getDate(), 2),
    'H+': prefixZero(date.getHours(), 2),
    'm+': prefixZero(date.getMinutes(), 2),
    's+': prefixZero(date.getSeconds(), 2)
  }
  for (let i in opt) {
    let reg = new RegExp(i)
    if (reg.test(tempFormat)) {
      tempFormat = tempFormat.replace(reg, opt[i])
    }
  }
  return tempFormat
}

export default (timestamp, format) => {
  return timeFormatter(timestamp, format)
}
