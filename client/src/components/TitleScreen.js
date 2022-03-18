import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import history from '../utilities/history';
import socket from '../utilities/socketConnection';

const TitleScreen = () => {
  const createGame = () => {
    // TODO: pass user data
    socket.emit('createLobby');
    socket.on('lobbyCreated', (pin) => {
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
          to="/"
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
