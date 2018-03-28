import React from 'react';
import PropTypes from 'prop-types';
import './PerformanceList.css';

import PerformanceListItem from '../PerformanceListItem';

const renderPerformance = data => (
  data.map(performance => (
    <PerformanceListItem
      key={performance.label}
      enabler={performance.label}
      score={performance.score}
    />
  ))
);

const PerformanceList = ({ data }) => (
  <div className="PerformanceList">
    {renderPerformance(data)}
  </div>
);

PerformanceList.propTypes = {
  data: PropTypes.array,
};

export default PerformanceList;
