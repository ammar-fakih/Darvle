import React from 'react';


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
            className="ui positive button huge center floated"
            onClick={() => {
              window.alert('FUCK YOU');
            }}>
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinGame;
