let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


let body = document.getElementById('contenedor');
console.log(body);
let div = document.createElement('div');
body.appendChild(div);


function onYouTubeIframeAPIReady() {
    let player;
    player = new YT.Player(div, {
        videoId: 'M7lc1UVf-VE',
        width: 1280,
        height: 720,
        playerVars: { 'autoplay': 1, 'controls': 0 },
        events: {
        'onReady': onPlayerReady,
        'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
        'onStateChange': onPlayerStateChange,
        'onError': onPlayerError
    }});
  }