function countPerCountry(data){
	countries = {}
	for(item of data){
		for(country of item.countries){
			if(!countries[country]) countries[country] = 1
			else countries[country]++
		}
	}
	return countries
}

function generateColours(countries){
	var res = {}
	for(country in countries){
		res[country] = color(countries[country])
	}
	return res
}

function color(deg){
	if(deg>=10) return '#0d0'
	else if(deg>=5) return '#0c0'
	else if(deg>=3) return '#0b0'
	else if(deg>=1) return '#090'
	return '#bbb'
}

$(document).ready(function(){
	$.getJSON('/assets/data.json', function(data){
		count = countPerCountry(data)
		$('#map').vectorMap({
			map:'world_en',
			enableZoom: false,
			hoverColor: null,
			hoverOpacity: 0.75,
			selectedColor: null,
			color: '#bbb',
			backgroundColor: '#0272B8',
			colors: generateColours(count),
			onRegionClick: function(element, code, region){
				if(code in count) window.location.href =  '/?country='+code;
	    	},
	    	onLabelShow: function(event, label, code){
	    		if(count[code]) label.append(' - '+count[code]+' Dokumentationen');
	    	}
   		})
	})
});