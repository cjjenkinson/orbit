import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './DashboardView.css';

import * as workspaceSelectors from '../../store/Workspaces/selectors';
import * as workspaceActions from '../../store/Workspaces/actions';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import WorkspacesList from '../../components/WorkspacesList';

class DashboardView extends Component {
  componentDidMount() {
    this.props.getWorkspaces();
  }

  onAddWorkspace = () => {
    // this is passed to onSubmit as prop call back
  };

  renderActions = () => (
    <div className="dashboard-actions">
      <div className="col col-8">
        <input id="search" type="text" className="search" />
      </div>
      <div className="col col-4">
        <div className="right">
          <Link to="/workspace/new">
            <Button primary>Add Workspace</Button>
          </Link>
        </div>
      </div>
    </div>
  );

  renderWorkspaces() {
    const { workspacesById, workspacesByIdArray } = this.props;
    return (
      <div className="dashboard-workspaces">
        <WorkspacesList
          workspacesById={workspacesById}
          workspacesByIdArray={workspacesByIdArray}
        />
      </div>
    );
  }

  renderLoading = () => <Loader />;

  render() {
    const { isFetching } = this.props;
    return (
      <div>
        <div className="container">
          {isFetching ? (
            this.renderLoading()
          ) : (
            <div className="dashboard-container">
              {this.renderActions()}
              {this.renderWorkspaces()}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const isFetching = workspaceSelectors.isFetching(state);
  const [
    workspacesById,
    workspacesByIdArray,
  ] = workspaceSelectors.getWorkspacesById(state);

  return {
    isFetching,
    workspacesById,
    workspacesByIdArray,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getWorkspaces: () => dispatch(workspaceActions.getWorkspaces()),
  addWorkspace: (formData) => dispatch(workspaceActions.addWorkspace(formData)),
});

DashboardView.propTypes = {
  isFetching: PropTypes.bool,
  getWorkspaces: PropTypes.func,
  workspacesById: PropTypes.object,
  workspacesByIdArray: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
