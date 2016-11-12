'use strict'

const html = require('pithy')
const beautify = require('js-beautify').html

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
		html.a({href: item.link}, [
			html.img({src: item.image || '/assets/default.png', alt: item.title}),
			html.span('#link', item.title)
		])
	])
}

const generateTiles = (list) => {
	return html.div('#itembox', list.map(generateTile).concat([html.br(), html.br(), html.a({id: 'back', href: '/'}/*, 'Zurück zur Karte'*/)]))
}

const generate = (country) => {
	let document = '<!doctype html>' + html.html(null, [
		html.head(null, [
			html.meta({charset: 'utf-8'}),
			html.meta({name: 'viewport', content: "width=device-width, initial-scale=1.0, user-scalable=no"}),
			html.title(null, 'Doku-Karte'),
			html.link({rel: 'stylesheet', type: 'text/css', href: 'assets/general.css'}),
			html.link({rel: 'stylesheet', type: 'text/css', href: 'assets/main.css'})
		]),
		html.body(null, [
			html.div('#page', [
				html.h1('#title', countries[country.toUpperCase()]),
				generateTiles(extractCountry(country))
			]),
			html.span('#footer', [html.a({href: '/impressum'}, 'Impressum & Kontakt')]),
			/*html.script({src: 'assets/jquery.js'}),
			html.script({src: 'assets/main.js'})*/
		])
	])
	return beautify(document)
}

module.exports = generate