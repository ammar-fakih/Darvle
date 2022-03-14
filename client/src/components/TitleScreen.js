import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const TitleScreen = () => {
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
        <Link to="/" className="ui yellow button massive button-width">
          Create a Game
        </Link>
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
