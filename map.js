'use strict'

const html = require('virtual-dom/h')
const stringify = require('virtual-dom-stringify')
const beautify = require('js-beautify').html

const world = require('./map/index')
const fs = require('fs')
const ndjson = require('ndjson')
const data = []
fs.createReadStream('./assets/data.ndjson')
.pipe(ndjson.parse())
.on('data', (d) => {data.push(d)})

function color(deg){
	if(deg>=10) return '#0d0'
	else if(deg>=5) return '#0c0'
	else if(deg>=3) return '#0b0'
	else if(deg>=1) return '#090'
	return '#bbb'
}

const countPerCountry = (data) => {
	const countries = {}
	for(let item of data){
		for(let country of item.countries){
			if(!countries[country]) countries[country] = 1
			else countries[country]++
		}
	}
	return countries
}

function generateColours(countries){
	const res = {}
	for(let country in countries){
		res[country] = {colour: color(countries[country]), deg: countries[country]}
	}
	return res
}

const map = () => {
	return world(generateColours(countPerCountry(data)))
}

const generate = () => {
	let document = '<!doctype html>' + stringify(html('html', [
		html('head', [
			html('meta', {charset: 'utf-8'}),
			html('meta', {name: 'viewport', content: "width=device-width, initial-scale=1.0, user-scalable=no"}),
			html('title', 'Doku-Karte'),
			html('link', {rel: 'stylesheet', type: 'text/css', href: 'assets/reset.css'}),
			html('link', {rel: 'stylesheet', type: 'text/css', href: 'assets/general.css'}),
			html('link', {rel: 'stylesheet', type: 'text/css', href: 'assets/main.css'}),
		]),
		html('body', [
			html('div#page', [
				map(),
				html('span#description', [
					'Auf dieser Karte sind ',
					html('b', [data.length]),
					' ',
					'Dokumentationen aus den Mediatheken von ',
					html('a', {class: 'arte', href: 'http://www.arte.tv/guide/de/plus7/?country=DE'}, 'arte'),
					', ',
					html('a', {class: 'daserste', href: 'http://mediathek.daserste.de/'}, 'Das Erste'),
					', ',
					html('a', {class: 'mdr', href: 'http://www.mdr.de/mediathek/'}, 'mdr'),
					', ',
					html('a', {class: 'srf', href: 'https://www.srf.ch/play/tv'}, 'SRF'),
					', ',
					html('a', {class: 'swr', href: 'http://swrmediathek.de'}, 'SWR'),
					' und ',
					html('a', {class: 'dw', href: 'http://www.dw.com/de/media-center/alle-inhalte/s-100814'}, 'Deutsche Welle'),
					' nach Ländern sortiert eingetragen.'
				]),
			]),
			html('span#footer', [html('a', {href: '/impressum'}, 'Impressum & Kontakt')])
		])
	]))
	return beautify(document)
}

module.exports = generate
