'use strict'

const html = require('pithy')
const beautify = require('js-beautify').html

const head = () => {
	const elements = [
		html.meta({charset: 'utf-8'}),
		html.meta({name: 'viewport', content: "width=device-width, initial-scale=1.0, user-scalable=no"}),
		html.title(null, 'Impressum & Kontakt | Doku-Karte'),
		html.link({rel: 'stylesheet', type: 'text/css', href: 'assets/reset.css'}),
		html.link({rel: 'stylesheet', type: 'text/css', href: 'assets/general.css'}),
		html.link({rel: 'stylesheet', type: 'text/css', href: 'assets/impressum.css'})
	]
	return html.head(null, elements)
}

const generate = () => {
	let document = '<!doctype html>' + html.html(null, [
		head(),
		html.body(null, [
			html.div('#page', [
				html.h1('#title', 'Impressum & Kontakt'),
				html.p(null, [html.a({href: 'mailto:dokukarte@juliuste.de'}, 'Julius Tens'), ', Schlickweg 10, 14129 Berlin.']),
				html.p(null, ['Dieses Projekt ist ', html.a({href: 'https://github.com/juliuste/doku-karte/blob/master/LICENSE'}, 'MIT-Lizensiert'), '. Der Quellcode ist auf ', html.a({href: 'https://github.com/juliuste/doku-karte'}, 'GitHub'), ' verfügbar.']),
				html.p(null, 'Die Rechte an den verwendeten Vorschaubildern liegen ausschließlich bei den genannten Sendeanstalten.')
			]),
			html.span('#footer', [html.a({href: '/'}, 'Zurück zur Karte')])
		])
	])
	return beautify(document)
}

module.exports = generate