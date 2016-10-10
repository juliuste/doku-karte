'use strict'

const dokus = require('doku-tagger')

const write = (data) => process.stdout.write(JSON.stringify(data))

dokus.all().then(write, (err) => {throw new Error(err)})