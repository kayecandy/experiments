jQuery.fn.extend({
	cndce3DGloves: function(params){
		var defaults = {
			colorsURL: './colors.json',
			colors: [],
			fontColors: [],
			outlineColors: [],

			fontsURL: './fonts.json',
			fonts: [],

			logosURL: './assets/logos/',
			snapshotsURL: './assets/models/glove/snapshots/',

			modelsDir: './assets/models/glove/',
			modelMapsDir: "./assets/models/glove/maps/",

			modelsTransparentImage: 'transparent.png',
			models: [
				{
					'id': 'palm-back',
					'name': 'Palm Back',
					'url': 'npb.js',
					'inputBox': '.cndce-woo-color-pb',
					'colorPriceInputBox': '.cndce-woo-color-price-pb',
					'material': {
						'color': '#eeeeee',
						'normalScale': new THREE.Vector2(-.25,.25),
						'roughness': 0.35,
						'metalness': 0,
						'transparent': false
					},
					'map': 'pbd.jpg',
					'normalMap': 'n1024.jpg',
					'addToEventGroup': true,
					'snapshot': 'snap-pb.png',
					'cameraPosition': {x: 0.2569085600513297, y: -0.6062133946174773, z: 7.311395442181931}

				},
				{
					'url': 'nconnect.js',
					'material': {
						'color': '#eeeeee',
						'normalScale': new THREE.Vector2(-.25,.25),
						'roughness': 0.35,
						'metalness': 0,
						'transparent': false
					},
					'map': 'connectd.jpg',
					'normalMap': 'n512.jpg'
				},
				{
					'id': 'wrist-back',
					'name': 'Wrist Back',
					'url': 'nwb.js',
					'inputBox': '.cndce-woo-color-wb',
					'colorPriceInputBox': '.cndce-woo-color-price-wb',
					'material': {
						'color': '#eeeeee',
						'normalScale': new THREE.Vector2(-.25,.25),
						'roughness': 0.35,
						'metalness': 0,
						'transparent': false
					},
					'map': 'wbd.jpg',
					'normalMap': 'n512.jpg',
					'addToEventGroup': true,
					'snapshot': 'snap-wb.png',
					'cameraPosition': {x: -0.4365467651370499, y: -0.6062133946174774, z: 7.302871506608531}
				},
				{
					'id': 'thumb-up',
					'name': 'Thumb Up',
					'url': 'ntu.js',
					'inputBox': '.cndce-woo-color-tu',
					'colorPriceInputBox': '.cndce-woo-color-price-tu',
					'material': {
						'color': '#eeeeee',
						'normalScale': new THREE.Vector2(-.25,.25),
						'roughness': 0.35,
						'metalness': 0,
						'transparent': false
					},
					'map': 'tud.jpg',
					'normalMap': 'n512.jpg',
					'addToEventGroup': true,
					'snapshot': 'snap-tu.png',
					'cameraPosition': {x: -6.335062993076951, y: 3.670490430446593, z: 0.5333637349379177}
				},
				{
					'id': 'thumb-down',
					'name': 'Thumb Down',
					'url': 'ntd.js',
					'inputBox': '.cndce-woo-color-td',
					'colorPriceInputBox': '.cndce-woo-color-price-td',
					'material': {
						'color': '#eeeeee',
						'normalScale': new THREE.Vector2(-.25,.25),
						'roughness': 0.35,
						'metalness': 0,
						'transparent': false
					},
					'map': 'tdd.jpg',
					'normalMap': 'n512.jpg',
					'addToEventGroup': true,
					'snapshot': 'snap-td.png',
					'cameraPosition': {x: -7.339447421028984, y: -0.14599982920847474, z: 0.03457750456529969}
				},
				{
					'id': 'thumb-in',
					'name': 'Thumb In',
					'url': 'nti.js',
					'inputBox': '.cndce-woo-color-ti',
					'colorPriceInputBox': '.cndce-woo-color-price-ti',
					'material': {
						'color': '#eeeeee',
						'normalScale': new THREE.Vector2(-.25,.25),
						'roughness': 0.35,
						'metalness': 0,
						'transparent': false
					},
					'map': 'tid.jpg',
					'normalMap': 'n512.jpg',
					'addToEventGroup': true,
					'snapshot': 'snap-ti.png',
					'cameraPosition': {x: 2.357486295470928, y: -0.3348173217879713, z: -6.944073424705248}
				},
				{
					'id': 'thumb-strip',
					'name': 'Thumb Strip',
					'url': 'nstrip.js',
					'inputBox': '.cndce-woo-color-ts',
					'colorPriceInputBox': '.cndce-woo-color-price-ts',
					'material': {
						'color': '#eeeeee',
						'normalScale': new THREE.Vector2(-.25,.25),
						'roughness': 0.35,
						'metalness': 0,
						'transparent': false
					},
					'map': 'stripd.jpg',
					'normalMap': 'n512.jpg',
					'addToEventGroup': true,
					'snapshot': 'snap-ts.png',
					'cameraPosition': {x: 3.706112832128127, y: 1.6841965931490646, z: -6.108863193030295}
				},
				{
					'id': 'palm-in',
					'name': 'Palm In',
					'url': 'npi.js',
					'inputBox': '.cndce-woo-color-pi',
					'colorPriceInputBox': '.cndce-woo-color-price-pi',
					'material': {
						'color': '#eeeeee',
						'normalScale': new THREE.Vector2(-.25,.25),
						'roughness': 0.35,
						'metalness': 0,
						'transparent': false
					},
					'map': 'pid.jpg',
					'normalMap': 'n1024.jpg',
					'addToEventGroup': true,
					'snapshot': 'snap-pi.png',
					'cameraPosition': {x: -4.574018622097704, y: 1.199421228106873, z: -5.615135115228309}
				},
				{
					'id': 'palm-out',
					'name': 'Palm Out',
					'url': 'npo.js',
					'inputBox': '.cndce-woo-color-po',
					'colorPriceInputBox': '.cndce-woo-color-price-po',
					'material': {
						'color': '#eeeeee',
						'normalScale': new THREE.Vector2(-.25,.25),
						'roughness': 0.35,
						'metalness': 0,
						'transparent': false
					},
					'map': 'pod.jpg',
					'addToEventGroup': true,
					'snapshot': 'snap-po.png',
					'cameraPosition': {x: 3.5438037445574104, y: -0.6062133946174724, z: -6.400309394103323}
				},
				{
					'id': 'piping',
					'name': 'Piping',
					'url': 'npip.js',
					'inputBox': '.cndce-woo-color-pip',
					'colorPriceInputBox': '.cndce-woo-color-price-pip',
					'material': {
						'color': '#eeeeee',
						'normalScale': new THREE.Vector2(-.25,.25),
						'roughness': 0.35,
						'metalness': 0,
						'transparent': false
					},
					'map': 'pipd.jpg',
					'normalMap': 'n1024.jpg',
					'addToEventGroup': true,
					'snapshot': 'snap-pip.png',
					'cameraPosition': {x: 0.21994909423718587, y: -0.17890171614459996, z: -7.335503838994599}
				},
				{
					'id': 'stitching',
					'name': 'Stitching',
					'url': 'nstitch.js',
					'inputBox': '.cndce-woo-color-stitch',
					'colorPriceInputBox': '.cndce-woo-color-price-stitch',
					'material': {
						'color': '#eeeeee',
						'transparent': false
					},
					'map': 'stitchd.jpg',
					'addToEventGroup': true,
					'snapshot': 'snap-stitch.png',
					'cameraPosition': {x: 0.45899875345311886, y: 0.31819438270918127, z: -3.5361791987328157}
				},
				{
					'id': 'laces',
					'name': 'Laces',
					'url': 'nlaces.js',
					'inputBox': '.cndce-woo-color-laces',
					'colorPriceInputBox': '.cndce-woo-color-price-laces',
					'material': {
						'color': '#eeeeee',
						'transparent': false,
						'roughness': .5,
			            'metalness': 0,
					},
					'normalMap': 'nloops.jpg', 
					'addToEventGroup': true,
					'snapshot': 'snap-laces.png',
					'cameraPosition': {x: 0.361291020976816, y: 1.0978443245471718, z: -7.249428021383553}
				},
				{
					'url': 'nshad.js',
					'material': {
						'color': '#ffffff',
						'transparent': true
					},
					'alphaMap': 'nshad.jpg'
				},
				{
					'isLogoModel': true,
					'name': 'Logo',
					'url': 'p1.js',
					'inputBox': '.cndce-woo-logo-pb',
					'textInputBox': '.cndce-woo-text-pb',
					'logoPrice': 7,
					'textPrice': 7,
					'material': {
						'color': 15658734,
						'transparent': true,
						'roughness': 0.35,
						'metalness': 0,
						'color': 15658734,
						'side': THREE.FrontSide
					},
					'logoImage': {
						'isTransparent': true,
						'image': 'black.png',
						'transformations':{
							'rotate': -Math.PI / 2,
							'scale': {x: 1.5, y: 1.5}

						}
					},
					'addToEventGroup': true,
					'snapshot': 'snap-logo-pb.png',
					'isLogoUploadable': true,
					'cameraPosition': {x: 0.2569085600513297, y: -0.6062133946174773, z: 7.311395442181931}
				},
				{
					'isLogoModel': true,
					'name': 'Logo',
					'url': 'p2.js',
					'inputBox': '.cndce-woo-logo-wb',
					'textInputBox': '.cndce-woo-text-wb',
					'logoPrice': 7,
					'textPrice': 7,
					'material': {
						'color': 15658734,
						'transparent': true,
			            'roughness': .5,
			            'metalness': 0,
			            'side': THREE.FrontSide
					},
					'logoImage': {
						'isTransparent': true,
						'image': 'black.png'
					},
					'addToEventGroup': true,
					'snapshot': 'snap-logo-wb.png',
					'isLogoUploadable': true,
					'cameraPosition': {x: -0.4365467651370499, y: -0.6062133946174774, z: 7.302871506608531}
				},
				{
					'isLogoModel': true,
					'name': 'Logo',
					'url': 'pthumb.obj',
					'inputBox': '.cndce-woo-logo-tu',
					'textInputBox': '.cndce-woo-text-tu',
					'logoPrice': 7,
					'textPrice': 7,
					'material': {
						'color': 15658734,
						'transparent': true,
						'roughness': .5,
			            'metalness': 0,
			            'side': THREE.FrontSide
					},
					'logoImage': {
						'isTransparent': true,
						'image': 'black.png'
					},
					'addToEventGroup': true,
					'snapshot': 'snap-logo-tu.png',
					'isLogoUploadable': true,
					'aspect': 2,
					'cameraPosition': {x: -6.335062993076951, y: 3.670490430446593, z: 0.5333637349379177}
				},
				{
					'isLogoModel': true,
					'name': 'Logo',
					'url': 'p3.js',
					'inputBox': '.cndce-woo-logo-pi',
					'textInputBox': '.cndce-woo-text-pi',
					'logoPrice': 7,
					'textPrice': 7,
					'material': {
						'color': 15658734,
						'transparent': true,
						'roughness': .5,
			            'metalness': 0,
			            'side': THREE.FrontSide
					},
					'logoImage': {
						'isTransparent': true,
						'image': 'black.png',
						'rotation': Math.PI / 2,
						'scale': 0.9
					},
					'addToEventGroup': true,
					'snapshot': 'snap-logo-pi.png',
					'isLogoUploadable': true,
					'cameraPosition': {x: -4.574018622097704, y: 1.199421228106873, z: -5.615135115228309}
				},
				{
					'isLogoModel': true,
					'name': 'Logo',
					'url': 'ppo.obj',
					'inputBox': '.cndce-woo-logo-po',
					'textInputBox': '.cndce-woo-text-po',
					'logoPrice': 7,
					'textPrice': 7,
					'material': {
						'color': 15658734,
						'transparent': true,
						'roughness': .5,
			            'metalness': 0,
			            'side': THREE.FrontSide
					},
					'logoImage': {
						'isTransparent': true,
						'image': 'black.png',
						'transformations': {
							'translate': {x: 0, y: 125}
						}
					},
					'addToEventGroup': true,
					'snapshot': 'snap-logo-po.png',
					'isLogoUploadable': true,
					'aspect': 1,
					'cameraPosition': {x: 0.6152476081954287, y: -0.08473885342880705, z: -7.2769318918520085}
				}
			],

			envMap: ['./assets/env/px.jpg', './assets/env/nx.jpg', './assets/env/py.jpg', './assets/env/ny.jpg', './assets/env/pz.jpg', './assets/env/nx.jpg'],
			envMapIntensity: 1,

			sizes: [
				{
					'label': '8oz',
					'price': 89.99
				},
				{
					'label': '10oz',
					'price': 92.99
				},
				{
					'label': '12oz',
					'price': 95.99
				},
				{
					'label': '14oz',
					'price': 98.99
				},
				{
					'label': '16oz',
					'price': 101.99
				},
				{
					'label': '18oz',
					'price': 104.99
				},
				{
					'label': '20oz',
					'price': 107.99
				}
			],
			quantityInput: 'input[name="quantity"]',
			sizesInput: 'select[name="attribute_sizes"]',
			addToCartButton: 'button.single_add_to_cart_button',

			thumbnailInput: '.cndce-woo-thumbnail',

			thumbnailOffsetPercent: 0.2,
			thumbnailSize: {
				width: 250,
				height: 250
			},

			thumbnailCameraPosition: [
				{x: -2.0780860242672032, y: 3.6704904304465926, z: -6.0082492022007},
				{x: 3.035306045508184, y: -0.6062133946174773, z: 6.656532320231596}
			],


			snapshotSize: {
				width: 500,
				height: 500
			},

			minHeight: 500,

			cameraFrustumMin: 2,
			cameraFrustumMax: 70,
			cameraPosition: {x: -1.3, y: -0.6, z: 7.2},

			ambientLightColor: 16777215,
			ambientLightIntensity: 0.65,

			directionalLightColor: 16777215,
			directionalLightPositionX: 0,
			directionalLightPositionY: 6,
			directionalLightPositionZ: -200,
			directionalLightIntensity: 0.6,

			secondaryLight1Color: 16759931,
			secondaryLight1PositionX: -150,
			secondaryLight1PositionY: 0,
			secondaryLight1PositionZ: 200,
			secondaryLight1Intensity: 0.4,

			secondaryLight2Color: 10213119,
			secondaryLight2PositionX: 100,
			secondaryLight2PositionY: 0,
			secondaryLight2PositionZ: 200,
			secondaryLight2Intensity: 0.4,

			controlsMinPolarAngle: Math.PI / 3,
			controlsMaxPolarAngle: Math.PI / 1.9,
			controlsEnableZoom: true,
			controlsEnableDamping: true,
			controlsDampingFactor: 0.2,
			controlsEnableKeys: true,
			controlsEnablePan: true,

			controlsTarget: {x: 0, y: 0, z: 0},

			rendererPreserveDrawingBuffer: false,

			mouseHoverOpacity: 0.8,
			mouseHoverDuration: 200,
			mouseHoverEasing: TWEEN.Easing.Quadratic.InOut,

			changeColorDuration: 300,
			changeColorEasing: TWEEN.Easing.Quadratic.InOut,

			cameraLookAtDuration: 300,
			cameraLookAtEasing: TWEEN.Easing.Quadratic.InOut,

			logoCanvasWidth: 500
		};

		var $ = jQuery;

		var $container = $(this);

		var $colorsDiv = $('.cndce-colors');
		var $colorTypeTemplate = $('.cndce-color-type-container.cndce-template')

		var $priceTotal = $('.cndce-price-total');

		var $sizesSelectInput = $('.cndce-sizes-input');
		var $sizesOptionTemplate = $('.cndce-size-option.cndce-template', $sizesSelectInput);

		var $quantityInput = $('.cndce-quantity-input');

		var $gloveParts = $('.cndce-glove-parts');
		var $glovePartTemplate = $('.cndce-active-glove-part.cndce-template', $gloveParts);

		var $controlsEditables  = $('#cndce-controls-editables');

		var $colorEditables = $('.cndce-controls-editables-type[data-editable="color"]', $controlsEditables);
		var $colorEditableTemplate = $('.cndce-color-editable.cndce-template', $colorEditables);

		var $logoEditables = $('.cndce-controls-editables-type[data-editable="logo"]', $controlsEditables);
		var $logoEditableTemplate = $('.cndce-logo-editable.cndce-template', $logoEditables);

		var $textEditables = $('.cndce-controls-editables-type[data-editable="text"]', $controlsEditables);
		var $textEditableTemplate = $('.cndce-text-editable.cndce-template', $textEditables);


		var $fontPreviews = $('.cndce-font-previews-container');
		var $fontPreviewTemplate = $('.cndce-font-preview.cndce-template', $fontPreviews);

		var $fontColors = $('.cndce-font-colors-container');
		var $fontColorBoxTemplate = $('.cndce-color-box.cndce-template', $fontColors);

		var $outlineColors = $('.cndce-outline-colors-container');
		var $outlineColorBoxTemplate = $('.cndce-color-box.cndce-template', $outlineColors);

		var $textInput = $('.cndce-text-input');
		var $textRemoveButton = $('.cndce-remove-text-button');
		var $textAddButton = $('.cndce-add-text-button');

		var $textRemoveOutlineButton = $('.cndce-remove-outline-button');

		var $logoLibraryButton = $('.cndce-logo-library-button');
		var $logoInput = $('.cndce-logo-input');
		var $logoRemoveButton = $('.cndce-logo-remove-button');

		var $logoLibraryOverlay = $('.cndce-logo-library-overlay');


		var $addToCartButton = $('.cndce-add-to-cart');

		var $downloadSnapshotButton = $('.cndce-download-button');
		var $changeThemeButton = $('.cndce-change-theme-button');

		var scene;
		var camera;
		var renderer;

		var ambientLight;
		var directionalLight;
		var secondaryLight1;
		var secondaryLight2;

		var envMap;

		var controls;
		var loadingManager;
		var jsonLoader;
		var bufferGeometryLoader;
		var objLoader;
		var textureLoader;

		var canvas;
		var $canvas;

		var gloveEditables;
		var gloveIntersectables = {
			color: [],
			logo : [],
			text: [],
			settings: []
		};
		var gloveIntersected;
		var gloveSelected;


		var logoTransparentImage;
		var activeLogos = [];
		var activeTexts = [];


		var mouse = new THREE.Vector2();



		// Param Set Defaults
		params = getDefaults(params, defaults);


		function getDefaults(obj, defaultsObj){
			var duplicate = {};

			if(obj == undefined)
				obj = {};

			for( var param in defaultsObj ){
				if( defaultsObj.hasOwnProperty( param ) ){
					if( !obj.hasOwnProperty( param ) || obj[param] == undefined ){
						duplicate[param] = defaultsObj[param];
					}else{
						duplicate[param] = obj[param];
					}
				}
			}

			return duplicate;
		}



		function getTemplate($template){
			return $template.clone(true)
				.removeClass('cndce-template');
		}

		function getThumbnail(){
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');

			var gloveCanvas = renderer.domElement;

			var cameraOriginalPosition = new THREE.Vector3();
			cameraOriginalPosition.copy(camera.position);

			canvas.width = params.thumbnailSize.width;;
			canvas.height = params.thumbnailSize.height;

			var newWidth = (gloveCanvas.width / gloveCanvas.height) * canvas.height;
			var newHeight = canvas.height; 

			var centerPos = -newWidth/2 + canvas.width/2;

			camera.position.copy(params.thumbnailCameraPosition[0]);
			controls.update();
			renderer.render(scene, camera);

			ctx.drawImage(gloveCanvas, centerPos + params.thumbnailOffsetPercent * canvas.width, 0, newWidth, newHeight);


			camera.position.copy(params.thumbnailCameraPosition[1]);
			controls.update();
			renderer.render(scene, camera);

			ctx.drawImage(gloveCanvas, centerPos - params.thumbnailOffsetPercent * canvas.width, 0, newWidth, newHeight);


			camera.position.copy(cameraOriginalPosition);


			var $thumbnailInput = $(params.thumbnailInput);
			$thumbnailInput.val(canvas.toDataURL());
			$thumbnailInput.trigger('change');
		}


		function getDrawingCanvas(mesh){
			// Drawing Canvas
			var meshSize = new THREE.Vector3();

			if(mesh.userData.model.aspect != undefined){
				meshSize.x = mesh.userData.model.aspect;
				meshSize.y = 1;
				meshSize.z = 1;
			}else{
				mesh.geometry.computeBoundingBox();
				mesh.geometry.boundingBox.getSize(meshSize);

			}

			var meshWidth = meshSize.x;
			var meshHeight = Math.sqrt(meshSize.y * meshSize.y + meshSize.z * meshSize.z);

			// Setup Canvas
			var canvas = document.createElement('canvas');
			var context = canvas.getContext('2d');

			canvas.width = params.logoCanvasWidth;
			canvas.height = params.logoCanvasWidth * (meshHeight / meshWidth);

			return canvas;
		}

		function getBase64FromImage(img){
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');

			canvas.width = img.width;
			canvas.height = img.height;

			ctx.drawImage(img, 0, 0);

			return canvas.toDataURL();
		}

		function getSnapshotBase64(cameraPosition){
			var newPos = cameraPosition;
			var oldPos = (new THREE.Vector3()).copy(camera.position);

			if(cameraPosition == undefined){
				newPos = (new THREE.Vector3()).copy(camera.position);
			}

			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');

			var gloveCanvas = renderer.domElement;

			canvas.width = params.snapshotSize.width;
			canvas.height = params.snapshotSize.height;


			var newWidth = (gloveCanvas.width / gloveCanvas.height) * canvas.height;
			var newHeight = canvas.height; 

			var centerPos = -newWidth/2 + canvas.width/2;



			camera.position.copy(newPos);
			controls.update();
			renderer.render(scene, camera);

			ctx.drawImage(gloveCanvas, centerPos, 0, newWidth, newHeight);
			

			camera.position.copy(oldPos);
			controls.update();


			return canvas.toDataURL();

		}

		function getShortestDistanceAngle(fromAngle, toAngle){
			var fullRotation = Math.PI * 2;

			var distances = [
				Math.abs(toAngle + fullRotation - fromAngle),
				Math.abs(toAngle - fullRotation - fromAngle),
				Math.abs(toAngle - fromAngle)
			]

			var angles = [
				toAngle + fullRotation,
				toAngle - fullRotation,
				toAngle
			]

			return angles[distances.indexOf(Math.min(...distances))];
		}

		function toPriceFormat(num){
			return parseFloat(Math.round(num * 100) / 100).toFixed(2);
		}



		function drawCanvasToMesh(mesh, canvas){
			mesh.material.map = new THREE.CanvasTexture(canvas);
			mesh.material.map.anisotropy = 4;
			mesh.material.needsUpdate = true;
		}


		function drawImageWithTransformations(image, mesh, transformations){
			var defaultTransformations = {
				translate: {x: 0, y: 0},
				rotate: 0,
				scale: {x: 1, y: 1}
			}

			transformations = getDefaults(transformations, defaultTransformations);
			mesh.userData.logoTransformations = transformations;


			if(mesh.userData.logoDrawingCanvas == undefined)
				mesh.userData.logoDrawingCanvas = getDrawingCanvas(mesh);

			var canvas = mesh.userData.logoDrawingCanvas;
			var ctx = canvas.getContext('2d');


			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.save();

			ctx.translate(canvas.width/2, canvas.height/2);
			ctx.rotate(transformations.rotate);

			var imageNewWidth = canvas.width * transformations.scale.x;
			var imageNewHeight = canvas.width * (image.height / image.width) * transformations.scale.y;

			ctx.drawImage(image, -(imageNewWidth / 2) + transformations.translate.x, -(imageNewHeight / 2) + transformations.translate.y, imageNewWidth, imageNewHeight);

			ctx.restore();

			// openCanvasInNewWindow(canvas);


			drawMeshCanvases(mesh);
		}

		


		function drawTextOverlay(text, mesh, transformations){
			var defaultText = {
				fontFamily: 'Montserrat',
				fillStyle: 'white',
				strokeStyle: 'black',
				textAlign: 'center',
				fontWeight: '900',
				text: ''
			};

			var defaultTransformations = {
				translate: {x: 0, y: 0},
				rotate: 0,
				fontSize: 100,
				strokeWidth: 15
			}

			text = getDefaults(text, defaultText);
			transformations = getDefaults(transformations, defaultTransformations);

			mesh.userData.text = text;
			mesh.userData.textTransformations = transformations;

			if(mesh.userData.textDrawingCanvas == undefined)
				mesh.userData.textDrawingCanvas = getDrawingCanvas(mesh);

			var canvas = mesh.userData.textDrawingCanvas;
			var ctx = canvas.getContext('2d');


			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.save();


			ctx.font = text.fontWeight + ' ' + transformations.fontSize + 'px ' + text.fontFamily;
			ctx.textAlign = text.textAlign;
			ctx.fillStyle = text.fillStyle;
			ctx.strokeStyle = text.strokeStyle;
			ctx.lineWidth = transformations.strokeWidth;

			ctx.translate(canvas.width/2, canvas.height/2);
			ctx.rotate(transformations.rotate);



			ctx.strokeText(text.text, transformations.translate.x, transformations.translate.y);

			ctx.fillText(text.text, transformations.translate.x, transformations.translate.y);


			ctx.restore();



			drawMeshCanvases(mesh);
			// openCanvasInNewWindow(canvas);
			
		}

		function drawMeshCanvases(mesh){
			if(mesh.userData.outputDrawingCanvas == undefined)
				mesh.userData.outputDrawingCanvas = getDrawingCanvas(mesh);

			if(mesh.userData.textDrawingCanvas == undefined)
				mesh.userData.textDrawingCanvas = getDrawingCanvas(mesh);

			if(mesh.userData.logoDrawingCanvas == undefined)
				mesh.userData.logoDrawingCanvas = getDrawingCanvas(mesh);

			var canvas = mesh.userData.outputDrawingCanvas;

			var ctx = canvas.getContext('2d');

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.drawImage(mesh.userData.logoDrawingCanvas, 0, 0);
			ctx.drawImage(mesh.userData.textDrawingCanvas, 0, 0);

			// drawBase64ToMesh(mesh, canvas.toDataURL());
			drawCanvasToMesh(mesh, canvas);
		}


		function getModelLoader(model){
			if(model.url.endsWith('.buffergeometry.json')){
				return bufferGeometryLoader;

			}else if(model.url.endsWith('.js') || model.url.endsWith('.json')){
				return jsonLoader;

			}else if(model.url.endsWith('.obj')){
				return objLoader;
			}
		}

		function openCanvasInNewWindow(canvas){
			var win = window.open();

			win.document.write('<iframe style="width:' + canvas.width +'px; height: ' + canvas.height + 'px" src="' + canvas.toDataURL()+ '" />');
		}
		window.openCanvasInNewWindow = openCanvasInNewWindow;
		
		function recalculatePrice(){
			var $size = $(':selected', $sizesSelectInput);

			var price = $size.data('cndce-price');


			for(var i=0; i < activeLogos.length; i++){
				price += activeLogos[i].userData.model.logoPrice;
			}

			for(var i=0; i < activeTexts.length; i++){
				price += activeTexts[i].userData.model.textPrice;
			}
			
			for(var i=0; i < gloveIntersectables.color.length; i++){
				if(gloveIntersectables.color[i].userData.color != undefined){
					if(gloveIntersectables.color[i].userData.color.price != undefined){
						price += gloveIntersectables.color[i].userData.color.price;
					}
				}
			}


			price *= $quantityInput.val();


			$priceTotal.html(toPriceFormat(price));
		}


		function loadModel(model, parent){

			var loader = getModelLoader(model);

			if(loader == undefined){
				return;
			}

			loader.load(cndceBoxingGloveURL + params.modelsDir + model.url, 


				function onLoaderLoad(obj){

					console.log('loaded', obj);

					var materialParams = model.material;

					if(materialParams.side == undefined)
						materialParams.side = THREE.DoubleSide;

					materialParams.envMap = envMap;
					materialParams.envMapIntensity = params.envMapIntensity;


					var material = new THREE.MeshStandardMaterial(materialParams);
					var mesh;

					if(obj.type == 'Geometry' || obj.type == 'BufferGeometry'){
						mesh = new THREE.Mesh(obj, material);

					}else if(obj.type == 'Group'){
						mesh = obj.getObjectByProperty('type', 'Mesh');
						mesh.material = material;
					}




					mesh.userData.model = model;

					if(model.name != undefined){
						mesh.name = model.name;
					}

					if(model.map != undefined){
						material.map = textureLoader.load(cndceBoxingGloveURL + params.modelMapsDir + model.map);

						material.map.anisotropy = 4;
					}

					if(model.logoModel != undefined){
						loadModel(model.logoModel, mesh);

					}

					if(model.logoImage != undefined){

						// Drawing Canvas
						var img = new Image();

						if(model.logoImage.isTransparent){
							img.src = cndceBoxingGloveURL + params.logosURL + params.modelsTransparentImage;

							mesh.userData.hasLogo = false;

						}else{
							img.src = cndceBoxingGloveURL + params.logosURL + model.logoImage.image;

							mesh.userData.hasLogo = true;
						}

						

						img.onload = function(){
							mesh.userData.logoImg = img;
							// mesh.userData.logoTransformations = model.logoImage.transformations;


							drawImageWithTransformations(img, mesh, model.logoImage.transformations);
							drawTextOverlay({text: ''}, mesh, model.logoImage.transformations);

						}

					}

					if(model.alphaMap != undefined){
						material.alphaMap = textureLoader.load(cndceBoxingGloveURL + params.modelMapsDir + model.alphaMap);
					}

					if(model.normalMap != undefined){
						material.normalMap = textureLoader.load(cndceBoxingGloveURL + params.modelMapsDir + model.normalMap);
						
						material.normalMap.anisotropy = 4;
					}


					if(model.snapshot != undefined){

						// Glove Part
						var $templateGP = getTemplate($glovePartTemplate);
						mesh.userData.$snapshot = $templateGP;					
						$gloveParts.append($templateGP);

						mesh.userData.$editables = {};

						var $templateALL = $templateGP;


						// Logo
						if(model.isLogoModel && model.isLogoUploadable){


							mesh.userData.isLogoUploadable = true;


							var $templateLogo = getTemplate($logoEditableTemplate);
							var $templateText = getTemplate($textEditableTemplate);


							$templateALL = $templateALL.add($templateLogo).add($templateText);



							$logoEditables.append($templateLogo);
							mesh.userData.$editables.logo = $templateLogo;

							$textEditables.append($templateText);
							mesh.userData.$editables.text = $templateText;

							// $templateALL.addClass('has-logo');


							

						}else{
							
							mesh.userData.isLogoUploadable = false;


							// Color Editables
							var $templateCE = getTemplate($colorEditableTemplate);

							$templateALL = $templateALL.add($templateCE);

							$colorEditables.append($templateCE);
							mesh.userData.$editables.color = $templateCE;

						}

						$templateALL.css({
							backgroundImage: 'url(' + cndceBoxingGloveURL + params.snapshotsURL + model.snapshot + ')'
						})


						$templateALL.data('cndce-glove-part', mesh);

					}

					if(parent != undefined){
						parent.add(mesh);

					}else if(model.addToEventGroup != undefined && model.addToEventGroup){

						if(model.isLogoModel){
							gloveIntersectables.text.push(mesh);
							gloveIntersectables.logo.push(mesh);
						}else{
							gloveIntersectables.color.push(mesh);
						}

						gloveEditables.add(mesh);

						

					}else{
						scene.add(mesh);				
					}
				},

				function onLoaderProgress(){

				},

				function onLoaderError(err){
					console.log(err);
				}

			)	

			
		}


		function tweenGlovePartHover(hoverType, glove){
			var to;

			if(hoverType == 'in'){
				to = params.mouseHoverOpacity;
			}else if (hoverType == 'out') {
				to = 1;
			}else{
				return false;
			}


			// Stop existing hover tweens
			if(glove.userData.hoverTween != undefined){
				glove.userData.hoverTween.stop();
			}


			var tween = new TWEEN.Tween({
				opacity: glove.material.opacity

			}).to({
				opacity: to
			}, params.mouseHoverDuration)

			.easing(params.mouseHoverEasing)

			.onUpdate(function(){
				glove.material.opacity = this.opacity;
			})

			.onComplete(function(){
				glove.userData.hoverTween = undefined;
			})

			.start();

			glove.userData.hoverTween = tween;

		}

		function tweenGlovePartChangeColor(glove, newColor){
			// Stop existing change  color tweens
			if(glove.userData.changeColorTween != undefined){
				glove.userDaat.changeColorTween.stop();
			}

			var tween = new TWEEN.Tween({
				r: glove.material.color.r,
				g: glove.material.color.g,
				b: glove.material.color.b
			})

			.to({
				r: newColor.r,
				g: newColor.g,
				b: newColor.b
			}, params.changeColorDuration)

			.easing(params.changeColorEasing)


			.onUpdate(function(){
				glove.material.color.setRGB(this.r, this.g, this.b);
			})

			.onComplete(function(){
				glove.userData.changeColorTween = undefined;
			})

			.start();

			glove.userData.changeColorTween = tween;
		}

		function tweenCameraLookPosition(lookAtPosition){
			// Stop existing lookat tweens
			if(camera.userData.lookAtTween != undefined){
				camera.userData.lookAtTween.stop();
			}

			var spherical = (new THREE.Spherical()).setFromVector3(lookAtPosition);

			var tween = new TWEEN.Tween({
				radius: controls.target.distanceTo(camera.position),
				polarAngle: controls.getPolarAngle(),
				azimuthalAngle: controls.getAzimuthalAngle()
			})

			.to({
				radius: spherical.radius,
				polarAngle: spherical.phi,
				azimuthalAngle: getShortestDistanceAngle(controls.getAzimuthalAngle(), spherical.theta)
			}, params.cameraLookAtDuration)

			.easing(params.cameraLookAtEasing)


			.onUpdate(function(){

				camera.position.setFromSphericalCoords(
					this.radius,
					this.polarAngle,
					this.azimuthalAngle
				);

				// camera.position.copy(this);
				controls.update();
			})

			.onComplete(function(){
				camera.userData.lookAtTween = undefined;
			})

			.start();

			camera.userData.lookAtTween = tween;
		}


		function onLoadersFinished(){


			$('.cndce-color-editable:not(.cndce-template)', $controlsEditables).eq(0).click();
			$sizesSelectInput.change();

			$container.addClass('loaded');
			render();
		}

		function onGlovePartMouseEnter(){
			if(gloveIntersected != undefined && gloveIntersected.length > 0){
				tweenGlovePartHover('in',gloveIntersected[0].object);
				$container.addClass('glove-intersected');
			}
		}

		function onGlovePartMouseLeave(){
			if(gloveIntersected != undefined && gloveIntersected.length > 0){
				tweenGlovePartHover('out', gloveIntersected[0].object);
				$container.removeClass('glove-intersected');
			}
		}

		function onGlovePartMouseClick(){
			gloveSelected = gloveIntersected;

			var gloveSelectedMesh = gloveSelected[0].object;

			
			selectGlovePart(gloveSelectedMesh);

		}

		function onGlovePartLogoChange(img){
			var gloveLogo = gloveSelected[0].object;

    		if(!$container.hasClass('cndce-has-logo')){
	    		activeLogos.push(gloveLogo);
	    		recalculatePrice();
    			$container.addClass('cndce-has-logo');

    		}

    		gloveLogo.userData.logoImg = img;
    		gloveLogo.userData.hasLogo = true;


	    	drawImageWithTransformations(img, gloveLogo, gloveLogo.userData.model.logoImage.transformations);


	    	// Inputbox
	    	var $inputBox = $(gloveLogo.userData.model.inputBox);
	    	$inputBox.val(getBase64FromImage(img));
	    	$inputBox.trigger('change');
		}

		function selectGlovePart(glove){
			// Color Editables
			var $colorEditable = glove.userData.$editables.color;
			var $logoEditable = glove.userData.$editables.logo;
			var $textEditable = glove.userData.$editables.text;

			var $allEditables = $().add($colorEditable).add($logoEditable).add($textEditable);

			var $activeEditable = glove.userData.$editables[$container.attr('data-active-editable')];

			$('.active', $controlsEditables).removeClass('active');
			$allEditables.addClass('active');


			$controlsEditables.animate({
				scrollTop: $controlsEditables.scrollTop() + $activeEditable.position().top
			});




			// Snapshot
			var $snapshot = glove.userData.$snapshot;

			$()
			$('.active', $gloveParts).removeClass('active');
			$snapshot.addClass('active');



			// Camera
			var lookAtPosition = glove.userData.model.cameraPosition;

			if(lookAtPosition == undefined){
				lookAtPosition = params.cameraPosition;
			}

			tweenCameraLookPosition(lookAtPosition);

			

			// Logo
			$container.removeClass('cndce-has-logo');

			if(glove.userData.isLogoUploadable){
				// var logoMesh = glove.getObjectByName('Logo');
				var logoMesh = glove;

				$container.addClass('cndce-logo-uploadable');

				if(logoMesh.userData.hasLogo){
					$container.addClass('cndce-has-logo');
				}


				// Text
				$textInput.val(logoMesh.userData.text.text);
				// $('.cndce-font-preview.active', $fontPreviews).removeClass('active');
				$('.cndce-font-preview[data-font-family=' + logoMesh.userData.text.fontFamily + ']', $fontPreviews).click();


			}else{
				$container.removeClass('cndce-logo-uploadable');

			}


			// Input
			$logoInput.val('');


		}


		

		function render(){
			requestAnimationFrame(render);

			controls.update();
			TWEEN.update();
			renderer.render(scene, camera);
		}

		

		// Window Resize Event
		$(window).on('resize', function(){

			if($container.height() <= 100){
				$container.height(params.minHeight);
			}

			camera.aspect = $canvas.width() / $canvas.height();
			camera.updateProjectionMatrix();

			renderer.setSize($canvas.width(), $canvas.height());
		});
		


		// Handle Canvas Mouse Events
		$container.on('mousemove', 'canvas', function(e){
			var mouseX = e.pageX - $canvas.offset(  ).left;
			var mouseY = e.pageY - $canvas.offset(  ).top;

			mouse.x = ( mouseX / $canvas.width(  ) ) * 2 - 1;
			mouse.y = - ( mouseY / $canvas.height(  ) ) * 2 + 1;

			raycaster.setFromCamera( mouse, camera );



			var intersected = raycaster.intersectObjects(gloveIntersectables[$container.attr('data-active-editable')]);


			// Dont -proceed if nothing intersected
			if(intersected.length == 0){
				onGlovePartMouseLeave();
				gloveIntersected = undefined;

				return;
			}

			// Dont proceed if the same hover target
			if(gloveIntersected != undefined && gloveIntersected[0].object == intersected[0].object){
				return;
			}


			// Return previous hovered part to original state
			onGlovePartMouseLeave();

			gloveIntersected = intersected;


			onGlovePartMouseEnter();
		})


		// Controls
		$('.cndce-left-bar-icon').click(function(){
			var $this = $(this);

			$('.cndce-left-bar-icon.active').removeClass('active');
			$this.addClass('active');

			$container.attr('data-active-editable', $this.attr('data-editable'));


			var $activeEditable = $('.cndce-controls-editables-type[data-editable="' + $this.attr('data-editable') + '"] .cndce-editable.active');

			if($activeEditable.length > 0){
				$controlsEditables.animate({
					scrollTop: $controlsEditables.scrollTop() + $activeEditable.position().top
				});
			}

			

		})


		$container.on('click', 'canvas', function(e){

			if(gloveIntersected == undefined || gloveIntersected.length == 0)
				return;

			onGlovePartMouseClick();
		})


		$container.on('click', '.cndce-popup-exit-button', function(){
			$(this).parents('.cndce-popup-overlay').removeClass('visible');
		});

		

		$sizesSelectInput.add($quantityInput).on('change', function(){
			recalculatePrice();

			// Input Boxes
			var $quantityInputBox = $(params.quantityInput);
			$quantityInputBox.val($quantityInput.val());
			$quantityInputBox.trigger('change');

			var $sizesInputBox = $(params.sizesInput);
			$sizesInputBox.val($sizesSelectInput.val());
			$sizesInputBox.trigger('change');
		});
		


		$container.on('click', '.cndce-color-type-container .cndce-color-box', function(e){
			var $colorBox = $(this);

			if(gloveSelected == undefined || gloveSelected.length == 0)
				return;


			var glovePart = gloveSelected[0].object;


			var newColor = $colorBox.data('cndce-color').color;
			var newMaterial = $colorBox.data('cndce-material');

			glovePart.userData.color = $colorBox.data('cndce-color');

			// gloveSelected[0].object.material.color.set(newColor);
			tweenGlovePartChangeColor(glovePart, new THREE.Color(newColor));



			if(newMaterial != undefined){
				var materialProperties = Object.keys(newMaterial);

				for(var i=0; i < materialProperties.length; i++){
					if(materialProperties[i] == 'emissive'){
						glovePart.material.emissive.set(newMaterial[materialProperties[i]]);

					}else{
						glovePart.material[materialProperties[i]] = newMaterial[materialProperties[i]];
						
					}

				}
			}



			// InputBox
			var $inputBox = $(glovePart.userData.model.inputBox);
			var newColorName = $colorBox.data('cndce-color').name;
			var newColorType = $colorBox.data('cndce-color-type');

			$inputBox.val(newColorType + ' ' + newColorName);
			$inputBox.trigger('change');


			var colorPrice = $colorBox.data('cndce-color').price;

			if(colorPrice != undefined){
				var $priceInputBox = $(glovePart.userData.model.colorPriceInputBox);
				$priceInputBox.val(colorPrice);
				$priceInputBox.trigger('change');
			}


			



			// Price
			recalculatePrice();

		})


		$fontColors.on('click', '.cndce-color-box', function(){

			if(gloveSelected == undefined)
				return;

			var $this = $(this);

			$('.cndce-color-box.active', $fontColors).removeClass('active');
			$this.addClass('active');

			gloveSelected[0].object.userData.text.fillStyle = $('svg', $this).css('fill');

			$textInput.trigger('keyup');

		})

		$outlineColors.on('click', '.cndce-color-box', function(){

			if(gloveSelected == undefined)
				return;

			var $this = $(this);

			$('.cndce-color-box.active', $outlineColors).removeClass('active');
			$this.addClass('active');

			gloveSelected[0].object.userData.text.strokeStyle = $('svg', $this).css('fill');

			$textInput.trigger('keyup');

		})

		$controlsEditables.on('click', '.cndce-editable', function(){

			var mesh = $(this).data('cndce-glove-part');

			gloveSelected = [
				{
					object: mesh
				}
			];


			selectGlovePart(mesh);

		})

		

		$('.cndce-logo-transformation-button').add($('.cndce-text-transformation-button')).click(function(){
			if(gloveSelected == undefined)
				return;

			var $button = $(this);
			var mesh = gloveSelected[0].object;
			var transformation;

			if($button.hasClass('cndce-logo-transformation-button'))
				transformation = mesh.userData.logoTransformations;
			else if($button.hasClass('cndce-text-transformation-button'))
				transformation = mesh.userData.textTransformations;
			else
				return;




			if($button.attr('data-transformation-axis') != undefined)
				transformation[$button.attr('data-transformation')][$button.attr('data-transformation-axis')] += parseFloat($button.attr('data-transformation-intensity'));
			else{
				transformation[$button.attr('data-transformation')] += parseFloat($button.attr('data-transformation-intensity'))
			}



			if($button.hasClass('cndce-logo-transformation-button')){
				drawImageWithTransformations(mesh.userData.logoImg, mesh, mesh.userData.logoTransformations);

			}else if($button.hasClass('cndce-text-transformation-button')){
				drawTextOverlay(
					mesh.userData.text,
					mesh,
					mesh.userData.textTransformations
				);
			}
		})



		$('#cndce-controls .cndce-logo-button').click(function(){
			$logoInput.click();
		})


		$logoLibraryOverlay.on('click', '.cndce-library-logo', function(){
			onGlovePartLogoChange($('img', this)[0]);

			$('.cndce-popup-exit-button', $logoLibraryOverlay).click();
		})



		$logoLibraryButton.click(function(){
			$logoLibraryOverlay.addClass('visible');
		})



		$logoInput.change(function(){
			var input = this;

			if(gloveSelected == undefined 
				|| !gloveSelected[0].object.userData.isLogoUploadable)

				return;


			if (input.files && input.files[0]) {
			    var reader = new FileReader();
			    reader.readAsDataURL(input.files[0]);

			    reader.onload = function (e) {
			    	var img = new Image();
			    	img.src = e.target.result;

			    	img.onload = function(){

			    		onGlovePartLogoChange(img);

			    	}

			    	

			    };
			}
		})

		$logoRemoveButton.click(function(){

			if(gloveSelected == undefined 
				|| !gloveSelected[0].object.userData.isLogoUploadable)

				return;

			var gloveLogo = gloveSelected[0].object;


    		activeLogos.splice(activeLogos.indexOf(gloveLogo), 1);
    		recalculatePrice();

    		gloveLogo.userData.logoImg = logoTransparentImage;
    		gloveLogo.userData.hasLogo = false;

    		drawImageWithTransformations(logoTransparentImage, gloveLogo);

			$container.removeClass('cndce-has-logo');


			// Inputbox
			var $inputBox = $(gloveLogo.userData.model.inputBox);
			$inputBox.val('');
			$inputBox.trigger('change');


		})

		$fontPreviews.on('click', '.cndce-font-preview', function(e){


			if(gloveSelected == undefined)
				return;

			var $this = $(this);

			$('.active', $fontPreviews).removeClass('active');
			$this.addClass('active');

			$textInput.css({
				fontFamily: $this.css('fontFamily')
			})

			gloveSelected[0].object.userData.text.fontFamily = $this.css('fontFamily');

			$textInput.trigger('keyup');

		})

		$textInput.keyup(function(){

			if(gloveSelected == undefined)
				return;



			var gloveLogo = gloveSelected[0].object;

			if(gloveLogo.userData.text.text == '' 
				&& $textInput.val() != ''){

				activeTexts.push(gloveLogo);
				recalculatePrice();
			}

			if(gloveLogo.userData.text.text != '' 
				&& $textInput.val() == ''){

				activeTexts.splice(activeTexts.splice(activeTexts.indexOf(gloveLogo), 1));
				recalculatePrice();
			}


			gloveLogo.userData.text.text = $textInput.val();

			// Inputbox
			var $inputBox = $(gloveLogo.userData.model.textInputBox);
			$inputBox.val($textInput.val());
			$inputBox.trigger('change');


			drawTextOverlay(
				gloveLogo.userData.text,
				gloveLogo,
				gloveLogo.userData.textTransformations
			)
		})

		

		$textRemoveButton.click(function(){
			$textInput.val('');
			$textInput.trigger('keyup');
		})

		$textAddButton.click(function(){
			$textInput.val($(this).data('text'));
			$textInput.trigger('keyup');
		})

		$textRemoveOutlineButton.click(function(){
			gloveSelected[0].object.userData.text.strokeStyle = 'transparent';
			$textInput.trigger('keyup');
			
		})

		$addToCartButton.click(function(){
			getThumbnail();
			$(params.addToCartButton).click();
		})



		$downloadSnapshotButton.click(function(){
			$downloadSnapshotButton.attr('href', getSnapshotBase64());
		})


		$changeThemeButton.click(function(){
			$container.toggleClass('theme-1');
		});


		(function initDOM(){
			$('.cndce-library-logo img', $logoLibraryOverlay).attr('crossOrigin', 'Anonymous');
		})();
		

		(function initScrollbar(){
			$('.cndce-scrollbar').scrollbar();
		})();


		(function initSizes(){

			for(var i=0; i < params.sizes.length; i++){
				var $template = getTemplate($sizesOptionTemplate);

				$template.html(params.sizes[i].label + ' - $' + toPriceFormat(params.sizes[i].price));

				$template.data('cndce-price', params.sizes[i].price);
				$template.attr('value', params.sizes[i].label);

				$sizesSelectInput.append($template);
			}

			$sizesSelectInput.val(params.sizes[0].label);

		})();

		(function initColors(){
			$.ajax({
				url: cndceBoxingGloveURL + params.colorsURL,
				dataType: 'json',
				success: function(data){
					params.colors = Object.assign(params.colors, data['colors']);
					params.fontColors = Object.assign(params.fontColors, data['fontColors']);
					params.outlineColors = Object.assign(params.outlineColors, data['outlineColors']);

					var colors = params.colors;
					var colorTypes = Object.keys(colors);


					// Colors
					for(var i=0; i < colorTypes.length; i++){
						var color = colors[colorTypes[i]];

						var $template = getTemplate($colorTypeTemplate);
						var $colorsContainer = $('.cndce-colors-container', $template);

						$colorsDiv.append($template);


						$('.cndce-color-type-label', $template).html(color.label);



						for(var j=0; j < color.colors.length; j++){
							var $colorBoxTemplate = getTemplate($('.cndce-color-box.cndce-template', $colorsContainer));

							$('.cndce-color-name', $colorBoxTemplate).html(color.colors[j].name);

							$('svg', $colorBoxTemplate).css({
								'fill': color.colors[j].color
							})
							// $colorBoxTemplate.css({
							// 	background: color.colors[j].color
							// });

							$colorBoxTemplate.data('cndce-color', color.colors[j]);
							$colorBoxTemplate.data('cndce-material', color.material);
							$colorBoxTemplate.data('cndce-color-type', color.label);


							$colorsContainer.append($colorBoxTemplate);

						}
					}

					// Font Colors
					var fontColors = params.fontColors;
					for(var i=0; i < fontColors.colors.length; i++){
						var $colorBoxTemplate = getTemplate($fontColorBoxTemplate);

						$('svg', $colorBoxTemplate).css({
							'fill': fontColors.colors[i].color
						})

						$fontColors.append($colorBoxTemplate);
					}

					// Outline Colors
					console.log(params.outlineColors);
					var outlineColors = params.outlineColors;
					for(var i=0; i < outlineColors.colors.length; i++){
						var $colorBoxTemplate = getTemplate($outlineColorBoxTemplate);

						$('svg', $colorBoxTemplate).css({
							'fill': fontColors.colors[i].color
						})

						$outlineColors.append($colorBoxTemplate);
					}


					$('.cndce-template').remove();
				}

			})
		})();


		(function initFonts(){
			$.ajax({
				url: cndceBoxingGloveURL + params.fontsURL,
				dataType: 'json',
				success: function(data){
					params.fonts = data;

					var fontFamilies = Object.keys(params.fonts);

					for(var i=0; i < fontFamilies.length; i++){
						var font = params.fonts[fontFamilies[i]];
						var fontFace = new FontFace(
							font.fontFamily, 
							'url(' + cndceBoxingGloveURL + font.url + ')',
							{
								style: font.fontStyle,
								weight: font.fontWeight
							}
						)

						fontFace
						.load()
						.then(function(loadedFont){
							document.fonts.add(loadedFont);
						})

						var $template = getTemplate($fontPreviewTemplate);

						$template.html(font.fontFamily);
						$template.css({
							fontFamily: font.fontFamily
						});

						$template.attr('data-font-family', font.fontFamily);

						$fontPreviews.append($template);

					}
					$('.cndce-font-preview', $fontPreviews).eq(0).click();

				}
			})
		})();


		(function initThreeJs(){
			var width = $container.width();
			var height = $container.height();


			halfWidth = width / 2;
			halfHeight = height / 2;


			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(26, width/height, params.cameraFrustumMin, params.cameraFrustumMax);

			camera.position.copy(params.cameraPosition);

			window.camera = camera;
			window.scene = scene;


			// GLOVES
			gloveEditables = new THREE.Group();
			scene.add(gloveEditables);

			// LIGHTS
			// ambientLight = new THREE.AmbientLight(params.ambientLightColor, params.ambientLightIntensity);
			ambientLight = new THREE.HemisphereLight(params.ambientLightColor, 4473924, params.ambientLightIntensity);
			scene.add(ambientLight);

			directionalLight = new THREE.DirectionalLight(params.directionalLightColor, params.directionalLightIntensity);
			directionalLight.position.set(
				params.directionalLightPositionX,
				params.directionalLightPositionY,
				params.directionalLightPositionZ
			);

			directionalLight.castShadow = false;
			scene.add(directionalLight);


			secondaryLight1 = new THREE.DirectionalLight(params.secondaryLight1Color, params.secondaryLight1Intensity);

			secondaryLight1.position.set(
				params.secondaryLight1PositionX,
				params.secondaryLight1PositionY,
				params.secondaryLight1PositionZ
			);

			secondaryLight1.castShadow = false;
			scene.add(secondaryLight1);


			secondaryLight2 = new THREE.DirectionalLight(params.secondaryLight2Color, params.secondaryLight2Intensity);

			secondaryLight2.position.set(
				params.secondaryLight2PositionX,
				params.secondaryLight2PositionY,
				params.secondaryLight2PositionZ
			);
			scene.add(secondaryLight2);



			// RENDERER
			renderer = new THREE.WebGLRenderer({
				// canvas: canvas
				antialias: true,
				alpha: true,
				logarithmicDepthBuffer: false,
				preserveDrawingBuffer: params.rendererPreserveDrawingBuffer
			});
			renderer.setSize(width, height);
			renderer.setPixelRatio(window.devicePixelRatio);

	        renderer.setClearColor(16054265, 0);


			$container.append(renderer.domElement);

			canvas = renderer.domElement;
			$canvas = $(canvas);
			


			// RAYCASTER
			raycaster = new THREE.Raycaster();




			// CONTROLS
			controls = new THREE.OrbitControls(camera, renderer.domElement);

			controls.minPolarAngle = params.controlsMinPolarAngle;
			controls.maxPolarAngle = params.controlsMaxPolarAngle;
			controls.enableZoom = params.controlsEnableZoom;
			controls.enableDamping = params.controlsEnableDamping;
			controls.dampingFactor = params.controlsDampingFactor;
			controls.enableKeys = params.controlsEnableKeys;
			controls.enablePan = params.controlsEnablePan;

			controls.target.copy(params.controlsTarget);


			window.controls = controls;

			// LOADERS
			loadingManager = new THREE.LoadingManager();
			loadingManager.onLoad =  onLoadersFinished;

			jsonLoader = new THREE.JSONLoader(loadingManager);
			bufferGeometryLoader = new THREE.BufferGeometryLoader(loadingManager);
			objLoader = new THREE.OBJLoader(loadingManager);
			textureLoader = new THREE.TextureLoader(loadingManager);



			// ENVMAP
			var envMapDir = [];
			for(var i=0; i < params.envMap.length; i++){
				envMapDir.push(cndceBoxingGloveURL + params.envMap[i]);
			}

			envMap = new THREE.CubeTextureLoader(loadingManager).load(envMapDir);



			// TRANSPARENT IMAGE
			logoTransparentImage = new Image();
			logoTransparentImage.src = cndceBoxingGloveURL + params.logosURL + params.modelsTransparentImage;


			$(window).trigger('resize');
		})();

		(function initModel(){

			for(var i=0; i < params.models.length; i++){
				loadModel(params.models[i]);
			}
		})();



	}
})