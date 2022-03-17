const express = require('express');
const app = express();
const socketio = require('socket.io');
let Namespace = require('./Namespace');

const { lobbyList } = require('./lobbies');

app.use(express.json());
// init express server
// app.use(express.static(__dirname + '/public'));
const server = app.listen(9000);

// init socket.io server by passing express server
const io = socketio(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on("createLobby", () => {
    
  })


  socket.on('checkLobby', ({ pin }) => {
    socket.emit('lobbyChecked', lobbyList.includes(pin));
  });
});



// io.of('/admin').on('connect', (socket) => {
//   console.log('user connected to admin');
//   io.of('/admin').emit('welcome', 'Welcome to admin channel!');
// });
