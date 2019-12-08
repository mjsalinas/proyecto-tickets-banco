const express = require('express');
const Ticket = require('../models/tickets');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await Ticket.find()
        res.send(response);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
});

router.post('/', async (req, res) => {
    const { noTicket } = req.body;
    const newT = new Ticket({
        noTicket: noTicket,
    });
    await newT.save();
    res.json({status: 'Ticket creado'});
});


module.exports = router;