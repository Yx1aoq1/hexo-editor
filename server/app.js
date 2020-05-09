import path from 'path'
import Express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import favicon from 'serve-favicon'
import compression from 'compression'
import connectHistoryApiFallback from 'connect-history-api-fallback'
import logger from './logger'
import config from '../config/config'
import api from './api'

const app = Express()
const port = config.port

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser('express_react_cookie'))
app.use(session({
  secret: 'express_react_cookie',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 60 * 1000 * 30} // 过期时间
}))
app.use(logger)
// history模式重定向插件 connect-history-api-fallback
app.use('/', connectHistoryApiFallback())
app.use('/', Express.static(path.join(__dirname, '../dist')))
app.use(favicon(path.join(__dirname, '../dist', 'favicon.ico')))
app.use('/api', api)
app.use(compression())

app.listen(port, function (err) {
  if (err) {
    console.error('err:', err)
  } else {
    console.info(`===> api server is running at ${config.host}:${config.port}`)
  }
})
