const express = require('express');
const app = express();
const socketio = require('socket.io');
let Lobby = require('./Namespace');
let { dicts } = require('./Words');

const { lobbyList, currentPlayers, playerIDs } = require('./lobbies');

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
  // return new player identifier
  socket.on('reqUserID', () => {
    let newID = Math.random() * 100000000000;
    while (playerIDs.includes(newID)) {
      newID = Math.random() * 100000000000;
    }
    playerIDs.push(newID);
    socket.emit('returnUserID', newID);
  });

  socket.on('createLobby', (userID) => {
    if (currentPlayers.includes(userID)) {
      console.log('already in list');
      return;
    }
    // create unique room pin
    // let newPin = Math.random().toString(36).substring(2, 5);
    let newPin = 'abc';
    lobbyList[newPin] = new Lobby('lobby', [], [], [getRandomWord()]);
    socket.emit('lobbyCreated', newPin);

    socket.join(newPin);
  });

  /**
   * Return true if lobby is open for joining
   */
  socket.on('checkLobby', ({ pin }) => {
    socket.emit('lobbyChecked', Object.keys(lobbyList).includes(pin));
  });

  /**
   * initialize player connection to lobby
   */
  socket.on('initConnect', () => {
    // add player to playerStates
    lobbyList[newPin].playerStates[userID] = getPlayerTemplate(userID);

    // add new player to current player list
    currentPlayers.push(userID);

    // TODO: add name to playerState and playerNames if available, or use anon
    lobbyList[newPin].playerNames.push('Guest');
    console.log(lobbyList[newPin].playerNames);
    // lobbyList[newPin].playerName = 'Guest';
  });

  /**
   * return current game info
   */
  socket.on('reqInfo', () => {
    returnGameInfo();
  });
});

const getRandomWord = () => {
  var index = Math.floor(Math.random() * dicts.smalldick.length);
  return dicts.smalldick[index];
};

const returnGameInfo = () => {
  socket.emit('gameInfo', {
    playerData: lobbyList[newPin].playerStates[socket.id],
    gameState: lobbyList[newPin].gameState,
    playerNames: lobbyList[newPin].playerNames,
  });
};

// TODO: add in support for successfully guessed words
const getPlayerTemplate = (id) => {
  return {
    letters: [
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
  };
};

// io.of('/admin').on('connect', (socket) => {
//   console.log('user connected to admin');
//   io.of('/admin').emit('welcome', 'Welcome to admin channel!');
// });
