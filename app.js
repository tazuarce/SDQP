/* console.log('javascript empieza') */
let cambiosGuardados = true;


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
    "telefé noticias":"8gs-9lsfVQU",
    /* "A24" : "QGpHLgRnrx4", */ // ;( no disponible dice
    "Canal 26":"rY6a3fuaQ5Q",
    "TVN":"wALLwCjrg3A",
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

const principales = ["TN", "LN+", "C5N", "Crónica", "el doce", "telefé noticias", "Canal 26", "TVN", "France 24"];

function codigosDe(nombres){
    let codigos = {};
    for(let nombre of nombres){
        codigos[nombre] = codigosDeVideos[nombre];
    }
    return codigos;
}



let seleccionVideos;
let APIlista = false;
function onYouTubeIframeAPIReady() {
    let monitor = document.getElementById('monitor');
    
    let newDiv, newVideo, newItem;
    players = [];
    let idNumerico = 0;

    if(!localStorage.getItem('seleccionSDQP')){
        localStorage.setItem('seleccionSDQP',JSON.stringify(codigosDe(principales)));
    }

    seleccionVideos = JSON.parse(localStorage.getItem('seleccionSDQP'));
    console.log(seleccionVideos);

    let canalesMonitoreados = document.getElementById('canalesMonitoreados');
    for(let seleccion in seleccionVideos){
        newDiv = divDeClase('canal seleccionado');
        newDiv.onclick = quitarCanal;
        newDiv.innerHTML =  seleccion;
        canalesMonitoreados.appendChild(newDiv);
    }


    for(let canal of Object.keys(seleccionVideos)) {

        // creo un elemento con la etiqueta "this"
        newDiv = document.createElement('div');
        newDiv.setAttribute('id', 'this');

        newVideo = divDeClase ('video');
        newVideo.setAttribute("onclick", "clickeado(this)")
        newVideo.appendChild(newDiv);

        newItem =  divDeClase ('item');
        newItem.appendChild(newVideo);

        monitor.appendChild(newItem);

        // hago un player con ese elemento
        players.push(new YT.Player('this',{
            videoId: seleccionVideos[canal],
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

function divDeClase(clase){
    let newDiv = document.createElement('div');
    newDiv.className = clase;
    return newDiv;
}

function agregarCanal(canal,codigo){
    seleccionVideos[canal] = codigo;
    cambiosGuardados = false;
}

function quitarCanal(evento){
    delete seleccionVideos[evento.target.innerHTML];
    evento.target.remove();
    localStorage.setItem('seleccionSDQP',JSON.stringify(seleccionVideos));
    cambiosGuardados = false;
}

function guardarCambios(){
    localStorage['seleccionSDQP'] = seleccionVideos
    cambiosGuardados = true;
}

function resetearCanales(){
    localStorage.setItem('seleccionSDQP',JSON.stringify(codigosDe(principales)));
    cambiosGuardados = true;
    location.reload();
}






document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "visible" && APIlista) {
        if(salio){
            this.location.reload();
        }


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

let salio = false;
function abrir(id){
    let link = players[id].getVideoUrl();
    window.open(link,'_blank');
    salio = true;
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
        cerrarModal();
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
    if(!cambiosGuardados){
        /* debería preguntar si se quiere guardar los cambios o salir así sin más */
    }

    if(document.getElementById('filtros').style.display == 'block'){
        location.reload();
    }

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

function nuevoModal(){
    let modal = divDeClase('modal');
    modal.appendChild(divDeClase('modal-content'))
    return modal;
}

function agregarCanales(){
    /* let modal = nuevoModal();
    document.getElementById('contenido').appendChild(modal); */

}

function estasSeguro2(funcion){
    /* se le pregunta al usuario si está seguro de que ejecutar la función */

    /* se asigna el sí y el no de los botones */
    document.getElementById('yes').onclick = 'funcion()';
    /* se muestar el sí o no */
    document.getElementById('no').onclick = 'cerrarModal()';
}