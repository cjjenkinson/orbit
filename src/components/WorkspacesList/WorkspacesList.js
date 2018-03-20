import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import WorkspaceListItem from '../WorkspacesListItem';

const renderWorkspaceById = (workspacesById, workspaceId) => (
  <WorkspaceListItem
    key={workspaceId}
    workspace={get(workspacesById, workspaceId)}
  />
);

const WorkspacesList = ({ workspacesById, workspacesByIdArray }) => (
  <div className="workspace-list">
    {workspacesByIdArray.map((id) => renderWorkspaceById(workspacesById, id))}
  </div>
);

WorkspacesList.propTypes = {
  workspacesById: PropTypes.object,
  workspacesByIdArray: PropTypes.array,
};

export default WorkspacesList;
