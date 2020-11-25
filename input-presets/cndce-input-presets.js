class CNDCEInputPresets{
	__presets = {
		'clear': {
			'#input1': '',
			'#input2': '',
			'#input3': '',
			'#input4': '',
			'#input5': '',
			'#input6': null
		},
		'preset-1' : {
			'#input1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			'#input2': 'Morbi vel dolor congue, interdum tellus eget, semper neque.',
			'#input3': 'Nulla in massa eget ipsum tempor iaculis.',
			'#input4': 'Mauris nec nunc vitae est ultricies auctor varius id est.',
			'#input5': 'Morbi ac diam varius, aliquam purus id, bibendum arcu.',
			'#input6': 0
		},
		'preset-2': {
			'#input1': 'Proin tempor nulla et neque egestas, ullamcorper aliquet dolor efficitur.',
			'#input2': 'Sed finibus turpis sit amet neque elementum, quis viverra eros interdum.',
			'#input3': 'Nam a arcu facilisis, tincidunt dolor sed, accumsan tellus.',
			'#input4': 'Donec cursus leo non tortor porta sollicitudin.',
			'#input5': 'Nulla in massa eget ipsum tempor iaculis.',
			'#input6': 1
		}
	}


	__initJQueryObjects(){
		this.$cndceContainer = $('.cndce-container');
		this.$inputs = $('input, select', '.cndce-inputs');
		this.$presets = $('#presets');

	}

	__initSelect(){
		this.$cndceContainer.on('change', 'select', function(){
			const $select = $(this);

			console.log($select.val());

			if(!$select.val())
				$select.addClass('placeholder-shown');
			else
				$select.removeClass('placeholder-shown');
		})

	}

	__initPresets(){
		this.$cndceContainer.on('change', '#presets', ()=>{
			this.$inputs.val("");
			this.$inputs.change();

			const selectedPreset = this.__presets[this.$presets.val()];

			Object.keys(selectedPreset).forEach((input)=>{
				const $input = $(input);
				$input.val(selectedPreset[input])
				$input.change();
			})

		})
	}

	constructor(presets){
		if(presets)
			this.__presets = presets;

		this.__initJQueryObjects();
		this.__initSelect();
		this.__initPresets();
	}

}

$(function(){
	new CNDCEInputPresets();

})

