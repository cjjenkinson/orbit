import React from 'react';
// import PropTypes from 'prop-types';
// import get from 'lodash/get';

import PerformanceListItem from '../PerformanceListItem';
import ProgressCircle from '../ProgressCircle';

// const renderPerformance = (workspacesById, workspaceId) => (
//   <PerformanceListItem
//     key={workspaceId}
//     workspace={get(workspacesById, workspaceId)}
//   />
// );

const PerformanceList = () => (
  // <div className="performance-list">
  //   {workspacesByIdArray.map(id => renderWorkspaceById(workspacesById, id))}
  // </div>
  <div>
    <PerformanceListItem
      enabler="FRONTEND"
      performance="0.5"
    />
    <ProgressCircle
      strokeWidth="10"
      sqSize="200"
      percentage="25"
    />
  </div>
);

// PerformanceList.propTypes = {
//   workspacesById: PropTypes.object,
//   workspacesByIdArray: PropTypes.array,
// };

export default PerformanceList;
