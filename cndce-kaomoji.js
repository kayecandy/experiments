class CNDCEKaomoji{
	el;
	settings;
	currentIndex;

	constructor(el, settings = {}){
		var defaultSettings = {
			duration: 1000,
			initIndex: 0,
			...settings
		};


		this.el = el;
		this.settings = defaultSettings;

		this.__initElement();
	}

	__initElement(){
		this.currentIndex = this.settings.initIndex;

		this.__loop();

		setInterval(this.__loop.bind(this), this.settings.duration);
	}

	__loop(){

		Array.from(this.el.children).map((child, i) => {
			child.style.display = 
				(i == this.currentIndex) 
					? "block" : "none";
		})

		this.currentIndex = (this.currentIndex + 1) % this.el.children.length;


	}
}