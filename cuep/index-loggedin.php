<!DOCTYPE html>
<html>
<head>
	<title>CUEP Image Finder</title>
	<link rel="icon" href="//cndce.me/favicon.png">
	
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes">

	<!-- Font -->
	<link href="https://fonts.googleapis.com/css?family=Roboto:100,200,400" rel="stylesheet">

	<!-- Self -->
	<link rel="stylesheet" type="text/css" href="./cndce-cuep.css">
</head>
<body>

	<div class="cndce-container">
		
		<h1>CUEP Image Finder</h1>

		<form class="cndce-search-form">
			<input class="cndce-search-box" type="text" value="">
			<button class="cndce-search-button" type="submit">Search</button>
		</form>
		<br>
		
		<img id="cndce-loader" src="./assets/loading.svg">


		<div class="cndce-table-wrapper">
			<table id="cndce-result-table" class="cndce-result-table">
				<tr>
					<th>Thumbnail</th>
					<th class="cndce-sortable" data-sort=".cndce-filename">Filename</th>
					<th class="cndce-sortable" data-sort=".cndce-filetype">File Type</th>
					<th class="cndce-sortable" data-sort=".cndce-filesize">File Size</th>
					<th class="cndce-sortable" data-sort=".cndce-resolution">Resolution</th>
					<th></th>
				</tr>

				<tr class="cndce-result-row cndce-template">
					<td class="cndce-thumb cndce-trigger-slideshow"><img width="100" src=""></td>
					<td class="cndce-filename cndce-trigger-slideshow"></td>
					<td class="cndce-filetype cndce-trigger-slideshow"></td>
					<td class="cndce-filesize cndce-trigger-slideshow"></td>
					<td class="cndce-resolution cndce-trigger-slideshow">
						<span class="cndce-width"></span>x<span class="cndce-height"></span>
					</td>
					<td class="cndce-download">
						<a href="" target="_blank" download><svg enable-background="new 0 0 24 24" id="Layer_1" version="1.0" viewBox="0 0 24 24" xml:space="preserve" xmlns="//www.w3.org/2000/svg" xmlns:xlink="//www.w3.org/1999/xlink"><path d="M21.5,4.9l-2.1-2.7C19.3,2.1,19.1,2,18.9,2H5.1C4.9,2,4.7,2.1,4.6,2.2L2.5,4.9C2.2,5.2,2,5.5,2,5.9V20c0,1.1,0.9,2,2,2h16  c1.1,0,2-0.9,2-2v-4V5.9C22,5.5,21.8,5.2,21.5,4.9z M12,18l-5-5h3V9h4v4h3L12,18z M19,5H5l0.5-1h13L19,5z"/></svg></a>
					</td>
				</tr>
			</table>
		</div>

		

		<div id="cndce-slideshow" class="cndce-slideshow">
			<div class="cndce-slides">
				<div class="cndce-slide cndce-template">
					<!-- <div class="cndce-slide-img"> </div> -->
					<div class="cndce-details">
						<b>Filename:</b> <div class="cndce-detail cndce-filename"></div> |
						<b>Filetype:</b> <div class="cndce-detail cndce-filetype"></div> |
						<b>Filesize:</b> <div class="cndce-detail cndce-filesize"></div> |
						<b>Resolution:</b> <div class="cndce-detail cndce-resolution">
							<span class="cndce-width"></span>x<span class="cndce-height"></span>
						</div> |
						<a class="cndce-download" target="_blank" download><b>Download</b></a>
					</div>
				</div>
			</div>
			<div class="cndce-slide-close"></div>
			<div class="cndce-slide-control prev" data-control="next"></div>
			<div class="cndce-slide-control next" data-control="previous"></div>
		</div>
	</div>

	


	<!-- jQuery -->
	<script src="//code.jquery.com/jquery-3.2.1.min.js"
	integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>


	<!-- W3.js -->
	<script src="https://www.w3schools.com/lib/w3.js"></script>

	<!-- Self -->
	<script type="text/javascript" src="./cndce-cuep.js"></script>

</body>
</html>