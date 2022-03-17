import React, { useState } from 'react';
import socket from '../utilities/socketConnection';
import history from '../utilities/history';

const JoinGame = ({ changePIN }) => {
  const [term, setTerm] = useState('');
  const [popUp, setPopUp] = useState('');

  const handleClick = () => {
    socket.emit('checkLobby', { pin: term });
    socket.on('lobbyChecked', (resp) => {
      if (resp) {
        console.log('The lobby is available');
        changePIN(term);
        setPopUp('');
        history.push(`/game/${term}`);
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
              value={term}
              onChange={(e) => {
                setTerm(e.target.value);
              }}
              onSubmit={handleClick}
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
