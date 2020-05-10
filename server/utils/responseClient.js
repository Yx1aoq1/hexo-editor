const responseClient = (res, httpCode = 500, message = '服务端异常', data = {}) => {
  let responseData = {}
  responseData.message = message
  responseData.data = data
  res.status(httpCode).json(responseData)
}

export default responseClient
