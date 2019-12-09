//Clases para funcionamiento de los tickets
const fs = require('fs');

//Clase para manejar tickets pendientes
class Ticket {
    constructor(num, caja) {
        this.num = num;
        this.caja = caja;
    }
}
class TicketRapida {
    constructor(num, caja) {
        this.num = num;
        this.caja = caja;
    }
}
class TicketCaja {
    constructor(num, caja) {
        this.num = num;
        this.caja = caja;
    }
}
class TicketControl {
    constructor() {
        //Inicializando la clase
        this.ultimo = 0;
        this.ultimoRapida = 0;
        this.ultimoCaja = 0;
        this.hoy = new Date().getDate();
        //Tickets sin atender
        this.tickets = [];
        this.ticketsRapida = [];
        this.ticketsCaja = [];
        //Pantalla
        this.ultimos4 = [];
        this.ultimos4Rapida = [];
        this.ultimos4Caja = [];
        //Para que no se pierda por si cae el sistema
        let data = require('../data/data.json');
        let dataRapida = require('../data/dataRapida.json');
        let dataCaja = require('../data/dataCaja.json');

        //Validacion para comenzar nuevos tickets en diferentes dias
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.ultimoRapida = dataRapida.ultimo;
            this.ultimoCaja = dataCaja.ultimo;

            this.tickets = data.tickets;
            this.ticketsRapida = dataRapida.tickets;
            this.ticketsCaja = dataCaja.tickets;
            console.log(this.ticketsRapida);
            debugger
            this.ultimos4 = data.ultimos4;
            this.ultimos4Rapida = dataRapida.ultimos4;
            this.ultimos4Caja = dataCaja.ultimos4;

        } else {
            this.reiniciarConteo();
        }
    }
    //Funcion para saber cual es el siguiente ticket
    siguienteTicket() {
        //Va incrementarlo en 1
        this.ultimo += 1;
        //Instancia de un ticket para uno nuevo
        let ticket = new Ticket(this.ultimo, null);
        //Agregandolo al arreglo ticket
        this.tickets.push(ticket);
        this.grabarArchivo();
        //Va regresar el numero de ticket
        return `Ultimo Ticket: ${this.ultimo}`;
    }
    siguienteTicketRapida() {
        //Va incrementarlo en 1
        this.ultimoRapida += 1;
        //Instancia de un ticket para uno nuevo
        let ticket = new TicketRapida(this.ultimoRapida, null);
        //Agregandolo al arreglo ticket
        this.ticketsRapida.push(ticket);
        this.grabarArchivoRapida();
        //Va regresar el numero de ticket
        return `Ultimo Ticket: ${this.ultimoRapida}`;
    }
    siguienteTicketCaja() {
        //Va incrementarlo en 1
        this.ultimoCaja += 1;
        //Instancia de un ticket para uno nuevo
        let ticket = new TicketCaja(this.ultimoCaja, null);
        //Agregandolo al arreglo ticket
        this.ticketsCaja.push(ticket);
        this.grabarArchivoCaja();
        //Va regresar el numero de ticket
        return `Ultimo Ticket: ${this.ultimoCaja}`;
    }
    //Saber cual es el ultimo ticket
    getUltimoTicket() {

        return `Ultimo Ticket: ${this.ultimo}`;
    }
    getUltimoTicketRapida() {
        return `Ultimo Ticket: ${this.ultimoRapida}`;
    }
    getUltimoTicketCaja() {
        return `Ultimo Ticket: ${this.ultimoCaja}`;
    }
    getUltimos4() {
        let ultimos = [this.ultimo, this.ultimoRapida, this.ultimoCaja];
        console.log("ultimos ultuimsom");
        console.log(ultimos);
        return ultimos;
    }

    //Funcion para caja y pantalla clientes
    atenderTicket(caja) {
        //Verifico si hay tickets por atender y no hago nada
        if (this.tickets.length === 0) {
            return 'No hay tickets preferenciales';
        }
        //Tomamos del primer numero pendiente
        let numeroTicket = this.tickets[0].num;
        //Eliminamos el ticket que voy atendiendo
        this.tickets.shift();
        //Ticket por atender
        let atenderTicket = new Ticket(numeroTicket, caja);
        //agregarlo al inicio del arreglo ultimos4
        this.ultimos4.unshift(atenderTicket);

        //Borrar ultimo elemento de pantalla porque ya no caben mas de 4
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }
        console.log('Ultimos 4 pref');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
    }

    atenderTicketRapida(caja) {
        //Verifico si hay tickets por atender y no hago nada
        if (this.ticketsRapida.length === 0) {
            debugger
            return 'No hay tickets empresariales';
        }
        //Tomamos del primer numero pendiente
        let numeroTicket = this.ticketsRapida[0].num;
        //Eliminamos el ticket que voy atendiendo
        this.ticketsRapida.shift();
        //Ticket por atender
        let atenderTicket = new TicketRapida(numeroTicket, caja);
        //agregarlo al inicio del arreglo ultimos4
        this.ultimos4Rapida.unshift(atenderTicket);

        //Borrar ultimo elemento de pantalla porque ya no caben mas de 4
        if (this.ultimos4Rapida.length > 4) {
            this.ultimos4Rapida.splice(-1, 1);
        }
        console.log('Ultimos 4 empresarial');
        console.log(this.ultimos4Rapida);

        this.grabarArchivoRapida();

        return atenderTicket;
    }
    atenderTicketCaja(caja) {
        //Verifico si hay tickets por atender y no hago nada
        if (this.ticketsCaja.length === 0) {
            return 'No hay tickets en caja';
        }
        //Tomamos del primer numero pendiente
        let numeroTicket = this.ticketsCaja[0].num;
        //Eliminamos el ticket que voy atendiendo
        this.ticketsCaja.shift();
        //Ticket por atender
        let atenderTicket = new TicketCaja(numeroTicket, caja);
        //agregarlo al inicio del arreglo ultimos4
        this.ultimos4Caja.unshift(atenderTicket);

        //Borrar ultimo elemento de pantalla porque ya no caben mas de 4
        if (this.ultimos4Caja.length > 4) {
            this.ultimos4Caja.splice(-1, 1);
        }
        console.log('Ultimos 4 caja');
        console.log(this.ultimos4Caja);

        this.grabarArchivoCaja();

        return atenderTicket;
    }
    //Reiniciar los valores
    reiniciarConteo() {
        this.ultimo = 0;
        this.ultimoRapida = 0;
        this.ultimoCaja = 0;

        this.tickets = [];
        this.ticketsRapida = [];
        this.ticketsCaja = [];

        this.ultimos4 = [];
        this.ultimos4Rapida = [];
        this.ultimos4Caja = [];
        console.log("Se ha inicializado el sistema");
        this.grabarArchivo();
        this.grabarArchivoRapida();
        this.grabarArchivoCaja();
    }
    //Grabar los cambios
    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            //Grabar tickets pendientes
            tickets: this.tickets,
            //Grabar ultimos 4 atendidos
            ultimos4: this.ultimos4
        }
        //Pasarlo a string para grabarlo en el txt
        let jsonDataString = JSON.stringify(jsonData);
        //Guardandolo
        fs.writeFileSync('./server/data/data.json', jsonDataString)

    }
    grabarArchivoRapida() {
        let jsonData = {
            ultimo: this.ultimoRapida,
            hoy: this.hoy,
            //Grabar tickets pendientes
            tickets: this.ticketsRapida,
            //Grabar ultimos 4 atendidos
            ultimos4: this.ultimos4Rapida
        }
        //Pasarlo a string para grabarlo en el txt
        let jsonDataString = JSON.stringify(jsonData);
        //Guardandolo
        fs.writeFileSync('./server/data/dataRapida.json', jsonDataString)

    }
    grabarArchivoCaja() {
        let jsonData = {
            ultimo: this.ultimoCaja,
            hoy: this.hoy,
            //Grabar tickets pendientes
            tickets: this.ticketsCaja,
            //Grabar ultimos 4 atendidos
            ultimos4: this.ultimos4Caja
        }
        //Pasarlo a string para grabarlo en el txt
        let jsonDataString = JSON.stringify(jsonData);
        //Guardandolo
        fs.writeFileSync('./server/data/dataCaja.json', jsonDataString)

    }
}

module.exports = {
    TicketControl
}