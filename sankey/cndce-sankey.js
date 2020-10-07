
(()=>{

	const WIDTH = 2000;
	const HEIGHT = 3000;
	const MARGIN = {
		TOP: 10,
		BOTTOM: 10,
		LEFT: 10,
		RIGHT: 10
	}

	var COLOR_LINKS = '#b9b9b970';
	var COLOR_LINK_ACTIVE = '#45092070';

	var OPACITY_DISABLED = 0.3;


	var cndceSankey;
	var canvas;
	var svg;
	var sankey;
	var data;

	var persistActive = false;
	var activeGraph;
	

	(async function init(){
		resetActiveGraph();
		await initData();
		initSankey();
		initD3();
		// drawCanvas();

		d3.timer(()=>{
			drawCanvas()
		})
	})();



	async function initData(){
		data = await requestJSON('./data.json');

	};

	function initSankey(){
		sankey = d3.sankey()
		.nodeId(d => d.id)
		.nodeSort(null)
		.nodeAlign((node, n) => {
			// console.log(node, node.layer, d3.sankeyJustify(node, n));
			return node.layer ? node.layer : d3.sankeyJustify(node, n);
		})
		.extent([[MARGIN.LEFT, MARGIN.TOP],[WIDTH + MARGIN.LEFT, HEIGHT + MARGIN.TOP]]);


	};

	function initD3(){		

		cndceSankey = d3.select('.cndce-sankey');

		sankey
			.nodes(data.nodes)
			.links(data.links)

		svg = cndceSankey.append('svg')
			.attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
			.attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

		canvas = cndceSankey.append('canvas')
			.attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
			.attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);
			// .attr('style', `margin: ${MARGIN.TOP}px ${MARGIN.RIGHT}px ${MARGIN.BOTTOM}px 0`);


		svg.append('g')
			.attr('class', 'cndce-sankey__nodes')

		svg.append('g')
			.attr('class', 'cndce-sankey__labels')

		updateD3();
	};


	function updateD3(){
  		// svg.append("g")
    //   		.style("font", "10px sans-serif")
		  //   .selectAll("text")
		  //   .data(nodes)
		  //   .join("text")
		  //     .attr("x", d => d.x0 < WIDTH / 2 ? d.x1 + 6 : d.x0 - 6)
		  //     .attr("y", d => (d.y1 + d.y0) / 2)
		  //     .attr("dy", "0.35em")
		  //     .attr("text-anchor", d => d.x0 < WIDTH / 2 ? "start" : "end")
		  //     .text(d => d.name)
		  //   .append("tspan")
		  //     .attr("fill-opacity", 0.7)
		  //     .text(d => ` ${d.value.toLocaleString()}`)

		const {nodes, links} = sankey();

		const svgLabels = svg.select('.cndce-sankey__labels')
			.selectAll('.cndce-sankey__label')
			.data(nodes, d => d.id)

		svgLabels.enter()
			.append("text")
				.attr('class', 'cndce-sankey__label')
				.attr("x", d => d.x0 < WIDTH / 2 ? d.x1 + 6 : d.x0 - 6)
			    .attr("y", d => (d.y1 + d.y0) / 2)
			    .attr("dy", "0.35em")
			    .attr("text-anchor", d => d.x0 < WIDTH / 2 ? "start" : "end")
		    	.attr("opacity", d => persistActive && !d.active ? 0 : 1)
			    .text(d => d.name)

			.append("tspan")
			    .attr("fill-opacity", 0.7)
			    .text(d => ` ${d.value.toLocaleString()}`)

		svgLabels
			// .transition()
			// .duration(1500)
			.attr("x", d => d.x0 < WIDTH / 2 ? d.x1 + 6 : d.x0 - 6)
		    .attr("y", d => (d.y1 + d.y0) / 2)
	    	.attr("opacity", d => persistActive && !d.active ? 0 : 1)


		svgLabels.exit().remove();



		const svgNodes = svg.select('.cndce-sankey__nodes')
		    .selectAll('.cndce-sankey__node')
		    .data(nodes, d => d.id)

		svgNodes.enter()
		    .append("rect")
		    	.attr("x", d => d.x0 + 1)
		    	.attr("y", d => d.y0)
		    	.attr("height", d => Math.max(d.y1 - d.y0, 3))
		    	.attr("width", d => d.x1 - d.x0 - 2)
		    	.attr("class", "cndce-sankey__node")
		    	.attr("data-node-id", d => d.id)
		    	.attr("data-ttgen-id", d => d.ttgen_id)
		    	.attr("data-ttspec-id", d => d.ttspec_id)
		    	.attr("opacity", d => persistActive && !d.active ? 0 : 1)
		      	.on('mouseover', handleNodeMouseOver)
		      	.on('mouseout', handleNodeMouseOut)
		      	.on('click', handleNodeClick)
		    .append("title")
		      	.text(d => `${d.name}\n${d.value.toLocaleString()}`);

		// console.log(svgNodes.selectAll)

		svgNodes
			// .transition()
			// .duration(500)
			.attr("x", d => d.x0 + 1)
	    	.attr("y", d => d.y0)
	    	.attr("height", d => Math.max(d.y1 - d.y0, 3))
	    	.attr("width", d => d.x1 - d.x0 - 2)
	    	.attr("opacity", d => persistActive && !d.active ? 0 : 1)



		svgNodes.exit().remove();
	}


	function drawCanvas(){
		const {links} = sankey();

		console.log(links);

		_canvas = canvas.node();
		ctx = _canvas.getContext('2d')
		ctx.clearRect(0, 0, _canvas.width, _canvas.height);

		const drawLink = (d) => {
			const p = new Path2D(d3.sankeyLinkHorizontal()(d))
			ctx.lineWidth = Math.max(1, d.width);


			if(!d.active){
				ctx.strokeStyle = d3.color(d.color) || COLOR_LINKS;
			}else{
				ctx.strokeStyle = COLOR_LINK_ACTIVE;
			}

			ctx.stroke(p);

		}



		if(!persistActive)
			links.forEach((d, i)=>{
				drawLink(d);
			})

		activeGraph.links.forEach((d)=>{
			drawLink(d);
		})



		window.sankey = sankey;
		window.svg = svg;
		window.ctx = ctx;
	}

	// function activateNodes(){
	// 	const nodeSelector = activeGraph.nodes.map( 
	// 		node => `.cndce-sankey__node[data-node-id=${node.id}]`
	// 	).join(',')

	// 	d3.selectAll(nodeSelector)

	// }


	function traverseNode(node, keyNodeNext = 'source', keyLinkNext = 'targetLinks'){

		var nodes = [node];
		var links = [];


		node[keyLinkNext].forEach((d, i)=>{
			links.push(d);

			const sourceGraph = traverseNode(d[keyNodeNext], keyNodeNext, keyLinkNext);

			nodes = nodes.concat(sourceGraph.nodes);
			links = links.concat(sourceGraph.links);
		})

		return {nodes, links};
	}

	function getActiveGraph(d){
		const sourceActive = traverseNode(d);
		const targetActive = traverseNode(d, 'target', 'sourceLinks');

		/**
		 *
		 * Remove duplicate current node - current node exists
		 * in both sourceActive and targetActive
		 *
		 */
		sourceActive.nodes.shift();
		
		return {
			nodes: [
				...sourceActive.nodes,
				...targetActive.nodes
			],
			links: [
				...sourceActive.links,
				...targetActive.links
			]
		}
	}

	function resetActiveGraph(){

		activeGraph && activeGraph.links.forEach(l=>{
			l.active = false;
		})

		activeGraph && activeGraph.nodes.forEach(n=>{
			n.active = false;
		})

		activeGraph = {nodes: [], links: []};
	}

	function d3LinkToRawData(d){
		return {
			source: d.source.id,
			target: d.target.id,
			value: d.value 
		}
	}

	function d3NodeToRawData(d){
		var raw = {...d};
		// var raw = d;

		delete raw.sourceLinks;
		delete raw.targetLinks;
		delete raw.value;
		// delete raw.layer;
		delete raw.index;
		delete raw.height;
		delete raw.depth;
		delete raw.x0;
		delete raw.x1;
		delete raw.y0;
		delete raw.y1;

		return raw;
	}

	function handleNodeClick(e, d){
		persistActive = !persistActive;

		// if(persistActive){
			// sankey
			// 	.nodes(activeGraph.nodes.map(d3NodeToRawData))
			// 	.links(activeGraph.links.map(d3LinkToRawData))
			// 	.extent([[MARGIN.LEFT, MARGIN.TOP],[WIDTH + MARGIN.LEFT, HEIGHT/2 + MARGIN.TOP]]);

			// svg.transition()
			// 	.duration(1000)
			// 	.attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
			// 	.attr('height', HEIGHT/2 + MARGIN.TOP + MARGIN.BOTTOM);

			// canvas
			// 	.attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
			// 	.attr('height', HEIGHT/2 + MARGIN.TOP + MARGIN.BOTTOM);
		// }else{
		// 	sankey
		// 		.nodes(data.nodes)
		// 		.links(data.links)
		// }

		if(!persistActive){
			resetActiveGraph();
		}

		try{
			updateD3()
			// drawCanvas();
		}catch(err){
			d.disabled = true;

			alert('Sorry. Data in this node causes and error and needs to be cleaned.')

			resetActiveGraph();
			handleNodeClick(e, d);
		}

	}

	function handleNodeMouseOver(e, d){
		if(persistActive)
			return;

		activeNode = d;		
		activeGraph = getActiveGraph(d);

		activeGraph.links.forEach(l=>{
			l.active = true;
		})

		activeGraph.nodes.forEach(n=>{
			n.active = true;
		})


		// drawCanvas();
		window.activeGraph = activeGraph;
		window.updateD3 = updateD3;
	}

	function handleNodeMouseOut(e, d){
		if(persistActive)
			return;


		activeNode = undefined;
		resetActiveGraph();
		// drawCanvas();
		
	}



})();