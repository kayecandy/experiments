<?php 

	function plugins_url($url, $file){
		return './' . $url;
	}

	function plugin_dir_path($file){
		return './';
	}


	$attributes = array(
		'style' => $_GET['style']
	)

?>


<!DOCTYPE html>
<html>
<head>
	<title>Candice Experiments - Boxing Gloves</title>
	<link rel="icon" href="http://cndce.me/favicon.png">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes">
	

	<!-- Scrollbar -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery.scrollbar/0.2.11/jquery.scrollbar.min.css" />

	<!-- Self -->
	<link rel="stylesheet" type="text/css" href="./cndce-boxingglove.css">
	<link rel="stylesheet" type="text/css" href="./cndce-theme-1.css">



	<style type="text/css">
		body,html{
			width: 100%;
			height: 100%;
			margin: 0;
		}

		.cndce-container{
			font-family: 'Rubik', sans-serif;
		}

		.cndce-woocommerce-sample{
			display: none;
		}
	</style>
</head>
<body>

	<div class="cndce-woocommerce-sample">

		<input id="cndce-logo-pb" type="text">
		<input id="cndce-logo-wb" type="text">
		<input id="cndce-logo-td" type="text">
		<input id="cndce-logo-pi" type="text">


		<input id="cndce-color-pb" type="text">
		<input id="cndce-color-wb" type="text">
		<input id="cndce-color-tu" type="text">
		<input id="cndce-color-td" type="text">
		<input id="cndce-color-ti" type="text">
		<input id="cndce-color-ts" type="text">
		<input id="cndce-color-pi" type="text">
		<input id="cndce-color-po" type="text">
		<input id="cndce-color-pip" type="text">
		<input id="cndce-color-stitch" type="text">
		<input id="cndce-color-laces" type="text">
		
	</div>

	<?php include('cndce-container.php') ?>
	



	<!-- jQuery -->
	<script
	  src="https://code.jquery.com/jquery-3.3.1.min.js"
	  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
	  crossorigin="anonymous"></script>

  	<!-- ThreeJS -->
  	<script type="text/javascript" src="//cdn.cndce.me/threejs/r97/three.min.js"></script>
  	<script type="text/javascript" src="//cdn.cndce.me/threejs/controls/OrbitControls.js"></script>
  	<script type="text/javascript" src="//cdn.cndce.me/threejs/loaders/OBJLoader.js"></script>
  	<script type="text/javascript" src="//cdn.cndce.me/threejs/exporters/OBJExporter.js"></script>


  	<!-- TweenJS -->
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/16.3.5/Tween.min.js"></script>

  	<!-- jQuery Scrollbar -->
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.scrollbar/0.2.11/jquery.scrollbar.min.js"></script>



	<!-- Self -->
	<script type="text/javascript">
		var cndceBoxingGloveURL = '';
	</script>
	<script type="text/javascript" src="./cndce-boxingglove.js"></script>

	<?php if(isset($_GET['style'])): ?>
		<script type="text/javascript" src="./assets/models/<?php echo $_GET['style'] ?>/init-model.js"></script>


	<?php else: ?>
		<script type="text/javascript" src="./assets/models/glove/init-model.js"></script>

	<?php endif; ?>
	


</body>
</html>