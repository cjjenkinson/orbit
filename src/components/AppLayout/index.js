// import React from 'react';
// import PropTypes from 'prop-types';

// import AppHeader from '../AppHeader';

// const AuthRoute = ({ isAuthenticated, component: Component, ...props }) => (
//   <Route
//     {...props}
//     render={props =>
//       (isAuthenticated ? (
//         <div className="main">
//           <AppHeader name="Codeworks" />
//           <Component {...props} />
//         </div>
//       ) : (
//         <Redirect
//           to={{
//             pathname: '/login',
//             state: { from: props.location },
//           }}
//         />
//       ))
//     }
//   />
// );

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

// AuthRoute.propTypes = {
//   isAuthenticated: PropTypes.bool,
//   component: PropTypes.any,
//   location: PropTypes.object,
// };

// const PrivateRoute = connect(mapStateToProps, null)(AuthRoute);

// export default PrivateRoute;
