import React, { useState } from 'react';
import socket from '../utilities/socketConnection';

const JoinGame = () => {
  const [pin, setPin] = useState('');
  const [popUp, setPopUp] = useState('');

  const handleClick = () => {
    socket.emit('checkLobby', { pin: pin });
    socket.on('lobbyChecked', (resp) => {
      if (resp) {
        console.log('The lobby is available');
        setPopUp('');
      } else {
        setPopUp('Please enter a valid PIN');
      }
    });
  };

  return (
    <div>
      <div className="ui centered card">
        <div className="content">
          <div style={{ width: '100%' }} className="ui input huge">
            <input
              type="text"
              placeholder="Game PIN"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="content">
          <button
            style={{ width: '100%' }}
            className="ui positive button huge center floated"
            onClick={handleClick}>
            Enter
          </button>
          <div style={{ color: 'red' }}>{popUp}</div>
        </div>
      </div>
    </div>
  );
};

export default JoinGame;
