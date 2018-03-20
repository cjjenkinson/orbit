import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './WorkspacesListItem.css';

const WorkspaceListItem = ({ workspace }) => (
  <div>
    <Link to={`/workspace/${workspace.id}`}>
      <div className="workspace-item">
        <span>{workspace.name}</span>
      </div>
    </Link>
  </div>
);

WorkspaceListItem.propTypes = {
  workspace: PropTypes.object,
};

export default WorkspaceListItem;
