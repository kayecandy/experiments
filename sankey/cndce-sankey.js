
(()=>{
	console.log(document.body.clientWidth)

	const WIDTH = Math.max(1300, document.body.clientWidth - 40);
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

	var NODE_TRANSITION_LIMIT = 400;
	var TRANSITION_DURATION = 500;


	var cndceSankey;
	var canvas;
	var ctx;
	var svg;
	var sankey;
	var data;

	var detachedLinks;


	var persistActive = false;
	var activeGraph;
	var activeNode;

	var drawTimer;
	

	(async function init(){
		resetActiveGraph();
		await initData();
		initSankey();
		initD3();
		drawCanvas();
	})();



	async function initData(){
		data = await requestJSON('./data.json');

	};

	function initSankey(){
		sankey = d3.sankey()
		.nodeId(d => d.id)
		.nodeSort(null)
		.nodeAlign(customNodeAlign)
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


		ctx = canvas.node().getContext('2d')


		svg.append('g')
			.attr('class', 'cndce-sankey__nodes')

		svg.append('g')
			.attr('class', 'cndce-sankey__labels')

		detachedLinks = d3.select(document.createElement('g'))
			.attr('class', 'cndce-sankey__links')

		updateD3();
	};


	function updateD3(){

		const {nodes, links} = sankey();

		console.log(nodes);

		const svgLabels = svg.select('.cndce-sankey__labels')
			.selectAll('.cndce-sankey__label')
			.data(nodes, d => d.id)

		const textAlign = d => {
			if(d.x1 < WIDTH / 2){
				d.textAnchor = 'start';
				return d.x1 + 6;
			}

			d.textAnchor = 'end';
			return d.x0 - 6;
		}

		svgLabels.enter()
			.append("text")
				.attr('class', 'cndce-sankey__label')
				.attr("x", textAlign)
			    .attr("y", d => (d.y1 + d.y0) / 2)
			    .attr("dy", "0.35em")
			    .attr("text-anchor", d => d.textAnchor)
		    	.attr("opacity", d => persistActive && !d.active ? 0 : 1)
			    .text(d => d.name)

			.append("tspan")
			    .attr("fill-opacity", 0.7)
			    .text(d => ` ${d.value.toLocaleString()}`)

		svgLabels
			.transition()
			.duration(nodes.length < NODE_TRANSITION_LIMIT ? TRANSITION_DURATION : 0)
			.attr("x", textAlign)
		    .attr("y", d => (d.y1 + d.y0) / 2)
		    // .attr("text-anchor", d => d.textAnchor)
	    	.attr("opacity", d => persistActive && !d.active ? 0 : 1)

	    svgLabels
	    	.attr('text-anchor', d => d.textAnchor)


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


		svgNodes
			.transition()
			.duration(nodes.length < NODE_TRANSITION_LIMIT ? TRANSITION_DURATION : 0)
			.attr("x", d => d.x0 + 1)
	    	.attr("y", d => d.y0)
	    	.attr("height", d => Math.max(d.y1 - d.y0, 3))
	    	.attr("width", d => d.x1 - d.x0 - 2)
	    	.attr("opacity", d => persistActive && !d.active ? 0 : 1)


		svgNodes.exit().remove();



		const svgLinks = detachedLinks
			.selectAll('.cndce-sankey__link')
			.data(links, d => d.source.id + ':' + d.target.id)


		svgLinks.enter()
			.append('path')
			.attr('class', 'cndce-sankey__link')
			.attr("d", d3.sankeyLinkHorizontal())
		    .attr("stroke-width", d => Math.max(1, d.width))



		svgLinks
			.transition()
			.duration(nodes.length < NODE_TRANSITION_LIMIT ? TRANSITION_DURATION : 0)
		    .attr("stroke-width", d => Math.max(1, d.width))
		    .attrTween('d', function(d){

		    	if(nodes.length >= NODE_TRANSITION_LIMIT){
		    		return;
		    	}

		    	const prevNode = d3.select(this);

		    	const interpolateWidth = d3.interpolateNumber(
		    		prevNode.attr('stroke-width'),
		    		Math.max(1, d.width)
		    	);

		    	const interpolatePath = d3.interpolatePath(
		    		prevNode.attr('d'),
		    		d3.sankeyLinkHorizontal()(d)
		    	)

    			clearCanvas();


		    	return (t) => {
		    		if(d == links[0]){
		    			clearCanvas();
		    		}

		    		drawLink(d, interpolatePath(t), interpolateWidth(t));

		    	}
		    })

		svgLinks.exit().remove();
	}

	const drawLink = (d, path='', width='') => {
		const _canvas = canvas.node();

		const p = new Path2D(path ? path : d3.sankeyLinkHorizontal()(d))
		ctx.lineWidth = Math.max(1, width ? width : d.width);

		if(!d.active){
			ctx.strokeStyle = d3.color(d.color) || COLOR_LINKS;
		}else{
			ctx.strokeStyle = COLOR_LINK_ACTIVE;
		}

		ctx.stroke(p);

	}

	function clearCanvas(){
		const _canvas = canvas.node();

		ctx.clearRect(0, 0, _canvas.width, _canvas.height);
	}

	function drawCanvas(){


		const {links} = sankey();



		clearCanvas();


		links.forEach((d, i)=>{
			drawLink(d);
		})

		activeGraph.links.forEach((d, i)=>{
			drawLink(d);
		})


		window.sankey = sankey;
		window.svg = svg;
		window.ctx = ctx;
	}


	function customNodeAlign(node, n) {
		// console.log(node, node.layer, d3.sankeyJustify(node, n));
		return node.custLayer ? node.custLayer : d3.sankeyJustify(node, n);
	}


	function traverseNode(node, keyNodeNext = 'source', keyLinkNext = 'targetLinks'){

		var nodes = [node];
		var links = [];



		node[keyLinkNext].forEach((d, i)=>{
			links.push(d);

			const sourceGraph = traverseNode(d[keyNodeNext], keyNodeNext, keyLinkNext);

			sourceGraph.nodes.forEach(n=>{
				if(nodes.indexOf(n) == -1){
					nodes.push(n)
				}
			})

			sourceGraph.links.forEach(l=>{
				if(links.indexOf(l) == -1){
					links.push(l)
				}
			})
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

		if(persistActive){

			const height = Math.max(document.documentElement.clientHeight - MARGIN.TOP - MARGIN.BOTTOM, HEIGHT * activeGraph.nodes.length * 0.0015);

			sankey
				.nodes(activeGraph.nodes)
				.links(activeGraph.links)
				.nodeAlign(d3.sankeyJustify)
				.extent([[MARGIN.LEFT, MARGIN.TOP],[WIDTH + MARGIN.LEFT, height + MARGIN.TOP]]);

			svg
			.attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
			.attr('height', height + MARGIN.TOP + MARGIN.BOTTOM);

			canvas
			.attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
			.attr('height', height + MARGIN.TOP + MARGIN.BOTTOM);




			activeGraph.links.forEach(l=>{
				l.active = false;
			})

		}else{

			sankey
				.nodes(data.nodes)
				.links(data.links)
				.nodeAlign(customNodeAlign)
				.extent([[MARGIN.LEFT, MARGIN.TOP],[WIDTH + MARGIN.LEFT, HEIGHT + MARGIN.TOP]]);

			svg
			.attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
			.attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

			canvas
			.attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
			.attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);


			resetActiveGraph();

		}

		updateD3();
		drawCanvas();


	}

	function handleNodeMouseOver(e, d){
		// if(persistActive)
		// 	return;

		activeNode = d;		
		activeGraph = getActiveGraph(d);

		activeGraph.links.forEach(l=>{
			l.active = true;
		})

		activeGraph.nodes.forEach(n=>{
			n.active = true;
		})


		drawCanvas();
		window.activeGraph = activeGraph;
		window.updateD3 = updateD3;
	}

	function handleNodeMouseOut(e, d){
		if(persistActive){
			activeGraph.links.forEach(l=>{
				l.active = false;
			})

			drawCanvas();
			return;
		}


		activeNode = undefined;
		resetActiveGraph();
		drawCanvas();
		
	}



})();