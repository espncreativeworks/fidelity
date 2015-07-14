$(document).ready(function() {
	// 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player1, player2, player3;
  function onYouTubeIframeAPIReady() {
    player1 = new YT.Player('player1', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    player2 = new YT.Player('player2', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    player3 = new YT.Player('player3', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
  	//console.dir("in onPlayerReady", event);
  }

  // 5. The API calls this function when the player's state changes.
  var done = false;
  function onPlayerStateChange(event) {
  	//console.dir("in onPlayerStateChange", event.data);
      	
    if (event.data == YT.PlayerState.PLAYING || event.data == YT.PlayerState.BUFFERING || event.data == YT.PlayerState.CUED) {
    	console.log("video playing/buffering/cued");
      $('.carousel-info-video').carousel('pause');
   	} else {
    	console.log("video paused/ended");
      $('.carousel-info-video').carousel('cycle');
   	}
  }
  function stopVideo() {
  	console.log("in stopVideo");
    player.stopVideo();
  }
});