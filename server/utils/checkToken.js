const checkToken = (req) => {
  return req.session.username
}

export default checkToken
