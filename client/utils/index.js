import uuid from './uuid'
import str2Timestamp from './str2Timestamp'
import timeFormatter from './timeFormatter'
import timestampToDate from './timestampToDate'
import md5 from './md5'
import cookieUtils from './cookieUtils'
import getToken from './getToken'

export {
  uuid,
  str2Timestamp,
  timeFormatter,
  timestampToDate,
  md5,
  cookieUtils,
  getToken
}

export function assert (condition, msg) {
  if (!condition) throw new Error(`[Apior] ${msg}`)
}
