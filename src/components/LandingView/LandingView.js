import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import OrbitLogo from '../../assets/images/orbit_trans.png';
import './LandingView.css';

import * as authSelectors from '../../store/Auth/selectors';

import Button from '../../components/Button';
import Snapshot from '../../components/Snapshot';

import mockData from './mockData';

class LandingView extends Component {
  renderUserHeader = () => <Link to="/dashboard">Dashboard</Link>;

  renderUserButton = () => (
    <Button primary onClick={() => this.renderUserHeader()}>
      Go to Workspaces
    </Button>
  );

  renderAuthHeader = () => (
    <div className="login-signup">
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  );

  renderAuthButton = () => (
    <Link to="/login">
      <Button primary>Create a Workspace</Button>
    </Link>
  );

  render() {
    return (
      <div className="LandingView">
        <div className="public-landing">
          <div className="landing-header">
            <div className="landing-header-logo">
              <img src={OrbitLogo} alt="Orbit Logo" id="landing-header-logo" />
            </div>
            <div className="landing-header-info">
              <Link to="/product">Product</Link>
              <Link to="/explore">Explore</Link>
              <Link to="/about">About</Link>
              <Link to="/help">Help</Link>
              {this.props.isAuthenticated ? (
                this.renderUserHeader()
              ) : (
                this.renderAuthHeader()
              )}
            </div>
          </div>
          <div className="landing-container">
            <div className="landing-paragraph">
              <h2 className="landing-paragraph-header">
                Visualise performance metrics of any subject
              </h2>
              <div className="landing-paragraph-text">
                Orbit is an analytics tool that brings clear and intuitive
                visualisations of current performance, giving a holistic score and
                interactive drilldown into the factors that make up the performance
                metrics of any subject.
              </div>
              {this.props.isAuthenticated ? (
                this.renderUserButton()
              ) : (
                this.renderAuthButton()
              )}
            </div>
            <div className="landing-snapshot">
              <div>
                <Snapshot
                  height={600}
                  width={600}
                  data={mockData}
                  previousData={mockData}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="background-color">
          <div className="color-green" />
          <div className="color-white" />
        </div>
      </div>
    );
  }
}

LandingView.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const isAuthenticated = authSelectors.getAuthStatus(state);

  return {
    isAuthenticated,
  };
};

export default connect(mapStateToProps)(LandingView);
