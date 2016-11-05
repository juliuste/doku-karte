'use strict'

const dokus = require('doku-tagger')
const fs = require('fs')
const ndjson = require('ndjson')

const write = (data) => {
	const serialize = ndjson.serialize()
	for(let item of data){
		serialize.write(item)
	}
	serialize.end()
	serialize.pipe(fs.createWriteStream('./assets/data.ndjson'))
}

dokus.all().then(write).catch((err) => {throw new Error(err)})