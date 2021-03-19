(() => {

	var player = jwplayer("myElement").setup({
	    playlist: "./testrss.json",
	   	allowfullscreen: "true",
		repeat: "list",
		preload: "auto",
		modes: [{ type: 'html5' }]
	});

	var playerContainer;
	var sliderContainer;

	var domPreviousRail;
	var domNextRail;


	// Initialize DOM elements
	player.on('ready', function(){
		playerContainer = document.getElementById('myElement');
		sliderContainer = playerContainer.querySelector('.jw-slider-container');

		// Add additional rail elements
		domPreviousRail = document.createElement('div');
		domPreviousRail.classList.add('cndce-prev-rail');

		domNextRail = document.createElement('div');
		domNextRail.classList.add('cndce-next-rail');

		sliderContainer.prepend(domNextRail);
		sliderContainer.prepend(domPreviousRail)
	})

	player.on('meta', function(meta){
		var currPlaylist = player.getPlaylistItem();

		
		domPreviousRail.style.width = (currPlaylist.sources[0].starttime /  meta.seekRange.end) * 100 + '%';


		
		domNextRail.style.width = (1 - (currPlaylist.end / meta.seekRange.end)) * 100 + '%';


	})



	player.on('time', function({position}){
		var currPlaylist = player.getPlaylistItem();
		var iPlaylist = player.getPlaylistIndex();


		if(position > currPlaylist.end){
			player.next();
		}else if(position < currPlaylist.sources[0].starttime - 2){
			player.playlistItem(iPlaylist - 1);
		}
	})

	player.on('playlistItem', function({index, item}){
		console.log('test');

		// Ensure playlist always follows starttime
		player.seek(item.sources[0].starttime);

	})

})();

