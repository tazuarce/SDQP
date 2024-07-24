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
    /* let item_videos = document.querySelectorAll('.item'); */
    let videos = document.querySelectorAll('.video');
    for(i = 0 ; i < videos.length ; i++){
        videos[i].id = i;
    /* let item_videos = document.querySelectorAll('.item'); */
    /* let video;
    for(i = 0 ; i < videos.length ; i++){
        video = videos[i];
        video.addEventListener('click',function(event){
            abrir(event.target);
        })
        video.addEventListener('mouseover',function(event){
            unmute(event.target);
        })
        video.addEventListener('mouseout',function(event){
            mute(event.target);
        })
    } */
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

console.log('javascript llega al final');