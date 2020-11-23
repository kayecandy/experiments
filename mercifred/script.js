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
	var $cndceContainer = $('.cndce-container');
	var $chatForm = $('.cndce-chat-form', $cndceContainer);
	var $chatContainer = $('.cndce-chat-container', $cndceContainer);

	var $startButton = $('.cndce-start-survey', $cndceContainer);

	var conversationalForm;


	$startButton.click(function(){
		$cndceContainer.addClass('survey-started');

		$('html,body').animate({
			scrollTop: $chatContainer.offset().top
		}, 500)

		conversationalForm.focus();
		conversationalForm.start();
	});


	$chatContainer.on('click', '.cndce-help', function(){
		var $content = $($(this).data('content'));

		if($content.length)
			conversationalForm.addRobotChatResponse($content.html());
	});


	(function startIntro(){
		var $intros = $('.cndce-intro-message', $cndceContainer);

		$intros.each(function(i){

			var $message = $(this);

			setTimeout(function(){
				$message.addClass('sent');
			}, i * CNDCE.INTRO_INTERVAL)
		})


		setTimeout(function(){
			$startButton.addClass('sent');
			
		}, $intros.length * CNDCE.INTRO_INTERVAL);

	})();


	(function initChatForm(){
		conversationalForm = new cf.ConversationalForm({
			formEl: $chatForm[0],
			context: $chatContainer[0],
			showProgressBar: true,
			// preventAutoFocus: true,
			preventAutoStart: true,
			hideUserInputOnNoneTextInput: true,
			robotImage: CNDCE.ROBOT_IMAGE,
			submitCallback: function(){

			}
		})

	})();

});