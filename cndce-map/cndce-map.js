jQuery.fn.extend({
	cndceMap: function(params){
		var defaults = {
			accessToken: 'pk.eyJ1Ijoia2F5ZWNhbmR5IiwiYSI6ImNqaDJ6bDM0eTA2b3UyeG8zdzR0Ym93MTgifQ.fBEF7oQTjBLfW3rIsR2wag',
			mapLayer: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',			
			mapStyle: 'mapbox/streets-v11',
			statesLayerURL: './us-states.json',
			dataURL: './elections.csv',
			paletteRed: ['#fee0d2', '#fc9272', '#de2d26'],
			paletteBlue: ['#deebf7', '#9ecae1', '#3182bd'],
			colorNoData: '#b5b5b5',
			colorIndividual: 'white'
		};

		var $ = jQuery;


		var $mapContainer = this;
		var $hoverContainer = $('.cndce-hover', $mapContainer);
		var $hoverState = $('.cndce-state', $mapContainer);
		var $hoverGov1 = $('.cndce-gov1', $mapContainer);
		var $hoverGov1Pct = $('.cndce-gov1-pct', $mapContainer);
		var $hoverGov2 = $('.cndce-gov2', $mapContainer);
		var $hoverGov2Pct = $('.cndce-gov2-pct', $mapContainer);
		var $hoverGovUndecided = $('.cndce-gov-undecided', $mapContainer);
		var $hoverGovUndecidedPct = $('.cndce-gov-undecided-pct', $mapContainer);
		var $hoverSen1 = $('.cndce-sen1', $mapContainer);
		var $hoverSen1Pct = $('.cndce-sen1-pct', $mapContainer);
		var $hoverSen2 = $('.cndce-sen2', $mapContainer);
		var $hoverSen2Pct = $('.cndce-sen2-pct', $mapContainer);
		var $hoverSenUndecided = $('.cndce-sen-undecided', $mapContainer);
		var $hoverSenUndecidedPct = $('.cndce-sen-undecided-pct', $mapContainer);

		var $tabs = $('.cndce-tabs', $mapContainer);

		var map;
		var statesLayerData;
		var data;

		var statesLayer;



		// Set Default Parameters
		if( params == undefined ){
			params = {};
		}

		for(var param in defaults){
			if(params[param] == undefined)
				params[param] = defaults[param];
		}


		function getStatesLayerColor(properties) {
			var max;
			var candidates;
			var candidate;
		    if($mapContainer.attr('data-tab') == 'governor'){
		    	candidates = [
		    		{
		    			group: properties.Gov1Group,
		    			pct: parseFloat(properties.Gov1Pct)
		    		},{
		    			group: properties.Gov2Group,
		    			pct: parseFloat(properties.Gov2Pct)
		    		}
		    	];

		    }else if($mapContainer.attr('data-tab') == 'senate'){
		    	candidates = [
		    		{
		    			group: properties.Sen1Group,
		    			pct: parseFloat(properties.Sen1Pct)
		    		},{
		    			group: properties.Sen2Group,
		    			pct: parseFloat(properties.Sen2Pct)
		    		}
		    	];
		    }

		    candidate = candidates[0];
		    if(candidates[1].pct > candidates[0].pct)
		    	candidate = candidates[1];



		    if(candidate.group == '')
		    	return params.colorNoData;
		    else if(candidate.group == 'R')
		    	return getStatesLayerColorRed(candidate.pct);
		    else if(candidate.group == 'D')
		    	return getStatesLayerColorBlue(candidate.pct);
		    else
		    	return params.colorIndividual;

		}

		function getStatesLayerColorRed(d){
			return d >= 55 ? params.paletteRed[2] :
				   d >= 52 ? params.paletteRed[1] :
				  			 params.paletteRed[0];
		}

		function getStatesLayerColorBlue(d){
			return d >= 55 ? params.paletteBlue[2] :
				   d >= 52 ? params.paletteBlue[1] :
				  			 params.paletteBlue[0];
		}


		function statesLayerStyle(feature) {
		    return {
		        fillColor: getStatesLayerColor(feature.properties),
		        weight: 2,
		        opacity: 1,
		        color: 'white',
		        dashArray: '3',
		        fillOpacity: 0.7
		    };
		}

		function getStatesLayerByName(stateName){
			var features = statesLayerData.features;

			for(var i=0; i < features.length; i++){
				if(features[i].properties.name == stateName)
					return features[i];
			}

			return false;
		}

		function highlightStatesLayer(e) {
		    var layer = e.target;

		    layer.setStyle({
		        weight: 3.5,
		        color: '#666',
		        dashArray: '',
		        fillOpacity: 0.7
		    });

		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
		}

		function resetStatesLayerStyle(e) {
		    statesLayer.resetStyle(e.target);
		}

		function resetAllStatesLayerStyle(){
			for(var iLayer in statesLayer._layers){
				statesLayer.resetStyle(statesLayer._layers[iLayer]);
			}

		}

		function updateHover(e){
			var properties = e.target.feature.properties;
			$hoverState.text(properties.name);

			$hoverGov1.text(properties.Gov1NameP);
			$hoverGov2.text(properties.Gov2NameP);
			$hoverGov1Pct.text(properties.Gov1Pct);
			$hoverGov2Pct.text(properties.Gov2Pct);
			$hoverGovUndecidedPct.text(properties.GovUndecidedPct);

			$hoverSen1.text(properties.Sen1NameP);
			$hoverSen2.text(properties.Sen2NameP);
			$hoverSen1Pct.text(properties.Sen1Pct);
			$hoverSen2Pct.text(properties.Sen2Pct);
			$hoverSenUndecidedPct.text(properties.SenUndecidedPct);


			// Reset Hide
			$('.no-data', $hoverContainer).removeClass('no-data');


			// Hide if no data
			if(properties.Gov1NameP == '' || properties.Gov2NameP == '')
				$('.cndce-hover-details[data-details="governor"]', $hoverContainer).addClass('no-data');

			if(properties.Sen1NameP == '' || properties.Sen2NameP == '')
				$('.cndce-hover-details[data-details="senate"]', $hoverContainer).addClass('no-data');


			$hoverContainer.addClass('cndce-hovered');

			$hoverContainer.css({
				left: (e.originalEvent.layerX - 20) + 'px',
				top: (e.originalEvent.layerY + 20) + 'px'
			})

			// console.log(e);
		}

		function resetHover(e){
			$hoverContainer.removeClass('cndce-hovered');

		}

		function csvToObject(csvString){

			var lines = csvString.split('\n');

			var properties = lines[0].split(',');

			var objects = [];
			
			for(var i=1; i < lines.length; i++){
				var values = lines[i].split(',');

				var object = {};
				for(var j=0; j < properties.length; j++){
					object[properties[j]] = values[j];
				}


				objects.push(object);
			}

			return objects;
		}

		function toPercentString(number){
			return Math.round(number * 100) + '%';
		}

		function processData(){
			var newFeatures = {
				'type': 'FeaturesCollection',
				'features': []
			};


			for(var i=0; i < data.length; i++){
				var state = getStatesLayerByName(data[i].StateName);

				if(state){
					$.extend(state.properties, data[i]);

					newFeatures.features.push(state);


					// Percent
					state.properties.Gov1Pct = toPercentString(state.properties.Gov1Pct);
					state.properties.Gov2Pct = toPercentString(state.properties.Gov2Pct);
					state.properties.GovUndecidedPct = toPercentString(state.properties.GovUndecidedPct);

					state.properties.Sen1Pct = toPercentString(state.properties.Sen1Pct);
					state.properties.Sen2Pct = toPercentString(state.properties.Sen2Pct);
					state.properties.SenUndecidedPct = toPercentString(state.properties.SenUndecidedPct);
				}

			}

			statesLayerData = newFeatures;
		}


		function loadStatesLayer(){
			// Load States JSON
			$.ajax({
				url: params.statesLayerURL,
				dataType: 'json',
				success: function(json){
					statesLayerData = json;

					loadCSVData();

				},
			})
		}

		function loadCSVData(){
			// Load Data
			$.ajax({
				url: params.dataURL,
				dataType: 'text',
				success: function(csvText){
					data = csvToObject(csvText);

					processData();

					initStatesLayer();

					// console.log('success', csvText);

				}
			})
		}

		function initStatesLayer(){
			statesLayer = L.geoJson(statesLayerData, {
				style: statesLayerStyle,
				onEachFeature: function(feature, layer){
					layer.on({
						mouseover: function(e){
							highlightStatesLayer(e);
							updateHover(e)
						},
						mouseout: function(e){
							resetStatesLayerStyle(e);
							resetHover(e);
						}
					})
				}
			}).addTo(map);
		}

		function initLegends(){
			var legend = L.control({position: 'bottomright'});

			legend.onAdd = function (map) {

			    var div = L.DomUtil.create('div', 'cndce-info cndce-legend'),
			        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
			        labels = [];

			    // loop through our density intervals and generate a label with a colored square for each interval
			    for (var i = 0; i < grades.length; i++) {
			        div.innerHTML +=
			            '<i style="background:' + getStatesLayerColor(grades[i] + 1) + '"></i> ' +
			            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
			    }

			    return div;
			};

			legend.addTo(map);
		}


		function initHover(){
			$hoverContainer.addClass('cndce-info');

		}


		function initMap(){
			$mapContainer.addClass('cndce-map');
			$mapContainer.attr('data-tab', $('.active', $tabs).attr('data-tab'));

			map = L.map($mapContainer.attr('id')).setView([37.8, -96], 4);

			L.tileLayer(params.mapLayer, {
				id: params.mapStyle,
				accessToken: params.accessToken
			}).addTo(map);

			// initLegends();

			loadStatesLayer();

			initHover();
			

		}



		// Events
		$tabs.on('click', '.cndce-tab', function(){
			var $this = $(this);

			$('.cndce-tab', $tabs).removeClass('active');
			$this.addClass('active');

			$mapContainer.attr('data-tab', $this.attr('data-tab'));

			resetAllStatesLayerStyle();
		})


		initMap();

	}
})
