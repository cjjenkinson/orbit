import React from 'react';
import { Route } from 'react-router-dom';

import '../styles/index.css';

import AppHeader from '../components/AppHeader';

import DashboardView from './DashboardView';
import WorkspaceView from './WorkspaceView';
import WorkspaceSettings from './WorkspaceSettings';
import AddWorkspace from './AddWorkspace';
import AddEntry from './AddEntry';
import EntryView from './EntryView';
import EntrySettings from './EntrySettings';
import AddSnapshot from './AddSnapshot';

const App = () => (
  <div className="app-main">
    <AppHeader name="Codeworks" />

    <Route exact path="/" component={DashboardView} />
    <Route exact path="/add" component={AddWorkspace} />
    <Route exact path="/workspace/:id" component={WorkspaceView} />
    <Route exact path="/workspace/:id/settings" component={WorkspaceSettings} />
    <Route exact path="/workspace/:id/add" component={AddEntry} />
    <Route exact path="/workspace/:id/entry/:id" component={EntryView} />
    <Route exact path="/workspace/:id/entry/:id/settings" component={EntrySettings} />
    <Route exact path="/workspace/:id/entry/:id/add" component={AddSnapshot} />
    {/* <Route exact path="/workspace/:id/entry/:id/snapshot/:id" component={SnapshotView} /> */}
  </div>
);

export default App;
