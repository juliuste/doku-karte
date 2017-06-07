'use strict'

const svg = require('virtual-hyperscript-svg')
const stringify = require('virtual-dom-stringify')
const data = require('./paths.json')
const germanCountries = require('../assets/countries.json')

const generate = (countries) => {
	const elements = []
	for(let country in data.paths){
		if(country.toUpperCase() in countries)
			elements.push(svg('a', {class: 'clickable', 'xlink:href':'/?country='+country.toUpperCase(), href: '/?country='+country.toUpperCase()}, [
				svg('path', {id: country.toUpperCase(), fill: countries[country.toUpperCase()].colour, d: data.paths[country].path}),
				svg('title', (germanCountries[country.toUpperCase()] || data.paths[country].name)+' - '+countries[country.toUpperCase()].deg+' Dokumentation'+(countries[country.toUpperCase()].deg>1 ? 'en' : ''))
			]))
		else
			elements.push(svg('path', {id: country.toUpperCase(), fill: '#bbb', d: data.paths[country].path}))
	}
	return svg('svg#map', {'xmlns:xlink': "http://www.w3.org/1999/xlink", width: data.width, height: data.height, viewbox: '0 0 '+data.width+' '+data.height}, elements)
}

module.exports = generate
