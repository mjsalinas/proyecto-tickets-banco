const mongoose = require('mongoose');
const { Schema } = mongoose;

const TicketSchema = new Schema({
    noTicket: Number,

});

module.exports = mongoose.model('Ticket', TicketSchema);