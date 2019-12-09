const express = require('express');
const Ticket = require('../models/tickets');
const router = express.Router();
//Importamos la clase TicketControl
const { TicketControl } = require('../server/classes/ticket-control');

//Disparamos el constructor de la clase
const ticketControl = new TicketControl();
router.get('/', async (req, res) => {
    try {
        const response = await Ticket.find()
        res.send(response);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
});

router.post('/add', async (req, res) => {
    const body = req.body;
    console.log('body');
    console.log(req);
    const tick = ticketControl.atenderTicketRapida(2);
    const newT = new Ticket({
      noCaja: body.caja, 
      noTicket: body.num
    });
    await tick.save();
    // res.json({status: 'Ticket agregado'});
    res.json({tick});
});


module.exports = router;