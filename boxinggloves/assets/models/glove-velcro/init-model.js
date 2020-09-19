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

	


	$('#ywapo_ctrl_id_4_0').addClass('cndce-woo-thumbnail');
	$('#ywapo_ctrl_id_3_0').addClass('cndce-woo-thumbnail');

	$('#ywapo_ctrl_id_2_0').addClass('cndce-woo-color-pb');
	$('#ywapo_ctrl_id_2_1').addClass('cndce-woo-color-wb');
	$('#ywapo_ctrl_id_2_2').addClass('cndce-woo-color-tu');
	$('#ywapo_ctrl_id_2_3').addClass('cndce-woo-color-td');
	$('#ywapo_ctrl_id_2_4').addClass('cndce-woo-color-ti');
	$('#ywapo_ctrl_id_2_5').addClass('cndce-woo-color-ts');
	$('#ywapo_ctrl_id_2_6').addClass('cndce-woo-color-pi');
	$('#ywapo_ctrl_id_2_7').addClass('cndce-woo-color-po');
	$('#ywapo_ctrl_id_2_8').addClass('cndce-woo-color-pip');
	$('#ywapo_ctrl_id_2_9').addClass('cndce-woo-color-stitch');
	$('#ywapo_ctrl_id_2_11').addClass('cndce-woo-color-velcro');

	$('#ywapo_ctrl_id_11_0').addClass('cndce-woo-color-price-pb');
	$('#ywapo_ctrl_id_11_1').addClass('cndce-woo-color-price-wb');
	$('#ywapo_ctrl_id_11_2').addClass('cndce-woo-color-price-tu');
	$('#ywapo_ctrl_id_11_3').addClass('cndce-woo-color-price-td');
	$('#ywapo_ctrl_id_11_4').addClass('cndce-woo-color-price-ti');
	$('#ywapo_ctrl_id_11_5').addClass('cndce-woo-color-price-ts');
	$('#ywapo_ctrl_id_11_6').addClass('cndce-woo-color-price-pi');
	$('#ywapo_ctrl_id_11_7').addClass('cndce-woo-color-price-po');
	$('#ywapo_ctrl_id_11_8').addClass('cndce-woo-color-price-pip');
	$('#ywapo_ctrl_id_11_9').addClass('cndce-woo-color-price-stitch');
	$('#ywapo_ctrl_id_11_11').addClass('cndce-woo-color-price-velcro');

	$('#ywapo_ctrl_id_1_0').addClass('cndce-woo-logo-pb');
	$('#ywapo_ctrl_id_1_1').addClass('cndce-woo-logo-velcro');
	$('#ywapo_ctrl_id_1_2').addClass('cndce-woo-logo-tu');
	$('#ywapo_ctrl_id_1_3').addClass('cndce-woo-logo-pi');
	$('#ywapo_ctrl_id_1_4').addClass('cndce-woo-logo-po');

	$('#ywapo_ctrl_id_7_0').addClass('cndce-woo-text-pb');
	$('#ywapo_ctrl_id_7_1').addClass('cndce-woo-text-velcro');
	$('#ywapo_ctrl_id_7_2').addClass('cndce-woo-text-tu');
	$('#ywapo_ctrl_id_7_3').addClass('cndce-woo-text-pi');
	$('#ywapo_ctrl_id_7_4').addClass('cndce-woo-text-po');

	


	var cndceBoxingGloveURL = '';
	$('#cndce-gloves-container').cndce3DGloves({
		modelsDir: './assets/models/glove-velcro/',
		modelMapsDir: './assets/models/glove-velcro/maps/',

		snapshotsURL: './assets/models/glove-velcro/snapshots/',


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
				'normalMap': 'pbn.jpg',
				'addToEventGroup': true,
				'snapshot': 'snap-pb.png',
				'cameraPosition': {x: 0.4014352728313358, y: -0.30451903512451484, z: 7.3236683348560865}

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
				'normalMap': 'wbn.jpg'
			},
			{
				'name': 'velcro',
				'url': 'nvelcro.js',
				'inputBox': '.cndce-woo-color-velcro',
				'colorPriceInputBox': '.cndce-woo-color-price-velcro',
				'material': {
					'color': '#eeeeee',
					'normalScale': new THREE.Vector2(-.25,.25),
					'roughness': 0.35,
					'metalness': 0,
					'transparent': false
				},
				'map': 'velcrod.jpg',
				'normalMap': 'wbn.jpg',
				'addToEventGroup': true,
				'snapshot': 'snap-velcro.png',
				'cameraPosition': {x: -0.4365467651370499, y: -0.6062133946174774, z: 7.302871506608531}
			},
			{
				'name': 'wrist-back',
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
				'normalMap': 'wbn.jpg',
				'addToEventGroup': true,
				'snapshot': 'snap-wb.png',
				'cameraPosition': {x: -4.110145313093362, y: 1.529020866769123, z: 5.887172555161028},
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
				'normalMap': 'wbn.jpg',
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
				'normalMap': 'wbn.jpg',
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
				'normalMap': 'wbn.jpg',
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
				'normalMap': 'wbn.jpg',
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
				'normalMap': 'pin.jpg',
				'addToEventGroup': true,
				'snapshot': 'snap-pi.png',
				'cameraPosition': {x: -1.845816174509367, y: 2.5352540773900443, z: -6.637427921491634}
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
				'normalMap': 'pin.jpg',
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
				'cameraPosition': {x: 0.508862739058866, y: -0.32757352305776444, z: -3.920337080074297}
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
				'name': 'Logo Velcro',
				'url': 'p2.js',
				'inputBox': '.cndce-woo-logo-velcro',
				'textInputBox': '.cndce-woo-text-velcro',
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
				'isLogoUploadable': true,
				'addToEventGroup': true,
				'snapshot': 'snap-logo-velcro.png',
				'cameraPosition': {x: -0.4365467651370499, y: -0.6062133946174774, z: 7.302871506608531}
			},
			{

				'isLogoModel': true,
				'name': 'Logo Palm Back',
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
				'cameraPosition': {x: 0.4014352728313358, y: -0.30451903512451484, z: 7.3236683348560865}
			},
			{
				'isLogoModel': true,
				'name': 'Logo Thumb Up',
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
				'cameraPosition': {x: -7.50311441584061, y: 0.07241657447066141, z: 0.3074876825569484}
			},
			{
				'isLogoModel': true,
				'name': 'Logo Palm In',
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
					'image': 'black.png'
				},
				'addToEventGroup': true,
				'snapshot': 'snap-logo-pi.png',
				'isLogoUploadable': true,
				'cameraPosition':  {x: -3.408588116559951, y: -0.9721148404419166, z: -6.497354562044245}
			},
			{
				'isLogoModel': true,
				'name': 'Logo Palm Out',
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
				'cameraPosition': {x: 1.5803143330629332, y: 1.4617295550949143, z: -6.906570740799089}
			}
		],
		sizes: sizes
	});
})
