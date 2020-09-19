/***************************************************************************
 *  																	   *
 *																		   *
 *	     ___           ___           ___           ___           ___       *
 *	    /  /\         /  /\         /  /\         /  /\         /  /\      *
 *	   /  /::\       /  /::|       /  /::\       /  /::\       /  /::\     *
 *	  /  /:/\:\     /  /:|:|      /  /:/\:\     /  /:/\:\     /  /:/\:\    *
 *	 /  /:/  \:\   /  /:/|:|__   /  /:/  \:\   /  /:/  \:\   /  /::\ \:\   *
 *	/__/:/ \  \:\ /__/:/ |:| /\ /__/:/ \__\:| /__/:/ \  \:\ /__/:/\:\ \:\  *
 *	\  \:\  \__\/ \__\/  |:|/:/ \  \:\ /  /:/ \  \:\  \__\/ \  \:\ \:\_\/  *
 *	 \  \:\           |  |:/:/   \  \:\  /:/   \  \:\        \  \:\ \:\    *
 *	  \  \:\          |__|::/     \  \:\/:/     \  \:\        \  \:\_\/    *
 *	   \  \:\         /__/:/       \__\::/       \  \:\        \  \:\      *
 *	    \__\/         \__\/            ~~         \__\/         \__\/      *
 * 																		   *
 *																		   *
 ***************************************************************************/


$.fn.extend({
	cndceElevator: function(params){
		// Accept only for canvas
		if(!this.is('canvas')){
			console.log('ERROR: cndceElevetor() can only be loaded with a <canvas>');
			return;
		}


		// Parameter defaults
		var defaults = {
			elevatorModelURL: './elevator-lr.obj',
			elevatorMaterialURL: './elevator-lr.mtl',
			elevatorShaftName: 'Shaft',
			elevatorBulletName: 'Bullet',

			elevatorDoorModelURL: './elevator-doors.obj',
			elevatorDoorMaterialURL: './elevator-doors.mtl',
			elevatorDoorLeftName: 'DoorLeft',
			elevatorDoorRightName: 'DoorRight',

			elevatorDoorLeftPositionOpen: {x: -2, y: 0, z: 0},
			elevatorDoorRightPositionOpen: {x: 2, y: 0, z: 0},

			elevators: [
				{
					modelPosition: {x: 0, y: -8, z: 0},
					floors: [
						{
							position: 0,
							cameraPosition: {x: -6.7549865391091055, y: -3.6821542558398015, z: 14.525561631963699},
							controlsPosition: {x: 0, y: -3, z: 0}
						},
						{
							position: 6,
							cameraPosition: {x: -5.1968099528589695, y: 2.382968531027064, z: 14.996453920270627},
							controlsPosition: {x: 0, y: 2, z: 0}
						},
						{
							position: 12,
							cameraPosition: {x: 1.9582465019680448, y: 10.59885609669312, z: 16.96346433872821},
							controlsPosition: {x: 0, y: 9, z: 0}
						},
						{
							position: 18,
							cameraPosition: {x: 9.416935588071214, y: 11.835010556470857, z: 13.374865324138824},
							controlsPosition: {x: 0, y: 13, z: 0}
						}
					]
				},{
					modelPosition: {x: 10, y: -8, z:0},
					floors: [
						{
							position: 0,
							cameraPosition: {x: 3, y: -3.6821542558398015, z: 14.525561631963699},
							controlsPosition: {x: 10, y: -3, z: 0}
						},
						{
							position: 6,
							cameraPosition: {x: 5, y: 2.382968531027064, z: 14.996453920270627},
							controlsPosition: {x: 10, y: 2, z: 0}
						},
						{
							position: 12,
							cameraPosition: {x: 12, y: 10.59885609669312, z: 16.96346433872821},
							controlsPosition: {x: 10, y: 9, z: 0}
						},
						{
							position: 18,
							cameraPosition: {x: 19.5, y: 11.835010556470857, z: 13.374865324138824},
							controlsPosition: {x: 10, y: 13, z: 0}
						}
					]
				}
			],

			newElevatorDelta: {x: 10, y: 0, z: 0},


			animationEasing: TWEEN.Easing.Quartic.InOut,
			animationDuration: 1000,

			doorAnimationEasing: TWEEN.Easing.Cubic.InOut,
			doorAnimationDuration: 1000,


			cameraAnimationEasing: TWEEN.Easing.Cubic.InOut,
			cameraAnimationDuration: 1200,

		};


		


		var $canvas = this;
		var canvas = $canvas[0];

		var scene;
		var camera;

		var renderer;
		var controls;
		var ambientLight;

		var objLoader;
		var mtlLoader;

		var modelElevator;
		var modelElevatorDoors;

		var objElevators;
		var iActiveElevator;
		
		var $elevatorNum = $('.cndce-elevator-num');
		var $btnRemoveElevator = $('.cndce-remove-elevator');



		// Set Default Parameters
		if( params == undefined ){
			params = {};
		}

		for(var param in defaults){
			if(params[param] == undefined)
				params[param] = defaults[param];
		}


		function addVector(v1, v2){
			v1.x += v2.x;
			v1.y += v2.y;
			v1.z += v2.z;

			return v1;
		}


		function loadElevatorDoors(){

			mtlLoader.load(
				params.elevatorDoorMaterialURL,

				function(material){
					material.preload();

					objLoader.setMaterials(material);

					objLoader.load(
						params.elevatorDoorModelURL,

						function(object){

							modelElevatorDoors = object;

							for(var i=0; i < objElevatorGroup.children.length; i++){
								initSingleElevatorDoor(objElevatorGroup.children[i]);

							}

						}
					);
				}
			)

			
		}


		function loadElevatorShaft(){

			mtlLoader.load(
				params.elevatorMaterialURL,

				function(material){
					material.preload();

					objLoader.setMaterials(material);

					objLoader.load(
						params.elevatorModelURL,

						function(object){
							modelElevator = object;

							objElevatorGroup = new THREE.Group();

							for(var i=0; i < params.elevators.length; i++){
								initSingleElevator(params.elevators[i]);
							}

							iActiveElevator = 0;

							scene.add(objElevatorGroup);

							loadElevatorDoors();

						}
					)

				}
			);
		}

		function initSingleElevatorDoor(objElevator){
			var elevatorDoors = modelElevatorDoors.clone();

			elevatorDoors.userData.left = elevatorDoors.getObjectByName(params.elevatorDoorLeftName);

			elevatorDoors.userData.right = elevatorDoors.getObjectByName(params.elevatorDoorRightName);

			elevatorDoors.userData.isDoorOpen = false;

			objElevator.userData.bullet.add(elevatorDoors);

			elevatorDoors.userData.left.userData.initPosition = elevatorDoors.userData.left.position.clone();

			elevatorDoors.userData.right.userData.initPosition = elevatorDoors.userData.right.position.clone();

			return elevatorDoors;
		}

		function initSingleElevator(elevatorData){
			var elevator = {};
			
			elevator = modelElevator.clone();

			elevator.userData.shaft = elevator.getObjectByName(params.elevatorShaftName);
			elevator.userData.bullet = elevator.getObjectByName(params.elevatorBulletName);

			elevator.position.copy(elevatorData.modelPosition);

			elevator.userData.shaft.material.color.set('black');
			elevator.userData.bullet.material.side = THREE.DoubleSide;
			elevator.userData.activeFloor = 0;

			objElevatorGroup.add(elevator);

			return elevator;
		}


		function initThreeJS(){
			$canvas.addClass('cndce-elevator-canvas');

			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera( 75, $canvas.width() / $canvas.height(), 0.1, 1000 );
			window.scene = scene;

			camera.position.copy(params.elevators[0].floors[0].cameraPosition);



			renderer = new THREE.WebGLRenderer({
				canvas: canvas,
				alpha: true
			});
			renderer.setSize($canvas.width(), $canvas.height());
			window.renderer = renderer;

			controls = new THREE.OrbitControls(camera, renderer.domElement);
			controls.target.copy(params.elevators[0].floors[0].controlsPosition);
			window.controls = controls;

			var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
			scene.add( ambientLight );


			var pointLight = new THREE.PointLight( 0xffffff, 0.7 );
			camera.add( pointLight );
			scene.add( camera );

			mtlLoader = new THREE.MTLLoader()
			objLoader = new THREE.OBJLoader();



		

			loadElevatorShaft();

			render();


			window.camera = camera;

		}


		function render(time){
			requestAnimationFrame(render);
			controls.update();
			TWEEN.update(time);
			renderer.render(scene, camera);
		}


		function addElevator(){

			var newParamElevator = $.extend(true, {},params.elevators[params.elevators.length-1]);
			var iNewElevator = objElevatorGroup.children.length + 1;

			$elevatorNum.append('<option data-elevator="' + iNewElevator + '">' + iNewElevator +'</option>');

			addVector(newParamElevator.modelPosition, params.newElevatorDelta);


			for(var i=0; i < newParamElevator.floors.length; i++){
				addVector(newParamElevator.floors[i].cameraPosition, params.newElevatorDelta);
				addVector(newParamElevator.floors[i].controlsPosition, params.newElevatorDelta);
			}

			params.elevators.push(newParamElevator);

			initSingleElevatorDoor(initSingleElevator(newParamElevator));
		}

		function removeElevator(){
			var elevator = objElevatorGroup.children[objElevatorGroup.children.length - 1];

			// Activate 2nd to the last elevator if the last one is the current active
			if(iActiveElevator == objElevatorGroup.children.length - 1){
				$('option', $elevatorNum).eq(iActiveElevator - 1).prop('selected', true);
				$elevatorNum.trigger('change');
			}
			
			objElevatorGroup.remove(elevator);
			params.elevators.pop();
			$('option:last-child', $elevatorNum).remove();

		}

		function goToFloor(floorNum){

			var floor = params.elevators[iActiveElevator].floors[floorNum-1];
			var floorPosition = floor.position;



			var objActiveElevator = objElevatorGroup.children[iActiveElevator];
			var objElevatorBullet = objActiveElevator.userData.bullet;


			var tween = new TWEEN.Tween({
				y: objElevatorBullet.position.y
			})

			.to({
				y: floorPosition
			}, params.animationDuration)

			.easing(params.animationEasing)

			.onUpdate(function(e){
				objElevatorBullet.position.y = e.y;
			})

			.onComplete(function(){
				objActiveElevator.userData.activeFloor = floorNum-1;
			})

			.start();






			var cameraTween = new TWEEN.Tween({
				cameraX: camera.position.x,
				cameraY: camera.position.y,
				cameraZ: camera.position.z,

				controlsX: controls.target.x,
				controlsY: controls.target.y,
				controlsZ: controls.target.z
			})

			.to({
				cameraX: floor.cameraPosition.x,
				cameraY: floor.cameraPosition.y,
				cameraZ: floor.cameraPosition.z,

				controlsX: floor.controlsPosition.x,
				controlsY: floor.controlsPosition.y,
				controlsZ: floor.controlsPosition.z

			}, params.cameraAnimationDuration)

			.easing(params.cameraAnimationEasing)

			.onUpdate(function(e){
				// controls.target.y = e.controlsY;

				camera.position.set(e.cameraX, e.cameraY, e.cameraZ);
				controls.target.set(e.controlsX, e.controlsY, e.controlsZ);

				// objActiveElevator.position.set(e.modelX, e.modelY, e.modelZ);
			})

			.start();
		}




		function toggleElevatorDoors(){

			var to = {};

			var objElevatorDoorsGroup = objElevatorGroup.children[iActiveElevator].userData.bullet.children[0];
			var objElevatorDoorLeft = objElevatorDoorsGroup.userData.left;
			var objElevatorDoorRight = objElevatorDoorsGroup.userData.right;

			// Close Elevator
			if(objElevatorDoorsGroup.userData.isDoorOpen){

				to = {
					doorLeftPosX: objElevatorDoorLeft.userData.initPosition.x,
					doorLeftPosY: objElevatorDoorLeft.userData.initPosition.y,
					doorLeftPosZ: objElevatorDoorLeft.userData.initPosition.z,

					doorRightPosX: objElevatorDoorRight.userData.initPosition.x,
					doorRightPosY: objElevatorDoorRight.userData.initPosition.y,
					doorRightPosZ: objElevatorDoorRight.userData.initPosition.z
				};

			// Open Elevator
			}else{

				to = {
					doorLeftPosX: params.elevatorDoorLeftPositionOpen.x,
					doorLeftPosY: params.elevatorDoorLeftPositionOpen.y,
					doorLeftPosZ: params.elevatorDoorLeftPositionOpen.z,

					doorRightPosX: params.elevatorDoorRightPositionOpen.x,
					doorRightPosY: params.elevatorDoorRightPositionOpen.y,
					doorRightPosZ: params.elevatorDoorRightPositionOpen.z
				};

			}

			var doorTween = new TWEEN.Tween({
				doorLeftPosX: objElevatorDoorLeft.position.x,
				doorLeftPosY: objElevatorDoorLeft.position.y,
				doorLeftPosZ: objElevatorDoorLeft.position.z,

				doorRightPosX: objElevatorDoorRight.position.x,
				doorRightPosY: objElevatorDoorRight.position.y,
				doorRightPosZ: objElevatorDoorRight.position.z
			})

			.to(to, params.doorAnimationDuration)

			.easing(params.doorAnimationEasing)

			.onUpdate(function(e){
				objElevatorDoorLeft.position.set(
					e.doorLeftPosX,
					e.doorLeftPosY,
					e.doorLeftPosZ
				);

				objElevatorDoorRight.position.set(
					e.doorRightPosX,
					e.doorRightPosY,
					e.doorRightPosZ
				);
			})

			.onComplete(function(){
				objElevatorDoorsGroup.userData.isDoorOpen = !objElevatorDoorsGroup.userData.isDoorOpen;
			})

			.start();
		}



		// Events

		$('.cndce-floor').click(function(){
			var $floor = $(this);

			$('.cndce-floor').removeClass('active');
			$floor.addClass('active');

			goToFloor($floor.data('floor'));
		})

		$('.cndce-elevator-num').change(function(){
			var $elevator = $(':selected', this);

			iActiveElevator = $elevator.data('elevator') - 1;

			$('.cndce-floor[data-floor=' + (objElevatorGroup.children[iActiveElevator].userData.activeFloor + 1) + ']').click();

		})


		$('.cndce-add-elevator').click(function(){
			addElevator();

			if(objElevatorGroup.children.length > 1){
				$btnRemoveElevator.removeClass('hidden');
			}
		})

		$btnRemoveElevator.click(function(){
			removeElevator();

			if(objElevatorGroup.children.length == 1){
				$btnRemoveElevator.addClass('hidden');
			}
		})


		$('.cndce-toggle-wireframe').click(function(){

			objElevatorShaft.material.wireframe = !objElevatorShaft.material.wireframe;

		})

		$('.cndce-toggle-door-open').click(function(){
			toggleElevatorDoors();
		})

		initThreeJS();

	}
})