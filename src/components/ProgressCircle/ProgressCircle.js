import React from 'react';
import PropTypes from 'prop-types';
import './ProgressCircle.css';

const ProgressCircle = ({ sqSize, strokeWidth, score }) => {
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (sqSize - strokeWidth) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - ((dashArray * score) / 10);

  return (
    <div className="ProgressCircle">
      <svg
        width={sqSize}
        height={sqSize}
        viewBox={viewBox}
      >
        <circle
          className="circle-background"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          className="circle-progress"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
          style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset }}
        />
        <text
          className="circle-text"
          x="50%"
          y="45%"
          dy=".3em"
          textAnchor="middle"
        >
          Overall
        </text>
        <text
          className="circle-score"
          x="50%"
          y="65%"
          dy=".3em"
          textAnchor="middle"
        >
          {score}
        </text>
      </svg>
    </div>
  );
};

ProgressCircle.propTypes = {
  sqSize: PropTypes.string,
  strokeWidth: PropTypes.string,
  score: PropTypes.number,
};

export default ProgressCircle;
