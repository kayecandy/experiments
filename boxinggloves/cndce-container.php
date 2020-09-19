<div id="cndce-gloves-container" class="cndce-container theme-1" data-active-editable="color">

	<div class="cndce-logo-library-overlay cndce-popup-overlay">
		<?php include('cndce-logo-library.php') ?>
	</div>

	<div id="cndce-controls-left-bar">

		<div class="cndce-left-bar-icon" data-editable="settings">
			<img src="<?php echo plugins_url('/assets/images/icon-settings.svg', __FILE__) ?>">
		</div>

		<div class="cndce-left-bar-icon active" data-editable="color">
			<img src="<?php echo plugins_url('/assets/images/icon-paint.svg', __FILE__) ?>">
		</div>
		<div class="cndce-left-bar-icon" data-editable="logo">
			<img src="<?php echo plugins_url('/assets/images/icon-image.svg', __FILE__) ?>">
		</div>
		<div class="cndce-left-bar-icon" data-editable="text">
			<img src="<?php echo plugins_url('/assets/images/icon-text.svg', __FILE__) ?>">
		</div>
	</div>

	<div id="cndce-controls-editables" class="cndce-controls-editables cndce-scrollbar scrollbar-macosx">
		<div class="cndce-controls-editables-type" data-editable="color">
			<div class="cndce-color-editable cndce-editable cndce-template"></div>
		</div>

		<div class="cndce-controls-editables-type" data-editable="logo">
			<div class="cndce-logo-editable cndce-editable cndce-template"></div>
		</div>

		<div class="cndce-controls-editables-type" data-editable="text">
			<div class="cndce-text-editable cndce-editable cndce-template"></div>
		</div>
	</div>

	


	<div id="cndce-controls" class="cndce-controls cndce-scrollbar scrollbar-macosx">
		<div class="cndce-glove-parts">
			<div class="cndce-active-glove-part cndce-template"></div>
		</div>

		<div class="cndce-price">
			<div class="cndce-price-label">Price</div>
			<h1 class="cndce-price-value">$<span class="cndce-price-total"></span></h1>
			<button class="cndce-add-to-cart">Add to Cart</button>
		</div>

		<div class="cndce-settings cndce-control">
			

			<div class="cndce-size-quantity">
				<h3 class="cndce-controls-title">Size and Quantity</h3>

				<div class="cndce-property-container">
					<div class="cndce-property-label">Size</div>
					<select class="cndce-sizes-input">
						<option class="cndce-size-option cndce-template"></option>
					</select>
				</div>

				<div class="cndce-property-container">
					<div class="cndce-property-label">Quantity</div>
					<input class="cndce-quantity-input" value="1" type="text">
				</div>

			</div>

			<div class="cndce-action-buttons">
				<a class="cndce-download-button" download="snapshot.png"><button>Download Snapshot</button></a>

				<button class="cndce-change-theme-button">Change Theme</button>
			</div>

			

			<?php if(strpos($attributes['style'], '-shorts') !== false): ?>

				<div class="cndce-leg-cuts">
					<h3 class="cndce-controls-title">Leg Cuts</h3>
					<br>
					<select class="cndce-leg-cuts-input">
						<option>Side Slit</option>
						<option>Curve</option>
						<option>Wave</option>
					</select>
				</div>

			<?php endif; ?>
		</div>

		

		
		<div class="cndce-colors cndce-control">

			<h3 class="cndce-controls-title">Select Colors</h3>
			<small>*Colors may vary slightly</small>
			<div class="cndce-template cndce-color-type-container cndce-property-container">
				<div class="cndce-color-type-label cndce-property-label">
					
				</div>
				<div class="cndce-colors-container">
					<div class="cndce-color-box cndce-template">
						<svg enable-background="new 0 0 24 24" id="Layer_1" version="1.0" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M20,7.2c0,3.6-0.5,8.1-2.1,9.7c-1,1-7.6,1.8-8.9,1.3c-1.2-0.4-3.6-0.7-5.6-5.9C2.1,9,4.3,7.9,5.1,7.9  c0.2,2.5,1.3,4.9,1.8,5.2c-0.4-0.9-0.9-4.8-0.9-5.9C6.1,3.4,7.4,2,13.1,2S20,3.4,20,7.2z"/><path d="M18.3,17.8c0,0-2.6,1-5.8,0.7c-2.8-0.2-4.3-1.2-4.3-1.2c0,1.9,0.3,3.6,0.6,3.9c0.5,0.5,1.7,0.8,4.5,0.8s4.1-0.3,4.4-0.8  C18.1,20.2,18.3,17.8,18.3,17.8z"/></svg>
						<div class="cndce-color-name"></div>
					</div>
				</div>
			</div>
		</div>

		<div class="cndce-logo cndce-control">
			<h3 class="cndce-controls-title">Upload your own logo</h3>
			<input class="cndce-logo-input" type="file" accept="image/*">

			<button class="cndce-logo-library-button">Choose from our library</button>
			<br>

			<button class="cndce-logo-remove-button">Remove logo</button>
			<button class="cndce-logo-button">Upload logo</button>




			<div class="cndce-logo-transform-container">
				<div class="cndce-property-label">Transform</div>

				<div>
					Move: 

					<button class="cndce-logo-transformation-button" data-transformation="translate" data-transformation-axis="y" data-transformation-intensity="-20">
						<img src="<?php echo plugins_url('/assets/images/icon-arrowup.svg', __FILE__) ?>">
					</button>

					<button class="cndce-logo-transformation-button" data-transformation="translate" data-transformation-axis="y" data-transformation-intensity="20">
						<img src="<?php echo plugins_url('/assets/images/icon-arrowdown.svg', __FILE__) ?>">
					</button>

					<button class="cndce-logo-transformation-button" data-transformation="translate" data-transformation-axis="x" data-transformation-intensity="-20">
						<img src="<?php echo plugins_url('/assets/images/icon-arrowleft.svg', __FILE__) ?>">
					</button>

					<button class="cndce-logo-transformation-button" data-transformation="translate" data-transformation-axis="x" data-transformation-intensity="20">
						<img src="<?php echo plugins_url('/assets/images/icon-arrowright.svg', __FILE__) ?>">
					</button>

					
				
					

					
				</div>
			</div>

			<div class="cndce-logo-transform-container">
				<div>
					Scale X: 

					<button class="cndce-logo-transformation-button" data-transformation="scale" data-transformation-axis="x" data-transformation-intensity="0.1">
						<img src="<?php echo plugins_url('/assets/images/icon-plus.svg', __FILE__) ?>">
					</button>

					<button class="cndce-logo-transformation-button" data-transformation="scale" data-transformation-axis="x" data-transformation-intensity="-0.1">
						<img src="<?php echo plugins_url('/assets/images/icon-minus.svg', __FILE__) ?>">
					</button>
				
					Scale Y: 

					<button class="cndce-logo-transformation-button" data-transformation="scale" data-transformation-axis="y" data-transformation-intensity="0.1">
						<img src="<?php echo plugins_url('/assets/images/icon-plus.svg', __FILE__) ?>">
					</button>

					<button class="cndce-logo-transformation-button" data-transformation="scale" data-transformation-axis="y" data-transformation-intensity="-0.1">
						<img src="<?php echo plugins_url('/assets/images/icon-minus.svg', __FILE__) ?>">
					</button>
				</div>
			</div>

			<div class="cndce-logo-transform-container">
				<div>
					Rotate: 

					<button class="cndce-logo-transformation-button" data-transformation="rotate" data-transformation-intensity="0.025">
						<img src="<?php echo plugins_url('/assets/images/icon-rotateclockwise.svg', __FILE__) ?>">
					</button>

					<button class="cndce-logo-transformation-button" data-transformation="rotate" data-transformation-intensity="-0.025">
						<img style="transform: scaleX(-1);" src="<?php echo plugins_url('/assets/images/icon-rotateclockwise.svg', __FILE__) ?>">
					</button>
				</div>
			</div>
		</div>

		<div class="cndce-fonts cndce-control">

			<h3 class="cndce-controls-title">Add Texts</h3>


			<div class="cndce-property-container">
				<button class="cndce-remove-text-button">Remove Text</button>
				<?php if(strpos($attributes['style'], 'muaythai-shorts') !== false):  ?>
					<button class="cndce-add-text-button" data-text="มวยไทย">Add มวยไทย</button>
				<?php endif; ?>
			</div>

			<div class="cndce-property-container">
				<div class="cndce-property-label">Text</div>
				<input class="cndce-text-input" type="text">
			</div>

			<div class="cndce-property-container">
				<div class="cndce-property-label">Text Color</div>

				<div class="cndce-font-colors-container">
					<div class="cndce-color-box cndce-template">
						<svg enable-background="new 0 0 24 24" id="Layer_1" version="1.0" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M20,7.2c0,3.6-0.5,8.1-2.1,9.7c-1,1-7.6,1.8-8.9,1.3c-1.2-0.4-3.6-0.7-5.6-5.9C2.1,9,4.3,7.9,5.1,7.9  c0.2,2.5,1.3,4.9,1.8,5.2c-0.4-0.9-0.9-4.8-0.9-5.9C6.1,3.4,7.4,2,13.1,2S20,3.4,20,7.2z"/><path d="M18.3,17.8c0,0-2.6,1-5.8,0.7c-2.8-0.2-4.3-1.2-4.3-1.2c0,1.9,0.3,3.6,0.6,3.9c0.5,0.5,1.7,0.8,4.5,0.8s4.1-0.3,4.4-0.8  C18.1,20.2,18.3,17.8,18.3,17.8z"/></svg>
						<div class="cndce-color-name"></div>
					</div>
				</div>				
				
			</div>

			<div class="cndce-property-container">
				<div class="cndce-property-label">Outline Color</div>

				<div class="cndce-outline-colors-container">
					<div class="cndce-color-box cndce-template">
						<svg enable-background="new 0 0 24 24" id="Layer_1" version="1.0" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M20,7.2c0,3.6-0.5,8.1-2.1,9.7c-1,1-7.6,1.8-8.9,1.3c-1.2-0.4-3.6-0.7-5.6-5.9C2.1,9,4.3,7.9,5.1,7.9  c0.2,2.5,1.3,4.9,1.8,5.2c-0.4-0.9-0.9-4.8-0.9-5.9C6.1,3.4,7.4,2,13.1,2S20,3.4,20,7.2z"/><path d="M18.3,17.8c0,0-2.6,1-5.8,0.7c-2.8-0.2-4.3-1.2-4.3-1.2c0,1.9,0.3,3.6,0.6,3.9c0.5,0.5,1.7,0.8,4.5,0.8s4.1-0.3,4.4-0.8  C18.1,20.2,18.3,17.8,18.3,17.8z"/></svg>
						<div class="cndce-color-name"></div>
					</div>
				</div>
			</div>

			<div class="cndce-property-container">
				<!-- <div class="cndce-property-label">Outline Width</div> -->

				<div>


					Outline Width: &nbsp;&nbsp;
					<button class="cndce-text-transformation-button" data-transformation="strokeWidth" data-transformation-intensity="1">
						<img src="<?php echo plugins_url('/assets/images/icon-plus.svg', __FILE__) ?>">
					</button>

					<button class="cndce-text-transformation-button" data-transformation="strokeWidth" data-transformation-intensity="-1">
						<img src="<?php echo plugins_url('/assets/images/icon-minus.svg', __FILE__) ?>">
					</button>
				</div>
				
			</div>

			<div class="cndce-property-container">
				<button class="cndce-remove-outline-button">Remove Outline</button>
			</div>

			<div class="cndce-property-container">
				<div class="cndce-property-label">Choose Fonts</div>

				<div class="cndce-font-previews-container">
					<div class="cndce-font-preview cndce-template"></div>
				</div>
			</div>


			<div class="cndce-property-container">
				<div class="cndce-property-label">Transform</div>

				<div class="cndce-text-transform-container">
					<div>
						Move: 

						<button class="cndce-text-transformation-button" data-transformation="translate" data-transformation-axis="y" data-transformation-intensity="-20">
							<img src="<?php echo plugins_url('/assets/images/icon-arrowup.svg', __FILE__) ?>">
						</button>

						<button class="cndce-text-transformation-button" data-transformation="translate" data-transformation-axis="y" data-transformation-intensity="20">
							<img src="<?php echo plugins_url('/assets/images/icon-arrowdown.svg', __FILE__) ?>">
						</button>

						<button class="cndce-text-transformation-button" data-transformation="translate" data-transformation-axis="x" data-transformation-intensity="-20">
							<img src="<?php echo plugins_url('/assets/images/icon-arrowleft.svg', __FILE__) ?>">
						</button>

						<button class="cndce-text-transformation-button" data-transformation="translate" data-transformation-axis="x" data-transformation-intensity="20">
							<img src="<?php echo plugins_url('/assets/images/icon-arrowright.svg', __FILE__) ?>">
						</button>

						
					
						

						
					</div>
				</div>

				<div class="cndce-text-transform-container">
					<div>
						Font Size: 

						<button class="cndce-text-transformation-button" data-transformation="fontSize" data-transformation-intensity="10">
							<img src="<?php echo plugins_url('/assets/images/icon-plus.svg', __FILE__) ?>">
						</button>

						<button class="cndce-text-transformation-button" data-transformation="fontSize" data-transformation-intensity="-10">
							<img src="<?php echo plugins_url('/assets/images/icon-minus.svg', __FILE__) ?>">
						</button>
					
					</div>
				</div>

				<div class="cndce-text-transform-container">
					<div>
						Rotate: 

						<button class="cndce-text-transformation-button" data-transformation="rotate" data-transformation-intensity="0.05">
							<img src="<?php echo plugins_url('/assets/images/icon-rotateclockwise.svg', __FILE__) ?>">
						</button>

						<button class="cndce-text-transformation-button" data-transformation="rotate" data-transformation-intensity="-0.05">
							<img style="transform: scaleX(-1);" src="<?php echo plugins_url('/assets/images/icon-rotateclockwise.svg', __FILE__) ?>">
						</button>
					</div>
				</div>
			</div>

			
		</div>
	</div>
</div>