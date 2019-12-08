const mongoose = require('mongoose');
const URI = 'mongodb://localhost/ticketsBanco';

mongoose.connect(URI)
.then(db => console.log('Conectado a Base de Datos'))
.catch(error => console.error(error));

module.exports = mongoose;
