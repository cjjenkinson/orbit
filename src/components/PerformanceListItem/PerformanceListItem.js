import React from 'react';
import PropTypes from 'prop-types';
import './PerformanceListItem.css';
/* eslint-disable */
const PerformanceListItem = ({ score, enabler }) => {
  const width = `${score * 100}%`;
  const strong = (score > 0.7) ? 'STRONG' : ((score < 0.5) ? 'WEAK' : 'AVERAGE');
  return (
    <div className="PerformanceListItem">
      <div className="performance-top">
        <p className="enabler-label">{enabler}</p>
        <strong className="stength-label">{strong}</strong>
      </div>
      <div className="performance-bottom">
        <div className="performance-bar">
          <span className="performance-fill" style={{ width }} />
        </div>
        <div className="performance-value">{score * 10}</div>
      </div>
    </div>
  );
};
/* eslint-disable */
PerformanceListItem.propTypes = {
  score: PropTypes.number,
  enabler: PropTypes.string,
};

export default PerformanceListItem;
