import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Row } from 'antd';

import './WorkspacesList.css';
import WorkspaceListItem from '../WorkspacesListItem';

const renderWorkspaceById = (workspacesById, workspaceId) => (
  <WorkspaceListItem key={workspaceId} workspace={get(workspacesById, workspaceId)} />
);

const WorkspacesList = ({ workspacesById, workspacesByIdArray }) => (
  <div className="workspace-list">
    <Row gutter={8}>
      {workspacesByIdArray.map(id => renderWorkspaceById(workspacesById, id))}
    </Row>
  </div>
);

WorkspacesList.propTypes = {
  workspacesById: PropTypes.object,
  workspacesByIdArray: PropTypes.array,
};

export default WorkspacesList;
