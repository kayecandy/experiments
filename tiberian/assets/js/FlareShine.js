class FlareShine{

	constructor( width, height, x, y, z, withLight ){
		this.ROTATION_RATE = 0.01;
		this.LIGHT_INTENSITY = 1000;
		this.LIGHT_DISTANCE = 5;

		this.visible = true;



		var loader = new THREE.TextureLoader(  );
		this.textureFlare = loader.load( './assets/textures/lensflare0.png' );
		this.textureFlareBg = loader.load( './assets/textures/lensflare2.png' );

		this.flare = new THREE.Group(  );
		this.flare.width = width;
		this.flare.height = height;

		var front = new THREE.Mesh(
			new THREE.PlaneGeometry( width, height ),
			new THREE.MeshBasicMaterial( {
				map: this.textureFlare,
				transparent: true,
				depthWrite: false
			} )
		);

		var back = front.clone(  );
		back.rotation.y = Math.PI;

		this.flare.add( front );
		// this.flare.add( back );

		this.flare.position.set( x, y, z );



		this.flareBg = undefined;
		this.tDelay = undefined;

		if( withLight == undefined )
			withLight = true

		this.withLight = withLight;
		


		this.pointLight = new THREE.PointLight( 0xffffff );

		if( withLight ){
			this.pointLight.position.set( x, y, z-0.8 );
			// this.pointLight.add(
			// 	new THREE.Mesh(
			// 		new THREE.SphereGeometry( 0.2, 5, 5 ),
			// 		new THREE.MeshBasicMaterial( 0xffffff )
			// 	)
			// );
			this.pointLight.distance = this.LIGHT_DISTANCE;
			this.pointLight.intensity = this.LIGHT_INTENSITY;
		}
		


	}

	set x( val ){
		this.flare.position.x = val;
		this.pointLight.position.x = val;
	}
	get x(  ){
		return this.flare.position.x;
	}

	set y( val ){
		this.flare.position.y = val;
		this.pointLight.position.y = val;
	}
	get y(  ){
		return this.flare.position.y;
	}

	set z( val ){
		this.flare.position.z = val;
		this.pointLight.position.z = val;
	}
	get z(  ){
		return this.flare.position.z;
	}



	addAnimation( tDelay, tShow, tHide, tPause ){
		var flareShine = this;

		this.tDelay = tDelay;
		this.tShow = tShow;
		this.tHide = tHide;
		this.tPause = tPause;

		var sparkTween = new TWEEN.Tween( {
				scale : 0.01,
				lightIntensity: 0
			} )
			.to( {
				scale: 1,
				lightIntensity: this.LIGHT_INTENSITY
			}, tShow )
			.onUpdate( function(  ){
				flareShine.flare.scale.x = this.scale;
				flareShine.flare.scale.y = this.scale;

				flareShine.pointLight.intensity = this.lightIntensity;

				flareShine.flare.rotation.z += flareShine.ROTATION_RATE;
			} )
			.onComplete( function(  ){
				sparkTween._object.scale = 0.01;
				sparkTween._object.lightIntensity = 0;
			} )

			.delay( tDelay )
			.easing( TWEEN.Easing.Cubic.Out );


		var sparkTweenBack = new TWEEN.Tween( {
			scale: 1,
			lightIntensity: this.LIGHT_INTENSITY
		} )
		.to( {
			scale: 0.01,
			lightIntensity: 0
		}, tHide )
		.onUpdate( function(  ){
			flareShine.flare.scale.x = this.scale;
			flareShine.flare.scale.y = this.scale;

			flareShine.pointLight.intensity = this.lightIntensity;
		} )
		.onComplete( function(  ){
			sparkTweenBack._object.scale = 1;
			sparkTweenBack._object.lightIntensity = this.LIGHT_INTENSITY;
			flareShine.flare.rotation.z = 0;

		} )
		


		var pauseTween = new TWEEN.Tween( {} )
			.to( {}, tPause );



		sparkTween.chain( sparkTweenBack );
		sparkTweenBack.chain( pauseTween );
		pauseTween.chain( sparkTween );


		sparkTween.start(  );
	}

	addFlareTo( object ){
		object.add( this.flare );

		if( this.withLight )
			object.add( this.pointLight );
	}

	setFlareBg( width, height, x, y, z ){
		this.flareBg = new THREE.Mesh(
			new THREE.PlaneGeometry( width, height ),
			new THREE.MeshBasicMaterial( {
				map: this.textureFlareBg,
				transparent: true
			} )
		);

		this.flareBg.width = width;
		this.flareBg.height = hegiht;

		this.flareBg.position.set( x, y, z );
	}

	addFlareBgTo( object ){
		object.add( this.flareBg );

	}


	clone( withLight ){
		if( withLight == undefined )
			withLight = this.withLight;

		var clone = new FlareShine( 
			this.flare.width,
			this.flare.height,
			this.x,
			this.y,
			this.z,
			withLight
		);


		if( this.flareBg != undefined ){
			var pos = this.flareBg.position;
			clone.setFlareBg(
				this.flareBg.width,
				this.flareBg.height,

				position.x,
				position.y,
				position.z
			);
		}

		if( this.tDelay != undefined ){
			clone.addAnimation(
				this.tDelay,
				this.tShow,
				this.tHide,
				this.tPause
			);
		}


		return clone;
	}




}