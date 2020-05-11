import uuid from './uuid'
import str2Timestamp from './str2Timestamp'
import timeFormatter from './timeFormatter'
import timestampToDate from './timestampToDate'
import md5 from './md5'

export {
  uuid,
  str2Timestamp,
  timeFormatter,
  timestampToDate,
  md5
}

export function assert (condition, msg) {
  if (!condition) throw new Error(`[Apior] ${msg}`)
}
