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

const principales = ["TN", "LN+", "C5N", "Crónica", "el doce", "telefe noticias", "Canal 26", "T13", "France 24"];

let seleccionVideos;
let APIlista = false;
function onYouTubeIframeAPIReady() {
    let monitor = document.getElementById('monitor');
    
    let newDiv, newVideo, newItem;
    players = [];
    let idNumerico = 0;



    if(!localStorage.getItem('seleccionSDQP')){
        let codigosPrincipales = {};
        for(let canal of principales){
            codigosPrincipales[canal] = codigosDeVideos[canal];
        }
        localStorage.setItem('seleccionSDQP',JSON.stringify(codigosPrincipales));
    }

    seleccionVideos = JSON.parse(localStorage.getItem('seleccionSDQP'));


    for(let canal of Object.keys(seleccionVideos)) {

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

document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "visible" && APIlista) {

        let currentID;
        for(let i = 0 ; i < players.length ; i++){
            if(i != idSonando){
                currentID = players[i].getVideoData().video_id;
                players[i].loadVideoById(currentID);
            }
        }

        
    }
});


function clickeado(div){
    if(div.parentElement.classList.contains('sonando')){
        estasSeguro(div.id);
    } else {
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
    let link = players[id].getVideoUrl();
    window.open(link,'_blank');
}


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