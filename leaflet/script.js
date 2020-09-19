$( document ).ready( function(  ){



	// Variables

	var params = {



		mapAccessToken: 'pk.eyJ1Ijoia2F5ZWNhbmR5IiwiYSI6ImNqaDJ6bDM0eTA2b3UyeG8zdzR0Ym93MTgifQ.fBEF7oQTjBLfW3rIsR2wag',

		// mapLayer: 'https://api.mapbox.com/styles/v1/kayecandy/cjh32l8f10mnm2sqoxaaknmb9/tiles/256/{z}/{x}/{y}?access_token={accessToken}',
		mapLayer: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',

		mapStyle: 'mapbox.streets',
		// mapStyle: 'mapbox://styles/kayecandy/cjh32l8f10mnm2sqoxaaknmb9',



		geoJsonUrl: './ZIP_CODES.geojson',



		hasTooltip: true,

		hasPopup: false

	}



	





	var zipMap = L.map( 'cndce-zip-map' ).setView( [33, -116.8], 9.5 );





	// jQuery

	var $window = $( window );

	var $mapContainer = $( '#cndce-map-container' );



	var $checkboxContainer = $( '.cndce-checkbox-container', $mapContainer );



	var $neighborhoodContainer = $( '.cndce-neighborhood-container.all', $checkboxContainer );



	var $nearbyContainer = $( '.cndce-neighborhood-container.nearby', $checkboxContainer );



	var $selectedContainer = $( '.cndce-neighborhood-container.selected', $checkboxContainer );





	var $neighborhoodTextbox = $( '.cndce-neighborhood-search', $checkboxContainer );



	var $neighborhoodCheckbox = $( '.cndce-neighborhood-checkbox.template', $checkboxContainer ).clone(  );



	var allNeighborhoodCheckboxes = [];

	var $allNeighborhoodCheckboxes;

	window.allNeighborhoodCheckboxes = allNeighborhoodCheckboxes;





	$neighborhoodCheckbox.removeClass( 'template' );















	// Functions

	function selectZip( layer, isSelected ){



		// Deselect

		if( isSelected ){



			layer.setStyle( {

				fillColor: '#e59e23',

				color: '#ffffff'

			} );



		// Select

		}else{

			layer.setStyle( {

				fillColor: '#ffffff',

				color: '#800026'

			} );



		}



	}



	function onAfterZipGeoJsonGet( geojson ){

		var style = {

			color: "#800026",

		    weight: 1,

		    fillColor: '#ffffff',

		    fillOpacity: 0.8,

		    dashArray: 4

		}



	    L.geoJSON( geojson.features, {

	    	style: style,

	    	onEachFeature: onEachZipFeature

	    } ).addTo( zipMap );



	    $mapContainer.addClass( 'loaded' );

	}

	

	function onEachZipFeature( feature, layer ){

		var name = feature.properties.COMMUNITY + ' (' + feature.properties.ZIP + ')';



		var $checkbox = $neighborhoodCheckbox.clone(  );

		$checkbox.append( name );

		$checkbox.data( 'cndce-layer', layer );

		$checkbox.data( 'cndce-neighborhood', feature.properties.COMMUNITY.toLowerCase(  ) );

		$checkbox.data( 'cndce-zip', feature.properties.ZIP.toString(  ).toLowerCase(  ) );





		$neighborhoodContainer.append( $checkbox );

		layer.$cndceCheckbox = $checkbox;



		allNeighborhoodCheckboxes.push( $checkbox );

		// console.log( layer );



		if( params.hasTooltip )

			layer.bindTooltip( name );



		if( params.hasPopup )

			layer.bindPopup( name );





		layer.on( {

			mouseover: onZipMouseOver,

			mouseout: onZipMouseOut,

			click: onZipClick

		} )

	}



	function onZipMouseOver( e ){

		var layer = e.target;

	}





	function onZipMouseOut( e ){



	}



	function onZipClick( e ){

		var layer = e.target;

		var $input = $( 'input', layer.$cndceCheckbox );



		// selectZip( layer );



		$input.prop( 'checked', !$input.prop( 'checked' ) );

		$input.trigger( 'change' );

	}



	$window.on( 'resize', function( e ){

		if( $window.width(  ) > $window.height(  ) ){



			// Not triggered by keyboard

			if( $( document.activeElement ).attr( 'type' ) != 'text' ){

				$mapContainer.removeClass( 'vertical' );

				$mapContainer.removeClass( 'has-keyboard' );



			}else{

				$mapContainer.addClass( 'has-keyboard' );

			}

		}else{

			$mapContainer.addClass( 'vertical' );

		}

	} )





	$checkboxContainer.on( 'change', '.cndce-neighborhood-checkbox input', function( e ){

		var $this = $( this );

		var $container = $this.parents( '.cndce-neighborhood-checkbox' );





		if( $this.prop( 'checked' ) ){

			$container.appendTo( $selectedContainer )

		}else{

			$container.appendTo( $neighborhoodContainer );

		}



		selectZip( $container.data( 'cndce-layer' ), $this.prop( 'checked' ) );





	} )



	$checkboxContainer.scroll( function( e ){

		if( $checkboxContainer.scrollTop(  ) > 0 ){

			$checkboxContainer.addClass( 'hovered' );

		}else{

			$checkboxContainer.removeClass( 'hovered' );



		}

	} )



	$checkboxContainer.on( 'touchstart', function( e ){

		$checkboxContainer.trigger( 'mouseenter' );



	} )





	$checkboxContainer.on( 'touchleave', function( e ){

		$checkboxContainer.trigger( 'mouseleave' );

	} )





	$checkboxContainer.mouseenter( function( e ){

		if( $mapContainer.hasClass( 'vertical' ) ){

			$checkboxContainer.addClass( 'hovered' );

		}

	} )



	$checkboxContainer.mouseleave( function( e ){

		if( $mapContainer.hasClass( 'vertical' ) ){

			$checkboxContainer.removeClass( 'hovered' );

		}

	} )



	$neighborhoodTextbox.on( 'keyup', function( e ){

		var text = $( this ).val(  ).toLowerCase(  );





		for( var i=0; i<allNeighborhoodCheckboxes.length; i++ ){

			var $this = allNeighborhoodCheckboxes[i];



			if( !$this.parent(  ).hasClass( 'selected' ) ){



				if( $this.data( 'cndce-zip' ).indexOf( text ) == -1 

					&& $this.data( 'cndce-neighborhood' ).indexOf( text ) == -1 ){



					$this.addClass( 'search-hidden' );

				}else{

					$this.removeClass( 'search-hidden' );

				}

			}



		}



	} )



	// Actions



	L.tileLayer( params.mapLayer, {

	    maxZoom: 18,

	    id: params.mapStyle,

	    accessToken: params.mapAccessToken

	} ).addTo( zipMap );







	$.ajax( {

		dataType: 'json',

		url: params.geoJsonUrl,

		success: onAfterZipGeoJsonGet

	} );





	$( window ).trigger( 'resize' );



} )



