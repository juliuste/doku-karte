'use strict'

const html = require('pithy')
const beautify = require('js-beautify').html

const networks = {
	arte: 'ARTE',
	daserste: 'Das Erste',
	swr: 'SWR',
	mdr: 'MDR',
	dw: 'Deutsche Welle',
	rbb: 'RBB'
}

const fs = require('fs')
const ndjson = require('ndjson')
const data = []
fs.createReadStream('./assets/data.ndjson')
.pipe(ndjson.parse())
.on('data', (d) => {data.push(d)})
const countries = require('./assets/countries.json')

const extractCountry = (iso) => {
	const res = []
	for(let item of data){
		for(let country of item.countries){
			if(country==iso) res.push(item)
		}
	}
	return res
}

const generateTile = (item) => {
	return html.div({class: 'item '+item.network}, [
		html.div('.img', [html.a({href: item.link}, [html.img({src: item.image || '/assets/default.png', alt: item.title})])]),
		html.div('.text', [
			html.h2(null, [html.a({href: item.link}, item.title)]),
			html.p(null, [
				html.span({class: item.network}, networks[item.network]||'ARD/ZDF'),
				'. ',
				item.description
			])
		])
	])
}
const generateTiles = (list) => list.map(generateTile)

const generate = (country) => {
	let document = '<!doctype html>' + html.html(null, [
		html.head(null, [
			html.meta({charset: 'utf-8'}),
			html.meta({name: 'viewport', content: "width=device-width, initial-scale=1.0, user-scalable=no"}),
			html.title(null, 'Doku-Karte'),
			html.link({rel: 'stylesheet', type: 'text/css', href: 'assets/reset.css'}),
			html.link({rel: 'stylesheet', type: 'text/css', href: 'assets/general.css'}),
			html.link({rel: 'stylesheet', type: 'text/css', href: 'assets/country.css'})
		]),
		html.body(null, [
			html.div('#page', [
				html.h1('#title', countries[country.toUpperCase()]),
				html.div('#items', generateTiles(extractCountry(country)))
			]),
			html.span('#footer', [html.a({href: '/impressum'}, 'Impressum & Kontakt')]),
			/*html.script({src: 'assets/jquery.js'}),
			html.script({src: 'assets/main.js'})*/
		])
	])
	return beautify(document)
}

module.exports = generate