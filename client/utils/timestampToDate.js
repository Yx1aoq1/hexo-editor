import timeFormatter from './timeFormatter'

let timestampToDate = function (timestamp) {
  let date = new Date(timeFormatter(timestamp).replace(/-/g, '/'))
  return date
}

export default timestampToDate
