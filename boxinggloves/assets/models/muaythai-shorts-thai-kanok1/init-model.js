jQuery(function($){
	$('#cndce-gloves-container').cndce3DGloves({
		modelsDir: './assets/models/muaythai-shorts-thai-kanok1/',
		modelMapsDir: './assets/models/muaythai-shorts-thai-kanok1/maps/',

		snapshotsURL: './assets/models/muaythai-shorts-thai-kanok1/snapshots/',

		cameraPosition: {x: -9.212505533929168, y: 13.235142739270826, z: 30.161358386608363},


		models: [
			{
				'id': 'garter-1',
				'name': 'Garter 1',
				'url': 'garter-1.buffergeometry.json',
				'inputBox': '.cndce-woo-color-garter-1',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-garter-2.png',
				// 'normalMap': 'normal-garter-2.png',
				'snapshot': 'snapshot-garter-1.png',
				'cameraPosition': {x: -9.212505533929168, y: 13.235142739270826, z: 30.161358386608363},
				'addToEventGroup': true
			},
			{
				'id': 'garter-2',
				'name': 'Garter 2',
				'url': 'garter-2.buffergeometry.json',
				'inputBox': '.cndce-woo-color-garter-2',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-garter-3.png',
				// 'normalMap': 'normal-garter-3.png',
				'snapshot': 'snapshot-garter-2.png',
				'cameraPosition': {x: -9.212505533929168, y: 13.235142739270826, z: 30.161358386608363},
				'addToEventGroup': true
			},
			{
				'id': 'garter-3',
				'name': 'Garter 3',
				'url': 'garter-3.buffergeometry.json',
				'inputBox': '.cndce-woo-color-garter-3',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-garter-4.png',
				// 'normalMap': 'normal-garter-4.png',
				'snapshot': 'snapshot-garter-3.png',
				'cameraPosition': {x: -9.212505533929168, y: 13.235142739270826, z: 30.161358386608363},
				'addToEventGroup': true
			},
			{
				'id': 'garter-4',
				'name': 'Garter 4',
				'url': 'garter-4.buffergeometry.json',
				'inputBox': '.cndce-woo-color-garter-4',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-garter-1.png',
				// 'normalMap': 'normal-garter-1.png',
				'snapshot': 'snapshot-garter-4.png',
				'cameraPosition': {x: -9.212505533929168, y: 13.235142739270826, z: 30.161358386608363},
				'addToEventGroup': true
			},
			{
				'id': 'body-bl',
				'name': 'Body Back Left',
				'url': 'body-bl.buffergeometry.json',
				'inputBox': '.cndce-woo-color-body-bl',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-body.png',
				// 'normalMap': 'normal-fabric.jpg',
				'snapshot': 'snapshot-body-bl.png',
				'cameraPosition': {x: -25.78193579401726, y: 4.047852536634785, z: -22.105507861657063},
				'addToEventGroup': true
			},
			{
				'id': 'body-br',
				'name': 'Body Back Right',
				'url': 'body-br.buffergeometry.json',
				'inputBox': '.cndce-woo-color-body-br',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-body.png',
				// 'normalMap': 'normal-fabric.jpg',
				'snapshot': 'snapshot-body-br.png',
				'cameraPosition': {x: 10.57886512371586, y: 3.3887048574714274, z: -32.34735063881046},
				'addToEventGroup': true
			},
			{
				'id': 'body-fl',
				'name': 'Body Front Left',
				'url': 'body-fl.buffergeometry.json',
				'inputBox': '.cndce-woo-color-body-fl',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-body.png',
				// 'normalMap': 'normal-fabric.jpg',
				'snapshot': 'snapshot-body-fl.png',
				'cameraPosition': {x: -9.934576885238632, y: 3.6262927916984538, z: 32.52538983574427},
				'addToEventGroup': true
			},
			{
				'id': 'body-fr',
				'name': 'Body Front Right',
				'url': 'body-fr.buffergeometry.json',
				'inputBox': '.cndce-woo-color-body-fr',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-body.png',
				// 'normalMap': 'normal-fabric.jpg',
				'snapshot': 'snapshot-body-fr.png',
				'cameraPosition': {x: 14.134274584218858, y: 4.518556305384105, z: 30.814797292209487},
				'addToEventGroup': true
			},
			{
				'id': 'bottom-strip-bl',
				'name': 'Bottom Strip Back Left',
				'url': 'bottom-strip-bl.buffergeometry.json',
				'inputBox': '.cndce-woo-color-bottom-strip-bl',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-bottom.png',
				// 'normalMap': 'normal-fabric.jpg',
				'snapshot': 'snapshot-bottom-strip-bl.png',
				'cameraPosition': {x: -9.831753284757031, y: -2.8243425534198474, z: -32.63596969228259},
				'addToEventGroup': true
			},
			{
				'id': 'bottom-strip-br',
				'name': 'Bottom Strip Back Right',
				'url': 'bottom-strip-br.buffergeometry.json',
				'inputBox': '.cndce-woo-color-bottom-strip-br',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-bottom.png',
				// 'normalMap': 'normal-fabric.jpg',
				'snapshot': 'snapshot-bottom-strip-br.png',
				'cameraPosition': {x: 3.393730617952726, y: -2.8243425534198465, z: -33.91537236859841},
				'addToEventGroup': true
			},
			{
				'id': 'bottom-strip-fl',
				'name': 'Bottom Strip Front Left',
				'url': 'bottom-strip-fl.buffergeometry.json',
				'inputBox': '.cndce-woo-color-bottom-strip-fl',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-bottom.png',
				// 'normalMap': 'normal-fabric.jpg',
				'snapshot': 'snapshot-bottom-strip-fl.png',
				'cameraPosition': {x: -10.594869953204062, y: -2.8243425534198465, z: 32.39627480255427},
				'addToEventGroup': true
			},
			{
				'id': 'bottom-strip-fr',
				'name': 'Bottom Strip Front Right',
				'url': 'bottom-strip-fr.buffergeometry.json',
				'inputBox': '.cndce-woo-color-bottom-strip-fr',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-body.png',
				// 'normalMap': 'normal-fabric.jpg',
				'snapshot': 'snapshot-bottom-strip-fr.png',
				'cameraPosition': {x: 9.18911356279618, y: -2.8243425534198465, z: 32.82270681004164},
				'addToEventGroup': true
			},
			{
				'id': 'design-bl',
				'name': 'Design Back Left',
				'url': 'design-bl.buffergeometry.json',
				'inputBox': '.cndce-woo-color-design-bl',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-bottom.png',
				'normalMap': 'normal-design.jpg',
				'snapshot': 'snapshot-design-bl.png',
				'cameraPosition': {x: -22.086560748576712, y: -2.8243425534198465, z: -25.96061872735989},
				'addToEventGroup': true
			},
			{
				'id': 'design-br',
				'name': 'Design Back Right',
				'url': 'design-br.buffergeometry.json',
				'inputBox': '.cndce-woo-color-design-br',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-bottom.png',
				'normalMap': 'normal-design.jpg',
				'snapshot': 'snapshot-design-br.png',
				'cameraPosition': {x: 26.38151951918281, y: -2.8243425534198474, z: -21.582060102476206},
				'addToEventGroup': true
			},
			{
				'id': 'design-fl',
				'name': 'Design Front Left',
				'url': 'design-fl.buffergeometry.json',
				'inputBox': '.cndce-woo-color-design-fl',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-bottom.png',
				'normalMap': 'normal-design.jpg',
				'snapshot': 'snapshot-design-fl.png',
				'cameraPosition': {x: -20.087319576724543, y: -2.8243425534198474, z: 27.53669338592522},
				'addToEventGroup': true
			},
			{
				'id': 'design-fr',
				'name': 'Design Front Right',
				'url': 'design-fr.buffergeometry.json',
				'inputBox': '.cndce-woo-color-design-fr',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-body.png',
				'normalMap': 'normal-design.jpg',
				'snapshot': 'snapshot-design-fr.png',
				'cameraPosition': {x: 27.629424157487456, y: -0.374418337182106, z: 20.15493817657127},
				'addToEventGroup': true
			},
			{
				'id': 'side-strip-l',
				'name': 'Side Strip Left',
				'url': 'side-strip-l.buffergeometry.json',
				'inputBox': '.cndce-woo-color-side-strip',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-side-strip.png',
				// 'normalMap': 'normal-side-strip.png',
				'snapshot': 'snapshot-side-strip-l.png',
				'cameraPosition': {x: -33.65764633734935, y: 6.074991864339849, z: -0.06417277534028334},
				'addToEventGroup': true
			},
			{
				'id': 'side-strip-r',
				'name': 'Side Strip Right',
				'url': 'side-strip-r.buffergeometry.json',
				'inputBox': '.cndce-woo-color-side-strip',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-side-strip.png',
				// 'normalMap': 'normal-side-strip.png',
				'snapshot': 'snapshot-side-strip-r.png',
				'cameraPosition': {x: 34.17030857097968, y: -0.3923502394280964, z: 1.4081458449456623},
				'addToEventGroup': true
			},
			{
				'id': 'stitches',
				'name': 'Stitches',
				'url': 'stitches.buffergeometry.json',
				'inputBox': '.cndce-woo-color-stitches',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-stitches.png',
				'cameraPosition': {x: 1.5022069156430113, y: -2.1854224288063553, z: 26.331310690217073}
			},

			// Logos
			{
				'isLogoModel': true,
				'id': 'logo-fb',
				'name': 'Logo Front Bottom',
				'url': 'logo-fb.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-fb',
				'textInputBox': '.cndce-woo-text-fb',
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
					'transformations': {
						// 'rotate': -0.025
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-fb.png',
				'cameraPosition': {x: 1.2728647136543412, y: -2.8243425534198465, z: 34.06097041818762},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-ft',
				'name': 'Logo Front Top',
				'url': 'logo-ft.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-ft',
				'textInputBox': '.cndce-woo-text-ft',
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
						'translate': {x: 15, y: 20},
						'rotate': 0.025
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-ft.png',
				'cameraPosition': {x: 0.6058043582809104, y: 0.7992262413230387, z: 34.18685478018772},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-bb',
				'name': 'Logo Back Bottom',
				'url': 'logo-bb.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-bb',
				'textInputBox': '.cndce-woo-text-bb',
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
					'transformations': {
						// 'rotate': 0.05
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-bb.png',
				'cameraPosition': {x: 0.0655014617913193, y: 4.513910191917224, z: -33.90231740758722},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-bt',
				'name': 'Logo Back Top',
				'url': 'logo-bt.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-bt',
				'textInputBox': '.cndce-woo-text-bt',
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
						'translate': {x: 15, y: 30},
						// 'rotate': 0
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-bt.png',
				'cameraPosition': {x: 2.0454630052956237, y: 6.109525223047985, z: -33.58923315453758},
				'isLogoUploadable': true,
				'aspect': 2
			}
		]
	});
})