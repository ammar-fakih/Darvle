const express = require('express');
const app = express();
const socketio = require('socket.io');

// init express server
// app.use(express.static(__dirname + '/public'));
const expressServer = app.listen(0, 'localhost');

// init socket.io server by passing express server
const io = socketio(expressServer);

// call func when a new socket connects
io.on('connection', (socket) => {
  socket.emit('messageFromServer', { data: 'Welcome to the server' });
  socket.on('messageToServer', (dataFromClient) => {
    console.log(dataFromClient);
  });
  socket.join('level1');
  socket
    .to('level1')
    .emit('joined', `${socket.id}: I have joined the level1 room`);
});

// io.of('/admin').on('connect', (socket) => {
//   console.log('user connected to admin');
//   io.of('/admin').emit('welcome', 'Welcome to admin channel!');
// });
