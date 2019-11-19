/***************************************************************************
 *                                                                         *
 *                                                                         *
 *       ___           ___           ___           ___           ___       *
 *      /  /\         /  /\         /  /\         /  /\         /  /\      *
 *     /  /::\       /  /::|       /  /::\       /  /::\       /  /::\     *
 *    /  /:/\:\     /  /:|:|      /  /:/\:\     /  /:/\:\     /  /:/\:\    *
 *   /  /:/  \:\   /  /:/|:|__   /  /:/  \:\   /  /:/  \:\   /  /::\ \:\   *
 *  /__/:/ \  \:\ /__/:/ |:| /\ /__/:/ \__\:| /__/:/ \  \:\ /__/:/\:\ \:\  *
 *  \  \:\  \__\/ \__\/  |:|/:/ \  \:\ /  /:/ \  \:\  \__\/ \  \:\ \:\_\/  *
 *   \  \:\           |  |:/:/   \  \:\  /:/   \  \:\        \  \:\ \:\    *
 *    \  \:\          |__|::/     \  \:\/:/     \  \:\        \  \:\_\/    *
 *     \  \:\         /__/:/       \__\::/       \  \:\        \  \:\      *
 *      \__\/         \__\/            ~~         \__\/         \__\/      *
 *                                                                         *
 *                                                                         *
 ***************************************************************************/

jQuery(function($){
	var $videoGrid = $('.cndce-video-grid');

	$('.cndce-grid-item', $videoGrid).mouseenter(function(){
		var video = $('.cndce-grid-video', this)[0];
		video.play();

		if($(this).hasClass('muted')){
			video.muted = true;
		}else{
			video.muted = false;
		}


	})

	$('.cndce-grid-item', $videoGrid).mouseleave(function(){
		$('.cndce-grid-video', this)[0].pause();

	})

	$('.cndce-grid-item', $videoGrid).click(function(){
		var $this = $(this);

		if(!$this.hasClass('active')){
			$('.cndce-grid-video', this)[0].pause();

			var $activePreviewItem = $('.cndce-preview-item.active', $videoGrid);

			if($activePreviewItem.length){
				$('.cndce-preview-video', $activePreviewItem)[0].pause();
				$activePreviewItem.removeClass('active');

			}

			$('.cndce-grid-item.active', $videoGrid).removeClass('active');


			$this.addClass('active');
			$videoGrid.addClass('item-active');

			var $previewItem = $('.cndce-preview-item',  $videoGrid).eq($this.index());

			if($previewItem.length){
				$previewItem.addClass('active');
				$('.cndce-preview-video', $previewItem)[0].play();
			}

		}else{
			$('.cndce-preview-item.active .cndce-preview-close', $videoGrid).click();
		}
	})

	$('.cndce-grid-volume', $videoGrid).click(function(){
		var $gridItem =  $(this).parents('.cndce-grid-item');
		var video = $('.cndce-grid-video', $gridItem)[0];

		video.muted = !video.muted;

		$gridItem.toggleClass('muted');

	})

	$('.cndce-preview-volume', $videoGrid).click(function(){
		var $previewItem =  $(this).parents('.cndce-preview-item');
		var video = $('.cndce-preview-video', $previewItem)[0];

		video.muted = !video.muted;

		$previewItem.toggleClass('muted');

	})


	$('.cndce-preview-close', $videoGrid).click(function(){
		var $previewItem = $(this).parents('.cndce-preview-item');

		$previewItem.removeClass('active');
		$videoGrid.removeClass('item-active');
		$('.cndce-grid-item.active', $videoGrid).removeClass('active');

		$('.cndce-preview-video', $previewItem)[0].pause();
	})
})