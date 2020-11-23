$.fn.extend( {
	cndceEarth: function( params ){
		defaults = {
			earthImg 			: './assets/img/earth_night.jpg',
			earthBumpImg 		: './assets/img/earth_bump.jpg',
			earthSpecularImg	: './assets/img/earth_specular.jpg',

			cloudsAlphaImg		: './assets/img/clouds_alpha.jpg',


			starsImg			: './assets/img/stars.jpg'
		};


		var $canvas = this;
		var canvas = this[0];


		canvas.width = $canvas.outerWidth(  );
		canvas.height = $canvas.outerHeight(  );




		// DEFAULT PARAMS
		if( params == undefined )
			params = {};

		for( var param in defaults ){
			if( !params.hasOwnProperty( param ) )
				params[param] = defaults[param];
		}


		// INIT THREEJS

		var scene = new THREE.Scene(  );

		var camera = new THREE.PerspectiveCamera( 75, canvas.width/canvas.height, 0.1, 1000 );

		var renderer = new THREE.WebGLRenderer( {
			canvas: canvas
		} );
		renderer.setSize( canvas.width, canvas.height );


		var loadingManager = new THREE.LoadingManager(  );
		var textureLoader = new THREE.TextureLoader( loadingManager );



		var light = new THREE.AmbientLight( 0xffffff, 0.1 );
		// scene.add( light );


		var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.7 );
		directionalLight.position.set( 0, 4, -1 );
		scene.add( directionalLight );



		var controls = new THREE.OrbitControls( camera, renderer.domElement );
		// controls.addEventListener( 'change', render ); // remove when using animation loop
		// enable animation loop when using damping or autorotation
		controls.enableDamping = true;
		controls.dampingFactor = 0.12;
		controls.rotateSpeed = 0.05;
		controls.enableZoom = false;



		// Earth Object

		var earthGeometry = new THREE.SphereGeometry( 1, 32, 32 );
		var earthMaterial = new THREE.MeshPhongMaterial(  );
		var earth = new THREE.Mesh( earthGeometry, earthMaterial );

		textureLoader.load( params.earthImg, function( texture ){
			earthMaterial.map = texture;
			earthMaterial.needsUpdate = true;
		} );

		textureLoader.load( params.earthBumpImg, function( texture ){
			earthMaterial.bumpMap = texture;
			earthMaterial.bumpScale = 0.1;

			earthMaterial.needsUpdate = true;
		} );

		textureLoader.load( params.earthBumpImg, function( texture ){
			earthMaterial.specularMap = texture;
			earthMaterial.specular = new THREE.Color( 'grey' );

			earthMaterial.needsUpdate = true;
		} )


		// scene.add( earth );



		// Clouds

		var cloudGeometry = new THREE.SphereGeometry( 1.015, 32, 32 );
		var cloudMaterial = new THREE.MeshPhongMaterial( {
			side			: THREE.DoubleSide,
			opacity			: 0.8,
			transparent		: true,
			depthWrite		: false

		} );
		var cloud = new THREE.Mesh( cloudGeometry, cloudMaterial );


		textureLoader.load( params.cloudsAlphaImg, function( texture ){
			texture.anisotropy = renderer.getMaxAnisotropy(  );
			cloudMaterial.alphaMap = texture;
			cloudMaterial.needsUpdate = true;
		} )


		earth.add( cloud );




		// Stars
		var starsGeometry = new THREE.SphereGeometry( 1000, 32, 32 );

		var starsMaterial = new THREE.MeshBasicMaterial( {
			side 			: THREE.BackSide
		} );

		var	stars = new THREE.Mesh( starsGeometry, starsMaterial );

		textureLoader.load( params.starsImg, function( texture ){

			texture.anisotropy = renderer.getMaxAnisotropy(  );
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( 5, 2 );

			starsMaterial.map = texture;
			starsMaterial.needsUpdate = true;
		} );


		earth.add( stars );


		loadingManager.onLoad = function(  ){
			$( 'body' ).addClass( 'loaded' );
			scene.add( earth );

		}



		camera.position.set( 0, 1.5, 2 );

		var render = function () {
			requestAnimationFrame( render );

			cloud.rotation.y += 0.002;

			earth.rotation.y += 0.0005;
			// earth.rotation.x += 0.0015;

			controls.update(  );

			renderer.render(scene, camera);
		};

		render();



		$( window ).resize( function(  ){
			console.log( 'resized' );


			// Reset canvas size
			$canvas.removeAttr( 'width' );
			$canvas.removeAttr( 'height' );

			$canvas.css( {
				width: '',
				height: ''
			} );

			// Set canvas size
			canvas.width = $canvas.outerWidth(  );
			canvas.height = $canvas.outerHeight(  );

			
			// Update ThreeJS
			camera.aspect = canvas.width / canvas.height;
			camera.updateProjectionMatrix(  );
			renderer.setSize( canvas.width, canvas.height );

		} );


	}
} );