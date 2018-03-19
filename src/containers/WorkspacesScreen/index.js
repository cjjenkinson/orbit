import React, { Component } from 'react';

import Loader from '../../components/Loader';

class WorkspacesScreen extends Component {
  componentDidMount() {}

  renderLoading = () => <Loader />;

  render() {
    return (
      <div className="workspace-detail-container">
        <h3>Workspace Detail</h3>
      </div>
    );
  }
}

export default WorkspacesScreen;
