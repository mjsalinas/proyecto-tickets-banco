//Comando establecer conexion activa activa con servidor
let socket = io();

//botones de nuevos tickets
let label = $('#lblNuevoTicketEspecial')
let labelRapida = $('#lblNuevoTicketRapida')
let labelCajas = $('#lblNuevoTicketCaja')

//Dos eventos de los sockets
socket.on('connect', () => {
    console.log('Usuario Conectado');
})

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
})
//Escuchar evento del estado actual y mostrarlo en pantalla
socket.on('estadoActualEspecial', (resp) => {
    debugger
    label.text(resp.actual)
})
socket.on('estadoActualRapida', (resp) => {
    debugger
    labelRapida.text(resp.actual)
})
socket.on('estadoActualCaja', (resp) => {
    debugger
    labelCajas.text(resp.actual)
})
//Usando jquery para funcionalidad de los botones van a disparar la siguiente funcion
$('#especial').on('click', () => {
    debugger
    //Comunicacion con el servidor y frontend del siguiente ticket
    socket.emit('siguienteTicketEspecial', null, (siguienteTicket) => {
        //Mostrando en pantalla el siguiente ticket
        label.text(siguienteTicket)
    });

})
$('#rapida').on('click', () => {
    debugger
    //Comunicacion con el servidor y frontend del siguiente ticket
    socket.emit('siguienteTicketRapida', null, (siguienteTicketRapida) => {
        //Mostrando en pantalla el siguiente ticket
        labelRapida.text(siguienteTicketRapida)
    });

})
$('#caja').on('click', () => {
    debugger
    //Comunicacion con el servidor y frontend del siguiente ticket
    socket.emit('siguienteTicketCaja', null, (siguienteTicketCaja) => {
        //Mostrando en pantalla el siguiente ticket
        labelCajas.text(siguienteTicketCaja)
    });

})