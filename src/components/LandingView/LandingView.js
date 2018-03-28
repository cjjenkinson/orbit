import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as authSelectors from '../../store/Auth/selectors';

class LandingView extends Component {
  renderUserHeader = () => <Link to="/dashboard">Dashboard</Link>;

  renderAuthHeader = () => (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
  render() {
    return (
      <div className="public-landing">
        <div className="container">
          <div className="panel">
            <h2>Orbit - Performance Analytics</h2>
            {this.props.isAuthenticated ? (
              this.renderUserHeader()
            ) : (
              this.renderAuthHeader()
            )}
          </div>
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
