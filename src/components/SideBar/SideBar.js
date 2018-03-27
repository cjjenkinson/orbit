import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => (
  <div className="sidebar">
    <div className="sidebar-navigation-menu">
      <Link to="/" className="navigation-link">
        Entries
      </Link>
      <Link to="/" className="navigation-link">
        Enablers
      </Link>
      <Link to="/" className="navigation-link">
        Settings
      </Link>
    </div>
  </div>
);

export default SideBar;
