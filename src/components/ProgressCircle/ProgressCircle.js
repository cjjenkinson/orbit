import React from 'react';
import PropTypes from 'prop-types';
import './ProgressCircle.css';

const ProgressCircle = ({
  sqSize,
  strokeWidth,
  score,
  previousScore,
}) => {
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (sqSize - strokeWidth) / 2;
  const prevRadius = ((sqSize - strokeWidth) - 20) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  const prevDashArray = prevRadius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - ((dashArray * score) / 10);
  const prevDashOffset = prevDashArray - ((prevDashArray * previousScore) / 10);

  return (
    <div className="ProgressCircle">
      <svg
        className="circle-svg"
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
        <circle
          className="circle-previous-background"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={prevRadius - 5}
          strokeWidth="21px"
        />
        <circle
          className="circle-previous-progress"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={prevRadius}
          strokeWidth={`${strokeWidth}px`}
          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
          style={{ strokeDasharray: prevDashArray, strokeDashoffset: prevDashOffset }}
        />
        <text
          className="circle-text"
          x="50%"
          y="30%"
          dy=".3em"
          textAnchor="middle"
        >
          Overall Score
        </text>
        <text
          className="circle-score"
          x="50%"
          y="47%"
          dy=".3em"
          textAnchor="middle"
        >
          {score}
        </text>
        <text
          className="circle-previous-text"
          x="50%"
          y="63%"
          dy=".3em"
          textAnchor="middle"
        >
          Previous Score
        </text>
        <text
          className="circle-previous-score"
          x="50%"
          y="77%"
          dy=".2em"
          textAnchor="middle"
        >
          {previousScore}
        </text>
      </svg>
    </div>
  );
};

ProgressCircle.propTypes = {
  sqSize: PropTypes.string,
  strokeWidth: PropTypes.string,
  score: PropTypes.number,
  previousScore: PropTypes.number,
};

export default ProgressCircle;
