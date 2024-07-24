console.log('javascript empieza')

// carga de la APU de youtube
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let frames;
let players;
let videos = document.querySelectorAll('.video');
function onYouTubeIframeAPIReady() {
    console.log('API de YouTube cargada')
    frames = document.querySelectorAll('iframe');
    players = [];
    for(i = 0 ; i < frames.length ; i++){
        players.push(new YT.Player(frames[i],{events:{}}));
    }

    // asigno ids a los contenedores de los videos para poder usarlos después en las funciones mute, unmute y abrir
    /* let item_videos = document.querySelectorAll('.item'); */
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
    document.getElementById('start').style.display = 'none';
}

function clickeado(div){
    console.log(div.classList);
    if(div.parentElement.classList.contains('sonandoAhora')){
        console.log('está sonando');
        mute(div.id);
        abrir(div.id);
    } else {
        console.log('no está sonando');
        unmute(div.id);
    }
    
}

function mute(id){
    players[id].mute();
    videos[id].parentElement.classList.remove('sonandoAhora');
    videos[id].parentElement.classList.add('noSonando');
}

function unmute(id){
    for(i = 0 ; i < players.length ; i++){
        mute(videos[i].id)
    }
    players[id].unMute();
    videos[id].parentElement.classList.add('sonandoAhora');
    videos[id].parentElement.classList.remove('noSonando');
}

function abrir(id){
    let link = players[id].getVideoUrl();
    window.open(link,'_blank');
}

console.log('javascript llega al final');

document.getElementById('worldIcon').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'flex';
});

document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});