import React from 'react';
import { Route } from 'react-router-dom';

import '../styles/index.css';

import DashboardScreen from './DashboardScreen';
import WorkspacesScreen from './WorkspacesScreen';

const App = () => (
  <div className="app-main">
    <Route exact path="/" component={DashboardScreen} />
    <Route exact path="/workspace/:id" component={WorkspacesScreen} />
  </div>
);

export default App;
