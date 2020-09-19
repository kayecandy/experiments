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
	cndceSkype: function(params){
		var defaults = {
			dataURL: 'skype.json'
		}

		var $skypepersonContainer = $('.skypeperson-container');
		var $skypepersonTemplate = $('.skypeperson.cndce-template', $skypepersonContainer);


		function getDefaults(obj, defaultsObj){
			var duplicate = {};

			if(obj == undefined)
				obj = {};

			for( var param in defaultsObj ){
				if( defaultsObj.hasOwnProperty( param ) ){
					if( !obj.hasOwnProperty( param ) || obj[param] == undefined ){
						duplicate[param] = defaultsObj[param];
					}else{
						duplicate[param] = obj[param];
					}
				}
			}

			return duplicate;
		}

		function getTemplate($template){
			return $template.
				clone(true)
				.removeClass('cndce-template');
		}

		function expandSkype2(parentElem) {
			addSkypeDetails();
			$(parentElem).children().remove();
			$(".expanded").removeClass("expanded");
			$(".expandeduser").removeClass("expandeduser");
			
			$(".skypeinfo").hide();
			$(parentElem).parent().addClass("expandeduser");
			$(parentElem)
				.addClass("expanded")
				.next().show();
		}

		function expandSkype($skypeperson){
			$('.expandeduser', $skypepersonContainer).removeClass('expandeduser');
			$skypeperson.addClass('expandeduser');
		}

		function shrinkSkype($skypeperson){
			$skypeperson.removeClass('expandeduser');

			console.log('shrink');
		}


		function initSkypePersons(data){
			for(var i=0; i < data.length; i++){
				var $skypeperson = getTemplate($skypepersonTemplate);

				$('.skypename', $skypeperson).addClass('skype' + data[i].status);

				$('.first-name', $skypeperson).text(data[i].firstName);
				$('.last-name', $skypeperson).text(data[i].lastName);
				$('.extrainfo', $skypeperson).text(data[i].statusMessage);

				$('.skypeavatar', $skypeperson).attr('src', data[i].profilePicture);
				$('.skypedetails', $skypeperson).text(data[i].statusMessage);
				$('.skypelocation', $skypeperson).text(data[i].location);

				$skypepersonContainer.append($skypeperson);
			}
		}

		// When a skype name is click, expand it
		$('.skypename').click(function () {
			var $this = $(this);
			var $skypeperson = $this.parents('.skypeperson');

			if($skypeperson.hasClass('expandeduser')){
				shrinkSkype($skypeperson);
			}else{
				expandSkype($skypeperson);

			}
		});



		(function init(){
			// Param Set Defaults
			params = getDefaults(params, defaults);

			$.ajax({
				url: params.dataURL,
				dataType: 'json',
				success: function(json){
					console.log(json);

					initSkypePersons(json);

				}
			})
					
		})();

		
	}
})



