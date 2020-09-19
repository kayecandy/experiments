jQuery(function($){
	$('#cndce-gloves-container').cndce3DGloves({
		modelsDir: './assets/models/muaythai-shorts/',
		modelMapsDir: './assets/models/muaythai-shorts/maps/',

		snapshotsURL: './assets/models/muaythai-shorts/snapshots/',

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
				'cameraPosition': {x: -8.542891202043757, y: -2.8243425534198474, z: -32.99680136494994},
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
				'cameraPosition': {x: 9.956769194835863, y: -2.8243425534198465, z: -32.598046530562016},
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
				// 'normalMap': 'normal-cloth.jpg',
				'snapshot': 'snapshot-body-fl.png',
				'cameraPosition': {x: -11.228885515445972, y: -2.8243425534198474, z: 32.18201392841856},
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
				'id': 'bottom-bl',
				'name': 'Bottom Back Left',
				'url': 'bottom-bl.buffergeometry.json',
				'inputBox': '.cndce-woo-color-bottom-bl',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-bottom.png',
				// 'normalMap': 'normal-fabric.jpg',
				'snapshot': 'snapshot-bottom-bl.png',
				'cameraPosition': {x: -9.831753284757031, y: -2.8243425534198474, z: -32.63596969228259},
				'addToEventGroup': true
			},
			{
				'id': 'bottom-br',
				'name': 'Bottom Back Right',
				'url': 'bottom-br.buffergeometry.json',
				'inputBox': '.cndce-woo-color-bottom-br',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-bottom.png',
				// 'normalMap': 'normal-fabric.jpg',
				'snapshot': 'snapshot-bottom-br.png',
				'cameraPosition': {x: 3.393730617952726, y: -2.8243425534198465, z: -33.91537236859841},
				'addToEventGroup': true
			},
			{
				'id': 'bottom-fl',
				'name': 'Bottom Front Left',
				'url': 'bottom-fl.buffergeometry.json',
				'inputBox': '.cndce-woo-color-bottom-fl',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-bottom.png',
				// 'normalMap': 'normal-fabric.jpg',
				'snapshot': 'snapshot-bottom-fl.png',
				'cameraPosition': {x: -10.594869953204062, y: -2.8243425534198465, z: 32.39627480255427},
				'addToEventGroup': true
			},
			{
				'id': 'bottom-fr',
				'name': 'Bottom Front Right',
				'url': 'bottom-fr.buffergeometry.json',
				'inputBox': '.cndce-woo-color-bottom-fr',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-body.png',
				// 'normalMap': 'normal-fabric.jpg',
				'snapshot': 'snapshot-bottom-fr.png',
				'cameraPosition': {x: 9.18911356279618, y: -2.8243425534198465, z: 32.82270681004164},
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
				'id': 'logo-fc',
				'name': 'Logo Front Center',
				'url': 'logo-fc.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-fc',
				'textInputBox': '.cndce-woo-text-fc',
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
						'translate': {x: 0, y: 20}
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-fc.png',
				'cameraPosition': {x: 2.6020078334616605, y: 3.783534836760941, z: 33.891904942634795},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-fl',
				'name': 'Logo Front Left',
				'url': 'logo-fl.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-fl',
				'textInputBox': '.cndce-woo-text-fl',
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
						// 'translate': {x: 0, y: 90},
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-fl.png',
				'cameraPosition': {x: -9.314829914967627, y: -2.8243425534198474, z: 32.787251090372656},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-fr',
				'name': 'Logo Front Right',
				'url': 'logo-fr.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-fr',
				'textInputBox': '.cndce-woo-text-fr',
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
						// 'translate': {x: 0, y: 40},
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-fr.png',
				'cameraPosition': {x: 11.73600762360535, y: -2.8243425534198465, z: 32.00056273671755},
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
						'translate': {x: 0, y: 30}
						// 'rotate': 0
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-ft.png',
				'cameraPosition': {x: 0.5886209680286548, y: 8.125471748325475, z: 33.217119614592384},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-bc',
				'name': 'Logo Back Center',
				'url': 'logo-bc.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-bc',
				'textInputBox': '.cndce-woo-text-bc',
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
						'translate': {x: 0, y: 45}
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-bc.png',
				'cameraPosition': {x: 2.0481139503767647, y: 5.864229759416016, z: -33.63276438002127},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-bl',
				'name': 'Logo Back Left',
				'url': 'logo-bl.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-bl',
				'textInputBox': '.cndce-woo-text-bl',
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
						// 'translate': {x: 0, y: 90},
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-bl.png',
				'cameraPosition': {x: -11.736006955712307, y: -2.8243425534198474, z: -32.000562981663165},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-br',
				'name': 'Logo Back Right',
				'url': 'logo-br.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-br',
				'textInputBox': '.cndce-woo-text-br',
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
						// 'translate': {x: 0, y: 40},
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-br.png',
				'cameraPosition': {x: 13.71990799938177, y: -2.8243425534198474, z: -31.201506612604764},
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
						'translate': {x: 0, y: 40},
						// 'rotate': 0
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-bt.png',
				'cameraPosition': {x: 2.025630341923156, y: 7.6928297747126315, z: -33.26355352397201},
				'isLogoUploadable': true,
				'aspect': 2
			}
		]
	});
})