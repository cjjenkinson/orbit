import React from 'react';
import PropTypes from 'prop-types';
import './SnapshotSideBar.css';

import ProgressCircle from '../ProgressCircle';
import PerformanceList from '../PerformanceList';

// import mockDataPerformance from './mockDataPerformance';

const SnapshotSideBar = ({ data }) => {
  const overall = data.reduce((accumulator, currentValue) => (
    accumulator + currentValue.score), 0);
  const average = Math.round((overall / data.length) * 100) / 10;
  return (
    <div className="snapshot-side-bar">
      <p className="sidebar-title">Core Overview:</p>
      <div className="progress-circle-container">
        <ProgressCircle
          strokeWidth="10"
          sqSize="200"
          score={average}
        />
      </div>
      <p className="sidebar-title">Core Overview:</p>
      <div className="performance-list-container">
        <PerformanceList data={data} />
      </div>
    </div>
  );
};

SnapshotSideBar.propTypes = {
  data: PropTypes.array,
};

export default SnapshotSideBar;
