console.log('javascript empieza')

// carga de la APU de youtube
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let frames;
let players;
function onYouTubeIframeAPIReady() {
    console.log('API de YouTube cargada')
    frames = document.querySelectorAll('iframe');
    players = [];
    for(i = 0 ; i < frames.length ; i++){
        players.push(new YT.Player(frames[i],{events:{}}));
    }

    // asigno ids a los contenedores de los videos para poder usarlos después en las funciones mute, unmute y abrir
    let divs_videos = document.querySelectorAll('.video');
    for(i = 0 ; i < divs_videos.length ; i++){
        divs_videos[i].id = i;
    }
}

document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "visible") {
        location.reload();
    }
});



function aver(){
    document.getElementById('monitor_container').classList.toggle('oculto');
    document.getElementById('start').style.display = 'none';;
}


function mute(div){
    players[div.id].mute();
}

function unmute(div){
    players[div.id].unMute();
}

function abrir(div){
    let link = players[div.id].getVideoUrl();
    window.open(link,'_blank');
}

console.log('javascript llega al final')