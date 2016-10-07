'use strict'

const parse = (params) => {
	if(params.country) return {status: 'ok', iso: params.country}
	return {status: 'error'}
}

module.exports = parse