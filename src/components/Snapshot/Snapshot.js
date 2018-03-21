/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import { Group } from '@vx/group';
import { min } from 'd3-array';
import { Line } from '@vx/shape';
import { Point } from '@vx/point';
import { scaleLinear } from '@vx/scale';
import mockData from './mockData';
import './Snapshot.css';

// Calculates Points on each Axis
function calculatePoints(length, radius) {
  const step = Math.PI * 2 / length; // eslint-disable-line no-mixed-operators
  return new Array(length).fill(0).map((value, index) => ({
    x: radius * Math.sin(index * step),
    y: radius * Math.cos(index * step),
  }));
}

// Calculate Coordinates on the chart of the scores
function calculateCoordinates(data, scale, access) {
  const step = Math.PI * 2 / data.length; // eslint-disable-line no-mixed-operators
  const points = new Array(data.length).fill({});
  const pointString = new Array(data.length + 1)
    .fill('')
    .reduce((result, value, index) => {
      if (index > data.length) return result;
      const x = scale(access(data[index - 1])) * Math.sin(index * step);
      const y = scale(access(data[index - 1])) * Math.cos(index * step);
      points[index - 1] = { x, y };
      result += `${x},${y} `; // eslint-disable-line no-param-reassign
      return result;
    });
  points.str = pointString;
  return points;
}

// Snapshot component
const Snapshot = ({
  width = 500,
  height = 500,
  margin = {
    top: 10,
    left: 80,
    right: 80,
    bottom: 80,
  },
  levels = 5,
  data = mockData,
}) => {
  // Snapshot must be above 10px in size
  if (width < 10) return null;

  // Declare the height and width of the snapshot area inside the component
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Create axis positions using data
  const radius = min([xMax, yMax]) / 2;
  const points = calculatePoints(data.length, radius);

  // Polulate x and y coordinates
  const y = d => d.score;

  // Map Labels into an array
  const labels = data.map(item => item.label);

  // Calculate the scale for score
  const yScale = scaleLinear({
    range: [0, radius],
    domain: [0, 1],
  });

  // Calculate to coordinates
  const scoreCoordinates = calculateCoordinates(data, yScale, y);

  // Calculate Quadratic coordinates for curve
  function makePathCoordinates(coordinates) {
    const coordinatesArray = coordinates.str.trim().split(' ');
    const firstCoordinate = coordinatesArray[0];
    const extendedCoordinatesArray = coordinatesArray.concat(firstCoordinate);
    const masterCoordinate = 'M';
    const quadraticCoordinate = 'Q 0,0';
    extendedCoordinatesArray.splice(0, 0, masterCoordinate);
    for (let i = 1; i <= 5; i += 1) {
      extendedCoordinatesArray.splice(i * 2, 0, quadraticCoordinate);
    }
    return extendedCoordinatesArray.join(' ');
  }
  const pathCoordinates = makePathCoordinates(scoreCoordinates);

  // Render the component
  return (
    <svg width={width} height={height} className="snapshot">
      <rect fill="#ffffff" width={width} height={height} rx={14} />
      <Group top={height / 2 - margin.top} left={width / 2}>
        <text
          strokeWidth={0.5}
          stroke="rgb(223, 223, 223)"
          style={{ fontSize: 8 }}
          x={2}
          y={10}
        >
          0
        </text>
        <text
          strokeWidth={0.5}
          stroke="rgb(223, 223, 223)"
          style={{ fontSize: 8 }}
          x={2}
          y={40}
        >
          2
        </text>
        <text
          strokeWidth={0.5}
          stroke="rgb(223, 223, 223)"
          style={{ fontSize: 8 }}
          x={2}
          y={70}
        >
          4
        </text>
        <text
          strokeWidth={0.5}
          stroke="rgb(223, 223, 223)"
          style={{ fontSize: 8 }}
          x={2}
          y={103}
        >
          6
        </text>
        <text
          strokeWidth={0.5}
          stroke="rgb(223, 223, 223)"
          style={{ fontSize: 8 }}
          x={2}
          y={135}
        >
          8
        </text>
        {[...new Array(levels)].map((value, index) => (
          <circle
            r={(index + 1) * radius / levels}
            key={`web-${index + 1}`}
            cx={0}
            cy={0}
            stroke="#eceef1"
            strokeWidth={2}
            strokeOpacity={0.8}
            strokeLinecap="round"
            fill="none"
          />
        ))}
        {[...new Array(data.length)].map((value, index) => (
          <Line
            key={`line-${index + 1}`}
            from={new Point({ x: 0, y: 0 })}
            to={new Point({ x: points[index].x, y: points[index].y })}
            stroke="#eceef1"
          />
        ))}
        <path
          d={pathCoordinates}
          fill="rgba(116, 96, 246, 1)"
          fillOpacity="0.1"
          stroke="#4566d1"
          strokeWidth={2}
        />
        {scoreCoordinates.map((value, index) => (
          <circle
            key={`point-${index + 1}`}
            cx={value.x}
            cy={value.y}
            r={3}
            fill="#52247f"
            className="dots"
          />
        ))}
        <text
          stroke="#52247f"
          strokeWidth={0.5}
          style={{ fontSize: 14 }}
          x={points[0].x - 25}
          y={points[0].y + 40}
        >
          {labels[4]}
        </text>
        <text
          stroke="#52247f"
          strokeWidth={0.5}
          style={{ fontSize: 14 }}
          x={points[1].x + 20}
          y={points[1].y + 10}
        >
          {labels[0]}
        </text>
        <text
          stroke="#52247f"
          strokeWidth={0.5}
          style={{ fontSize: 14 }}
          x={points[2].x + 10}
          y={points[2].y - 30}
        >
          {labels[1]}
        </text>
        <text
          stroke="#52247f"
          strokeWidth={0.5}
          style={{ fontSize: 14 }}
          x={points[3].x - 80}
          y={points[3].y - 30}
        >
          {labels[2]}
        </text>
        <text
          stroke="#52247f"
          strokeWidth={0.5}
          style={{ fontSize: 14 }}
          x={points[4].x - 80}
          y={points[4].y + 15}
        >
          {labels[3]}
        </text>
      </Group>
    </svg>
  );
};

Snapshot.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.object,
  levels: PropTypes.number,
  data: PropTypes.array,
};

export default Snapshot;
/* eslint-disable */
