let socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesario');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, (resp) => {
        console.log('Usuarios conectados ', resp);
    });
});

// Escuchar (on)
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

//Enviar información (emit)
// socket.emit('crearMensaje', {
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Eschando informacion
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});

// Cuando un usuario entra o sale del chat
socket.on('listaPersona', (personas) => {
    console.log(personas);
});

// Mensajes privados
socket.on('mensajePrivado', (msj) => {
    console.log('Mnesaje privado: ', msj);
});