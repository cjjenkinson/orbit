import React from 'react';
import PropTypes from 'prop-types';
import './SnapshotSideBar.css';

import ProgressCircle from '../ProgressCircle';
import PerformanceList from '../PerformanceList';

const findAverage = (scoreData) => {
  const overall = scoreData.reduce((accumulator, currentValue) => (
    accumulator + currentValue.score), 0);
  const average = Math.round((overall / scoreData.length) * 100) / 10;
  return average;
};

const SnapshotSideBar = ({ data, previousData }) => (
  <div className="snapshot-side-bar">
    <p className="sidebar-title">Core Overview:</p>
    <div className="progress-circle-container">
      <ProgressCircle
        strokeWidth="10"
        sqSize="200"
        score={findAverage(data)}
        previousScore={findAverage(previousData)}
      />
    </div>
    <p className="sidebar-title">Core Scores:</p>
    <div className="performance-list-container">
      <PerformanceList data={data} />
    </div>
  </div>
);

SnapshotSideBar.propTypes = {
  data: PropTypes.array,
  previousData: PropTypes.array,
};

export default SnapshotSideBar;
