import React from 'react';
import PropTypes from 'prop-types';
import './WorkspacesListItem.css';

const WorkspaceListItem = ({ workspace }) => (
  <div className="workspace-item">
    <span>{workspace.name}</span>
  </div>
);

WorkspaceListItem.propTypes = {
  workspace: PropTypes.string,
};

export default WorkspaceListItem;
