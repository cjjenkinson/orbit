import React from 'react';
import { Route } from 'react-router-dom';

import '../styles/index.css';

import AppHeader from '../components/AppHeader';

import DashboardView from './DashboardView';
import WorkspacesView from './WorkspacesView';
import AddWorkspace from './AddWorkspace';

const App = () => (
  <div className="app-main">
    <AppHeader name="Codeworks" />

    <Route exact path="/" component={DashboardView} />
    <Route exact path="/workspace/:id" component={WorkspacesView} />
    <Route exact path="/workspace/new" component={AddWorkspace} />
  </div>
);

export default App;
