const { io } = require('../server');
//Importamos la clase TicketControl
const { TicketControl } = require('../classes/ticket-control');

//Disparamos el constructor de la clase
const ticketControl = new TicketControl();


io.on('connection', (client) => {
    //Escuchar el boton de generar ticket
    client.on('siguienteTicketEspecial', (data, callback) => {
        debugger

        let siguiente = ticketControl.siguienteTicket();
        //Se guarda cual es el siguiente ticket
        console.log(siguiente);
        //Ejecutando callback para mandarlo al frontend y mostrarlo en el label
        callback(siguiente);
    })
    client.on('siguienteTicketRapida', (data, callback) => {
        debugger
        let siguiente = ticketControl.siguienteTicketRapida();
        //Se guarda cual es el siguiente ticket
        console.log(siguiente);
        //Ejecutando callback para mandarlo al frontend y mostrarlo en el label
        callback(siguiente);
    })
    client.on('siguienteTicketCaja', (data, callback) => {
        debugger
        let siguiente = ticketControl.siguienteTicketCaja();
        //Se guarda cual es el siguiente ticket
        console.log(siguiente);
        //Ejecutando callback para mandarlo al frontend y mostrarlo en el label
        callback(siguiente);
    })
    //Llamamos y retornamos el objeto ultimo ticket
    client.emit('estadoActualEspecial', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    })
    client.emit('estadoActualRapida', {
        actual: ticketControl.getUltimoTicketRapida(),
        ultimos4: ticketControl.getUltimos4()
    })
    client.emit('estadoActualCaja', {
        actual: ticketControl.getUltimoTicketCaja(),
        ultimos4: ticketControl.getUltimos4()
    })
    //Escuchar al evento atender ticket, callback para notificar el ticket que le toca al escritorio
    client.on('atenderTicket', (data, callback) => {
        debugger
        if (!data.caja) {
            debugger
            return callback({
                err: true,
                mensaje: "Caja preferencial es necesaria"
            })
        }
        
        //Llamamos a la funcion atender ticket de la clase
        let atenderTicket = ticketControl.atenderTicket(data.caja)
        //Retornamos para el frontend
        callback(atenderTicket);
        //Actulizar cambios en os ultimos 4, emitir ultimos 4 en el socket publico
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
    })
    client.on('atenderTicketRapida', (data, callback) => {
        debugger
        if (!data.caja) {
            debugger
            return callback({
                err: true,
                mensaje: "Caja empresarial es necesaria"
            })
        }
        
        //Llamamos a la funcion atender ticket de la clase
        let atenderTicket = ticketControl.atenderTicketRapida(data.caja)
        //Retornamos para el frontend
        callback(atenderTicket);
        //Actulizar cambios en os ultimos 4, emitir ultimos 4 en el socket publico
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
    })
    client.on('atenderTicketCaja', (data, callback) => {
        debugger
        if (!data.caja) {
            debugger
            return callback({
                err: true,
                mensaje: "Caja es necesaria"
            })
        }
        
        //Llamamos a la funcion atender ticket de la clase
        let atenderTicket = ticketControl.atenderTicketCaja(data.caja)
        //Retornamos para el frontend
        callback(atenderTicket);
        //Actulizar cambios en os ultimos 4, emitir ultimos 4 en el socket publico
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
    })
});