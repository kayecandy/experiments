<?php 

	$LIBRARY_DIR = 'assets/flags/';

	$files = scandir(plugin_dir_path(__FILE__) . $LIBRARY_DIR);

?>

<div class="cndce-logo-library-container cndce-popup-container">
	<div class="cndce-popup-title">
		<h3>Choose from our library</h3>
	</div>

	<div class="cndce-popup-contents cndce-scrollbar scrollbar-macosx">
		<?php for($i = 2; $i < sizeof($files); $i++): ?>
			<div class="cndce-library-logo">
				<img height="75" crossorigin="Anonymous" src="<?php echo plugins_url($LIBRARY_DIR . $files[$i], __FILE__) ?>">
			</div>
		<?php endfor; ?>
	</div>

	<div class="cndce-popup-footer">
		<button class="cndce-popup-exit-button">Cancel</button>
	</div>
</div>