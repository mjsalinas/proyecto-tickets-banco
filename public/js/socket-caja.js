//Establecer conexion
let socket = io();

let searchParams = new URLSearchParams(window.location.search)
//Extraer que caja es por medio de la url
if (!searchParams.has('caja')) {
    window.location = 'index.html';
    throw new Error('La caja es necesaria')
}

//Guardamos en esta variable que caja estamos utilizando
let caja = searchParams.get('caja');
let info = { caja };
let label = $('small');
console.log(caja);

//Ticket caja actualmente en la pantalla
$('h1').text('Caja ' + caja)


//Listener del boton, cuando se presione click cambia el small por el ticket que devuelva el servidor
$('button').on('click', () => {
    debugger;
    //Llamamos al socket atender ticket

    if (caja === "1") {
        info = { caja: caja, tipo: 'preferencial' };
    } else if (caja === "2") {
        info = { caja: caja, tipo: 'empresarial' };
    } else {
        info = { caja: caja, tipo: 'caja' };
    }
    if (info.tipo === "preferencial") {
        socket.emit('atenderTicket', info, function (resp) {

            if (resp === 'No hay tickets preferenciales') {
                debugger
                label.text(resp)
                alert(resp)
                return;
            }
            //Mostramos en el frontend el ticket atendido por dicha caja
            label.text('Ticket' + resp.num)
            debugger
        })
    } else if (info.tipo === "empresarial") {
        socket.emit('atenderTicketRapida', ({caja}), function (resp) {
            if (resp === 'No hay tickets empresariales') {
                debugger
                label.text(resp)
                alert(resp)
                return;
            }
            //Mostramos en el frontend el ticket atendido por dicha caja
            label.text('Ticket' + resp.num)
        })
    } else {
        debugger

        socket.emit('atenderTicketCaja', ({caja}), function (resp) {

            if (resp === 'No hay tickets en caja') {
                debugger
                label.text(resp)
                alert(resp)
                return;
            }
            //Mostramos en el frontend el ticket atendido por dicha caja
            label.text('Ticket' + resp.num)

        })
    }

})