import React from 'react';
import PropTypes from 'prop-types';

import './AppHeader.css';
import OrbitLogo from '../../assets/images/orbit_logo@2x.png';
import DefaultAvatar from '../../assets/images/default_avatar@2x.png';

const AppHeader = ({ title }) => (
  <div className="app-header-container clearfix">
    <div className="app-header">
      <div className="col col-4 app-header-workspace">
        <a href="/">
          <img src={OrbitLogo} alt="Orbit Logo" id="dashboard-header-logo" />
        </a>
        <span className="app-header-workspace-name">Codeworks</span>
        <span className="app-header-team-name">Free</span>
      </div>
      <div className="col col-4 app-header-nav">
        <span>{title}</span>
      </div>
      <div className="col col-4 app-header-account">
        <img
          src={DefaultAvatar}
          alt="Username avatar"
          id="dashboard-header-avatar"
        />
      </div>
    </div>
  </div>
);

AppHeader.propTypes = {
  title: PropTypes.string,
};

export default AppHeader;
