import React from 'react';
import '../style.css';

const Header = () => {
  return (
    <div
      className="ui sizer vertical segment center-text"
      style={{ marginBottom: '20px' }}>
      <div className="ui mid header" style={{ fontSize: '3em' }}>
        davardle.io
      </div>
    </div>
  );
};

export default Header;
