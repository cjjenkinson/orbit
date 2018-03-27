import React from 'react';
import { Link } from 'react-router-dom';

const LandingView = () => (
  <div className="public-landing">
    <div className="container">
      <div className="panel">
        <h2>Orbit - Performance Analytics</h2>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  </div>
);

export default LandingView;
