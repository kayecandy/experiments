$.fn.extend({
	cndceConwayGameOfLife: function(params){
		defaults = {
			nColumns: 40,
			nRows: 20,
			gridSize: '20px',
			playInterval: 200,
			defaultScene: './gosper.json'
		}
		

		var $container = $(this);
		var $tableContainer = $('.cndce-table-container', $container);
		var $table;

		var cells;

		var playInterval;


		// Param Set Defaults
		if( params == undefined ){
			params = {};
		}


		for( var param in defaults ){
			if( defaults.hasOwnProperty( param ) ){
				if( !params.hasOwnProperty( param ) ){
					params[param] = defaults[param];
				}
			}
		}


		function getCell(iRow, iColumn){
			return cells[iRow][iColumn]

			// iRow++;
			// iColumn++;
			// return $('.cndce-row:nth-child(' + iRow + ') .cndce-column:nth-child(' + iColumn + ')', $table);
		}

		function getScene(){
			var newScene = [];

			for(var i=0; i < 20; i++){
				newScene.push([]);
				for(var j=0; j < 40; j++){
			    	newScene[i].push(getCell(i, j).hasClass('cndce-alive'))
			 }
			}
			return {scene: newScene};
		}


		function step(){
			var nextStates = [];

			for(var i=0; i < params.nRows; i++){
				var nextRowStates = []
				for(var j=0; j < params.nColumns; j++){
					var $cell = getCell(i, j);
					var $neighbors = $cell.data('cndce-neighbors');

					var $aliveNeighbors = $neighbors.filter('.cndce-alive');

					var isCellAlive = $cell.hasClass('cndce-alive');

					// Live cell with less than two neighbors die
					// Live cell with more than three neighbors die
					if(isCellAlive){
						if($aliveNeighbors.length < 2 || $aliveNeighbors.length > 3){
							isCellAlive = false;
						}

					// Dead cell with exactly 3 neighbors become alive
					}else{
						if($aliveNeighbors.length == 3){
							isCellAlive = true;
						}
					}

					nextRowStates.push(isCellAlive);
				}

				nextStates.push(nextRowStates);
			}


			// Apply states
			fillGridFromScene(nextStates);
		}


		function loadSceneFromURL(url){
			$.ajax({
				dataType: 'json',
				url: url,
				success: function(data){
					loadScene(data);

				}
			})
		}

		function loadScene(data){
			params.nRows = data.scene.length;
			params.nColumns = data.scene[0].length;

			newScene();
			fillGridFromScene(data.scene);
		}

		function fillGridFromScene(scene){
			for(var i=0; i < params.nRows; i++){
				for(var j=0; j < params.nColumns; j++){
					var $cell = getCell(i, j);

					if(scene[i][j]){
						$cell.addClass('cndce-alive');
					}else{
						$cell.removeClass('cndce-alive');
					}
				}
			}
		}

		function generateGrid(){
			$table = $('<div class="cndce-table"></div>');
			cells = [];

			window.cells = cells;

			for(var i=0; i < params.nRows; i++){
				var $tr = $('<div class="cndce-row"></div>');
				cells.push([]);

				for(var j=0; j < params.nColumns; j++){
					var $td = $('<div class="cndce-column"></div>');

					$td.css({
						width: params.gridSize,
						height: params.gridSize
					})

					$tr.append($td);
					cells[i].push($td);
				}

				$table.append($tr);
			}


			$tableContainer.prepend($table);
		}

		function stopPlaying(){
			if(playInterval != undefined){
				clearInterval(playInterval);
				playInterval = undefined;

				$container.removeClass('.cndce-playing');
				$('.cndce-play').html('Play');
			}
		}

		function cellAssignNeighbors(){
			for(var i=0; i < params.nRows; i++){
				for(var j=0; j < params.nColumns; j++){
					var $cell = getCell(i, j);
					var neighbors = [];

					// TOP
					if(i > 0){
						// Top-left
						if(j > 0){
							neighbors.push(getCell(i-1, j-1)[0]);
						}

						// Center
						neighbors.push(getCell(i-1, j)[0]);

						// Top-right
						if(j < params.nColumns - 2){
							neighbors.push(getCell(i-1, j+1)[0]);
						}
					}


					// CENTER
					// Ceter-left
					if(j > 0){
						neighbors.push(getCell(i, j-1)[0]);
					}

					// Ceter-right
					if(j < params.nColumns - 2){
						neighbors.push(getCell(i, j+1)[0]);
					}


					// BOTTOM
					if(i < params.nRows - 1){
						// Bottom-left
						if(j > 0){
							neighbors.push(getCell(i+1, j-1)[0]);
						}

						// Center
						neighbors.push(getCell(i+1, j)[0]);

						// Bottom-right
						if(j < params.nColumns - 2){
							neighbors.push(getCell(i+1, j+1)[0]);
						}
					}

					$cell.data('cndce-neighbors', $(neighbors));


				}
			}
		}

		(function initializeControls(){
			$('.cndce-control').each(function(){
				var $control = $(this);

				$control.val(params[$control.attr('data-cndce-param')]);
			})
		})();




		function newScene(){
			if($table != undefined){

				$table.remove();
				stopPlaying();

				// return;
			}

			generateGrid();
			cellAssignNeighbors();
		};

		(function initialize(){

			if(params.defaultScene == undefined){
				newScene();			
			}else{
				loadSceneFromURL(params.defaultScene);
			}
		})();


		$container.on('click', '.cndce-column', function(){
			var $column = $(this);

			$column.toggleClass('cndce-alive');
		})

		$('.cndce-new').click(function(){
			newScene();
		})

		$('.cndce-step').click(function(){
			step();
		})

		$('.cndce-play').click(function(){
			var $button = $(this);
			$container.toggleClass('cndce-playing');

			if($container.hasClass('cndce-playing')){
				playInterval = setInterval(function(){
					step();
				}, params.playInterval);

				$button.html('Stop');
			}else{
				stopPlaying();

			}
		})

		$('.cndce-download').click(function(e){
			var $this = $(this);

			$this.attr('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(getScene())))
		})

		$('.cndce-load').click(function(){
			$('.cndce-load-input').click();
		})

		$('.cndce-load-input').change(function(event){
			var reader = new FileReader();
			reader.readAsText(event.target.files[0]);
			reader.onload = function(e){
				loadScene(JSON.parse(e.target.result))
			}
		})


		$('.cndce-control').change(function(){
			var $this = $(this);
			var param = $this.attr('data-cndce-param');
			var isReinit = $this.attr('data-cndce-init');


			params[param] = $this.val();

			if(isReinit == undefined || isReinit == 'true')
				newScene();

			if(param == 'playInterval' && $container.hasClass('cndce-playing')){
				$('.cndce-play').click();
				$('.cndce-play').click();
			}

		})
	}
})