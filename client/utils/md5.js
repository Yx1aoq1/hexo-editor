import crypto from 'crypto'

const md5 = function (password, salt = '') {
  let saltPassword = salt ? password + ':' + salt : password
  let md5 = crypto.createHash('md5')
  return md5.update(saltPassword).digest('hex')
}

export default md5
