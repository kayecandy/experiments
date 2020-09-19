<?php

	// ini_set('display_errors', 1);

	if(empty($_GET['url'])){
		exit('No URL Specified');
	}


	function get_absolute_url($urlRelative, $urlBase){
		$urlRelative = trim($urlRelative);


		if(!preg_match('/^http+s:\/\//', $urlRelative)){
			$url = parse_url($urlBase);

			$urlRelative = $url['scheme'] . '://' . $url['host'] . $urlRelative;
		}


		return $urlRelative;
	}

	function url_exists($array, $url){
		foreach ($array as $a) {
			if($a['url'] == $url){
				return true;
			}
		}

		return false;
	}


	$htmlString = file_get_contents($_GET['url']);


	$html = new DomDocument();
    @$html->loadHTML($htmlString);

    $xpath = new DOMXPath($html);

    $images = array();

    foreach ($xpath->query('//img') as $img) {

    	$src = $img->getAttribute('src');

    	if(!empty($src)){
    		$src = get_absolute_url($src, $_GET['url']);

    		// Make sure url is only pushed once
    		if(!url_exists($images, $src)){

    			

    			$headers = get_headers($src, 1);


    			array_push($images, array(
    				'url'			=> $src,
    				'headers'		=> $headers
    			));	
    		}
    		
    	}
    	
    }

    header('Content-Type: application/json');
    echo json_encode($images);




?>