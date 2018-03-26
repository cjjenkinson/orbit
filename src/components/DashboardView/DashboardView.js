import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Row } from 'antd';

import './DashboardView.css';

// import * as utils from '../../utils';
import * as workspaceSelectors from '../../store/Workspaces/selectors';
import * as workspaceActions from '../../store/Workspaces/actions';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import WorkspacesList from '../../components/WorkspacesList';

class DashboardView extends Component {
  componentDidMount() {
    // Don't fetch if workspaces are hydrated from localStorage
    this.props.getWorkspaces();
  }

  onDeleteWorkspace = (id) => {
    this.props.deleteWorkspace(id);
  };

  renderActions = () => (
    <div className="dashboard-actions">
      <Row>
        <div className="left">
          <Link to="/add">
            <Button primary>Create a Workspace</Button>
          </Link>
        </div>
      </Row>
    </div>
  );

  renderWorkspaces() {
    const { workspacesById, workspacesByIdArray } = this.props;
    if (!workspacesByIdArray.length) {
      return <h3>No workspaces created yet! Create one now</h3>;
    }
    return (
      <WorkspacesList workspacesById={workspacesById} workspacesByIdArray={workspacesByIdArray} />
    );
  }

  renderLoading = () => <Loader />;

  render() {
    const { isFetching } = this.props;
    return (
      <div className="container">
        {isFetching ? (
          this.renderLoading()
        ) : (
          <div>
            {this.renderActions()}
            {this.renderWorkspaces()}
          </div>
        )}
      </div>
    );
  }
}

DashboardView.propTypes = {
  isFetching: PropTypes.bool,
  getWorkspaces: PropTypes.func,
  deleteWorkspace: PropTypes.func,
  workspacesById: PropTypes.object,
  workspacesByIdArray: PropTypes.array,
};

const mapStateToProps = (state) => {
  const isFetching = workspaceSelectors.isFetching(state);
  const [workspacesById, workspacesByIdArray] = workspaceSelectors.getWorkspacesById(state);

  return {
    isFetching,
    workspacesById,
    workspacesByIdArray,
  };
};

const mapDispatchToProps = dispatch => ({
  getWorkspaces: () => dispatch(workspaceActions.getWorkspaces()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
