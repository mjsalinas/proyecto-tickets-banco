const mongoose = require('mongoose');
const { Schema } = mongoose;

const TicketSchema = new Schema({
    noTicket: Number,
    noCaja: Number,

});

module.exports = mongoose.model('Ticket', TicketSchema);