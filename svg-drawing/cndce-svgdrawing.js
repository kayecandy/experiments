const CNDCE_LINE_ORIENTATION_PORTRAIT = 0;
const CNDCE_LINE_ORIENTATION_LANDSCAPE = 1;
const CNDCE_LINE_ORIENTATION_SLANT = 2;

const CNDCE_LINE_THETA_UP = 0;
const CNDCE_LINE_THETA_DOWN = 180;
const CNDCE_LINE_THETA_LEFT = 90;
const CNDCE_LINE_THETA_RIGHT = 270;

const DEG_TO_RAD = Math.PI / 180;


const SVG_NS = '//www.w3.org/2000/svg';


class CNDCELine{
	constructor(x, y, width, height){
		this.x = x;
		this.y = y;
		this.theta = 0;

		this.width = width;
		this.height = height;


		this.$svgElement = $(document.createElementNS(SVG_NS, 'g'));
		this.$svgMainPath = $(document.createElementNS(SVG_NS, 'path'));
		this.$svgHover = $(document.createElementNS(SVG_NS, 'path'));

		this.$svgElement.addClass('cndce-line');

		this.$svgMainPath.addClass('cndce-line-path');
		this.$svgHover.addClass('cndce-line-hover');

		this.$svgElement.append(this.$svgMainPath);
		this.$svgElement.append(this.$svgHover);

		this.$svgElement.data('cndce-line', this);

	}

	isOrientationPortrait(){
		return this.theta == CNDCE_LINE_THETA_UP
			|| this.theta == CNDCE_LINE_THETA_DOWN;
	} 

	isOrientationLandscape(){
		return this.theta == CNDCE_LINE_THETA_LEFT
			|| this.theta == CNDCE_LINE_THETA_RIGHT;
	}


	adjustLineHeightByHeight(height){
		this.height = height;

		var radTheta = this.theta * DEG_TO_RAD;

		this.endX = this.x - Math.sin(radTheta) * this.height;
		this.endY = this.y - Math.cos(radTheta) * this.height;
	}

	adjustLineHeightByHeightReverse(height){
		this.height = height;

		var radTheta = this.theta * DEG_TO_RAD;

		this.x = this.endX + Math.sin(radTheta) * this.height;
		this.y = this.endY + Math.cos(radTheta) * this.height;
	}

	adjustNewLineHeightByPosition(x, y){
		var dX = Math.abs(this.x - x);
		var dY = Math.abs(this.y - y);

		
		// Landscape
		if(dX > dY){
			if(this.x > x)
				this.theta = CNDCE_LINE_THETA_LEFT;
			else
				this.theta = CNDCE_LINE_THETA_RIGHT;

			this.height = dX;

		// Portrait
		}else{
			if(this.y > y)
				this.theta = CNDCE_LINE_THETA_UP;
			else
				this.theta = CNDCE_LINE_THETA_DOWN;

			this.height = dY;
		}



		this.adjustLineHeightByHeight(this.height);

	}

	adjustLineHeightByPosition(x, y){
		var m = (y - this.y) / (x - this.x);

		var mRad = this.theta * DEG_TO_RAD + Math.atan(m);

		var d = getDistance({x: this.x, y: this.y}, {x: x, y: y});

		var height = Math.abs(Math.sin(mRad) * d);

		this.adjustLineHeightByHeight(height);
	}

	adjustLineHeightByPositionReverse(x, y){
		var m = (y - this.endY) / (x - this.endX);

		var mRad = this.theta * DEG_TO_RAD + Math.atan(m);

		var d = getDistance({x: this.endX, y: this.endY}, {x: x, y: y});

		var height = Math.abs(Math.sin(mRad) * d);

		this.adjustLineHeightByHeightReverse(height);
	}

	adjustLineHeightByStartPosition(x, y){
		this.x = x;
		this.y = y;

		this.height = getDistance({x: this.x, y: this.y}, {x: this.endX, y: this.endY});
	}




	adjustLineWidthByPosition(x, y){
		var m = (y - this.y) / (x - this.x);

		var mRad = this.theta * DEG_TO_RAD + Math.atan(m);

		var d = getDistance({x: this.x, y: this.y}, {x: x, y: y});

		var halfWidth = Math.abs(Math.cos(mRad) * d);

		this.width = halfWidth * 2;
	}

	adjustLinePositionByStartPosition(x, y){
		this.x = x;
		this.y = y;

		this.adjustLineHeightByHeight(this.height);
	}

	adjustLinePositionByEndPosition(endX, endY){
		this.endX = endX;
		this.endY = endY;

		this.adjustLineHeightByHeightReverse(this.height);
	}

	

	adjustLinePositionByPosition(x, y){
		var m = (y - this.y) / (x - this.x);

		var mRad = this.theta * DEG_TO_RAD + Math.atan(m);

		var d = getDistance({x: this.x, y: this.y}, {x: x, y: y});

		var a = Math.cos(mRad) * d;



		var radTheta = 90 * DEG_TO_RAD;

		console.log(
			a
		);



		// this.adjustLinePositionByStartPosition(
		// 	this.x - Math.cos(radTheta) * a,
		// 	this.y - Math.sin(radTheta) * a
		// );
	}

	draw(){	
		var d = 'M' + this.x + ' ' + this.y + ' '
			+ 'L' + this.endX + ' ' + this.endY;

		this.$svgMainPath.attr('d', d);
		this.$svgHover.attr('d', d);

	}
}

class CNDCEShape{
	constructor(){
		this.lines = [];
		this.$svgElement = $(document.createElementNS(SVG_NS, 'g'));
		this.$svgLines = $(document.createElementNS(SVG_NS, 'g'));
		this.$svgOutline = $(document.createElementNS(SVG_NS, 'path'));
		this.$svgOutlinePaths = $(document.createElementNS(SVG_NS, 'g'));

		this.$svgElement.addClass('cndce-shape');
		this.$svgOutline.addClass('cndce-outline');
		this.$svgLines.addClass('cndce-lines-container');
		this.$svgOutlinePaths.addClass('cndce-outline-paths-container');

		this.$svgElement.append(this.$svgOutline);
		this.$svgElement.append(this.$svgLines);
		this.$svgElement.append(this.$svgOutlinePaths);

		this.$svgElement.data('cndce-shape', this);
	}

	addLine(x, y, width, height){
		if(x == undefined || y == undefined){
			var lastPos = this.getLastPosition();

			x = lastPos.x;
			y = lastPos.y;
		}

		var newLine = new CNDCELine(x, y, width, height);
		this.lines.push(newLine);

		this.$svgLines.append(newLine.$svgElement);
		
	}

	getCurrentLine(){
		if(this.lines.length == 0)
			return undefined;

		else
			return this.lines[this.lines.length-1];
	}

	getLastPosition(){
		var currLine = this.getCurrentLine();

		return {
			x: currLine.endX,
			y: currLine.endY
		}
	}


	getOutlineForwardStart(i){
		var outlineTheta = this.lines[i].theta + 90;

		var radOutlineTheta = outlineTheta * DEG_TO_RAD;


		var startX = this.lines[i].x - Math.sin(radOutlineTheta) * (this.lines[i].width / 2);
		var startY = this.lines[i].y - Math.cos(radOutlineTheta) * (this.lines[i].width / 2);


		this.lines[i].theta %= 360;
		if(this.lines[i-1] != undefined){
			var adjustTheta = this.lines[i].theta + 180;
			var radAjustTheta = adjustTheta * DEG_TO_RAD;

			if(this.lines[i-1].theta == 0 && this.lines[i].theta == 270)
				this.lines[i-1].theta = 360;

			if(this.lines[i-1].theta == 270 && this.lines[i].theta == 0)
				this.lines[i].theta = 360;



			if(this.lines[i-1].theta > this.lines[i].theta){
				startX -= Math.sin(radAjustTheta) * (this.lines[i-1].width / 2);
				startY -= Math.cos(radAjustTheta) * (this.lines[i-1].width / 2);

			}else{
				startX += Math.sin(radAjustTheta) * (this.lines[i-1].width / 2);
				startY += Math.cos(radAjustTheta) * (this.lines[i-1].width / 2);
			}
		}

		return {
			x: startX,
			y: startY
		}
	}

	// TODO: Cleanup implementation
	getOutlineForwardEnd(i, startX, startY){
		var outlineHeight = this.lines[i].height;

		var radTheta = this.lines[i].theta * DEG_TO_RAD;



		if(this.lines[i-1] != undefined){
			this.lines[i].theta %= 360;
			this.lines[i-1].theta %= 360;

			if(this.lines[i-1].theta == 0 && this.lines[i].theta == 270)
				this.lines[i-1].theta = 360;

			if(this.lines[i-1].theta == 270 && this.lines[i].theta == 0)
				this.lines[i].theta = 360;



			if(this.lines[i-1].theta > this.lines[i].theta){
				outlineHeight += this.lines[i-1].width / 2;

			}else{
				outlineHeight -= this.lines[i-1].width / 2;
			}
		}


		if(this.lines[i+1] != undefined){
			this.lines[i].theta %= 360;
			this.lines[i+1].theta %= 360;


			if(this.lines[i].theta == 0 && this.lines[i+1].theta == 270)
				this.lines[i].theta = 360;

			if(this.lines[i].theta == 270 && this.lines[i+1].theta == 0)
				this.lines[i+1].theta = 360;

			if(this.lines[i].theta > this.lines[i+1].theta){
				outlineHeight += this.lines[i+1].width / 2;
			}else{
				outlineHeight -= this.lines[i+1].width / 2;
			}
		}


		return {
			x: startX - Math.sin(radTheta) * outlineHeight,
			y: startY - Math.cos(radTheta) * outlineHeight
		}
	}


	getOutlineBackwardStart(i){
		var outlineTheta = this.lines[i].theta + 270;

		var radOutlineTheta = outlineTheta * DEG_TO_RAD;


		var startX = this.lines[i].endX - Math.sin(radOutlineTheta) * (this.lines[i].width / 2);
		var startY = this.lines[i].endY - Math.cos(radOutlineTheta) * (this.lines[i].width / 2);


		this.lines[i].theta %= 360;
		if(this.lines[i+1] != undefined){
			var adjustTheta = this.lines[i].theta + 180;
			var radAjustTheta = adjustTheta * DEG_TO_RAD;

			if(this.lines[i].theta == 0 && this.lines[i+1].theta == 270)
				this.lines[i].theta = 360;

			if(this.lines[i].theta == 270 && this.lines[i+1].theta == 0)
				this.lines[i+1].theta = 360;



			if(this.lines[i].theta > this.lines[i+1].theta){
				startX += Math.sin(radAjustTheta) * (this.lines[i].width / 2);
				startY += Math.cos(radAjustTheta) * (this.lines[i].width / 2);

			}else{
				startX -= Math.sin(radAjustTheta) * (this.lines[i].width / 2);
				startY -= Math.cos(radAjustTheta) * (this.lines[i].width / 2);
			}
		}

		return {
			x: startX,
			y: startY
		}
	}

	// TODO: Cleanup implementation
	getOutlineBackwardEnd(i, startX, startY){
		var outlineHeight = this.lines[i].height;
		var radTheta = (this.lines[i].theta + 180) * DEG_TO_RAD;



		if(this.lines[i-1] != undefined){
			this.lines[i].theta %= 360;
			this.lines[i-1].theta %= 360;


			if(this.lines[i-1].theta == 0 && this.lines[i].theta == 270)
				this.lines[i-1].theta = 360;

			if(this.lines[i-1].theta == 270 && this.lines[i].theta == 0)
				this.lines[i].theta = 360;



			if(this.lines[i-1].theta > this.lines[i].theta){
				outlineHeight -= this.lines[i-1].width / 2;

			}else{
				outlineHeight += this.lines[i-1].width / 2;
			}
		}


		if(this.lines[i+1] != undefined){

			this.lines[i].theta %= 360;
			this.lines[i+1].theta %= 360;


			if(this.lines[i].theta == 0 && this.lines[i+1].theta == 270)
				this.lines[i].theta = 360;

			if(this.lines[i].theta == 270 && this.lines[i+1].theta == 0)
				this.lines[i+1].theta = 360;

			if(this.lines[i].theta > this.lines[i+1].theta){
				outlineHeight -= this.lines[i+1].width / 2;
			}else{
				outlineHeight += this.lines[i+1].width / 2;
			}
		}


		return {
			x: startX - Math.sin(radTheta) * outlineHeight,
			y: startY - Math.cos(radTheta) * outlineHeight
		}
	}

	adjustCurrentLineHeightByPosition(x, y){
		var currLine = this.getCurrentLine();
		
		currLine.adjustNewLineHeightByPosition(x, y);
		currLine.draw();
		this.drawOutline();
	}

	adjustLineWidthByPosition(line, x, y){
		line.adjustLineWidthByPosition(x, y);
		this.drawOutline();
	}

	adjustLinePositionByPosition(line, x, y){
		var index = this.lines.indexOf(line);


		// Before
		if(index > 0){
			line = this.lines[index-1];
			line.adjustLineHeightByPosition(x, y);
			line.draw();

			// Line
			this.lines[index].adjustLinePositionByStartPosition(line.endX, line.endY);
			this.lines[index].draw();


		}else{
			// this.lines[index].adjustLinePositionByPosition(x, y);
			// this.lines[index].adjustLinePositionByEndPosition(this.lines[index + 1].endX, this.lines[index + 1].endY)
			// this.lines[index].draw();
		}


		// After
		if(index + 1 < this.lines.length){
			this.lines[index+1].adjustLineHeightByPositionReverse(x, y);
			this.lines[index + 1].draw();
		}


		this.drawOutline();
	}


	drawOutline(){

		this.outlinePaths = [];

		var startForward = this.getOutlineForwardStart(0);
		var d  = 'M' + startForward.x + ' ' + startForward.y + ' ';

		this.outlinePaths.push({
			x: startForward.x,
			y: startForward.y,
			line: 0
		})

		// Forward
		var endForward = startForward;

		for(var i=0; i < this.lines.length; i++){
			endForward = this.getOutlineForwardEnd(i, endForward.x, endForward.y);

			d += 'L' + endForward.x + ' ' + endForward.y + ' ';

			this.outlinePaths.push({
				x: endForward.x,
				y: endForward.y ,
				line: i
			})
		}



		var startBackward = this.getOutlineBackwardStart(this.lines.length - 1);
		d += 'L' + startBackward.x + ' ' + startBackward.y + ' ';

		this.outlinePaths.push({
			x: startBackward.x,
			y: startBackward.y,
			line: this.lines.length - 1
		})

		// Backward
		var endBackward = startBackward;

		for(var i=this.lines.length - 1; i >= 0; i--){
			endBackward = this.getOutlineBackwardEnd(i, endBackward.x, endBackward.y);

			d += 'L' + endBackward.x + ' ' + endBackward.y + ' ';

			this.outlinePaths.push({
				x: endBackward.x,
				y: endBackward.y,
				line: i
			})
		}

		d += 'L' + startForward.x + ' ' + startForward.y + ' ';

		this.outlinePaths.push({
			x: startForward.x,
			y: startForward.y,
			line: 0
		})


		this.$svgOutline.attr('d', d);
	}

	createOutlinePaths(){

		for(var i=0; i < this.outlinePaths.length - 1; i++){
			var $outlineG = $(document.createElementNS(SVG_NS, 'g'));
			var $outlinePath = $(document.createElementNS(SVG_NS, 'path'));
			var d = 'M' + this.outlinePaths[i].x + ' ' + this.outlinePaths[i].y + ' '
				+ 'L' + this.outlinePaths[i+1].x + ' ' + this.outlinePaths[i+1].y

			$outlinePath.attr('d', d);

			var $outlineHover = $outlinePath.clone(true);

			$outlineG.addClass('cndce-outline-g');
			$outlinePath.addClass('cndce-outline-path');
			$outlineHover.addClass('cndce-outline-hover');	

			$outlineG.data('cndce-line', this.lines[this.outlinePaths[i+1].line]);		


			$outlineG.append($outlinePath);
			$outlineG.append($outlineHover);
			this.$svgOutlinePaths.append($outlineG);
		}

	}

}









// jQuery prototype
$.fn.extend({
	cndceSVGDrawing: function(params){
		var defaults = {
			snapSize: 100,
			initWidth: 100
		};

		var cndceSvg = this;
		var $cndceSvg = $(cndceSvg);

		var shapes = [];
		var currShape;
		var currOutline;
		var currLine;

		var $currShape;

		// Set Default Parameters
		if( params == undefined ){
			params = {};
		}

		for(var param in defaults){
			if(params[param] == undefined)
				params[param] = defaults[param];
		}



		$cndceSvg.addClass('cndce-svg');

		// Functions
		function getMouseFromEvent(e){
			var offset = $(e.currentTarget).offset();

			var x = e.pageX;
			var y = e.pageY;

			if(e.touches != undefined && e.touches.length > 0){
				x = e.touches[e.touches.length - 1].pageX;
				y = e.touches[e.touches.length - 1].pageY;
			}


			return {
				x: x - offset.left,
				y: y - offset.top
			}
		}

		function getDistance(pos1, pos2){
			var a = pos1.x - pos2.x;
			var b = pos1.y - pos2.y;

			return Math.sqrt(a*a + b*b);
		}

		window.getDistance = getDistance;


		// EVENTS


		// DRAW EVENTS
		$(document).on('mousedown touchstart', '.cndce-svg.cndce-draw' ,function(e){
			
			// Init new shape
			var newShape = new CNDCEShape();
			newShape.addLine(mouse.x, mouse.y, params.initWidth, 0);
			$cndceSvg.append(newShape.$svgElement);

			shapes.push(newShape);

			currShape = newShape;

		})

		$(document).on('mouseup touchend touchcancel', '.cndce-svg.cndce-draw', function(e){
			$cndceSvg.removeClass('cndce-draw');

			currShape.createOutlinePaths();

			currShape = undefined;
		})

		$(document).on('mousemove touchmove', '.cndce-svg.cndce-draw', function(e){
			currShape.adjustCurrentLineHeightByPosition(mouse.x, mouse.y);


			if(getDistance(mouse, currShape.getLastPosition()) >= params.snapSize){
				currShape.addLine(undefined, undefined, params.initWidth, 0);

				// console.log('add', mouse);
			}

			e.preventDefault();

		})



		// RESIVE EVENTS
		$cndceSvg.on('mouseenter touchstart', '.cndce-outline-g', function(){

			$cndceSvg.addClass('cndce-outline-hover');
		})

		$cndceSvg.on('mouseleave touchend touchcancel', '.cndce-outline-g', function(){
			$cndceSvg.removeClass('cndce-outline-hover');
		})

		$cndceSvg.on('mouseenter touchstart', '.cndce-line', function(){
			$cndceSvg.addClass('cndce-line-hover');
		})

		$cndceSvg.on('mouseleave touchend touchcancel', '.cndce-line', function(){
			$cndceSvg.removeClass('cndce-line-hover');
		})


		$(document).on('mousemove touchmove', '.cndce-svg.cndce-resize', function(e){
			$currShape.addClass('cndce-resizing');

			if(currOutline != undefined){
				currShape.adjustLineWidthByPosition(currOutline, mouse.x, mouse.y);

			}else if(currLine != undefined){
				currShape.adjustLinePositionByPosition(currLine, mouse.x, mouse.y);
			}
		})

		$(document).on('mouseup touchend touchcancel', '.cndce-svg.cndce-resize', function(e){
			$cndceSvg.removeClass('cndce-resize');
			$currShape.removeClass('cndce-resizing');

			currShape.$svgOutlinePaths.html('');
			currShape.createOutlinePaths();

			currShape = undefined;
			currOutline = undefined;
			currLine = undefined;
			$currShape = undefined;
		})





		// GENERAL EVENTS
		$cndceSvg.on('mousemove touchmove mousedown touchstart', function(e){
			mouse = getMouseFromEvent(e);
			e.preventDefault();
		})

		$cndceSvg.on('mousedown touchstart', function(e){
			var $target = $(e.target);

			$cndceSvg.addClass('cndce-mousedown');

			if($cndceSvg.hasClass('cndce-outline-hover')){
				$cndceSvg.addClass('cndce-resize');

				$currShape = $target.parents('.cndce-shape');

				currShape = $currShape.data('cndce-shape');
				currOutline = $target.parents('.cndce-outline-g').data('cndce-line');



			}else if($cndceSvg.hasClass('cndce-line-hover')){
				$cndceSvg.addClass('cndce-resize');

				$currShape = $target.parents('.cndce-shape');

				currShape = $currShape.data('cndce-shape');
				currLine = $target.parents('.cndce-line').data('cndce-line');


			}else{
				$cndceSvg.addClass('cndce-draw');
			}
		})


		$cndceSvg.on('mouseup touchend touchcancel', function(e){
			$cndceSvg.removeClass('cndce-mousedown');

		})
	}
})