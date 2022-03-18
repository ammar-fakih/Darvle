const express = require('express');
const app = express();
const socketio = require('socket.io');
let Lobby = require('./Namespace');
let { dicts } = require('./Words');

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

io.on('connect', (socket) => {
  socket.on('createLobby', () => {
    // let newPin = Math.random().toString(36).substring(2, 5);
    let newPin = "abc"
    lobbyList[newPin] = new Lobby('lobby', [], [getRandomWord()]);

    socket.emit('lobbyCreated', newPin);

    // new namespace
    io.of('/' + newPin).on('connect', (socket) => {
      lobbyList[newPin].playerStates[socket.id] = getPlayerTemplate();

      socket.emit('gameInfo', {
        playerData: lobbyList[newPin].playerStates[socket.id],
        gameState: lobbyList[newPin].gameState,
      });
    });
  });

  socket.on('checkLobby', ({ pin }) => {
    socket.emit('lobbyChecked', Object.keys(lobbyList).includes(pin));
  });
});

const getRandomWord = () => {
  var index = Math.floor(Math.random() * dicts.smalldick.length);
  return dicts.smalldick[index];
};

// TODO: add in support for successfully guessed words
const getPlayerTemplate = (id) => {
  return {letters: [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ],
  colors: [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ],
  guessedLetters: [],
  guessedWord: 0,
  guessedLetter: 0,
  buttonAttributes: [],
  bThemes: [],
}
    
    
  
};

// io.of('/admin').on('connect', (socket) => {
//   console.log('user connected to admin');
//   io.of('/admin').emit('welcome', 'Welcome to admin channel!');
// });
