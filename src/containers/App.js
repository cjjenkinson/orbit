import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import '../styles/index.css';

import DashboardScreen from './DashboardScreen';

const App = () => (
  <Router>
    <div className="app-main">
      <DashboardScreen />
    </div>
  </Router>
);

export default App;
