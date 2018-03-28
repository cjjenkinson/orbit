import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import * as authSelectors from '../../store/Auth/selectors';

import Alert from '../Alert';
import AppHeader from '../AppHeader';

const AuthRoute = ({
  isAuthenticated, token, component: Component, ...props
}) => (
  <Route
    {...props}
    render={props =>
      (isAuthenticated && token ? (
        <div className="app">
          <Alert />
          <AppHeader name="Codeworks" />
          <Component {...props} />
        </div>
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      ))
    }
  />
);

const mapStateToProps = (state) => {
  const isAuthenticated = authSelectors.getAuthStatus(state);
  const token = authSelectors.getAuthToken(state);

  return {
    isAuthenticated,
    token,
  };
};

AuthRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  token: PropTypes.string,
  component: PropTypes.any,
  location: PropTypes.object,
};

const PrivateRoute = connect(mapStateToProps, null)(AuthRoute);

export default PrivateRoute;
