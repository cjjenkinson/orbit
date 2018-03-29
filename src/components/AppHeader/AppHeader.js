import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Menu, Dropdown } from 'antd';

import './AppHeader.css';
import OrbitLogo from '../../assets/images/orbit_logo@2x.png';
import DefaultAvatar from '../../assets/images/default_avatar@2x.png';

import * as authSelectors from '../../store/Auth/selectors';
import * as authActions from '../../store/Auth/actions';

class AppHeader extends Component {
  renderUserDropdown() {
    const menu = (
      <Menu>
        <Menu.Item>
          <span onClick={this.props.logout}>Logout</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="app-header-account">
        <Dropdown overlay={menu} placement="bottomRight">
          <img src={DefaultAvatar} alt="Username avatar" id="dashboard-header-avatar" />
        </Dropdown>
      </div>
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
                  <span className="app-header-workspace-name">
                    {this.props.auth.name || 'Teamname'}
                  </span>
                  <span className="app-header-team-name">Workspaces</span>
                </Link>
              </div>
            </Col>
            <Col span={8}>
              <div className="app-header-nav">
                <Link to="/">
                  <div className="dashboard-header-logo">
                    <img src={OrbitLogo} alt="Orbit Logo" id="dashboard-header-logo" />
                  </div>
                </Link>
              </div>
            </Col>
            <Col span={8}>{this.renderUserDropdown()}</Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const auth = authSelectors.getAuthDetails(state);
  return {
    auth,
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
});

AppHeader.propTypes = {
  logout: PropTypes.func,
  auth: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
