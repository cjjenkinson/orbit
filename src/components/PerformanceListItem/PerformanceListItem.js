import React from 'react';
import PropTypes from 'prop-types';
import './PerformanceListItem.css';
/* eslint-disable */
const PerformanceListItem = ({ score, enabler }) => {
  const width = `${score * 100}%`;
  const strong = (score > 0.7) ? 'STRONG' : ((score < 0.5) ? 'WEAK' : 'AVERAGE');
  return (
    <div className="PerformanceListItem">
      <strong>{strong}</strong>
      <div className="performance">
        <p>{enabler}</p>
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
