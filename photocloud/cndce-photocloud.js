jQuery.fn.extend( {
	cndcePhotocloud: function( params ){
		// Defaults
		var defaults = {
			jsonUrl: 'photo.json',
			fontUrl: './assets/fonts/Roboto-Thin.ttf',

			bgUrl: './assets/img/bg.jpg',

			titleFontSize: 250,
			titleFontHeight: 20,
			titleMaxWidth: 5000,
			titleMaxHeight: 5000,

			labelFontSize: 70,
			longTextFontSize: 20,
			hoverFontSize: 40,

			labelHoverScale: 1,

			photoMinTimeout: 0,
			photoMaxTimeout: 2400,
			photoTimeoutInterval: 200,

			cameraFrustumMax: 10000,
			cameraPositionX: 0,
			cameraPositionY: 0,
			cameraPositionZ: 4500,

			cameraClickDeltaX: 0,
			cameraClickDeltaY: 0,
			cameraClickDeltaZ: 3400,

			cameraDurationPhotoGroup: 3000,
			cameraEasingPhotoGroup: TWEEN.Easing.Back.Out,
			cameraDelayPhotoGroup: 500,

			// startPositionX: 0,
			// startPositionY: 0,

			quadrantPaddingHorizontal: {
				q1: -1000,
				q2: 1000,
				q3: -1000,
				q4: 1000
			},

			quadrantPaddingVertical: {
				q1: 1000,
				q2: 1000,
				q3: -1000,
				q4: -1000
			},

			directionalLightPositionX: 0,
			directionalLightPositionY: 2000,
			directionalLightPositionZ: 4500,

			groupDeltaX: 3000,
			groupDeltaY: 1500,
			groupDeltaZ: 1000,
			groupDeltaInterval: 500,

			photoDeltaX: 2000,
			photoDeltaY: 2000,
			photoDeltaZ: 3000,
			photoDeltaInterval: 100,

			photoCollisionX: 800,
			photoCollisionY: 800,
			photoCollisionZ: 0,
			photoCollisionInterval: 50,
			photoCollisionDuration: 250,
			photoCollisionAfterDuration: 8000,
			photoCollisionEasing: TWEEN.Easing.Cubic.Out,
			photoCollisionAfterEasing: TWEEN.Easing.Linear.None,


			photoHoverScaleX: 1.5,
			photoHoverScaleY: 1.5,
			photoHoverScaleZ: 1,
			photoHoverChangePos: false,
			photoHoverPosZ: 600,
			photoHoverScaleDuration: 300,
			photoHoverScaleEasing: TWEEN.Easing.Quadratic.Out,

			// controlsPanSpeed: 0.8,
			// controlsZoomSpeed: 1.2,
			// controlsRotateSpeed: 0.7,			
			controlsEnableDamping: true,
			controlsDampingFactor: 0.8,
			controlsEnableZoom: true,
			controlsEnableRotate: false,


			goToControlPointDuration: 1500,
			goToControlPointEasing: TWEEN.Easing.Elastic.InOut,


			mouseMoveSpeed: 0.09,
			mouseMoveFactor: 1.5,


			// Params for tweenWaveY
			// waveInterval: 0,
			// waveMaxHeight: 1500,
			// waveHeightDuration: 3000,
			// waveHeightEasing: TWEEN.Easing.Cubic.InOut

			waveDuration: 5000,
			waveEasing: TWEEN.Easing.Linear.None,

			// Params for sine wave
			waveCountRate: 500, /*Lower number = highter wave count*/
			waveSizeRate: 800,

			tooltipOffsetX: 20,
			tooltipOffsetY: 0,

			depthSliderOffsetZ: 800,


			zoomIntensity: 100,
			slideshowIntervalTime: 5000,

			photoLabelCanvas: function( params ){

				// Default params
				var defaults = {
					text: 'Hello World!',
					maxWidth: 10000,
					maxHeight: 10000,
					fontSize: 20,
					bgOpacity: 0.25,
					textAlign: 'left',
					cropWidth: false,
					cropHeight: false
				}

				if( params == undefined )
					params = {};


				for( var param in defaults ){
					if( defaults.hasOwnProperty( param ) ){
						if( !params.hasOwnProperty( param ) ){
							params[param] = defaults[param];
						}
					}
				}


				var labelCanvas = document.createElement( 'canvas' );
				var ctx = labelCanvas.getContext( '2d' );

				labelCanvas.width = params.maxWidth;
				labelCanvas.height = params.maxHeight;

				ctx.fillStyle = 'rgba(0,0,0,' + params.bgOpacity + ')';
				ctx.fillRect( 0, 0, labelCanvas.width, labelCanvas.height );



				// ctx.strokeStyle = 'red';
				ctx.fillStyle = 'white';
				ctx.textAlign = params.textAlign;
				ctx.font = params.fontSize + 'px Roboto';

				// Wrap Text
				var words = params.text.split( ' ' );
				var line = '';

				var x = 0;
				var y = params.fontSize;

				if( params.textAlign == 'center' )
					x = params.maxWidth / 2;

				var maxActualWidth = 0;


				// TODO: Clean implementation
				for( var i=0; i < words.length; i++ ){
					var testLine = line + words[i] + ' ';
					var testWidth = ctx.measureText( testLine ).width;

					if( testWidth > params.maxWidth ){
						ctx.fillText( line, x, y );
						line = words[i];
						y += params.fontSize;

						var lineWidth = ctx.measureText( line ).width;

						if( lineWidth > maxActualWidth )
							maxActualWidth = lineWidth;

					}else{
						line = testLine;
					}
				}
				ctx.fillText( line, x, y );

				var lineWidth = ctx.measureText( line ).width;

				if( lineWidth > maxActualWidth )
					maxActualWidth = lineWidth;



				

				var croppedCanvas = document.createElement( 'canvas' );
				var croppedCtx = croppedCanvas.getContext( '2d' );

				croppedCanvas.width = params.maxWidth;
				croppedCanvas.height = params.maxHeight;

				if( params.cropWidth ){
					croppedCanvas.width = maxActualWidth;
				}
				if( params.cropHeight ){
					croppedCanvas.height = ( y < params.maxHeight ) ? y : params.maxHeight;
				}

				croppedCtx.drawImage( labelCanvas, 0, 0 );


				return croppedCanvas;

			}



		}

		// Variables
		var $document = $( document );

		var $canvas;
		var canvas;

		var $divPhotoCloud = this;
		var $divTooltip;
		var $divTextbox = $( '.cndce-textbox', $divPhotoCloud );

		var $divDepthSlider = $( '.cndce-depth-slider', $divPhotoCloud );
		var $divDepthButton = $( '.cndce-depth-slider-button', $divDepthSlider );


		var $divImgHoverContainer = $( '.cndce-hover-img-container', $divPhotoCloud );

		var $inputTextbox = $( 'input', $divTextbox );

		var scene;
		var camera;
		var renderer;
		var ambientLight;
		var directionalLight;
		var raycaster;
		var controls;
		var clock;
		var loadingManager;

		var objLabels = [];
		var objPhotos = [];

		window.objPhotos = objPhotos;
		window.scene = scene;

		var intersectLabels;
		var intersectPhotos;

		var moveLabel;

		var vectorMoveLabelDelta;

		var animatingGroup;
		var animatingGroupComplete = true;


		var font;
		var photoData;

		var mouse = new THREE.Vector2(  );

		var mouseRotateX = 0;
		var mouseRotateY = 0;

		var halfWidth;
		var halfHeight;



		var $controlPointHtmlImage = $( '.cndce-control-point-html-image' );
		var $controlPointHtmlImageContainer = $( '.cndce-control-point-html-image-container', $controlPointHtmlImage );
		var $controlPointHtmlImageTitle = $( '.cndce-control-point-html-image-title', $controlPointHtmlImage );
		var $controlPointHtmlImageDesc = $( '.cndce-control-point-html-image-desc', $controlPointHtmlImage );

		var $controlPointHtmlCountIndex =  $( '.cndce-control-point-index' );
		var $controlPointHtmlCountTotal = $( '.cndce-control-point-total' );

		var $controlPointHtmlDownloadLink = $( '.cndce-control-point-download-link' );

		var $controlPointHtmlProgress = $( '.cndce-control-point-progress' );

		var $fullScreenImageContainer = $( '.cndce-fullscreen-image-container' );


		var slideshowInterval;




		// Param Set Defaults
		if( params == undefined ){
			params = {};
		}


		for( var param in defaults ){
			if( defaults.hasOwnProperty( param ) ){
				if( !params.hasOwnProperty( param ) ){
					params[param] = defaults[param];
				}
			}
		}

		// Functions
		function changeActiveControlPointByDelta( delta ){
			var $active = $( '.cndce-control-point-image.active' );
			var $activeParent = $active.parent(  );

			var newIndex = ( $active.index(  ) + delta ) % $activeParent.children(  ).length;

			var $newActive = $( '.cndce-control-point-image', $activeParent ).eq( newIndex );
			$newActive.click(  );

			$activeParent.animate( {
				scrollLeft: $newActive.position(  ).left
			} )
		}

		function getRandomIntInclusive( min, max, interval ) {
			if( min == max )
				return min;

			min = Math.ceil( min );
			max = Math.floor( max );


			mod = Math.max( Math.abs( min ), Math.abs( max ) );

			if( interval == undefined )
				interval = 1;

			return ( ( Math.floor( Math.random(  ) * ( max - min + 1 ) ) + min ) * interval ) % mod;
		}

		function getSpriteBoundingBox( sprite ){
			var spriteWidth = sprite.scale.x * sprite.parent.scale.x;
			var spriteHeight = sprite.scale.y * sprite.parent.scale.y;

			var halfSpriteWidth = spriteWidth / 2;
			var halfSpriteHeight = spriteHeight / 2;

			sprite.updateMatrixWorld(  );

			var minVector = new THREE.Vector3(  );
			minVector.setFromMatrixPosition( sprite.matrixWorld );

			var maxVector = minVector.clone(  );

			minVector.x -= halfSpriteWidth;
			minVector.y -= halfSpriteHeight;

			minVector.project( camera );

			minVector.x = ( minVector.x * halfWidth ) + halfWidth;
			minVector.y = - ( minVector.y * halfHeight ) + halfHeight;



			maxVector.x += halfSpriteWidth;
			maxVector.y += halfSpriteHeight;


			maxVector.project( camera );
			maxVector.x = ( maxVector.x * halfWidth ) + halfWidth;
			maxVector.y = - ( maxVector.y * halfHeight ) + halfHeight;



			var min = new THREE.Vector3(
				Math.min( minVector.x, maxVector.x ),
				Math.min( minVector.y, maxVector.y ),
				Math.min( minVector.z, maxVector.z )
			);

			var max = new THREE.Vector3(
				Math.max( minVector.x, maxVector.x ),
				Math.max( minVector.y, maxVector.y ),
				Math.max( minVector.z, maxVector.z )
			);

			return{
				min: min,
				max: max,
				width: spriteWidth,
				height: spriteHeight
			};
		}


		function getPhotosWithTag( tag ){
			var taggedPhotos = [];

			for( var i=0; i < objPhotos.length; i++ ){
				var meshPhotoData = objPhotos[i].userData.photoData;

				if( meshPhotoData.tags != undefined ){
					if( objPhotos[i].userData.photoData.tags.indexOf( tag ) != -1 )
						taggedPhotos.push( objPhotos[i] );
				}

				
			}

			return taggedPhotos;
		}

		function getMouseRaycastWithTargetZ( targetZ, parent ){
			// TODO: Find formula
			var target = raycaster.ray.at(0);
			
			for( var i=1; target.z > targetZ; i++ ){
				target = raycaster.ray.at(i)
			}

			if( parent != undefined )
				target = parent.worldToLocal( target );

			return target;
		}

		function updateSpriteBoundingBox( mesh ){
			mesh.userData.boundingBox = getSpriteBoundingBox( mesh.children[0] );

			return mesh.userData.boundingBox;
		}

		function isPointInBox( point, box ){
			return point.x >= box.min.x && point.x <= box.max.x
				&& point.y >= box.min.y && point.y <= box.max.y;
		}

		function isBoxesIntersecting( box1, box2 ){

			return !(box1.min.x > box2.max.x
			    || box1.max.x < box2.min.x
			    || box1.min.y > box2.max.y
			    || box1.max.y < box2.min.y );
		}

		function isThreeJsEnabled(){
			return !( $divPhotoCloud.hasClass( 'depth-clicked' ) 
							|| $divPhotoCloud.hasClass( 'html-active' )
							|| $divPhotoCloud.hasClass( 'show-control-point-html' )
							|| $divPhotoCloud.hasClass( 'img-hover-click-active' ) )
		}

		function intersectBoundingBoxes( box, intersectObjects, isIntersectAll ){
			if( isIntersectAll == undefined )
				isIntersectAll = true;

			var intersected = [];

			for( var i=0; i < intersectObjects.length; i++ ){
				var intersectBox = intersectObjects[i].userData.boundingBox;

				if( intersectBox != undefined && intersectBox != box ){
					if( isBoxesIntersecting( box, intersectBox ) ){
						intersected.push( intersectObjects[i] );

						if( isIntersectAll )
							return intersected;
					}
				}
			}

			return intersected;
		}

		function intersectRayToBoundingBoxes( objects ){
			var intersected = [];

			for( var i=0; i<objects.length; i++ ){
				var inverseMatrix = new THREE.Matrix4(  );
				var ray = new THREE.Ray(  );

				inverseMatrix.getInverse( objects[i].matrixWorld );
				ray.copy( raycaster.ray );
				ray.applyMatrix4( inverseMatrix );

				if( ray.intersectsBox( objects[i].geometry.boundingBox ) ){
					intersected.push( objects[i] );
				}
			}

			return intersected;
		}

		function intersectSpriteBoundingBox( pos, objects, returnAll ){
			if( returnAll == undefined )
				returnAll = true;

			var intersects = [];

			for( var i=0; i < objects.length; i++ ){
				updateSpriteBoundingBox( objects[i] );

				if( isPointInBox( pos, objects[i].userData.boundingBox ) ){
					intersects.push( objects[i] );

					if( !returnAll )
						return intersects;
				}

				
			}

			return intersects;
		}

		function create3DTextMesh( text ){
			// 3D Title
			var text = new THREE.TextGeometry(
				text,
				{
					font: font,
					size: params.titleFontSize,
					height: params.titleFontHeight
				}
			);

			var material = new THREE.MeshLambertMaterial( {
				color: 0xffffff
			} );

			var mesh = new THREE.Mesh( text, material );

			text.computeBoundingBox(  );

			return mesh;
		}

		function create2DTextMesh( text ){

			// Add in group to match photo group structure
			var spriteGroup = new THREE.Group(  );

			// TODO: Add font size as possible json parameter
			var fontSize = params.titleFontSize

			// TODO: Add maxWidth and maxHeight properties as possible json parameter
			var titleTexture = new THREE.CanvasTexture( 
				params.photoLabelCanvas( {
					text: text,
					maxWidth: params.titleMaxWidth,
					maxHeight: params.titleMaxHeight,
					fontSize: fontSize,
					cropWidth: true,
					cropHeight: true,
					bgOpacity: 0
				} ), 

				THREE.UVMapping
			);

			var spriteMaterial = new THREE.SpriteMaterial( {
				map: titleTexture,
				color: 0xffffff,
				transparent: true
			} )

			var sprite = new THREE.Sprite( 
				spriteMaterial
			 );

			sprite.scale.set( titleTexture.image.width, titleTexture.image.height, 1 );

			spriteGroup.add( sprite );

			return spriteGroup;

		}


		function create3DPhotoMesh( photoTexture ){
			var photoMaterial = new THREE.MeshBasicMaterial( {
				map: photoTexture
			} );

			var photoGeometry = new THREE.PlaneGeometry( photoTexture.image.width, photoTexture.image.height );

			var photoMesh = new THREE.Mesh( photoGeometry, photoMaterial );

			photoGeometry.computeBoundingBox(  );

			return photoMesh;
		}

		function create2DPhotoMesh( photoTexture ){
			// Add in group to match photo group structure
			var spriteGroup = new THREE.Group(  );

			var spriteMaterial = new THREE.SpriteMaterial( {
				map: photoTexture
			} );

			var sprite = new THREE.Sprite( spriteMaterial );

			sprite.scale.set(
				photoTexture.image.width,
				photoTexture.image.height,
				1
			);

			spriteGroup.add( sprite );

			return spriteGroup;
		}

		function createPhotoGroup( data ){
			var photoGroup = new THREE.Group(  );

			for( var j=0; j<data.photos.length; j++ ){
				var planeGroup = new THREE.Group(  );

				var texture = data.photos[j].texture;

				// 3D Images
				// var geometry = new THREE.PlaneGeometry( texture.image.width, texture.image.height );
				// var material = new THREE.MeshBasicMaterial( {
				// 	side: THREE.DoubleSide,
				// 	map: texture
				// } );
				// var plane = new THREE.Mesh( geometry, material );

				var material = new THREE.SpriteMaterial( {
					map: texture
				} );
				var plane = new THREE.Sprite( material );


				plane.scale.set(
					texture.image.width,
					texture.image.height,
					1
				);

				plane.name = 'image';



				// DOM Hover Image
				var $hoverDiv = $( '<div class="cndce-hover-div"></div>' );

				var $hoverClose = $( '<div class="cndce-hover-close"></div>' )
				$hoverDiv.append( $hoverClose );

				var $hoverImage = $( data.photos[j].texture.image ).clone(  );
				$hoverImage.addClass( 'cndce-hover-img' );
				$hoverDiv.append( $hoverImage );


				var $hoverText = $( '<div class="cndce-hover-text"></div>' );
				if( data.photos[j].label != undefined )
					$hoverText.append( '<h1>' + data.photos[j].label + '</h1>' )

				if( data.photos[j].longText != undefined )
					$hoverText.append( '<p>' + data.photos[j].longText + '</p>' );

				$hoverText.addClass( 'cndce-scrollbar scrollbar-macosx' );
				// $hoverText.scrollbar(  );

				$hoverDiv.append( $hoverText );


				$divImgHoverContainer.append( $hoverDiv );

				planeGroup.userData.$hoverDiv = $hoverDiv;


				// Make sure data.photos[j] has tags
				if( data.photos[j].tags == undefined )
					data.photos[j].tags = [];


				planeGroup.userData.index = objPhotos.length;
				planeGroup.userData.photoData = data.photos[j];
				planeGroup.userData.labelHoverScale = ( data.photos[j].labelHoverScale != undefined ) ? data.photos[j].labelHoverScale : params.labelHoverScale;


				planeGroup.add( plane );


				// Label
				if( data.photos[j].label != undefined ){

					var fontSize = ( data.photos[j].labelFontSize != undefined ) ? data.photos[j].labelFontSize : params.labelFontSize;

					var labelTexture = new THREE.CanvasTexture( 
						params.photoLabelCanvas( {
							text: data.photos[j].label,
							maxWidth: texture.image.width,
							maxHeight: texture.image.height,
							fontSize: fontSize,
							textAlign: 'center'
						} ),

						THREE.UVMapping 
					);
					

					var spriteMaterial = new THREE.SpriteMaterial( {
						map: labelTexture,
						color: 0xffffff,
						transparent: true
					} )

					// spriteMaterial.map.offset.set( -0.5, -0.5 );

					var sprite = new THREE.Sprite( 
						spriteMaterial
					 )


					sprite.position.set( 0, 0, 20 );

					sprite.scale.set( labelTexture.image.width, labelTexture.image.height, 0 );

					sprite.name = 'label';

					planeGroup.add( sprite );

				}

				// Long Text
				if( data.photos[j].longText != undefined ){
					var fontSize = ( data.photos[j].longTextFontSize != undefined ) ? data.photos[j].longTextFontSize : params.longTextFontSize;

					var labelTexture = new THREE.CanvasTexture( 
						params.photoLabelCanvas( {
							text: data.photos[j].longText,
							maxWidth: texture.image.width,
							maxHeight: texture.image.height,
							fontSize: fontSize,
							textAlign: 'center'
						} ), 

						THREE.UVMapping 
					);
					

					var spriteMaterial = new THREE.SpriteMaterial( {
						map: labelTexture,
						color: 0xffffff,
						transparent: true
					} )

					// spriteMaterial.map.offset.set( -0.5, -0.5 );

					var sprite = new THREE.Sprite( 
						spriteMaterial
					 )


					sprite.position.set( 0, 0, 1 );

					sprite.scale.set( labelTexture.image.width, labelTexture.image.height, 0 );

					sprite.name = 'longText';

					planeGroup.add( sprite );
				}

				// Hover Text
				if( data.photos[j].hoverText != undefined ){

					var fontSize = ( data.photos[j].hoverFontSize != undefined ) ? data.photos[j].hoverFontSize : params.hoverFontSize;

					var labelTexture = new THREE.CanvasTexture( 
						params.photoLabelCanvas( {
							text: data.photos[j].hoverText,
							maxWidth : texture.image.width,
							maxHeight: texture.image.height,
							fontSize: fontSize,
							opacity: 1,
							textAlign: 'center',
							cropHeight: true
						} ), 

						THREE.UVMapping 
					);
					

					var spriteMaterial = new THREE.SpriteMaterial( {
						map: labelTexture,
						color: 0xffffff,
						transparent: true,
						opacity: 0
					} )

					// spriteMaterial.map.offset.set( -0.5, -0.5 );

					var sprite = new THREE.Sprite( 
						spriteMaterial
					 )


					// texture.image.height

					sprite.position.set( 0, -( labelTexture.image.height + texture.image.height ) / 2, 30 );

					sprite.scale.set( labelTexture.image.width, labelTexture.image.height, 0 );

					sprite.name = 'hoverText';

					planeGroup.add( sprite );
				}
				

				photoGroup.add( planeGroup );
			}

			return photoGroup;
		}

		function initScrollbars(  ){
			$( '.cndce-scrollbar' ).scrollbar(  );
		}


		function initThreeJs(  ){
			var width = $divPhotoCloud.width(  );
			var height = $divPhotoCloud.height(  );


			halfWidth = width / 2;
			halfHeight = height / 2;


			scene = new THREE.Scene(  );
			camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, params.cameraFrustumMax );
			// camera = new THREE.OrthographicCamera( - width, width, height - height, 0.1, params.cameraFrustumMax );

			camera.position.x = params.cameraPositionX;
			camera.position.y = params.cameraPositionY;
			camera.position.z = params.cameraPositionZ;

			camera.userData.target = new THREE.Vector3( 0, 0, 0 );


			camera.lookAt( camera.userData.target );


			window.scene = scene;

			ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
			scene.add( ambientLight );

			directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
			directionalLight.position.set(
				params.directionalLightPositionX,
				params.directionalLightPositionY,
				params.directionalLightPositionZ
			);
			scene.add( directionalLight );


			renderer = new THREE.WebGLRenderer( {
				// canvas: canvas
				antialias: true,
				alpha: true
			} );
			renderer.setSize( width, height );
			renderer.setPixelRatio( window.devicePixelRatio );

			$divPhotoCloud.append( renderer.domElement );

			canvas = renderer.domElement;
			$canvas = $( canvas );

			

			// canvas


			// Raycaster
			raycaster = new THREE.Raycaster(  );





			clock = new THREE.Clock(  );

			// controls = new THREE.TrackballControls( camera );
			controls = new THREE.OrbitControls( camera, renderer.domElement );
			// controls.rotateSpeed = params.controlsRotateSpeed;
			// controls.zoomSpeed = params.controlsZoomSpeed;
			// controls.panSpeed = params.controlsPanSpeed;

			controls.enableDamping = params.controlsEnableDamping;
			controls.dampingFactor = params.controlsDampingFactor;
			controls.enableZoom = params.controlsEnableZoom;
			controls.enableRotate = params.controlsEnableRotate;


			loadingManager = new THREE.LoadingManager(  );
			loadingManager.onLoad =  loadersFinished ;




		}

		function loadersFinished(  ){
			for( var i=0; i<photoData.length; i++ ){
				var cluster = new THREE.Group(  );
				// var photoGroup = new THREE.Group(  );


				cluster.position.x += getRandomIntInclusive( -params.groupDeltaX, params.groupDeltaX, params.groupDeltaInterval );
				cluster.position.y += getRandomIntInclusive( -params.groupDeltaY, params.groupDeltaY, params.groupDeltaInterval );
				cluster.position.z += getRandomIntInclusive( -params.groupDeltaZ, 0, params.groupDeltaInterval );


				// Add Text
				var mesh;

				if( photoData[i].nameImage != undefined ){
					mesh = create2DPhotoMesh( photoData[i].nameTexture );
				}else{
					mesh = create2DTextMesh( photoData[i].name );

				}


				cluster.add( mesh );
				objLabels.push( mesh );


				var photoGroup = createPhotoGroup( photoData[i] );
				mesh.userData.photoGroup = photoGroup;


				scene.add( cluster );
			}

			$( 'body' ).addClass( 'cndce-photocloud-loaded' );

		}

		function loadFont(  ){
			var fontLoader = new THREE.TTFLoader( loadingManager );

			fontLoader.load(
				params.fontUrl,
				function( json ){
					font = new THREE.Font( json );
				}
			);
		}


		function loadTextures(  ){
			var loader = new THREE.TextureLoader( loadingManager );

			for( var i=0; i<photoData.length; i++ ){
				// photoData[i].textures = [];

				if( photoData[i].nameImage != undefined ){
					var nameTexture = loader.load( photoData[i].nameImage );

					photoData[i].nameTexture = nameTexture;
				}

				// Load Textures
				for( var j=0; j<photoData[i].photos.length; j++ ){
					var texture = loader.load( photoData[i].photos[j]['url'] );

					photoData[i].photos[j].texture = texture;

				}
			}

		}


		function showControlPoint( mesh, $controlPoint, isShow ){
			// console.log(mesh);


			var $imagesContainer = $( '.cndce-control-point-images', $controlPoint );

			if( $imagesContainer.hasClass( 'cndce-scrollbar' ) ){
				$imagesContainer = $( '.scroll-content', $imagesContainer );
			}

			var $images = $( '.cndce-control-point-image[data-uuid="' + mesh.uuid + '"]', $imagesContainer );


			// Images container does not exist, add image DOM
			if( $images.length == 0 ){

				var image = mesh.getObjectByName( 'image' ).material.map.image
				// var label = mesh.getObjectByName( 'label' ).material.map.image;
				var $imageClonePreview = $( image ).clone( true );
				var $imageCloneFullscreen = $imageClonePreview.clone( true );

				var $imageContainer = $( '<div class="cndce-control-point-image"></div>' );

				$imageClonePreview.addClass( 'cndce-clone preview' );
				$imageCloneFullscreen.addClass( 'cndce-clone fullscreen' );

				$imageContainer.attr( 'data-uuid', mesh.uuid );
				$imageContainer.data( 'cndce-mesh', mesh );

				$imagesContainer.append( $imageContainer );
				$imageContainer.append( image );
				$imageContainer.append( $imageClonePreview );
				$imageContainer.append( $imageCloneFullscreen );
				// $imageContainer.append( label );

				$images = $imageContainer;


			}



			if( isShow ){
				$images.addClass( 'show' );
			}else{
				$images.removeClass( 'show' );
			}

		}


		// Load JSON
		$.ajax( {
			dataType: 'json',
			url: params.jsonUrl,
			success: function( data ){
				photoData = data;

				

				initThreeJs(  );

				// Load Objects
				
				loadFont(  );
				loadTextures(  );


				// Init scrollbars
				initScrollbars(  );
				window.initScrollbars = initScrollbars;


				
				render(  );

			}
		} )

		

		// Misc
		$divPhotoCloud.addClass( 'cndce-photocloud' );

		$divTooltip = $( '<div class="cndce-tooltip"></div>' );

		$divPhotoCloud.prepend( $divTooltip );


		$divDepthSlider.data( 'position', 0 );
			

		// Tweens
		function tweenOverlap( mesh ){
			var boundingBox = updateSpriteBoundingBox( mesh );


			var intersected = intersectBoundingBoxes( boundingBox, objPhotos, false );

			var positionX = { min: -params.photoDeltaX, max: params.photoDeltaX };
			var positionY = { min: -params.photoDeltaY, max: params.photoDeltaY };


			var random = {
				x: getRandomIntInclusive( -params.photoCollisionX, params.photoCollisionX, params.photoCollisionInterval ),
				y: getRandomIntInclusive( -params.photoCollisionY, params.photoCollisionY, params.photoCollisionInterval ),
				z: getRandomIntInclusive( -params.photoCollisionZ, params.photoCollisionZ, params.photoCollisionInterval )
			}

			var position = {
				x: mesh.position.x + random.x,
				y: mesh.position.y + random.y,
				z: mesh.position.z + random.z
			}


			var quadrant = mesh.userData.photoData.quadrant;

			if( quadrant != undefined ){
				if( quadrant == 1 ){
					if( position.x > params.quadrantPaddingHorizontal.q1 ){
						position.x = params.quadrantPaddingHorizontal.q1;
					}

					if( position.y < params.quadrantPaddingVertical.q1 ){
						position.y = params.quadrantPaddingVertical.q1;
					}

				}else if( quadrant == 2 ){
					if( position.x < params.quadrantPaddingHorizontal.q2 ){
						position.x = params.quadrantPaddingHorizontal.q2;
					}

					if( position.y < params.quadrantPaddingVertical.q2 ){
						position.y = params.quadrantPaddingVertical.q2;
					}

				}else if( quadrant == 3 ){
					if( position.x > params.quadrantPaddingHorizontal.q3 ){
						position.x = params.quadrantPaddingHorizontal.q3;
					}

					if( position.y > params.quadrantPaddingVertical.q3 ){
						position.y = params.quadrantPaddingVertical.q3;
					}

				}else if( quadrant == 4 ){
					if( position.x < params.quadrantPaddingHorizontal.q4 ){
						position.x = params.quadrantPaddingHorizontal.q4;
					}

					if( position.y > params.quadrantPaddingVertical.q4 ){
						position.y = params.quadrantPaddingVertical.q4;
					}
				}
			}



			var tween = new TWEEN.Tween( {
				x: mesh.position.x,
				y: mesh.position.y,
				z: mesh.position.z,
				mesh: mesh
			} );

			mesh.userData.overlapTween = tween;

			tween.to( {
				x: position.x,
				y: position.y,
				z: position.z
			}, params.photoCollisionDuration )

			.onUpdate( function(  ){
				this.mesh.position.x = this.x;
				this.mesh.position.y = this.y;
				// this.mesh.position.z = this.z;
			} )



			// Tween for looking for position
			if( intersected.length > 0 || mesh.userData.nTweenOverlap == 0 ){

				tween.easing( params.photoCollisionEasing )

				
				tween.onComplete( function(  ){
					this.mesh.userData.nTweenOverlap++;
					tweenOverlap( this.mesh );

				} )

				tween.start(  );



			// Tween for subtle floating movement
			}else{

				mesh.userData.tween = tween;

				tween.to( {
					x: mesh.position.x + random.x,
					y: mesh.position.y + random.y,
					z: mesh.position.z + random.z
				}, params.photoCollisionAfterDuration );

				tween.easing( params.photoCollisionAfterEasing );

				tween.repeat( Infinity );
				tween.yoyo( true );

				// tween.start(  );

			}
		}

		function tweenWaveZ( mesh ){

			var positionX = { min: -params.photoDeltaX, max: params.photoDeltaX };
			var positionY = { min: -params.photoDeltaY, max: params.photoDeltaY };

			var quadrant = mesh.userData.photoData.quadrant;

			if( quadrant != undefined ){
				if( quadrant == 1 ){
					positionX.max = params.quadrantPaddingHorizontal.q1;
					positionY.min = params.quadrantPaddingVertical.q1;


				}else if( quadrant == 2 ){
					positionX.min = params.quadrantPaddingHorizontal.q2;
					positionY.min = params.quadrantPaddingVertical.q2;

 
				}else if( quadrant == 3 ){
					positionX.max = params.quadrantPaddingHorizontal.q3;
					positionY.max = params.quadrantPaddingVertical.q3;

 
				}else if( quadrant == 4 ){
					positionX.min = params.quadrantPaddingHorizontal.q4;
					positionY.max = params.quadrantPaddingVertical.q4;

				}
			}

			var startPosition = {
				x: getRandomIntInclusive( positionX.min, positionX.max, params.photoDeltaInterval ),
				y: getRandomIntInclusive( positionY.min, positionY.max, params.photoDeltaInterval ),
				z: camera.position.z + 500,
				mesh: mesh
			}


			mesh.position.set(
				startPosition.x,
				startPosition.y,
				startPosition.z
			);

			mesh.userData.isTweenWaveZComplete = false;


			// Tween
			var tween = new TWEEN.Tween( startPosition )


			.to( {
				z: getRandomIntInclusive( -params.photoDeltaZ, -200, params.photoDeltaInterval )
			}, params.waveDuration )

			.onUpdate( function(  ){
				this.mesh.position.z = this.z;
				this.mesh.position.y = Math.sin( this.z / params.waveCountRate ) * params.waveSizeRate;
	
			} )

			.onComplete( function(  ){
				//animatingGroup = undefined;
				animatingGroupComplete = true;
				this.mesh.userData.isTweenWaveZComplete = true;
				this.mesh.userData.nTweenOverlap = 0;

				tweenOverlap( this.mesh );

			} )

			.easing( params.waveEasing )

			.delay(  getRandomIntInclusive( params.photoMinTimeout, params.photoMaxTimeout, params.photoTimeoutInterval ) )

			.start(  );
		}

		function tweenWaveY( mesh, y ){
			var tweenDuration = params.waveHeightDuration / 2;

			var tweenB = new TWEEN.Tween( {
				y: y,
				mesh: mesh
			} )

			.to( {
				y: mesh.position.y
			}, tweenDuration )

			.onUpdate( function(  ){
				this.mesh.position.y = this.y;
				
			} )

			.onComplete( function(  ){
			} )

			// .delay( tweenDuration / 2 )

			.easing( params.waveHeightEasing );


			var tweenA = new TWEEN.Tween( {
				y: mesh.position.y,
				mesh: mesh
			} )

			.to( {
				y: y
			}, tweenDuration )

			.onUpdate( function(  ){
				this.mesh.position.y = this.y;	
				
			} )

			.chain( tweenB )

			.easing( params.waveHeightEasing )

			.delay(  getRandomIntInclusive( params.photoMinTimeout, params.photoMaxTimeout, params.photoTimeoutInterval ) )


			.start(  );
		}

		function tweenLookAtPhotoGroup(  ){

			var ratio = 1;

			if( $divDepthSlider.data( 'zoomRatio' ) != undefined ){
				ratio = 1 - $divDepthSlider.data( 'zoomRatio' );
			}

			$divPhotoCloud.addClass( 'camera-photogroup-animating' );

			var tween = new TWEEN.Tween( {
				posX: camera.position.x,
				posY: camera.position.y,
				posZ: camera.position.z,

				targetX: camera.userData.target.x,
				targetY: camera.userData.target.y,
				targetZ: camera.userData.target.z
			} )

			.to( {
				posX: ( animatingGroup.parent.position.x + params.cameraClickDeltaX ),
				posY: ( animatingGroup.parent.position.y + params.cameraClickDeltaY ),
				posZ: ( animatingGroup.parent.position.z + params.cameraClickDeltaZ ) * ratio,

				targetX: animatingGroup.parent.position.x,
				targetY: animatingGroup.parent.position.y,
				targetZ: animatingGroup.parent.position.z
			}, params.cameraDurationPhotoGroup )

			.onUpdate( function(  ){
				if( animatingGroup != undefined ){
					camera.lookAt( animatingGroup.parent.position );

					camera.position.set(
						this.posX,
						this.posY,
						this.posZ
					);

					camera.userData.target.set(
						this.targetX,
						this.targetY,
						this.targetZ
					);


					// camera.lookAt( camera.userData.target );
					controls.target = camera.userData.target;
					controls.update(  );
					
				}
				
			} )

			.onComplete( function(  ){
				$divPhotoCloud.removeClass( 'camera-photogroup-animating' );
			} )


			.easing( params.cameraEasingPhotoGroup )

			.delay( params.cameraDelayPhotoGroup )

			.start(  );
		}



		function tweenHoverScale( mesh, hoverType ){
			var to, from;

			if( !mesh.userData.isTweenWaveZComplete )
				return;

			if( hoverType == undefined )
				hoverType = 'in';

			var hoverText = mesh.getObjectByName( 'hoverText' );
			var labelMesh = mesh.getObjectByName( 'label' );
			var longText = mesh.getObjectByName( 'longText' );


			if( hoverType == 'in' ){
		
				var hoverZ = params.groupDeltaZ;

				var newPos = raycaster.ray.at( params.photoHoverPosZ );

				newPos = mesh.parent.parent.worldToLocal( newPos );


				var labelHoverScale = mesh.userData.labelHoverScale;

				mesh.userData.preHoverPos = mesh.position.clone(  );

				if( labelMesh != undefined ){
					mesh.userData.preHoverLabelScale = labelMesh.scale.clone(  );
				}


				from = {
					scaleX: mesh.scale.x,
					scaleY: mesh.scale.y,
					scaleZ: mesh.scale.z,
					posX: mesh.position.x,
					posY: mesh.position.y,
					posZ: mesh.position.z,
					opacity: 1,
					mesh: mesh,
					hoverType: hoverType,
					hasLongText: false
				}

				to = {
					scaleX: params.photoHoverScaleX,
					scaleY: params.photoHoverScaleY,
					scaleZ: params.photoHoverScaleZ,
					posX: newPos.x,
					posY: newPos.y,
					posZ: newPos.z,
					opacity: 0
				}


				if( labelMesh != undefined ){
					from.labelScaleX = labelMesh.scale.x;
					from.labelScaleY = labelMesh.scale.y;
					from.labelMesh = labelMesh;

					to.labelScaleX = labelMesh.scale.x * labelHoverScale;
					to.labelScaleY = labelMesh.scale.y * labelHoverScale;

					if( longText != undefined ){
						from.hasLongText = true;		
					}
				}


				if( mesh.userData.overlapTween != undefined ){
					mesh.userData.overlapTween.stop(  );
				}else{
					// console.log('overlap undefined');

				}


				// HoverText
				if( hoverText != undefined ){
					hoverText.material.opacity = 1;
				}


			}else{

				// console.log( mesh.position, mesh.userData.preHoverPos );
				if( mesh.userData.preHoverPos == undefined )
					mesh.userData.preHoverPos = mesh.position.clone(  );

				if( labelMesh != undefined && mesh.userData.preHoverLabelScale == undefined ){
					mesh.userData.preHoverLabelScale = labelMesh.scale.clone(  );
				}

				from = {
					scaleX: mesh.scale.x,
					scaleY: mesh.scale.y,
					scaleZ: mesh.scale.z,
					posX: mesh.position.x,
					posY: mesh.position.y,
					posZ: mesh.position.z,
					opacity: 0,
					mesh: mesh,
					hoverType: hoverType,
					hasLongText: false
				}

				to = {
					scaleX: 1,
					scaleY: 1,
					scaleZ: 1,
					posX: mesh.userData.preHoverPos.x,
					posY: mesh.userData.preHoverPos.y,
					posZ: mesh.userData.preHoverPos.z,
					opacity: 1
				}

				if( labelMesh != undefined ){
					from.labelScaleX = labelMesh.scale.x;
					from.labelScaleY = labelMesh.scale.y;
					from.labelMesh = labelMesh;

					to.labelScaleX = mesh.userData.preHoverLabelScale.x;
					to.labelScaleY = mesh.userData.preHoverLabelScale.y;

					if( longText != undefined ){
						from.hasLongText = true;
					}
				}

				// HoverText
				if( hoverText != undefined ){
					hoverText.material.opacity = 0;
				}
			}

			

			var tween = new TWEEN.Tween( from )

			.to( to, params.photoHoverScaleDuration )


			.onUpdate( function(  ){
				this.mesh.scale.x = this.scaleX;
				this.mesh.scale.y = this.scaleY;
				this.mesh.scale.z = this.scaleZ;


				if( params.photoHoverChangePos ){
					this.mesh.position.x = this.posX;
					this.mesh.position.y = this.posY;
					this.mesh.position.z = this.posZ;
				}
				

				if( this.labelMesh != undefined ){
					this.labelMesh.scale.x = this.labelScaleX;
					this.labelMesh.scale.y = this.labelScaleY;

					if( this.hasLongText ){
						this.labelMesh.material.opacity = this.opacity;
					}

				}
				

				updateSpriteBoundingBox( this.mesh );
			} )

			.onComplete( function(  ){
				if( this.hoverType == 'in' ){
					if( intersectPhotos != this.mesh )
						tweenHoverScale( this.mesh, 'out' );

				}else if( this.hoverType == 'out' ){
					if( this.mesh.userData.overlapTween != undefined ){
						//this.mesh.userData.overlapTween.start(  );
					}
				}

				updateSpriteBoundingBox( this.mesh );

				mesh.userData.hoverTween = undefined;
			} )

			.easing( params.photoHoverScaleEasing );

			if( mesh.userData.hoverTween != undefined )
				mesh.userData.hoverTween.stop(  );

			mesh.userData.hoverTween = tween;

			tween.start(  );
		}


		function tweenGoToPreHoverPos( mesh ){
			if( mesh.userData.preHoverPos == undefined || params.photoHoverChangePos )
				return;

			var tween = new TWEEN.Tween( {
				x: mesh.position.x,
				y: mesh.position.y,
				z: mesh.position.z,
				mesh: mesh
			} )

			.to( {
				x: mesh.userData.preHoverPos.x,
				y: mesh.userData.preHoverPos.y,
				z: mesh.userData.preHoverPos.z
			}, params.photoHoverScaleDuration )

			.onUpdate( function(  ){
				this.mesh.position.x = this.x;
				this.mesh.position.y = this.y;
				this.mesh.position.z = this.z;

				updateSpriteBoundingBox( this.mesh );
			} )

			.easing( params.photoHoverScaleEasing )


			.start(  );

		}


		function tweenGoToControlPoint( mesh, $controlPoint, isShow ){

			// var localControlPoint = mesh.parent.parent.worldToLocal( controlPoint );
			// mesh.position.copy(controlPoint);


			var from, to;

			if( mesh.userData.scale == undefined )
				mesh.userData.scale = 1;



			if( isShow ){
				to = {
					scale: 0.01
				}

				mesh.userData.scale = 0.01;
			}else{
				to = {
					scale: 1
				}

				mesh.visible = true;
				mesh.userData.scale = 1;
			}

			$controlPoint.addClass( 'animating' );


			var tween = new TWEEN.Tween( {
				scale: mesh.scale.x,
				isShow: isShow,
				mesh: mesh,
				$controlPoint: $controlPoint
			} )

			.to( to, params.goToControlPointDuration )

			.onUpdate( function(  ){
				mesh.scale.set( this.scale, this.scale, this.scale );

				var opacity = this.scale;

				mesh.traverse( function( node ){
					if( node.material ){
						node.material.transparent = true;
						node.material.opacity = opacity;
					}
				} )

			} )

			.onComplete( function(  ){
				if( this.isShow )
					this.mesh.visible = false;


				this.$controlPoint.removeClass( 'animating' );

			} )

			.easing( params.goToControlPointEasing )

			.start(  );




		}


		// Render Function
		function render(  ){
			requestAnimationFrame( render );



			if( !$divPhotoCloud.hasClass( 'photo-intersect' ) ){
				camera.position.x += ( mouseRotateX - camera.position.x + camera.userData.target.x ) * params.mouseMoveSpeed;
				camera.position.y += ( mouseRotateY - camera.position.y + camera.userData.target.y ) * params.mouseMoveSpeed;
			}
			


			// camera.lookAt( camera.userData.target );



			// Updates
			controls.update( clock.getDelta(  ) );
			TWEEN.update(  );


			// Rerender
			renderer.render( scene, camera );
		}

		// Wave
		// var waveInterval = setInterval( function(  ){
		// 	if( !animatingGroupComplete ){

		// 		var min = animatingGroup.position.y - params.waveMaxHeight;
		// 		var max = animatingGroup.position.y + params.waveMaxHeight;

		// 		var random = getRandomIntInclusive( min, max );


		// 		for( var i=0; i<animatingGroup.children.length; i++ ){
		// 			tweenWaveY( animatingGroup.children[i], random );
		// 		}


		// 	}
		// }, params.waveInterval + params.waveHeightDuration );



		// Window Resize Events

		$(window).resize(function(){
			var width = $divPhotoCloud.width();
			var height = $divPhotoCloud.height();

			halfWidth = width / 2;
			halfHeight = height / 2;

			// canvas.width = width;
			// canvas.height = height;

			camera.aspect = width / height;
			camera.updateProjectionMatrix();

			renderer.setSize(width, height);


		})




		// Depth Slider Events
		$divDepthSlider.mousedown( function( e ) {
			$divPhotoCloud.addClass( 'depth-clicked' );
		} );

		$document.on( 'click', '.cndce-photocloud.depth-clicked', function( e ){

			$divPhotoCloud.trigger( 'mousemove', e );

			$divPhotoCloud.removeClass( 'depth-clicked' );

			e.stopPropagation(  );
			e.stopImmediatePropagation(  );
		} );

		$document.on( 'mousemove', '.cndce-photocloud.depth-clicked', function( e, e1 ){

			if( $divPhotoCloud.hasClass( 'camera-photogroup-animating' ) )
				return;

			if( e.isTrigger != undefined )
				e = e1;

			var mouseX = e.pageX - $divPhotoCloud.offset(  ).left;
			var posX = mouseX - $divDepthSlider.offset(  ).left;



			var oldPos = $divDepthSlider.data( 'position' );
			var sliderWidth = $divDepthSlider.width(  );


			if( posX + 1 < sliderWidth ){
				posX = Math.max( posX, 0 );
				posX = Math.min( sliderWidth, posX );


				$divDepthButton.css( {
					left: posX + 'px'
				} )

				var zoomRatio = ( oldPos - posX ) / ( sliderWidth - oldPos )

				camera.position.x -= ( camera.userData.target.x - camera.position.x ) * zoomRatio;
				camera.position.y -= ( camera.userData.target.y - camera.position.y ) * zoomRatio;
				camera.position.z -= ( camera.userData.target.z + params.depthSliderOffsetZ - camera.position.z ) * zoomRatio;


				

				$divDepthSlider.data( 'position', posX );
				$divDepthSlider.data( 'zoomRatio', posX / sliderWidth );
			}
			




			// controls.update(  );
			
		} )






		// Events
		$divPhotoCloud.mousedown( function( e ){
			$divPhotoCloud.removeClass( 'mouse-moved' )
		} )


		// Event Controller
		$divPhotoCloud.mousemove( function( e ){
			e.preventDefault(  );

			if( scene == undefined )
				return;


			if( !isThreeJsEnabled() ){
				return;
			}

			var mouseX = e.pageX - $divPhotoCloud.offset(  ).left;
			var mouseY = e.pageY - $divPhotoCloud.offset(  ).top;

			mouse.x = ( mouseX / $divPhotoCloud.width(  ) ) * 2 - 1;
			mouse.y = - ( mouseY / $divPhotoCloud.height(  ) ) * 2 + 1;


			mouseRotateX = ( mouseX - halfWidth ) * params.mouseMoveFactor;
			mouseRotateY = ( mouseY - halfHeight ) * params.mouseMoveFactor;



			raycaster.setFromCamera( mouse, camera );

			$divPhotoCloud.addClass( 'mouse-moved' );

			// Labels
			// var intersections = intersectRayToBoundingBoxes( objLabels );
			var intersections = intersectSpriteBoundingBox( {x: mouseX, y: mouseY}, objLabels, true );



			if( intersections.length > 0 ){
				$divPhotoCloud.addClass( 'label-intersect' );
				intersectLabels = intersections[0];

			}else{
				$divPhotoCloud.removeClass( 'label-intersect' );
				intersectLabels = null;
			}




			// Photos
			// intersections = raycaster.intersectObjects( ` );

			if( !$divPhotoCloud.hasClass( 'photo-mouse-down' ) ){

				intersections = intersectSpriteBoundingBox( {x: mouseX, y: mouseY}, objPhotos, true );


				if( intersections.length > 0 && intersections[0].userData.isTweenWaveZComplete ){
					$divPhotoCloud.addClass( 'photo-intersect' );

					if( intersections.indexOf( intersectPhotos ) == -1 ){
						// console.log(intersections, intersectPhotos);

						// // TODO: Implement nicer/cleaner
						if( intersectPhotos != undefined )
							tweenHoverScale( intersectPhotos, 'out' );

						intersectPhotos = intersections[0];

						tweenHoverScale( intersectPhotos, 'in' );

					}
					


				}else{
					$divPhotoCloud.removeClass( 'photo-intersect' );
					$divPhotoCloud.removeClass( 'tooltip' );
					$divPhotoCloud.removeClass( 'text-preview' );
					$divPhotoCloud.removeClass( 'img-hover-active' );
					$('.cndce-hover-div.active', $divImgHoverContainer).removeClass('active');


					if( intersectPhotos != undefined )
						tweenHoverScale( intersectPhotos, 'out' );

					intersectPhotos = undefined;
					$divPhotoCloud.data( 'intersect-photo', undefined );
				}
			}


			
		} )


		// Fullscreen Events
		$fullScreenImageContainer.on( 'click', '.cndce-fullscreen-image-control.close', function(  ){
			$divPhotoCloud.removeClass( 'fullscreen' );

			var $prevActive = $( '.cndce-control-point-image.active' );
			$prevActive.append( $( '.cndce-clone.fullscreen', $fullScreenImageContainer ) )

			// Continue slideshow
			if( $divPhotoCloud.hasClass( 'slideshow-paused' ) ){
				$( '.cndce-control-point-top-bar-icon.play' ).click(  );
			}
		} )

		$fullScreenImageContainer.on( 'click', '.cndce-fullscreen-image-control.zoom-in', function(  ){
			var $image = $( '.cndce-clone', $fullScreenImageContainer );
			$image.width( $image.width(  ) + params.zoomIntensity );
		} )

		$fullScreenImageContainer.on( 'click', '.cndce-fullscreen-image-control.zoom-out', function(  ){
			var $image = $( '.cndce-clone', $fullScreenImageContainer );
			$image.width( $image.width(  ) - params.zoomIntensity );
		} )





		// Control Point Events

		$divPhotoCloud.on( 'click', '.cndce-control-point-text', function( e ){
			e.stopPropagation(  );
			e.stopImmediatePropagation(  );

			var $controlPoint = $( this ).parents('.cndce-control-point');

			if( $controlPoint.hasClass( 'animating' ) )
				return;

			var taggedPhotos = getPhotosWithTag( $controlPoint.data( 'tag' ) );



			// Add images container if not exists
			var $imagesContainer = $( '.cndce-control-point-images', $controlPoint );

			if( $imagesContainer.length == 0 ){
				$imagesContainer = $( '<div class="cndce-control-point-images"></div>' );

				$controlPoint.append( $imagesContainer );
			}


			$controlPoint.toggleClass( 'show' );
			var isShow = $controlPoint.hasClass( 'show' );

			for( var i=0; i < taggedPhotos.length; i++ ){
				
				tweenGoToControlPoint( taggedPhotos[i], $controlPoint, isShow );
				showControlPoint( taggedPhotos[i], $controlPoint, isShow  );
			}

		} );

		// Scroll mousewheel fix
		$divPhotoCloud.on( 'mousewheel DOMMouseScroll', '.cndce-control-point .cndce-control-point-images.scroll-content', function( e ){
			
			e = window.event || e;
	        var delta = Math.max( -1, Math.min( 1, ( e.wheelDelta || -e.detail ) ) );
	        this.scrollLeft -= ( delta*40 ); // Multiplied by 40
	        e.preventDefault(  );
		} )



		$divPhotoCloud.on( 'mouseenter', '.cndce-control-point-image', function( e ){
			$( this ).addClass( 'hovered' )
		} )

		$divPhotoCloud.on( 'mouseleave', '.cndce-control-point-image', function( e ){
			$( this ).removeClass( 'hovered' )
		} )


		$divPhotoCloud.on( 'click', '.cndce-control-point-image', function( e ){
			var $controlPointImage = $( this );
			var $controlPointImageHtml = $( '.cndce-clone.preview', this );

			if( $controlPointImage.hasClass('active') ){
				return;
			}

			var $prevActive = $( '.cndce-control-point-image.active' );

			var mesh = $controlPointImage.data( 'cndce-mesh' );

			
			$divPhotoCloud.addClass( 'show-control-point-html' );
			$divPhotoCloud.removeClass( 'photo-intersect' );
			$divPhotoCloud.removeClass( 'tooltip' );


			// Update images
			$prevActive.append( $( '.cndce-clone', $controlPointHtmlImageContainer ) );
			$controlPointHtmlImageContainer.append( $controlPointImageHtml );


			$prevActive.removeClass( 'active' );
			$controlPointImage.addClass( 'active' );

			
			$controlPointHtmlImageTitle.html( mesh.userData.photoData.controlPointTitle );
			$controlPointHtmlImageDesc.html( mesh.userData.photoData.controlPointDesc );


			// Update Top Bar Count
			var $controlPointImages = $controlPointImage.parent( '.cndce-control-point-images' );


			$controlPointHtmlCountTotal.html( $controlPointImages.children(  ).length );
			$controlPointHtmlCountIndex.html( $controlPointImage.index(  ) + 1 );


			// Update Download Link
			$controlPointHtmlDownloadLink.attr( 'href', $controlPointImageHtml.attr( 'src' ) );


			e.stopImmediatePropagation(  );
			e.stopPropagation(  );
		} )


		$divPhotoCloud.on( 'click', '.cndce-control-point-top-bar-icon.fullscreen', function( e ){

			$divPhotoCloud.addClass( 'fullscreen' );

			var $prevActive = $( '.cndce-control-point-image.active' );
			$fullScreenImageContainer.append( $( '.cndce-clone.fullscreen', $prevActive ) );

			// Pause slideshow
			if( slideshowInterval != undefined ){
				$( '.cndce-control-point-top-bar-icon.stop' ).click(  );
				$divPhotoCloud.addClass( 'slideshow-paused' );
			}

		} )

		$divPhotoCloud.on( 'click', '.cndce-control-point-top-bar-icon.play', function( e ){

			$divPhotoCloud.addClass( 'slideshow' );

			$controlPointHtmlProgress.css( {
				opacity: 1
			} )

			$controlPointHtmlProgress.animate( {
				width: '100%'
			}, {
				duration: params.slideshowIntervalTime,
				complete: function(  ){
					$controlPointHtmlProgress.width( 0 );
				}
			} )


			slideshowInterval = setInterval( function(  ){
				changeActiveControlPointByDelta( 1 );


				$controlPointHtmlProgress.animate( {
					width: '100%'
				}, {
					duration: params.slideshowIntervalTime,
					complete: function(  ){
						$controlPointHtmlProgress.width( 0 );
					}
				} )


			}, params.slideshowIntervalTime );


		} )

		$divPhotoCloud.on( 'click', '.cndce-control-point-top-bar-icon.stop', function( e ){

			$divPhotoCloud.removeClass( 'slideshow' );
			clearInterval( slideshowInterval );
			slideshowInterval = undefined;

			$controlPointHtmlProgress.stop(  );

			$controlPointHtmlProgress.animate( {
				opacity: 0
			}, {
				complete: function(  ){
					$controlPointHtmlProgress.width( 0 );
				}
			} )


		} )



		$divPhotoCloud.on( 'click', '.cndce-control-point-top-bar-icon.close', function( e ){

			$divPhotoCloud.removeClass( 'show-control-point-html' );

			var $prevActive = $( '.cndce-control-point-image.active' );
			$prevActive.append( $( '.cndce-clone', $controlPointHtmlImageContainer ) );


			$prevActive.removeClass( 'active' );

			e.stopImmediatePropagation(  );
			e.stopPropagation(  );
		} )


		$divPhotoCloud.on( 'click', '.cndce-control-point-arrow', function( e ){
			var $arrow = $( this );

			changeActiveControlPointByDelta( parseInt( $( this ).attr( 'data-cndce-delta' ) ) );

			e.stopImmediatePropagation(  );
			e.stopPropagation(  );
		} )



		$document.on( 'mousedown', '.cndce-photocloud.label-intersect', function( e ){

			$divPhotoCloud.addClass( 'label-moving' );
			controls.enableRotate = false;
			moveLabel = intersectLabels;

		} )

		$document.on( 'mouseup', '.cndce-photocloud.label-moving', function( e ){

			$divPhotoCloud.removeClass( 'label-moving' );
			controls.enableRotate = params.controlsEnableRotate;
			moveLabel = undefined;

			vectorMoveLabelDelta = undefined;

		} )

		$document.on( 'mousemove', '.cndce-photocloud.label-moving', function( e ){


			// raycaster.setFromCamera( mouse, camera );

			var pos = raycaster.ray.at( camera.position.z + moveLabel.parent.position.z );


			// Direct assign
			moveLabel.parent.position.copy( pos );

			moveLabel.parent.updateMatrixWorld(  );

			
			// Delta assign
			// if( vectorMoveLabelDelta != undefined ){
				
			// 	var delta = vectorMoveLabelDelta.clone(  );
			// 	delta.sub( pos );

			// 	moveLabel.parent.position.sub( delta );
			// }

			// vectorMoveLabelDelta = pos.clone(  );



		} )



		// Photo Drag Events
		$document.on( 'mousedown', '.cndce-photocloud.photo-intersect', function( e ){
			tweenHoverScale( intersectPhotos, 'out' );
			// console.log(intersectPhotos);
			
			$divPhotoCloud.addClass( 'photo-mouse-down' );
			$divPhotoCloud.data( 'mouse-down-photo', intersectPhotos );

			if( intersectPhotos.userData.overlapTween != undefined ){
				intersectPhotos.userData.overlapTween.stop(  );
			}


		} );

		$document.on( 'mouseup', '.cndce-photocloud.photo-mouse-down', function( e ){
			$divPhotoCloud.removeClass( 'photo-mouse-down' );
			// $divPhotoCloud.removeClass( 'photo-intersect' );
		} );

		$document.on( 'mousemove', '.cndce-photocloud.photo-mouse-down', function( e ){
			var mouseDownPhoto = $divPhotoCloud.data( 'mouse-down-photo' );
			var pos = raycaster.ray.at( camera.position.z + mouseDownPhoto.position.z );

			pos = mouseDownPhoto.parent.worldToLocal( pos );

			mouseDownPhoto.position.copy( pos );
			mouseDownPhoto.updateMatrixWorld(  );

		} )

		// Snap to control point
		$document.on( 'mouseup', '.cndce-photocloud.photo-mouse-down .cndce-control-point', function(  ){

			var $controlPoint = $( this );
			var $scrollParent = $( '.cndce-control-point-images.scroll-content', $controlPoint );

			var isShow = $controlPoint.hasClass( 'show' );

			var mouseDownPhoto = $divPhotoCloud.data( 'mouse-down-photo' );


			if( mouseDownPhoto.userData.photoData.tags.indexOf( $controlPoint.data( 'tag' ) ) == -1 ){
				mouseDownPhoto.userData.photoData.tags.push( $controlPoint.data( 'tag' ) );
				tweenGoToPreHoverPos( intersectPhotos );
				

				if( isShow ){
					tweenGoToControlPoint( mouseDownPhoto, $controlPoint, isShow );
					showControlPoint( mouseDownPhoto, $controlPoint, isShow  );

					var $newControlPoint = $( '.cndce-control-point-image[data-uuid="' + mouseDownPhoto.uuid + '"]' );


					$scrollParent.animate( {
						scrollLeft: $newControlPoint.position(  ).left
					} )
				}
				
			}

			if( !isShow )
				$( '.cndce-control-point-text', $controlPoint ).trigger( 'click' );


			$divPhotoCloud.trigger( 'mouseup' );


		} )


		$document.on( 'mousemove', '.cndce-photocloud.photo-intersect', function( e ){

			var canvasIntersectPhoto = $divPhotoCloud.data( 'intersect-photo' );

			var mouseX = e.pageX - $divPhotoCloud.offset(  ).left;
			var mouseY = e.pageY - $divPhotoCloud.offset(  ).top;

			var isNewPhotoIntersect = intersectPhotos != canvasIntersectPhoto;

			// Tooltip
			if( !$divPhotoCloud.hasClass( 'tooltip' ) || isNewPhotoIntersect ){

				$divPhotoCloud.addClass( 'tooltip' );

				var data = intersectPhotos.userData.photoData;
				$divTooltip.text( data.tooltip );
			}

			$divTooltip.css( {
				left: ( mouseX + params.tooltipOffsetX ) + 'px',
				top: mouseY + ( params.tooltipOffsetY ) + 'px'
			} )



			// Text Preview
			if( !$divPhotoCloud.hasClass( 'text-preview' ) || isNewPhotoIntersect ){

				$divPhotoCloud.addClass( 'text-preview' );


			}

			

			// DOM Image
			// Remove DOM Image on drag
			if( $divPhotoCloud.hasClass( 'photo-mouse-down' ) && $divPhotoCloud.hasClass( 'mouse-moved' ) ){

				$divPhotoCloud.removeClass( 'img-hover-active' );
				$( '.cndce-hover-div.active', $divImgHoverContainer ).removeClass( 'active' );
				
			}else{
				var $activeHoverImage = $('.cndce-hover-div.active', $divImgHoverContainer);

				if( $activeHoverImage.length == 0 || isNewPhotoIntersect ){
					var $hoverDiv = intersectPhotos.userData.$hoverDiv;

					$activeHoverImage.removeClass( 'active' );
					$hoverDiv.addClass( 'active' );
					$divPhotoCloud.addClass( 'img-hover-active' )


					var hoverWidth = $hoverDiv.width(  );
					var hoverHalfWidth = hoverWidth / 2;

					var divPhotoCloudWidth = $divPhotoCloud.width(  );

					// If hover image would be outside on the left side
					if( mouseX - hoverHalfWidth < 0 ){
						$hoverDiv.css( {
							left: ( hoverHalfWidth + 10 ) + 'px'
						} )

					// If hover image would be outside on the right side
					}else if( mouseX + hoverHalfWidth > divPhotoCloudWidth ){
						$hoverDiv.css( {
							left: ( divPhotoCloudWidth - hoverHalfWidth - 10 ) + 'px'
						} )


					// Hover image won't be outside
					}else{
						$hoverDiv.css( {
							left: mouseX + 'px'
						} )
					}
				}
			}


			




			if( isNewPhotoIntersect ){

				// This data is for determining if there's an existing intersected 
				// photo, and if that intersected photo is the current one
				$divPhotoCloud.data( 'intersect-photo', intersectPhotos );
			}


		} )


		// Img Hover Click
		$document.on( 'click', '.cndce-hover-div.active', function( e ){
			var $this = $( this );


			$this.addClass( 'click-active' );
			$( '.cndce-hover-text', $this ).scrollbar(  );
			$divPhotoCloud.addClass( 'img-hover-click-active' );

		} )


		$document.on( 'click', '.cndce-hover-close', function( e ){
			var $hoverDiv = $( this ).parents( '.cndce-hover-div' );


			$hoverDiv.removeClass( 'active' );
			$hoverDiv.removeClass( 'click-active' );

			$divPhotoCloud.removeClass( 'img-hover-click-active' );

			e.stopPropagation(  );


		} )




		$document.on( 'click', '.cndce-photocloud.label-intersect', function( e ){

			e.stopImmediatePropagation(  );

			// Photos
			var photoGroup = intersectLabels.userData.photoGroup;

			if( photoGroup != undefined ){
				intersectLabels.parent.add( photoGroup );
				animatingGroup = photoGroup;
				animatingGroupComplete = false;

				// var min = animatingGroup.position.y - params.waveMaxHeight;
				// var max = animatingGroup.position.y + params.waveMaxHeight;

				// var random = getRandomIntInclusive( min, max );
				

				for( var i=0; i < photoGroup.children.length; i++ ){
					

					objPhotos.push( photoGroup.children[i] );

					tweenWaveZ( photoGroup.children[i] );
					// tweenWaveY( photoGroup.children[i], random );

				}



				// Camera

				tweenLookAtPhotoGroup(  );
			}

			

		} );

		$document.on( 'click', '.cndce-photocloud.photo-intersect', function( e ){


			if( $divPhotoCloud.hasClass( 'mouse-moved' ) ){
				return;
			}

			e.stopImmediatePropagation(  );

			var photo = intersectPhotos;
			var data = photo.userData.photoData;

			$divPhotoCloud.removeClass( 'photo-intersect' );
			$divPhotoCloud.removeClass( 'tooltip' );
			$divPhotoCloud.removeClass( 'text-preview' );
			$divPhotoCloud.removeClass( 'img-hover-active' );

			// html
			if( data.html != undefined ){
				$divPhotoCloud.addClass( 'html-active' );

				$( '.cndce-html.active', $divPhotoCloud ).removeClass( 'active' );

				var $html = $( '#' + data.html );
				var $htmlScrollWrapper = $html.parents( '.cndce-html.scroll-wrapper' );

				if( $htmlScrollWrapper.length > 0 )
					$html = $htmlScrollWrapper;

				$html.addClass( 'active' );


			}


		} );

		$document.on( 'click', '.cndce-photocloud.html-active', function( e ){

			e.stopImmediatePropagation(  );

			$( '.cndce-html.active', $divPhotoCloud ).removeClass( 'active' );
			$divPhotoCloud.removeClass( 'html-active' );
					
		} )

		$document.on( 'click', '.cndce-html', function( e ){
			e.stopPropagation(  );
		} )

		$inputTextbox.keypress( function( e ){
			if( e.keyCode == 13 ){
				$divPhotoCloud.click(  );
			}
		} )

		$document.on( 'click', '.cndce-photocloud.typing .cndce-textbox', function( e ){

			e.stopPropagation(  );
		} )

		$document.on( 'click', '.cndce-photocloud.typing', function( e ){
			e.stopImmediatePropagation(  );

			// Remove Textbox
			$divPhotoCloud.removeClass( 'typing' );

			// Add Textbox to scene
			if( $inputTextbox.val(  ) != '' ){
				var posX = parseFloat( $divTextbox.css( 'left' ) ) + $divTextbox.width(  ) / 2;
				var posY = parseFloat( $divTextbox.css( 'top' ) ) + $divTextbox.height(  );


				var mouse = new THREE.Vector2(  );
				mouse.x = ( posX / canvas.width ) * 2 - 1;
				mouse.y = - ( posY / canvas.height ) * 2 + 1;

				raycaster.setFromCamera( mouse, camera );

				var pos = raycaster.ray.at( 
					camera.position.z 
					+ getRandomIntInclusive( -params.groupDeltaZ, params.groupDeltaZ, params.groupDeltaInterval )
				);

				var cluster = new THREE.Group(  );

				var textMesh = create2DTextMesh( $inputTextbox.val(  ) );

				cluster.position.copy( pos );

				cluster.add( textMesh );
				scene.add( cluster );

				objLabels.push( textMesh );

				var photoGroup = createPhotoGroup( photoData[0] );
				textMesh.userData.photoGroup = photoGroup;


				intersectLabels = textMesh;
				$divPhotoCloud.addClass( 'label-intersect' );
				$divPhotoCloud.click(  );
				

				
			}
		} )


		// Bare Canvas Event
		$document.on( 'click', '.cndce-photocloud:not(.mouse-moved)', function( e ){

			if( !isThreeJsEnabled(  ) )
				return;

			var mouseX = e.pageX - $divPhotoCloud.offset(  ).left;
			var mouseY = e.pageY - $divPhotoCloud.offset(  ).top;

			// Show Textbox
			$divPhotoCloud.addClass( 'typing' );

			$divTextbox.css( {
				'left': ( mouseX - $divTextbox.width(  ) / 2 ) + 'px',
				'top': mouseY + 'px'
			} );

			$inputTextbox.val( '' );
			$inputTextbox.focus(  );

		} )


	}
} )

