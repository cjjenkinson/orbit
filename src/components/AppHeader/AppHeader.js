import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Menu, Dropdown } from 'antd';

import './AppHeader.css';
import OrbitLogo from '../../assets/images/orbit_logo@2x.png';
import DefaultAvatar from '../../assets/images/default_avatar@2x.png';

import * as authActions from '../../store/Auth/actions';

class AppHeader extends Component {
  renderUserDropdown() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            Account Settings
          </a>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.props.logout}>
            Logout
          </span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} placement="bottomRight">
        <div className="app-header-account">
          <img src={DefaultAvatar} alt="Username avatar" id="dashboard-header-avatar" />
        </div>
      </Dropdown>
    );
  }

  render() {
    return (
      <div className="app-header-container clearfix">
        <div className="app-header">
          <Row>
            <Col span={8}>
              <div className="app-header-workspace">
                <Link to="/dashboard">
                  <span className="app-header-workspace-name">Codeworks</span>
                  <span className="app-header-team-name">1 Workspace</span>
                </Link>
              </div>
            </Col>
            <Col span={8}>
              <div className="app-header-nav">
                <img src={OrbitLogo} alt="Orbit Logo" id="dashboard-header-logo" />
              </div>
            </Col>
            <Col span={8}>{this.renderUserDropdown()}</Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
});

AppHeader.propTypes = {
  logout: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(AppHeader);
