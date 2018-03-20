import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => (
  <div className="sidebar">
    <div className="sidebar-navigation-menu">
      <Link to="/">Entries</Link>
    </div>
  </div>
);

export default SideBar;
