'use strict'

const config       = require('config')
const fs           = require('fs')
const express      = require('express')
const spdy         = require('spdy')
const corser       = require('corser')
const http		   = require('http')
const forceSSL 	   = require('express-force-ssl')
const compression  = require('compression')
const nocache      = require('nocache')
const path         = require('path')

const morgan 	   = require('morgan')
const shorthash    = require('shorthash').unique
const p 		   = require('path')

const impressum = require('./impressum')
const route       = require('./route')

const ssl = {
	  key:  fs.readFileSync(config.key)
	, cert: fs.readFileSync(config.cert)
	, ca:   fs.readFileSync(config.ca)
}



const api = express()
const httpApi = express()

const httpServer = http.createServer(httpApi)
const server = spdy.createServer(ssl, api)

httpApi.use(forceSSL)
httpApi.set('forceSSLOptions', {
  httpsPort: config.port
})

api.use(compression())

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(p.join(__dirname, 'access.log'), {flags: 'a'})

// setup the logger
morgan.token('id', (req, res) => req.headers['x-identifier'] || shorthash(req.ip))
api.use(morgan(':date[iso] :id :method :url :status :response-time ms', {stream: accessLogStream}))


api.use('/assets', express.static('assets'));



api.get('/', route)

api.get('/impressum', (req, res, next) => {
	res.end(impressum())
})

server.listen(config.port, (e) => {
	if (e) return console.error(e)
	console.log(`HTTPS: Listening on ${config.port}.`)
})

httpServer.listen(config.httpPort, (e) => {
	if (e) return console.error(e)
	console.log(`HTTP: Listening on ${config.httpPort}.`)
})
