var  body = document.getElementsByTagName('body')[0];
var cndceShapes = document.querySelectorAll('.cndce-shape');

body.onload = function(){
	for(var i=0; i < cndceShapes.length; i++){
		cndceShapes[i].classList.add('loaded');	
	}
}
