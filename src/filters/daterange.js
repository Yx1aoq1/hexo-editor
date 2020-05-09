import dayjs from 'dayjs'
/**
 * date 是string的数组或者Date类型
 */
export default (date, format) => {
  if (date.length === 2 && date[0]) {
    if (format) {
      return `${dayjs(date[0]).format(format)} ~ ${dayjs(date[1]).format(format)}`
    } else {
      return `${date[0]} ~ ${date[1]}`
    }
  } else {
    return 'Please Select Date'
  }
}
