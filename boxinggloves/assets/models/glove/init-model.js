jQuery(function($){
	var variations = $('form.cart').data('product_variations');


	if(variations != undefined){

		var sizes = [];

		for(var i=0; i < variations.length; i++){
			sizes.push({
				label: variations[i].attributes.attribute_sizes,
				price: variations[i].display_price
			})
		}
	}

	

	$('#ywapo_ctrl_id_4_0').addClass('cndce-woo-thumbnail');
	$('#ywapo_ctrl_id_3_0').addClass('cndce-woo-thumbnail');

	$('#ywapo_ctrl_id_2_0').addClass('cndce-woo-color-pb');
	$('#ywapo_ctrl_id_2_1').addClass('cndce-woo-color-wb');
	$('#ywapo_ctrl_id_2_2').addClass('cndce-woo-color-tu');
	$('#ywapo_ctrl_id_2_3').addClass('cndce-woo-color-td');
	$('#ywapo_ctrl_id_2_4').addClass('cndce-woo-color-ti');
	$('#ywapo_ctrl_id_2_5').addClass('cndce-woo-color-ts');
	$('#ywapo_ctrl_id_2_6').addClass('cndce-woo-color-pi');
	$('#ywapo_ctrl_id_2_7').addClass('cndce-woo-color-po');
	$('#ywapo_ctrl_id_2_8').addClass('cndce-woo-color-pip');
	$('#ywapo_ctrl_id_2_9').addClass('cndce-woo-color-stitch');
	$('#ywapo_ctrl_id_2_10').addClass('cndce-woo-color-laces');

	$('#ywapo_ctrl_id_11_0').addClass('cndce-woo-color-price-pb');
	$('#ywapo_ctrl_id_11_1').addClass('cndce-woo-color-price-wb');
	$('#ywapo_ctrl_id_11_2').addClass('cndce-woo-color-price-tu');
	$('#ywapo_ctrl_id_11_3').addClass('cndce-woo-color-price-td');
	$('#ywapo_ctrl_id_11_4').addClass('cndce-woo-color-price-ti');
	$('#ywapo_ctrl_id_11_5').addClass('cndce-woo-color-price-ts');
	$('#ywapo_ctrl_id_11_6').addClass('cndce-woo-color-price-pi');
	$('#ywapo_ctrl_id_11_7').addClass('cndce-woo-color-price-po');
	$('#ywapo_ctrl_id_11_8').addClass('cndce-woo-color-price-pip');
	$('#ywapo_ctrl_id_11_9').addClass('cndce-woo-color-price-stitch');
	$('#ywapo_ctrl_id_11_10').addClass('cndce-woo-color-price-laces');


	$('#ywapo_ctrl_id_1_0').addClass('cndce-woo-logo-pb');
	$('#ywapo_ctrl_id_1_1').addClass('cndce-woo-logo-wb');
	$('#ywapo_ctrl_id_1_2').addClass('cndce-woo-logo-tu');
	$('#ywapo_ctrl_id_1_3').addClass('cndce-woo-logo-pi');
	$('#ywapo_ctrl_id_1_4').addClass('cndce-woo-logo-po');

	$('#ywapo_ctrl_id_7_0').addClass('cndce-woo-logo-pb');
	$('#ywapo_ctrl_id_7_1').addClass('cndce-woo-logo-wb');
	$('#ywapo_ctrl_id_7_2').addClass('cndce-woo-logo-tu');
	$('#ywapo_ctrl_id_7_3').addClass('cndce-woo-logo-pi');
	$('#ywapo_ctrl_id_7_4').addClass('cndce-woo-logo-po');

	




	$('#cndce-gloves-container').cndce3DGloves({
		sizes: sizes
	});
})