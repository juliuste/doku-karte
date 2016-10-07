'use strict'

const params = require('./params')

const map = require('./map')
const country = require('./country')

const route = (req, res, next) => {
	let p = params(req.query)
	if(!p) return res.status(400).end(map())
	if(p.status=='error') return res.status(400).end(map())
	return res.end(country(p.iso))
}

module.exports = route
