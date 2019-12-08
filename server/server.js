const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

//conexion a mongodb 
const { mongoose } = require('../database.js');

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
// app.use('/api/tickets', require('../routes/tickets.routes'));

//static files
app.use(express.static(path.join(__dirname, '../public')));

const socketIO = require('socket.io');
const http = require('http');

let server = http.createServer(app);

//comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');

//levantando servidor
server.listen(app.get('port'), (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${app.get('port')}`);
});


