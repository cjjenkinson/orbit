import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppHeader from '../../components/AppHeader';
import Loader from '../../components/Loader';

class WorkspacesScreen extends Component {
  componentDidMount() {}

  renderLoading = () => <Loader />;

  render() {
    const { id } = this.props.match.params;
    return (
      <div>
        <AppHeader title="Workspaces" />
        <div className="workspace-detail-container">
          <h3>Workspace Detail: {id}</h3>
        </div>
      </div>
    );
  }
}

WorkspacesScreen.propTypes = {
  match: PropTypes.object,
  id: PropTypes.string,
};

export default WorkspacesScreen;
