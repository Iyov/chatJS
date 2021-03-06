const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

// db connection
mongoose.connect('mongodb+srv://escribir:9871234@cluster0-8ffei.mongodb.net/chat-database?retryWrites=true&w=majority')
    .then(db => console.log('db is conneted'))
    .catch(err => console.log(err));

app.set('port', process.env.PORT || 3000);
require('./sockets')(io);

// archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// comenzar el servidor
server.listen(app.get('port'), () => {
    console.log('Server on port '+app.get('port'));
});
