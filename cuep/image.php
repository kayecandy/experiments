<?php
	if(empty($_GET['url'])){
		exit('No URL Specified');
	}

	// header('Content-Type: image/');

	// file_get_contents($_GET['url']);
	// print_r($http_response_header);

	print_r(get_headers($_GET['url']))

?>