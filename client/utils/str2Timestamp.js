// 时间戳转字符串,必须先把2017-11-01转为2017/11/01，因为new Date('2017/11/01').getTime()才是00:00:00,new Date('2017-11-01').getTime()是08:00:00
let str2Timestamp = function (stringTime) {
  let timestamp = new Date(stringTime.replace(/-/g, '/')).getTime()
  return timestamp
}

export default str2Timestamp
