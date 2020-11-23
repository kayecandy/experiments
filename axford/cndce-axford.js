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


$(function(){
	var CHECKBOXES_URL =  './checkboxes.json';

	var $cndceAxford = $('#cndce-axford');

	var $leftPanel = $('#cndce-left-panel');
	var $rightPanel = $('#cndce-right-panel');

	var dataCheckboxes;
	var $checkboxesContainer = $('.cndce-checkboxes-container', $cndceAxford);
	var $checkboxesTemplate = $('.cndce-checkbox-item.cndce-template', $checkboxesContainer);

	var $chatForm = $('.cndce-chat-form', $cndceAxford);
	var $chatContainer = $('.cndce-chat-container', $cndceAxford);


	function getTemplate($template){
		var $temp = $template.clone(true);
		$temp.removeClass('cndce-template');

		return $temp;
	}

	$cndceAxford.on('click', '.cndce-checkbox-item', function(){
		$('.cndce-checkbox-item.active', $cndceAxford).removeClass('active');

		$(this).addClass('active');
	});

	(function initCheckboxes(){
		$.ajax({
			url: CHECKBOXES_URL,
			dataType: 'json',
			success: function(json){
				dataCheckboxes = json;

				for(var i=0; i < dataCheckboxes.length; i++){
					var $template = getTemplate($checkboxesTemplate);

					$template.text(dataCheckboxes[i].text);
					$checkboxesContainer.append($template);
				}
			}
		})
	})();

	(function initChatForm(){
		new cf.ConversationalForm({
			formEl: $chatForm[0],
			context: $chatContainer[0]
		})
	})();

	(function initScrollbars(){
		new SimpleBar($leftPanel[0]);
		new SimpleBar($rightPanel[0]);
	})();
});