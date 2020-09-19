jQuery(function($){
	var $body = $('body');
	var $searchForm = $('.cndce-search-form');
	var $searchBox = $('.cndce-search-box', $searchForm);

	var $resultTable = $('.cndce-result-table tbody')
	var $resultRowTemplate = $('.cndce-result-row.cndce-template', $resultTable);

	var $resultSlideShow = $('.cndce-slideshow');
	var $resultSlideShowSlides = $('.cndce-slides', $resultSlideShow);
	var $resultSlideTemplate = $('.cndce-slide.cndce-template', $resultSlideTemplate);

	var slideShow;


	function getTemplate($template){
		return $template
			.clone(true)
			.removeClass('cndce-template');
	}




	function addResultToTable(image){
		var $row = getTemplate($resultRowTemplate);

		var $img = $('.cndce-thumb img', $row);

		$img.attr('src', image['url']);
		$('.cndce-download a', $row).attr('href', image['url']);
		$('.cndce-filename', $row).html(image['url'].replace(/^.*[\\\/]/, ''));
		$('.cndce-filetype', $row).html(image['headers']['Content-Type']);
		$('.cndce-filesize', $row).html(image['headers']['Content-Length']);


		$img.on('load', function(){
			$('.cndce-resolution .cndce-width', $row).html($img[0].naturalWidth);
			$('.cndce-resolution .cndce-height', $row).html($img[0].naturalHeight);

		})


		$resultTable.append($row);
	}

	function addResultToSlideShow(image){
		var $slide = getTemplate($resultSlideTemplate);

		var $img = $('.cndce-slide-img', $slide);

		// $img.attr('src', image['url']);

		$slide.css({
			backgroundImage: 'url("' + image['url'] + '")'
		})

		$('.cndce-download', $slide).attr('href', image['url']);
		$('.cndce-filename', $slide).html(image['url'].replace(/^.*[\\\/]/, ''));
		$('.cndce-filetype', $slide).html(image['headers']['Content-Type']);
		$('.cndce-filesize', $slide).html(image['headers']['Content-Length']);

		$img.on('load', function(){
			$('.cndce-resolution .cndce-width', $slide).html($img[0].naturalWidth);
			$('.cndce-resolution .cndce-height', $slide).html($img[0].naturalHeight);
		})

		$resultSlideShowSlides.append($slide);
	}


	function showSlideShow(index){
		if(index != undefined){
			slideShow.display(index+1);
		}
		$body.addClass('slideshow');
	}

	function hideSlideShow(){
		$body.removeClass('slideshow');
	}


	function clearResults(){
		$('.cndce-result-row:not(.cndce-template)', $resultTable).remove();
		$('.cndce-slide:not(.cndce-template)', $resultSlideShowSlides).remove();
	}


	$resultTable.on('click', '.cndce-sortable', function(){
		$('th.sorted', $resultTable).removeClass('sorted');

		w3.sortHTML('#cndce-result-table', '.cndce-result-row', $(this).attr('data-sort'));
		$(this).addClass('sorted');
	})


	$resultTable.on('click', '.cndce-trigger-slideshow', function(e){

		showSlideShow($(this).parents('.cndce-result-row').index('.cndce-result-row:not(.cndce-template)'));
	})

	$resultSlideShow.on('click', '.cndce-slide-close', function(){
		hideSlideShow();
	})

	$resultSlideShow.on('click', '.cndce-slide-control', function(){
		slideShow[$(this).attr('data-control')]();
	})

	$searchForm.on('submit', function(e){
		e.preventDefault();

		$body.addClass('loading');
		$body.removeClass('loaded');

		$.ajax({
			url: './search.php',
			data:{
				url: $searchBox.val()
			},
			dataType: 'json',
			success: function(data){
				console.log(data);

				clearResults();

				for(var i=0; i<data.length; i++){
					addResultToTable(data[i]);
					addResultToSlideShow(data[i]);
				}
				slideShow = w3.slideshow('.cndce-slide:not(.cndce-template)', 0);

				$body.addClass('loaded');

				setTimeout(function(){
					$body.removeClass('loading');

				}, 1000)

			}, 
			complete: function(){
			}
		})
	})

});