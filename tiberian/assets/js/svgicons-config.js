var svgIconConfig = {
	equalizer : {
		url : 'assets/icons/equalizer.svg',
		animation : [
			{ 
				el : 'path:nth-child(1)', 
				animProperties : { 
					from : { val : '{"transform" : "t 0 0"}' }, 
					to : { val : '{"transform" : "t 0 -30"}' }
				} 
			},
			{ 
				el : 'path:nth-child(2)', 
				animProperties : { 
					from : { val : '{"transform" : "t 0 0"}' }, 
					to : { val : '{"transform" : "t 0 35"}' }
				} 
			},
			{ 
				el : 'path:nth-child(3)', 
				animProperties : { 
					from : { val : '{"transform" : "t 0 0"}' }, 
					to : { val : '{"transform" : "t 0 -10"}' }
				} 
			}
		]
	},
	padlock : {
		url : 'assets/icons/padlock.svg',
		animation : [
			{ 
				el : 'path', 
				animProperties : { 
					from : { val : '{"transform" : "t 0 0"}' }, 
					to : { val : '{"transform" : "t 0 -11"}' }
				} 
			}
		]
	},
	play : {
		url : 'assets/icons/play.svg',
		animation : [
			{ 
				el : 'path', 
				animProperties : { 
					from : { val : '{"path" : "M 18.741071,52 31.30178,42.531655 45.258928,31.887987 18.741071,12 z"}' }, 
					to : { val : '{"path" : "m 12.5,52 39,0 0,-40 -39,0 z"}' }
				} 
			}
		]
	}
};