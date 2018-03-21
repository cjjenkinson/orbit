/* eslint-disable */
import React from 'react';
import { Group } from '@vx/group';
import { letterFrequency } from '@vx/mock-data';
import { scaleLinear } from '@vx/scale';
import { Point } from '@vx/point';
import { Line, LineRadial } from '@vx/shape';
import { max, min } from 'd3-array';
import mockData from './mockData';

// Angle of radar
const ANG = 360;

// Calculate Points on each Axis
function calculatePoints(length, radius) {
  const step = Math.PI * 2 / length;
  return new Array(length).fill(0).map((value, index) => ({
    x: radius * Math.sin(index * step),
    y: radius * Math.cos(index * step),
  }));
}

// Calculate Coordinates on the chart
function calculateCoordinates(data, scale, access) {
  const step = Math.PI * 2 / data.length;
  const points = new Array(data.length).fill({});
  const pointString = new Array(data.length + 1)
    .fill('')
    .reduce((result, value, index) => {
      if (index > data.length) {
        return result;
      }
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
export default ({
  width = 600,
  height = 600,
  events = false,
  margin = {
    top: 20,
    left: 80,
    right: 80,
    bottom: 80,
  },
  levels = 5,
}) => {
  // Snapshot must be above 10px in size
  if (width < 10) {
    return null;
  }

  // Declare the height and width of the snapshot area inside the component
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Create axis positions using mockData
  const radius = min([xMax, yMax]) / 2;
  const points = calculatePoints(mockData.length, radius);
  console.log('Points:', points);
  // Polulate x and y coordinates
  // const x = data => data.label;
  const y = data => data.score;

  // Labels
  const labels = mockData.map((item, index) => {
    return item.label;
  });

  // Calculate the scale for score
  const yScale = scaleLinear({
    range: [0, radius],
    domain: [0, 1],
  });

  // Calculate to coordinates
  const scoreCoordinates = calculateCoordinates(mockData, yScale, y);

  //Calculate Quadratic coordinates for curve
  function makePathCoordinates(coordinates) {
    const coordinatesArray = coordinates.str.trim().split(' ');
    const firstCoordinate = coordinatesArray[0];
    const extendedCoordinatesArray = coordinatesArray.concat(firstCoordinate);
    const masterCoordinate = 'M';
    const quadraticCoordinate = 'Q 0,0';
    extendedCoordinatesArray.splice(0, 0, masterCoordinate);
    extendedCoordinatesArray.splice(2, 0, quadraticCoordinate);
    extendedCoordinatesArray.splice(4, 0, quadraticCoordinate);
    extendedCoordinatesArray.splice(6, 0, quadraticCoordinate);
    extendedCoordinatesArray.splice(8, 0, quadraticCoordinate);
    extendedCoordinatesArray.splice(10, 0, quadraticCoordinate);
    return extendedCoordinatesArray.join(' ');
  }
  const pathPoints = makePathCoordinates(scoreCoordinates);

  // Render the component
  return (
    <svg width={width} height={height}>
      <rect fill="#ffffff" width={width} height={height} rx={14} />
      <Group top={height / 2 - margin.top} left={width / 2}>
        {[...new Array(levels)].map((value, index) => (
          <circle
            r={(index + 1) * radius / levels}
            key={`web-${index}`}
            cx={0}
            cy={0}
            stroke="#eceef1"
            strokeWidth={2}
            strokeOpacity={0.8}
            strokeLinecap="round"
            fill="none"
          />
        ))}
        {[...new Array(mockData.length)].map((value, index) => (
          <Line
            key={`line-${index}`}
            from={new Point({ x: 0, y: 0 })}
            to={new Point({ x: points[index].x, y: points[index].y })}
            stroke="#eceef1"
          />
        ))}
        <path
          d={pathPoints}
          fill="rgba(116, 96, 246, 1)"
          fillOpacity="0.1"
          stroke="#4566d1"
          strokeWidth={2}
        />
        {scoreCoordinates.map((value, index) => (
          <circle
            key={`point-${index}`}
            cx={value.x}
            cy={value.y}
            r={4}
            fill="#52247f"
            className="dots"
          />
        ))}
        {labels.map((label, index) => (
          <text
            stroke="#52247f"
            strokeWidth={0.5}
            x={points[index].x}
            y={points[index].y}
          >
            {label}
          </text>
        ))}
      </Group>
    </svg>
  );
};
/* eslint-disable */
