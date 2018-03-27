import React from 'react';
import PropTypes from 'prop-types';
import './PerformanceListItem.css';

const PerformanceListItem = ({ performance, enabler }) => {
  const width = `${performance * 100}%`;
  return (
    <div className="PerformanceListItem">
      <strong>STRONG</strong>
      <div className="performance">
        <p>{enabler}</p>
        <div className="performance-bar">
          <span className="performance-fill" style={{ width }} />
        </div>
        <div className="performance-value">{performance * 10}</div>
      </div>
    </div>
  );
};

PerformanceListItem.propTypes = {
  performance: PropTypes.number,
  enabler: PropTypes.string,
};

export default PerformanceListItem;
