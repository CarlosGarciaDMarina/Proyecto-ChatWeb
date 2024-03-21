// Conectamos al cliente y el servidor. Entre parentesis se indica (url del socket, forzarconexion)
var socket = io.connect('http://192.168.1.20:6677',{'forceNew':true});

// Recogemos el mensaje con el cliente (metodo on) y recibimos 'messages' y usamos una funcion de callback con el parametro data que nos llega del servidor
socket.on('messages', function(data){
    // Vemos que datos nos pasa el servidor
    console.log(data); 
    // Utilizamos la funcion render y le pasamos los datos
    render(data);
});

// Creamos una funcion para poder pintar los mensajes en el html
function render(data){
    // El método map recorre la información dentro de un array. Itera en los objetos de data y guarda el contenido en message y el indice en index
    var html = data.map(function(message, index){
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> dice: 
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');// con join creamos un espacio entre elemento y elemento

    // Utilizamos el getElementById para seleccionar un elem con id que este dentro del dom
    var div_msg = document.getElementById('messages');
    // Con innerHTML le metemos el contenido que hay en html
    div_msg.innerHTML = html;
    // Con scrollTop y scrollHeight hacemos que el chat siempre este posicionado con el ultimo mensaje enviado
    div_msg.scrollTop = div_msg.scrollHeight;

}

// Creamos la funcion del onsubmit del form y le pasamos el evento
function addMessage(e){

    // Ahora creamos una variable que sea el cuerpo del mensaje y recogemos el nickname y el texto que hemos definido en el form
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    // Ocultamos mediante css 
    document.getElementById('nickname').style.display = 'none';

    // Ahora vamos a emitir un evento del cliente al servidor
    socket.emit('add-message', message);

    // Devolverá false para que corte la ejecucion de la funcion
    return false;
}