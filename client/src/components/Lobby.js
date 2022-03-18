import React from 'react';

const Lobby = ({ currentPIN }) => {
  return (
    <div>
      <div className="d-flex align-items-center flex-column">
        <span className="ui large header">
          Join with game pin:&nbsp;&nbsp;
          <span
            style={{
              color: 'white',
              margin: '0px',
              backgroundColor: 'blue',
              padding: '6px 10px',
            }}
            className="ui large header">
            {currentPIN}
          </span>
        </span>
      </div>
      <div style={{ margin: '10px' }} className="ui large header">
        <i className="spinner loading icon" />
        Waiting for players
      </div>
      <div>{/*// TODO: add foreach that populates lobby player list */}</div>
    </div>
  );
};

export default Lobby;
