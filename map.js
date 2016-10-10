'use strict'

const html = require('pithy')
const beautify = require('js-beautify').html

const map = () => {
	return html.div('#map')
}

const generate = () => {
	let document = '<!doctype html>' + html.html(null, [
		html.head(null, [
			html.meta({charset: 'utf-8'}),
			html.meta({name: 'viewport', content: "width=device-width, initial-scale=1.0, user-scalable=no"}),
			html.title(null, 'Doku-Karte'),
			html.link({rel: 'stylesheet', type: 'text/css', href: 'assets/main.css'}),
			html.link({rel: 'stylesheet', type: 'text/css', href: 'assets/jqvmap.css'})
		]),
		html.body(null, [
			html.div('#container', [
				map(),
				html.span('#description', [
					'Auf dieser Karte sind Dokumentationen aus den Mediatheken von ',
					html.a({id: 'arte', href: 'http://www.arte.tv/guide/de/plus7/?country=DE'}, 'arte'),
					', ',
					html.a({id: 'mdr', href: 'http://www.mdr.de/mediathek/'}, 'MDR'),
					', ',
					html.a({id: 'swr', href: 'http://swrmediathek.de'}, 'SWR'),
					' und ',
					html.a({id: 'dw', href: 'http://www.dw.com/de/media-center/alle-inhalte/s-100814'}, 'Deutsche Welle'),
					' nach Ländern sortiert eingetragen.'
				]),
			]),
			html.span('#impressum', [html.a({href: '/impressum'}, 'Impressum & Kontakt')]),
			html.script({src: 'assets/jquery.js'}),
			html.script({src: 'assets/jquery.vmap.js'}),
			html.script({src: 'assets/maps/jquery.vmap.world.js', charset: 'utf-8'}),
			html.script({src: 'assets/main.js'})
		])
	])
	return beautify(document)
}

module.exports = generate