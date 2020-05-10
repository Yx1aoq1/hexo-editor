import uuid from './uuid'
import str2Timestamp from './str2Timestamp'
import timeFormatter from './timeFormatter'
import timestampToDate from './timestampToDate'

export {
  uuid,
  str2Timestamp,
  timeFormatter,
  timestampToDate
}

export function assert (condition, msg) {
  if (!condition) throw new Error(`[Apior] ${msg}`)
}
