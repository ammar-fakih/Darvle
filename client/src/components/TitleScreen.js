import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../style.css';
import history from '../utilities/history';
import socket from '../utilities/socketConnection';

const TitleScreen = () => {
  const createGame = () => {
    // TODO: pass user data
    if (!Cookies.get('userID')) {
      socket.emit('reqUserID');

      socket.on('returnUserID', (id) => {
        Cookies.set('userID', id);

        socket.emit('createLobby', Cookies.get('userID'));
      });
      console.log(Cookies.getuserId)
    }

    socket.emit('createLobby', Cookies.get('userID'));
    socket.on('lobbyCreated', (pin) => {
      console.log('lobbyCreated: ', pin);
      history.push(`game/${pin}`);
    });
  };

  return (
    <div
      className="d-flex align-items-center flex-column"
      style={{ height: '250px' }}>
      <div className="mb-auto">
        <Link to="/join" className="ui green button massive button-width">
          Join a Game
        </Link>
      </div>
      <div>
        <button
          className="ui yellow button massive button-width"
          onClick={createGame}>
          Create a Game
        </button>
      </div>
      <div className="mt-auto">
        <Link to="/" className="ui grey button massive button-width">
          <i className="user circle icon" />
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default TitleScreen;
