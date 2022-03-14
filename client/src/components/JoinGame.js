import React from 'react';
import io from "socket.io-client";

let socket;

const JoinGame = () => {
  return (
    <div>
      <div className="ui centered card">
        <div className="content">
          <div style={{ width: '100%' }} className="ui input huge">
            <input type="text" placeholder="Game PIN" />
          </div>
        </div>
        <div className="content">
          <button
            style={{ width: '100%' }}
            className="ui positive button huge center floated">
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinGame;
