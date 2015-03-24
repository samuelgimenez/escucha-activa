var playerV;
var videoIsOk;

function clickVideo() {
	document.getElementById("tituloVideo").style.display = "none";
	document.getElementById("playVideo").style.display = "none";
	document.getElementById("divVideoImg").style.display = "none";
	document.getElementById("videoPlayer").style.display = "block";
	if (videoIsOk) {
		muestraVideo();
	} else {
			// ir encuestando hasta que termine de cargar
		setTimeout(muestraVideo, 300);
	}
}

function videoTheEnd() {
	document.getElementById("videoPlayer").style.display = "none";
	document.getElementById("tituloVideo").style.display = "block";
	document.getElementById("divVideoImg").style.display = "block";
	document.getElementById("playVideo").style.display = "block";
		// hay un bug en el YT.player que obliga a destruir y regenerar para que notifique los eventos de inicio y cambio
	videoIsOk = false;
	playerV.destroy();
	onYouTubeIframeAPIReady();
}

function muestraVideo() {
	if (videoIsOk) {
		playerV.playVideo();
	} else {
		setTimeout(muestraVideo, 300);
	}
}

function onYouTubeIframeAPIReady() {
        playerV = new YT.Player('videoPlayer', {
          height: '550',
          width: '980',
          videoId: 'BkdRQipqodE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });	
}

function onPlayerReady(event) {	
	videoIsOk = true;
}

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.ENDED) {
		videoTheEnd();
	}
}