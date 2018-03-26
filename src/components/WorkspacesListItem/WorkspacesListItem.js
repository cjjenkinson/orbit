import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Col } from 'antd';

import './WorkspacesListItem.css';

const WorkspaceListItem = ({ workspace }) => (
  <Col span={8}>
    <Link to={`/workspace/${workspace._id}`}>
      <Card
        title={workspace.name}
        style={{ width: 264, marginBottom: 24 }}
      >
        {workspace.template.name}: {workspace.entries.length}
      </Card>
    </Link>
  </Col>
);

WorkspaceListItem.propTypes = {
  workspace: PropTypes.object,
};

export default WorkspaceListItem;
