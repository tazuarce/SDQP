/* console.log('javascript empieza') */

// carga de la APU de youtube
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let frames;
let players;
let videos = document.querySelectorAll('.video');
function onYouTubeIframeAPIReady() {
    /* console.log('API de YouTube cargada'); */
    frames = document.querySelectorAll('iframe');
    players = [];
    for(i = 0 ; i < frames.length ; i++){
        players.push(new YT.Player(frames[i],{events:{}}));
    }

    // asigno ids a los contenedores de los videos para poder usarlos después en las funciones mute, unmute y abrir
    for(i = 0 ; i < videos.length ; i++){
        videos[i].id = i;
    }

}

let idSonando;

document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "visible") {
        location.reload();
    }
});

function clickeado(div){
    /* console.log(div.classList); */
    if(div.parentElement.classList.contains('sonando')){
        /* console.log('está sonando'); */
        estasSeguro(div.id);
    } else {
        /* console.log('no está sonando'); */
        unmute(div.id);
    }
    
}

function estasSeguro(){ //
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('seguroText').style.display = 'block';
}

function mute(id){
    players[id].mute();
    videos[id].parentElement.classList.remove('sonando');
}

function mutearTodos(){
    for(i = 0 ; i < videos.length ; i++){
        mute(videos[i].id)
    }
}

function unmute(id){
    mutearTodos();
    players[id].unMute();
    videos[id].parentElement.classList.add('sonando');
    idSonando = id;
}

function abrir(id){
    console.log(players);
    console.log(id);
    console.log(players[id]);
    console.log(players[id].getVideoUrl());
    let link = players[id].getVideoUrl();
    window.open(link,'_blank');
}

/* console.log('javascript llega al final'); */

document.getElementById('worldIcon').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('filtros').style.display = 'block';

});

document.getElementById('closeModal').addEventListener('click', function() {
    cerrarModal();
});

window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('modal')) {
        cerrarModal()
    }
});

document.getElementById('no').addEventListener('click', function() {
    cerrarModal();
});

document.getElementById('yes').addEventListener('click', function() {
    abrir(idSonando);
    mutearTodos();
});

function cerrarModal(){
    document.getElementById('modal').style.display = 'none';
    document.getElementById('filtros').style.display = 'none';
    document.getElementById('helpText').style.display = 'none';
    document.getElementById('seguroText').style.display = 'none';
}

document.getElementById('muteIcon').addEventListener('click', function() {
    mutearTodos();
});

document.getElementById('helpIcon').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('helpText').style.display = 'block';
});