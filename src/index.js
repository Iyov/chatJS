const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

app.set('port', process.env.PORT || 3000);
require('./sockets')(io);

// archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// comenzar el servidor
server.listen(app.get('port'), () => {
    console.log('Server on port '+app.get('port'));
});
