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
    "LN+":"G5pHuBCqgrs",
    "C5N":"NdQSOItOQ5Y",
    "Crónica":"avly0uwZzOE",
    "el doce":"sFZe_RPnNSo",
    "Aire de Santa Fe" : "FNpUWtQMeTs",
    "telefé noticias":"8gs-9lsfVQU",
    /* "A24" : "QGpHLgRnrx4", */ // no disponible dice
    "Canal 26":"MS0QdZ5zvn8",
    "TVN":"wALLwCjrg3A",
    "T13":"1QPcqOIlxKI",
    "France 24":"Y-IlMeCCtIg",
    "FOX":"YDfiTGGPYCk",
    "CBS News": "GiIQ-aCCA_w",
    "USA Today" : "vZYMwAm8sso",
    "ABC News" : "-mvUkiILTqI",
    "ABC7 New York" : "oFOTr81KHLg",
    "ABC7 Eyewitness" : "-E0AHOOGo24",
    "ABC7 Bay Area" : "yBsxGdPKETI",
    "ABC7 Chicago" : "SlpTSiNv-m4",
    "FORO" : "Ulwgdf5t46o",
    "euronews" : "O9mOtdZ-nSk",
    "France 24" : "Y-IlMeCCtIg",
    "NASA + SpaceX" : "mhJRzQsLZGg",
    "CNA" : "XWq5kBlakcQ",
    "GB News" : "8WX6YL9JnLw",
    "Canal Sur Andalucía" : "P3FhO1UUGE8",
    "CGTN Europe" : "UkcHAbq9PVQ",
    "Watch Sky News" : "oJUvTVdTMyY",
    "DW ESpañol" : "Io5mt83nCcU",
    "NTN24" : "JxpMmv1Wm2M",
    "Milenio" : "4I8W6KUCzSY",
    "Noticias Caracol" : "oAZDO2s9eLU",
    "Houston City Camera" : "wUQc3RoLAPs",
    "Multimedios Costa Rica" : "NOJf0umMvi4",
    "Al Jazeera English" : "gCNeDWCI0vo",
    /* "NHK WORLD-JAPAN" : "f0lYkdA-Gtw", */
    "JapaNews" : "coYw-eVU0Ks",
    /* "KBS KOREA" : "OxQQsIvJTTU", */
    "TelediarioMx" : "GlfC3erTb3Q",
    /* "Televisión Canaria" : "6LlZXt8nk4s", */
    "GB News" : "8WX6YL9JnLw"


}

const principales = ["TN", "LN+", "C5N", "Crónica", "telefé noticias", "Canal 26", "el doce", "TVN", "T13"];

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

    // acá se generan todos los reproductores
    //
    //
    //

    seleccionVideos = JSON.parse(localStorage.getItem('seleccionSDQP'));
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

function agregarTransmision(){
    let nombreIngresado = document.getElementById('inputNombre').value;
    let codigoIngresado = document.getElementById('inputCodigo').value;

    seleccionVideos[nombreIngresado] = codigoIngresado;
    marcarSeleccionado(nombreIngresado);
    cambiosSinGuardar();
}

function quitarCanal(evento){
    let nombreCanal = evento.target.innerHTML;
    delete seleccionVideos[nombreCanal];

    let seleccionados = document.getElementById('canalesMonitoreados').children;
    for(let seleccionado of seleccionados){
        if(seleccionado.innerHTML == nombreCanal){
            seleccionado.remove();
        }
    }

    let canales = document.getElementById('listaCanales').children;
    for(let canal of canales){
        if(canal.innerHTML == nombreCanal){
            canal.classList.remove('seleccionado');
            canal.classList.add('seleccionable');
        }
    }

    /* localStorage.setItem('seleccionSDQP',JSON.stringify(seleccionVideos)); */
    cambiosSinGuardar();
    
}

function cambiosSinGuardar(){
    let boton = document.getElementById('guardar');
    boton.classList.remove('deshabilitado');
    boton.addEventListener('click', guardarCambios);
    cambiosGuardados = false;
}

function guardarCambios(){
    localStorage['seleccionSDQP'] = JSON.stringify(seleccionVideos);
    cambiosGuardados = true;
    location.reload();
}

function resetearCanales(){
    localStorage.setItem('seleccionSDQP',JSON.stringify(codigosDe(principales)));
    cambiosGuardados = true;
    location.reload();
}






document.addEventListener("visibilitychange", function() {
    if (APIlista) {
        let currentID;
        for(let i = 0 ; i < players.length ; i++){
            if(i != idSonando){
                currentID = players[i].getVideoData().video_id;
                players[i].loadVideoById(currentID);
            }
        }
    }
});

document.addEventListener('keydown', function(event) {
    
    if (event.key === 'f' || event.key === 'F') {
    
        if(idSonando != null){
            if(document.fullscreenElement){
                salirDeFullscreen()
            } else {
                // Verifica si la tecla presionada es 'F' (key: "f")
                
                    // Llama a la función que deseas ejecutar
                    verEnFullscreen(idSonando);
            }
            
        }

    }

    if (event.key === 'm' || event.key === 'M') {
        if(idSonando != null){
            mute(idSonando);
        }
    }

    if (event.key === 'o' || event.key === 'O') {
        if(idSonando != null){
            estasSeguro();
        }
    }
    
    
});

function verEnFullscreen(id){
    let video = videos[id];
        if (video.requestFullscreen) {
            console.log('requestFullscreen');
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
            console.log('mozRequestFullScreen');
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { // Chrome, Safari y Opera
            console.log('webkitRequestFullscreen');
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
            console.log('msRequestFullscreen');
            video.msRequestFullscreen();
        }
}

function salirDeFullscreen(){
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari y Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}


function clickeado(div){
    if(document.fullscreenElement){
        salirDeFullscreen()
    } else {
        if(div.parentElement.classList.contains('sonando')){
            mute(div.id);
        } else {
            unmute(div.id);
        }
    }

    
}

function estasSeguro(){ //
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('seguroText').style.display = 'block';
}

function mute(id){
    players[id].mute();
    videos[id].parentElement.classList.remove('sonando');
    if(id == idSonando){
        idSonando = null;
    }
}

function unmute(id){
    if(idSonando != null){
        mute(idSonando);
    }
        players[id].unMute();
    videos[id].parentElement.classList.add('sonando');
    idSonando = id;
}

function abrir(id){
    let link = players[id].getVideoUrl();
    window.open(link,'_blank');
    cerrarModal();
}


// al hacer click en el ícono se genera tanto la lista para seleccionar como la seleccionada
document.getElementById('worldIcon').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('filtros').style.display = 'block';

    // se arma lista para seleccionar canales
    let listaCanales = document.getElementById('listaCanales');
    listaCanales.innerHTML = '';
    for(let canal in codigosDeVideos){
        newDiv = divDeClase('canal');
        if(canal in seleccionVideos){
            newDiv.classList.add('seleccionado')
        } else {
            newDiv.classList.add('seleccionable')
        }
        newDiv.onclick = clickCanal;
        newDiv.innerHTML =  canal;
        listaCanales.appendChild(newDiv);
    }


    // se arma grilla de canales seleccionados
    seleccionVideos = JSON.parse(localStorage.getItem('seleccionSDQP'));
    let canalesMonitoreados = document.getElementById('canalesMonitoreados');
    canalesMonitoreados.innerHTML = '';
    for(let seleccion in seleccionVideos){
        marcarSeleccionado(seleccion);
    }

});

function clickCanal(evento){
    let canal = evento.target.innerHTML;
    if(canal in seleccionVideos){
        quitarCanal(evento);
    } else {
        seleccionVideos[canal] = codigosDeVideos[canal];
        marcarSeleccionado(canal);
    }
    cambiosSinGuardar();
}

// marcar como seleccionado equivale a mostrarlo como seleccionado en el menú de edición
function marcarSeleccionado(seleccion){
    newDiv = divDeClase('canal seleccion');
    newDiv.onclick = quitarCanal;
    newDiv.innerHTML =  seleccion;
    canalesMonitoreados.appendChild(newDiv);

    let canales = document.getElementById('listaCanales').children;
    console.log(canales);
    for(let canal of canales){
        console.log(canal);
        if(canal.innerHTML == seleccion){
            canal.classList.remove('seleccionable');
            canal.classList.add('seleccionado')
        }
    }
}

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
    mute(idSonando);
});

function cerrarModal(){
    if(!cambiosGuardados){
        /* debería preguntar si se quiere guardar los cambios o salir así sin más */
    }

    document.getElementById('modal').style.display = 'none';
    document.getElementById('filtros').style.display = 'none';
    document.getElementById('helpText').style.display = 'none';
    document.getElementById('seguroText').style.display = 'none';
}

document.getElementById('fullscreenIcon').addEventListener('click', function(){
    
    if(idSonando != null){
        console.log(idSonando);
        console.log(videos[idSonando]);
        let video = videos[idSonando];
        if (video.requestFullscreen) {
            console.log('requestFullscreen');
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
            console.log('mozRequestFullScreen');
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { // Chrome, Safari y Opera
            console.log('webkitRequestFullscreen');
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
            console.log('msRequestFullscreen');
            video.msRequestFullscreen();
        }
    } else {
        alert('no hay video seleccionado para abrir en pantalla completa');
    }
});

document.getElementById('openIcon').addEventListener('click', function() {
    if(idSonando != null){
        estasSeguro(idSonando);
    } else {
        alert('no hay video seleccionado para abrir en otra pestaña');
    }
    
});

document.getElementById('helpIcon').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('helpText').style.display = 'block';
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


function estasSeguro2(funcion){
    /* se le pregunta al usuario si está seguro de que ejecutar la función */

    /* se asigna el sí y el no de los botones */
    document.getElementById('yes').onclick = 'funcion()';
    /* se muestar el sí o no */
    document.getElementById('no').onclick = 'cerrarModal()';
}

const inputNombre = document.getElementById('inputNombre');
const inputCodigo = document.getElementById('inputCodigo');
const botonAgregar = document.getElementById('agregar');

function checkInputs() {
    if (inputNombre.value.trim() !== '' && inputCodigo.value.trim() !== '') {
        botonAgregar.classList.remove('deshabilitado');
    } else {
        botonAgregar.classList.add('deshabilitado');
    }
}

inputNombre.addEventListener('input', checkInputs);
inputCodigo.addEventListener('input', checkInputs);