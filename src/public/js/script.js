const socket = io();
socket.emit("mensaje", "Cliente: mensaje emitido!");
socket.on("respuesta", (info) => {
    if(info){
        socket.emit('juego','poker');
    } else {
        console.log('Error de conexion');
    }

})
