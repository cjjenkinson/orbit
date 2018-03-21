import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

import './AppHeader.css';

import OrbitLogo from '../../assets/images/orbit_logo@2x.png';
import DefaultAvatar from '../../assets/images/default_avatar@2x.png';

const AppHeader = ({ name }) => (
  <div className="app-header-container clearfix">
    <div className="app-header">
      <Row>
        <Col span={8}>
          <div className="app-header-workspace">
            <Link to="/">
              <span className="app-header-workspace-name">{name}</span>
              <span className="app-header-team-name">1 Workspace</span>
            </Link>
          </div>
        </Col>
        <Col span={8}>
          <div className="app-header-nav">
            <img src={OrbitLogo} alt="Orbit Logo" id="dashboard-header-logo" />
          </div>
        </Col>
        <Col span={8}>
          <div className="col col-4 app-header-account">
            <img src={DefaultAvatar} alt="Username avatar" id="dashboard-header-avatar" />
          </div>
        </Col>
      </Row>
    </div>
  </div>
);

AppHeader.propTypes = {
  name: PropTypes.string,
};

export default AppHeader;
