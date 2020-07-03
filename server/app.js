import path from 'path'
import Express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import favicon from 'serve-favicon'
import compression from 'compression'
import connectHistoryApiFallback from 'connect-history-api-fallback'
import cors from 'cors'
import logger from './logger'
import { CONFIG } from './const'
import api from './api'
import sync from './models/sync'
import busboy from 'connect-busboy'

const app = Express()
const port = CONFIG.port

app.use(busboy())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser('express_react_cookie'))
app.use(session({
  secret: 'express_react_cookie',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60 * 1000 * 30} // 过期时间
}))
app.use(logger)
// history模式重定向插件 connect-history-api-fallback
app.use('/', connectHistoryApiFallback())
app.use('/', Express.static(path.join(__dirname, '../dist')))
app.use(favicon(path.join(__dirname, '../dist', 'favicon.ico')))
app.use(cors({
  credentials: true, // 未配置会导致cookie丢失无法判断session
  origin: 'http://localhost:8100' // 调试时启动的web地址
})) // 设置跨域
app.use('/api', api)
app.use(compression())

const server = require('http').Server(app)
const io = require('socket.io')(server, {
  origins: `http://${CONFIG.host}:*` // 跨域配置
})

io.on('connection', sync)

server.listen(port, function (err) {
  if (err) {
    console.error('err:', err)
  } else {
    console.info(`===> api server is running at ${CONFIG.host}:${CONFIG.port}`)
  }
})
