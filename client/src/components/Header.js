import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const Header = () => {
  return (
    <div
      className="ui sizer vertical segment center-text"
      style={{ marginBottom: '20px' }}>
      <div className="ui mid header" style={{ fontSize: '3em' }}>
        <Link style={{color: "black", textDecoration: "none"  }} to="/">davardle.io</Link>
      </div>
    </div>
  );
};

export default Header;
