jQuery(function($){

	var variations = $('form.cart').data('product_variations');


	if(variations != undefined){
		var sizes = [];

		for(var i=0; i < variations.length; i++){
			sizes.push({
				label: variations[i].attributes.attribute_sizes,
				price: variations[i].display_price
			})
		}
	}

	$('#ywapo_ctrl_id_8_0').addClass('cndce-woo-thumbnail');



	$('#ywapo_ctrl_id_4_0').addClass('cndce-woo-color-body');
	$('#ywapo_ctrl_id_4_1').addClass('cndce-woo-color-side-strip');
	$('#ywapo_ctrl_id_4_2').addClass('cndce-woo-color-bottom-strip');
	$('#ywapo_ctrl_id_4_3').addClass('cndce-woo-color-garter-1');
	$('#ywapo_ctrl_id_4_4').addClass('cndce-woo-color-garter-2');
	$('#ywapo_ctrl_id_4_5').addClass('cndce-woo-color-garter-3');
	$('#ywapo_ctrl_id_4_6').addClass('cndce-woo-color-garter-4');
	$('#ywapo_ctrl_id_4_7').addClass('cndce-woo-color-stitches');

	$('#ywapo_ctrl_id_5_0').addClass('cndce-woo-logo-front-tc');
	$('#ywapo_ctrl_id_5_1').addClass('cndce-woo-logo-front-tl');
	$('#ywapo_ctrl_id_5_2').addClass('cndce-woo-logo-front-tr');
	$('#ywapo_ctrl_id_5_3').addClass('cndce-woo-logo-front-bl');
	$('#ywapo_ctrl_id_5_4').addClass('cndce-woo-logo-front-br');
	$('#ywapo_ctrl_id_5_5').addClass('cndce-woo-logo-front-garter');
	$('#ywapo_ctrl_id_5_6').addClass('cndce-woo-logo-back-tc');
	$('#ywapo_ctrl_id_5_7').addClass('cndce-woo-logo-back-tl');
	$('#ywapo_ctrl_id_5_8').addClass('cndce-woo-logo-back-tr');
	$('#ywapo_ctrl_id_5_9').addClass('cndce-woo-logo-back-bl');
	$('#ywapo_ctrl_id_5_10').addClass('cndce-woo-logo-back-br');
	$('#ywapo_ctrl_id_5_11').addClass('cndce-woo-logo-back-garter');

	$('#ywapo_ctrl_id_6_0').addClass('cndce-woo-text-front-tc');
	$('#ywapo_ctrl_id_6_1').addClass('cndce-woo-text-front-tl');
	$('#ywapo_ctrl_id_6_2').addClass('cndce-woo-text-front-tr');
	$('#ywapo_ctrl_id_6_3').addClass('cndce-woo-text-front-bl');
	$('#ywapo_ctrl_id_6_4').addClass('cndce-woo-text-front-br');
	$('#ywapo_ctrl_id_6_5').addClass('cndce-woo-text-front-garter');
	$('#ywapo_ctrl_id_6_6').addClass('cndce-woo-text-back-tc');
	$('#ywapo_ctrl_id_6_7').addClass('cndce-woo-text-back-tl');
	$('#ywapo_ctrl_id_6_8').addClass('cndce-woo-text-back-tr');
	$('#ywapo_ctrl_id_6_9').addClass('cndce-woo-text-back-bl');
	$('#ywapo_ctrl_id_6_10').addClass('cndce-woo-text-back-br');
	$('#ywapo_ctrl_id_6_11').addClass('cndce-woo-text-back-garter');



	$('#cndce-gloves-container').cndce3DGloves({
		colorsURL: './assets/models/boxing-shorts/colors.json',
		modelsDir: './assets/models/boxing-shorts/',
		modelMapsDir: './assets/models/boxing-shorts/maps/',

		snapshotsURL: './assets/models/boxing-shorts/snapshots/',

		cameraPosition: {x: -1.4385557092449472, y: -0.6267011859496501, z: 7.960284851794952},
		controlsTarget: {x: -0.26741636932942653, y: -1.0708963244630496, z: 0.18127028848998047},

		sizes: sizes,

		thumbnailCameraPosition: [
			{x: -0.647873035875354, y: 4.066961602156923, z: 16.588687560624237},
			{x: -14.483693414796123, y: -2.491034610426871, z: -9.390894937124179}
		],

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
				'cameraPosition': {x: 5.303671007579094, y: 6.017862533075825, z: 13.33481142285803},
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
				'cameraPosition': {x: 5.303671007579094, y: 6.017862533075825, z: 13.33481142285803},
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
				'cameraPosition': {x: 5.303671007579094, y: 6.017862533075825, z: 13.33481142285803},
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
				'cameraPosition': {x: 5.303671007579094, y: 6.017862533075825, z: 13.33481142285803},
				'addToEventGroup': true
			},
			{
				'id': 'body',
				'name': 'Body',
				'url': 'body.buffergeometry.json',
				'inputBox': '.cndce-woo-color-body',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-body.png',
				// 'normalMap': 'normal-fabric.jpg',
				'snapshot': 'snapshot-body.png',
				'cameraPosition': {x: -5.899132879799005, y: 6.503874346491054, z: 12.030963166296726},
				'addToEventGroup': true
			},
			{
				'id': 'side-strip',
				'name': 'Side Strip',
				'url': 'side-strip.buffergeometry.json',
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
				'snapshot': 'snapshot-side-strip.png',
				'cameraPosition': {x: -16.475302345761175, y: 4.102044019778925, z: 2.689415671254},
				'addToEventGroup': true
			},
			{
				'id': 'bottom-strip',
				'name': 'Bottom Strip',
				'url': 'bottom-strip.buffergeometry.json',
				'inputBox': '.cndce-woo-color-bottom-strip',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.6,
					'metalness': 0,
					'transparent': false
				},
				// 'map': 'map-bottom-strip.png',
				// 'normalMap': 'normal-bottom-strip.png',
				'snapshot': 'snapshot-bottom-strip.png',
				'cameraPosition': {x: -17.357769000197507, y: -2.491034610426877, z: 1.4652979721881474},
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
				'cameraPosition': {x: -0.669211767803849, y: 4.3483844371887495, z: 9.559136377243469}
			},
			{
				'isLogoModel': true,
				'id': 'logo-front-tc',
				'name': 'Logo Front Top Center',
				'url': 'logo-front-tc.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-front-tc',
				'textInputBox': '.cndce-woo-text-front-tc',
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
						'rotate': 0.05
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-front-tc.png',
				'cameraPosition': {x: 0.45727065567408515, y: 1.3401829975340984, z: 15.427652232600373},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-front-tl',
				'name': 'Logo Front Top Left',
				'url': 'logo-front-tl.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-front-tl',
				'textInputBox': '.cndce-woo-text-front-tl',
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
						'translate': {x: 0, y: 90},
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-front-tl.png',
				'cameraPosition': {x: -3.9997234466278893, y: 1.3401829975398059, z: 14.981514122651097},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-front-tr',
				'name': 'Logo Front Top Right',
				'url': 'logo-front-tr.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-front-tr',
				'textInputBox': '.cndce-woo-text-front-tr',
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
						'translate': {x: 0, y: 40},
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-front-tr.png',
				'cameraPosition': {x: 3.7395046700285457, y: 0.3750790150666792, z: 15.035373299735339},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-front-bl',
				'name': 'Logo Front Bottom Left',
				'url': 'logo-front-bl.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-front-bl',
				'textInputBox': '.cndce-woo-text-front-bl',
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
						'translate': {x: 0, y: 20},
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-front-bl.png',
				'cameraPosition': {x: -5.7621315898291465, y: -2.346982734270292, z: 14.567734249004358},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-front-br',
				'name': 'Logo Front Bottom Right',
				'url': 'logo-front-br.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-front-br',
				'textInputBox': '.cndce-woo-text-front-br',
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
						'translate': {x: 20, y: -90},
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-front-br.png',
				'cameraPosition': {x: 3.450718216280843, y: -2.3469827342702887, z: 15.125758096536725},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-back-tc',
				'name': 'Logo Back Top Center',
				'url': 'logo-back-tc.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-back-tc',
				'textInputBox': '.cndce-woo-text-back-tc',
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
				'snapshot': 'snapshot-logo-back-tc.png',
				'cameraPosition': {x: -0.39409720631167516, y: -2.3469827342702834, z: -15.218281413007974},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-back-tl',
				'name': 'Logo Back Top Left',
				'url': 'logo-back-tl.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-back-tl',
				'textInputBox': '.cndce-woo-text-back-tl',
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
						'translate': {x: 0, y: 90},
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-back-tl.png',
				'cameraPosition': {x: -3.6956948341515856, y: -0.05318383722524955, z: -14.852086130747049},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-back-tr',
				'name': 'Logo Back Top Right',
				'url': 'logo-back-tr.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-back-tr',
				'textInputBox': '.cndce-woo-text-back-tr',
				'logoPrice': 7,
				'textPrice': 7,
				'material': {
					'color': 15658734,
					'transparent': true,
					'roughness': .5,
		            'metalness': 0,
		            'side': THREE.DoubleSide
				},
				'logoImage': {
					'isTransparent': true,
					// 'image': 'black.png'
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-back-tr.png',
				'cameraPosition': {x: 2.6219493502918954, y: -1.3755407270076003, z: -14.995995430114723},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-back-bl',
				'name': 'Logo Back Bottom Left',
				'url': 'logo-back-bl.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-back-bl',
				'textInputBox': '.cndce-woo-text-back-bl',
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
						'translate': {x: 0, y: 130}
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-back-bl.png',
				'cameraPosition': {x: -3.691418769849951, y: -2.3469827342702745, z: -14.833337538649346},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-back-br',
				'name': 'Logo Back Bottom Right',
				'url': 'logo-back-br.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-back-br',
				'textInputBox': '.cndce-woo-text-back-br',
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
					// 'image': 'black.png'
					'transformations': {
						'translate': {x: 0, y: 10},
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-back-br.png',
				'cameraPosition': {x: 3.4982644624132857, y: -2.3469827342702745, z: -14.751307804893939},
				'isLogoUploadable': true,
				'aspect': 2
			},
			{
				'isLogoModel': true,
				'id': 'logo-back-garter',
				'name': 'Logo Back Garter',
				'url': 'logo-back-garter.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-back-garter',
				'textInputBox': '.cndce-woo-text-back-garter',
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
						'translate': {x: 0, y: 35},
						'rotate': 0.05
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-back-garter.png',
				'cameraPosition': {x: 0.4799666309513711, y: 1.0172197029804044, z: -14.19011365678648},
				'isLogoUploadable': true,
				'aspect': 5
			},
			{
				'isLogoModel': true,
				'id': 'logo-front-garter',
				'name': 'Logo Front Garter',
				'url': 'logo-front-garter.buffergeometry.json',
				'inputBox': '.cndce-woo-logo-front-garter',
				'textInputBox': '.cndce-woo-text-front-garter',
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
						'translate': {x: 10, y: 30},
						'rotate': 0
					}
				},
				'addToEventGroup': true,
				'snapshot': 'snapshot-logo-front-garter.png',
				'cameraPosition': {x: -1.30088517753547, y: 1.1241070229582952, z: 14.89676945923545},
				'isLogoUploadable': true,
				// 'aspect': 2
			}

		]


	})

})