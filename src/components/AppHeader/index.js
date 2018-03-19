import React from 'react';
import './AppHeader.css';
import OrbitLogo from '../../assets/images/orbit_logo@2x.png';
import DefaultAvatar from '../../assets/images/default_avatar@2x.png';

const AppHeader = () => (
  <div className="app-header-container clearfix">
    <div className="app-header">
      <div className="col col-4 app-header-workspace">
        <a href="/">
          <img src={OrbitLogo} alt="Orbit Logo" id="dashboard-header-logo" />
        </a>
        <span className="app-header-workspace-name">January 18 Cohort</span>
        <span className="app-header-team-name">Codeworks</span>
      </div>
      <div className="col col-4 app-header-nav">
        <span>Workspaces</span>
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

export default AppHeader;
