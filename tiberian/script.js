var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

var halfWidth = screenWidth  / 2; 
var halfHeight = screenHeight  / 2;


var mouseX = 0;
var mouseY = -0.3;

var textureUrls = [
	"metal.jpg",
	"metal2.jpg",
	"texture.jpg",
	"texture1.jpg",
	"texture2.jpg",
	"texture3.jpg"
];
var textures = [null];
var currTexture = 0;


var geometryUrls = [
	"Logo_curved",
	"Logo_bevel"
];
var geometries = [];
var currGeometry = 0;


var isMouseClickEnabled = true;


var sceneText;
var sceneDiamond;

var camera;
var renderer;

var clock = new THREE.Clock(  );

// var diamond, text;


function radToDeg( deg ){
	return deg * Math.PI / 180
}




jQuery( document ).ready( function( $ ){


	var diamondMainGroup, diamondOutlineGroup;
	var logoRotateTween;
	var frontMaterial

	var tapped = false;


	function tryWebGL(  ){

		// RENDERER
		// - Text
		renderer = new THREE.WebGLRenderer( { antialias: false, alpha: true } );
		renderer.setSize( screenWidth , screenHeight  );
		renderer.shadowMap.enabled = true;

		renderer.gammaInput = true;
		renderer.gammaOutput = true;

		renderer.toneMappingExposure = 1.5;
		renderer.setClearColor( 0x000000, 0 );
		renderer.autoClear = false;





		$( 'body' ).append( renderer.domElement );
		renderer.domElement.oncontextmenu = function(  ){
			return false;
		}

		// Loading Manager
		var loadingManager = new THREE.LoadingManager(  );
		
		loadingManager.onStart = function( url, itemsLoaded, itemsTotal ){
			$( '#loading-container' ).removeClass( 'hidden' );
		}

		loadingManager.onLoad = function(  ){
			$( '#loading-container' ).addClass( 'hidden' );
			console.log( 'loadedddd' );

		}

		loadingManager.onError = function( url ){
			alert( 'Error loading ' + url );
			throw 'Error loading ' + url;

		}



		
		// INITIALIZE
		sceneText = new THREE.Scene(  );
		sceneDiamond = new THREE.Scene(  );



		camera = new THREE.PerspectiveCamera( 75, screenWidth / screenHeight, 1, 500 );

		camera.position.z = 25;
		camera.position.y = 1;


		window.container = new THREE.Group(  );
		// container.rotation.x = 0.5;
		// scene.add( container );

		diamond = sceneDiamond;
		sceneDiamond.add( container );
		diamondObj = new THREE.Group(  );
		container.add( diamondObj );


		text = sceneText;
		textObj = undefined;




		// LIGHTS
		var directionalLight1 = new THREE.DirectionalLight( 'white' );
		var directionalLight2 = new THREE.DirectionalLight( 'white' );
		
		directionalLight1.position.set( -10, -10, 0 );
		directionalLight2.position.set( 0, 0, 50 );
		
		// scene.add( directionalLight1 );
		// scene.add( directionalLight2 );


		sceneDiamond.add( new THREE.AmbientLight( 0x222222, 40 ) );
		sceneText.add( new THREE.AmbientLight( 0x222222, 5 ) );



		var pointLight1 = new THREE.PointLight( 0xffffff, 1, 100 );
		pointLight1.position.set( 0, 10, 10 );

		var pointLight2 = new THREE.PointLight( 0xffffff );
		pointLight2.position.set( -150, -100, 0 );

		var pointLight3 = new THREE.PointLight( 0xffffff );
		pointLight3.position.set( -28, -5.3, 5 );
		pointLight3.initDistance = 7;
		pointLight3.distance = pointLight3.initDistance;
		pointLight3.intensity = 7;

	 	var pointLight4 = new THREE.PointLight( 0xffffff );
	 	pointLight4.ellipseA = 15;
	 	pointLight4.ellipseB = 3;
		pointLight4.intensity = 18;
		pointLight4.distance = 7;
		pointLight4.position.y = 3;

		// pointLight4.add( new THREE.Mesh( 
		// 	new THREE.SphereGeometry( 1, 5, 5 ),
		// 	new THREE.MeshBasicMaterial( 0xffffff )
		//  ) );


		var pointLight5 = new THREE.PointLight( 0xffffff );
		pointLight5.ellipseA = 20;
		pointLight5.ellipseB = 7;
		pointLight5.intensity = 0.7;
		pointLight5.distance = 20;
		pointLight5.position.y = -3;

		// pointLight5.add( new THREE.Mesh( 
		// 	new THREE.SphereGeometry( 1, 5, 5 ),
		// 	new THREE.MeshBasicMaterial( 0xffffff )
		//  ) );

		// scene.add( pointLight1 );
		sceneText.add( pointLight2 );
		sceneText.add( pointLight3 );
		sceneText.add( pointLight4 );
		sceneText.add( pointLight5 );

		// sceneDiamond.add( pointLight2 );
		// sceneDiamond.add( pointLight3 );
		// sceneDiamond.add( pointLight4 );
		// sceneDiamond.add( pointLight5 );





		// TEXTURES
		var ctLoader = new THREE.CubeTextureLoader( loadingManager )
			.setPath( './assets/textures/' );


		for( var i=0; i<textureUrls.length; i++ ){
			var t = ctLoader.load( [
				textureUrls[i],
				textureUrls[i],
				textureUrls[i],
				textureUrls[i],
				textureUrls[i],
				textureUrls[i]
			] );

			t.minFilter = THREE.LinearFilter;

			textures.push(
				t
			);
		}


		var metalTexture = ctLoader.load( ['metal.jpg','metal.jpg','metal.jpg','metal.jpg','metal.jpg','metal.jpg'] );

		metalTexture.minFilter = THREE.LinearFilter;





		// MATERIALS
		var backMaterial = new THREE.MeshPhysicalMaterial( {
			map: null,
			color: 0x000000,
			metalness: .5,
			roughness: 0,
			opacity: 0.1,
			side: THREE.BackSide,
			transparent: true,
			envMapIntensity: 5,
			premultipliedAlpha: true
		} );

		frontMaterial = new THREE.MeshPhongMaterial( {
			color: 0x02181a, 
			specular: 0xffffff,
			shininess: 100,
			// envMapIntensity: 5,
			envMap: textures[currTexture],
			opacity: 0.3,
			flatShading: true,
			transparent: true
		} );

		var outlineMaterial = new THREE.MeshPhysicalMaterial( {
			map: null,
			color: 0x107d88,
			metalness: 5,
			roughness: 0,
			opacity: 0.01,
			transparent: true,
			premultipliedAlpha: true
		} );

		var textMaterial = new THREE.MeshPhongMaterial( { 
		    color: 0xffffff, 
		    specular: 0xffffff,
		    shininess: 100,
		    envMap: metalTexture,
		    transparent: true
		} );




		

		// GEOMETRIES
		// Called on first loaded obj
		function addLogoMesh( mainMesh, outlineMesh ){
			var logoGroup = new THREE.Group(  );
			var mainGroup = new THREE.Group(  );
			var outlineGroup = new THREE.Group(  );

			diamondMainGroup = mainGroup;
			diamondOutlineGroup = outlineGroup;

			diamondObj.add( logoGroup );
			logoGroup.add( mainGroup );
			logoGroup.add( outlineGroup );


			mainGroup.add( new THREE.Mesh(
				mainMesh,
				frontMaterial
			) );

			mainGroup.add( new THREE.Mesh(
				mainMesh,
				backMaterial
			) );

			outlineGroup.add( new THREE.Mesh(
				outlineMesh,
				outlineMaterial
			) );
		}

		var loader = new THREE.OBJLoader2( loadingManager );
		loader.setPath( './assets/models/' );


		for( var i = 0; i < geometryUrls.length; i++ ){
			loader.load( geometryUrls[i] + ".obj", function( object ){

				var main, outline;

				object.traverse( function( child ){
					if( child instanceof THREE.Mesh ){
						if( child.name == "Main" ){
							main = child.geometry;
						}else if( child.name =="Outline" ){
							outline = child.geometry;
						}

					}
				} );

				geometries.push( {
					main: main,
					outline: outline
				} )

				if( geometries.length == 1 ){
					addLogoMesh( main, outline );
				}
			} );
		}


		loader.load( 'Text.obj', function( object ){
			
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {

					child.material = textMaterial;

					textObj = child;
					sceneText.add( textObj );

				}
			} );

		} )




		// FLARES
		// Front Flares
		var flareFront = new THREE.Group(  );
		var flareShineFront = [];
		diamondObj.add( flareFront );

		var flare1 = new FlareShine( 10, 10, -3.9, 8.1, 0.2 );
		flare1.addFlareTo( flareFront );
		flare1.addAnimation( 0, 700, 200, 300 );
		flareShineFront.push( flare1 );

		var flare2 = new FlareShine( 10, 10, 4, 8.1, 0.2 );
		flare2.addFlareTo( flareFront );
		flare2.addAnimation( 100, 500, 200, 400 );
		flareShineFront.push( flare2 );


		var flare3 = new FlareShine( 7, 7, 0.4, -1.2, 0.2 );
		flare3.addFlareTo( flareFront );
		flare3.addAnimation( 0, 350, 300, 1100 );
		flareShineFront.push( flare3 );


		var flare4 = new FlareShine( 5, 5, -0.4, -1.2, 0.2 );
		flare4.addFlareTo( flareFront );
		flare4.addAnimation( 600, 350, 200, 600 );
		flareShineFront.push( flare4 );



		var flare5 = new FlareShine( 15, 15, -5.8, 5.5, 0.2 );
		flare5.addFlareTo( flareFront );
		flare5.addAnimation( 600, 1000, 200, 600 );
		flareShineFront.push( flare5);

		var flare6 = new FlareShine( 15, 15, 5.8, 5.5, 0.2 );
		flare6.addFlareTo( flareFront );
		flare6.addAnimation( 1100, 1000, 200, 100 );
		flareShineFront.push( flare6 );

		var flare7 = new FlareShine( 7, 7, 1.3, 1.5, 0.2 );
		flare7.LIGHT_DISTANCE *= 100;
		flare7.LIGHT_INTENSITY *= 0.2;
		flare7.addFlareTo( flareFront );
		flare7.addAnimation( 0, 300, 200, 500 );
		flareShineFront.push( flare7 );


		var flare8 = new FlareShine( 7, 7, -1.3, 1.5, 0.2 );
		flare8.LIGHT_DISTANCE *= 100;
		flare8.LIGHT_INTENSITY *= 0.2;
		flare8.addFlareTo( flareFront );
		flare8.addAnimation( 300, 300, 200, 200 );
		flareShineFront.push( flare8 );





		// Back Flares

		var flareBack = new THREE.Group(  );
		flareBack.position.z = -0.9;
		flareBack.rotation.y = Math.PI;
		diamondObj.add( flareBack );


		for( var i=0; i<flareShineFront.length; i++ ){
			var newFlare = flareShineFront[i].clone( false );
			newFlare.addFlareTo( flareBack );

		}




		// ANIMATION

		logoRotateTween = new TWEEN.Tween( { 
				rotationY: 0,
				lightPosX: pointLight3.position.x
			} )
			.to( { 
				rotationY: Math.PI,
				lightPosX: -pointLight3.position.x
			}, 1250 )
			.onUpdate( function(  ){
				diamondObj.rotation.y = this.rotationY;
				pointLight3.position.x = this.lightPosX;

			} )
			.onComplete( function(  ){
				var rotationY;
				if( this.rotationY == Math.PI ){
					rotationY = Math.PI * 2;
				}else{
					logoRotateTween._object.rotationY = 0;
					rotationY = Math.PI;
				}

				logoRotateTween._object.lightPosX *= -1;
				pointLight3.position.x *= -1;

				logoRotateTween.to( { 
					rotationY: rotationY ,
					lightPosX: -pointLight3.position.x
				} );

				pointLight3.distance = 15;

			} )
			.easing( TWEEN.Easing.Cubic.InOut );




		var lightTween = new TWEEN.Tween( { positionX: pointLight3.position.x } )
			.to( { positionX: -pointLight3.position.x }, 1500 )
			.onUpdate( function(  ){
				pointLight3.position.x = this.positionX;


			} )
			.onComplete( function(  ){
				lightTween._object.positionX *= -1;
				pointLight3.position.x *= -1;

				pointLight3.distance = pointLight3.initDistance;

			} )

			.delay( 300 );


		var pause3s = new TWEEN.Tween( {} )
			.to( {}, 5000 );




		// Animation Order
		logoRotateTween.chain( lightTween );
		lightTween.chain( pause3s );
		pause3s.chain( logoRotateTween );



		logoRotateTween.start(  );





		var lightDeg = 180;




		// Render Loop
		var animate = function(  ){
			requestAnimationFrame( animate );

			// diamond.rotation.y += 0.03;

			container.rotation.x += ( - mouseY - container.rotation.x ) * .05;
			container.rotation.y += ( - mouseX - container.rotation.y ) * .05;


			if( textObj != undefined ){
				textObj.rotation.x += ( - ( mouseY / 30 ) - textObj.rotation.x ) * .05;
				textObj.rotation.y += ( - ( mouseX / 30 ) - textObj.rotation.y ) * .05;
			}
			
			lightDeg += 0.5;
			lightDeg %= 361;

			pointLight4.position.x = Math.cos( radToDeg( lightDeg ) ) * pointLight4.ellipseA;
			pointLight4.position.z = Math.sin( radToDeg( lightDeg ) ) * pointLight4.ellipseB;

			pointLight5.position.x = -Math.cos( radToDeg( lightDeg ) ) * pointLight5.ellipseA;
			pointLight5.position.z = Math.sin( radToDeg( lightDeg ) ) * pointLight5.ellipseB;


			// test.animate(  );



			// console.log( clock.getElapsedTime(  ) );

			TWEEN.update(  );


			renderer.clear(  );
			renderer.render( sceneText, camera );
			renderer.render( sceneDiamond, camera );


			
			capturer.capture( renderer.domElement );


			// composer.render(  );
		}

		animate(  );

	}



	try{
		tryWebGL(  );

		$( '.instructions' ).addClass( 'show' );


		var onMouseDown = function( e ){
			function singleTap(  ){
				currGeometry = ( currGeometry + 1 ) % geometryUrls.length;

				var geometry = geometries[currGeometry];

				for( var i=0; i < diamondMainGroup.children.length; i++ ){
					diamondMainGroup.children[i].geometry = geometry.main;
				}

				for( var i=0; i < diamondOutlineGroup.children.length; i++ ){
					diamondOutlineGroup.children[i].geometry = geometry.outline;
				}
			}

			function doubleTap(  ){
				currTexture = ( currTexture + 1 ) % textureUrls.length;

				frontMaterial.envMap = textures[currTexture];
				frontMaterial.needsUpdate = true;
			}
			
			if( isMouseClickEnabled ){

				if( !tapped ){
					tapped = setTimeout( function(  ){
						tapped = false;
						doubleTap(  );

					}, 300 );

				}else{
					clearTimeout( tapped );
					tapped = false;

					singleTap(  );
				}

			}
		}

		var onMouseMove = function( e ){
			if( isMouseClickEnabled ){
				mouseX = ( ( e.clientX - halfWidth ) / 2 ) / 100;
				mouseY = ( ( e.clientY - halfHeight ) / 2 ) / 100;
			}else{
				mouseX = 0;
				mouseY = -0.3;
			}	
		}


		$( document ).on( 'mousemove', 'canvas', onMouseMove );	

		$( document ).on( 'mouseleave', 'canvas', function( e ){
			mouseX = 0;
			mouseY = -0.3;
		} )

		$( document ).on( 'mousedown', 'canvas', onMouseDown );


		$( document ).bind( 'touchstart', 'canvas', function( e ){
			onMouseDown( e );
			onMouseMove( e.touches[0] );
		} )

		$( document ).bind( 'touchmove', 'canvas', function( e ){
			e.preventDefault(  );
			onMouseMove( e.touches[0] );
		} )


		$( window ).resize( function(  ){
			screenWidth = window.innerWidth;
			screenHeight = window.innerHeight;

			halfWidth = screenWidth / 2;
			halfHeight = screenHeight / 2;

			camera.aspect = screenWidth / screenHeight;
			camera.updateProjectionMatrix(  );

			renderer.setSize( screenWidth, screenHeight );
		} )

	}catch( error ){
		$( '#loading-container' ).addClass( 'hidden' );
		$( '#gl-error-container' ).removeClass( 'hidden' );

		$( '#settings-container' ).addClass( 'hidden' );

		$( 'body' ).addClass( 'no-gl' );

		console.log( error );
	}


	



	// UI/UX
	$( '#gl-error-container' ).click( function(  ){
		$( this ).addClass( 'hidden' );
	} )

	$( '.instructions' ).click( function(  ){
		$( this ).removeClass( 'show' );
	} )

	$( '#settings-container' ).mouseenter( function(  ){
		$( '#settings-button' ).click(  );
		console.log( 'enter' )
	} )

	$( '.setting-lock' ).click( function(  ){
		$( this ).toggleClass( 'disabled' );

		if( $( this ).hasClass( 'disabled' ) ){
			isMouseClickEnabled = false;
		}else{
			isMouseClickEnabled = true;
		}
	} )

	$( '.setting-play' ).click( function(  ){
		$( this ).toggleClass( 'stopped' );

		if( $( this ).hasClass( 'stopped' ) ){
			logoRotateTween.end(  );
			logoRotateTween.stop(  );
		}else{
			logoRotateTween.start(  );
		}

	} );


} );