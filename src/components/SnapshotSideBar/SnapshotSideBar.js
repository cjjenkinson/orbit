import React from 'react';
// import PropTypes from 'prop-types';
import './SnapshotSideBar.css';

import ProgressCircle from '../ProgressCircle';
import PerformanceList from '../PerformanceList';

import mockDataPerformance from './mockDataPerformance';

const SnapshotSideBar = () => {
  const data = mockDataPerformance;
  const overall = data.reduce((accumulator, currentValue) => (
    accumulator + currentValue.score), 0);
  const average = Math.round((overall / data.length) * 100) / 10;
  return (
    <div className="SnapshotSideBar">
      <p>OVERALL SCORE</p>
      <ProgressCircle
        strokeWidth="10"
        sqSize="200"
        score={average}
      />
      <PerformanceList
        data={data}
      />
    </div>
  );
};
//
// PerformanceList.propTypes = {
//   data: PropTypes.array,
// };

export default SnapshotSideBar;
