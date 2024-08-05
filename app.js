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
    delete seleccionVideos[evento.target.innerHTML];
    evento.target.remove();
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


function clickeado(div){
    if(div.parentElement.classList.contains('sonando')){
        mute(div.id);
    } else {
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
    if(id == idSonando){
        idSonando = null;
    }
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
    cerrarModal();
}


document.getElementById('worldIcon').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('filtros').style.display = 'block';

    seleccionVideos = JSON.parse(localStorage.getItem('seleccionSDQP'));
    let canalesMonitoreados = document.getElementById('canalesMonitoreados');
    canalesMonitoreados.innerHTML = '';
    for(let seleccion in seleccionVideos){
        marcarSeleccionado(seleccion);
    }

});

function marcarSeleccionado(seleccion){
    newDiv = divDeClase('canal seleccionado');
        newDiv.onclick = quitarCanal;
        newDiv.innerHTML =  seleccion;
        canalesMonitoreados.appendChild(newDiv);
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
    mutearTodos();
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

document.getElementById('openIcon').addEventListener('click', function() {
    if(idSonando != null){
        estasSeguro(idSonando);
    } else {
        alert('no hay video seleccionado')
    }
    
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