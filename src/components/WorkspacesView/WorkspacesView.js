import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loader from '../../components/Loader';

class WorkspacesView extends Component {
  componentDidMount() {}

  renderLoading = () => <Loader />;

  render() {
    const { id } = this.props.match.params;
    return (
      <div>
        <div className="workspace-detail-container">
          <h3>Workspace Detail: {id}</h3>
        </div>
      </div>
    );
  }
}

WorkspacesView.propTypes = {
  match: PropTypes.object,
  id: PropTypes.string,
};

export default WorkspacesView;
