// Cargamos los modulos y la libreria
// Cargamos el modulo de express con la funcion require
var express = require('express');
// Llamamos a express
var app = express();
// Cargamos el servidor HTTP
var server = require('http').Server(app);
// Pasamos el server a io para pdoer trabajar con los sockets
var io = require('socket.io')(server, {
    cors: {
      origin: '*',
  	}
});

// Crearemos una vista para cargar una vista estatica por defecto
app.use(express.static('client')); // Le decimos que todos los HTML que haya en la carpeta client van a ser los HTML estaticos

// Creamos una ruta para devolver una respuesta
app.get('/holamundo', function(req,res){
    res.status(200).send('Hola mundo desde una ruta.');
});

// Definimos un array donde se van a almacenar los mensajes que van a ir en objetos JSON
var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y NoseJS de Carlos García de Marina',
    nickname: 'Bot de Carlos'
}];

// Abrimos una conexion al socket con el metodo on, este metodo lo que va a hacer es encargarse de recibir la conexion con los clientes y detectará cuando un cliente se conecte
io.on('connection', function(socket){ // socket es la informacion del cliente que se conecta
    console.log("El cliente con IP: " + socket.handshake.address + " se ha conectado...");
    // Emitimos el array de mensajes a todos los clientes cuando se conecten
    socket.emit('messages', messages);

    // Cuando recibamos un mensaje tendremos que recoger el evento add-message / socket.on es para recoger eventos
    socket.on('add-message', function(data){
        // Guardamos el nuevo objeto en el array con el metodo push
        messages.push(data); 

        // Cuando acabe de añadir el evento al array emitimos a todos los clientes conectados el array de nuevo actualizado
        io.sockets.emit('messages', messages); 
    });
});

// Servidor
// Creamos el servidor y le ponemos a escuchar con el metodo listen (puerto, funcion callback)
server.listen(6677, function(){
    console.log('El servidor esta funcionando correctamente en la direccion http://localhost:6677');
});


