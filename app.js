/* console.log('javascript empieza') */

// carga de la API de youtube
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let players;
let videos;

let idSonando; // indica la ID del video que está sonando en el momento; la usa para abrir el video en otra pestaña

const codigosDeVideos = {
    "TN":"cb12KmMMDJA",
    "LN+":"ocFG3yor--M",
    "C5N":"NdQSOItOQ5Y",
    "Crónica":"avly0uwZzOE",
    "el doce":"sFZe_RPnNSo",
    "telefe noticias":"8gs-9lsfVQU",
    /* "A24" : "QGpHLgRnrx4", */ // ;( no disponible dice
    "Canal 26":"rY6a3fuaQ5Q",
    "T13":"1QPcqOIlxKI",
    "France 24":"Y-IlMeCCtIg",
    "FOX":"YDfiTGGPYCk",
    "CBS News": "GiIQ-aCCA_w",
    "USA Today" : "vZYMwAm8sso",
    "ABC7 New York" : "oFOTr81KHLg",
    "FORO" : "Ulwgdf5t46o",
    "euronews" : "O9mOtdZ-nSk",
    "France 24" : "Y-IlMeCCtIg",
    "NASA + SpaceX" : "mhJRzQsLZGg",
    "CNA" : "XWq5kBlakcQ",
    "GB News" : "8WX6YL9JnLw",
    "Canal Sur Andalucía" : "P3FhO1UUGE8",
    "ABC News" : "-mvUkiILTqI",
    "CGTN Europe" : "UkcHAbq9PVQ",
    "Watch Sky News" : "oJUvTVdTMyY"
    
}

let APIlista = false;
function onYouTubeIframeAPIReady() {
    let monitor = document.getElementById('monitor');
    
    let newDiv, newVideo, newItem;
    players = [];
    let idNumerico = 0;
    for(let canal of Object.keys(codigosDeVideos)) {

        // creo un elemento con la etiqueta "this"
        newDiv = document.createElement('div');
        newDiv.setAttribute('id', 'this');

        newVideo = document.createElement('div');
        newVideo.classList.add('video');
        newVideo.setAttribute("onclick", "clickeado(this)")
        newVideo.appendChild(newDiv);

        newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.appendChild(newVideo);

        monitor.appendChild(newItem);

        // hago un player con ese elemento
        players.push(new YT.Player('this',{
            videoId: codigosDeVideos[canal],
            playerVars: { 'autoplay': 1, 'controls': 0, 'mute': 1 , 'enablejsapi': 1},
            events:{}
        }));

        document.getElementById('this').parentElement.setAttribute('id', idNumerico);
        document.getElementById('this').setAttribute('id', '');
        idNumerico++;
    }

    videos = document.querySelectorAll('.video');
    console.log(players);

    APIlista = true;
}


// esto debería poder cambiarlo por algo que reinicie los videos que no están sonando
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "visible" && APIlista) {
        /* for(let player of players){
            console.log('itera');
            if (player.isMuted()){
                console.log(player.getVideoUrl());
                player.loadVideoByUrl({
                    mediaContentUrl: player.getVideoUrl(),
                    playerVars: { 'autoplay': 1, 'controls': 0, 'mute': 1 , 'enablejsapi': 1}
                });
            }
        } */

        let currentID;
        for(let i = 0 ; i < players.length ; i++){
            if(i != idSonando){
                currentID = players[i].getVideoData().video_id;
                players[i].loadVideoById(currentID);


                /* console.log(players[i].getVideoUrl());
                url = 'https://www.youtube.com/watch?v=_wacToLYMh4'; // url = players[i].getVideoUrl();
                console.log(url);
                players[i].getIframe().setAttribute('id','this');
                players[i] = new YT.Player('this',{
                    mediaContentUrl: url,
                    playerVars: { 'autoplay': 1, 'controls': 0, 'mute': 1 , 'enablejsapi': 1},
                    events:{}
                });
                players[i].getIframe().setAttribute('id','');
                console.log(players[i]); */
            }
        }

        
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
    console.log('intentando mutear ' + id);
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
    /* console.log(players);
    console.log(id);
    console.log(players[id]);
    console.log(players[id].getVideoUrl()); */
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