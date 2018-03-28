import React from 'react';
import { Route, Switch } from 'react-router-dom';

import '../styles/index.css';

// Public Views
import LandingView from './LandingView';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import NotFound from './NotFound';

// Private Views
import PrivateRoute from './PrivateRoute';
import DashboardView from './DashboardView';
import WorkspaceView from './WorkspaceView';
import WorkspaceSettings from './WorkspaceSettings';
import AddWorkspace from './AddWorkspace';
import AddEntry from './AddEntry';
import EntryView from './EntryView';
import EntrySettings from './EntrySettings';
import AddSnapshot from './AddSnapshot';

const App = () => (
  <div className="app">
    <Switch>
      <Route exact path="/" component={LandingView} />
      <Route path="/login" component={LoginView} />
      <Route path="/signup" component={RegisterView} />

      <PrivateRoute exact path="/dashboard" component={DashboardView} />
      <PrivateRoute exact path="/add" component={AddWorkspace} />
      <PrivateRoute exact path="/workspace/:id" component={WorkspaceView} />
      <PrivateRoute exact path="/workspace/:id/settings" component={WorkspaceSettings} />
      <PrivateRoute exact path="/workspace/:id/add" component={AddEntry} />
      <PrivateRoute exact path="/workspace/:id/entry/:id" component={EntryView} />
      <PrivateRoute exact path="/workspace/:id/entry/:id/settings" component={EntrySettings} />
      <PrivateRoute exact path="/workspace/:id/entry/:id/add" component={AddSnapshot} />

      <Route path="*" component={NotFound} />
    </Switch>
  </div>
);

export default App;
