/* eslint-disable */
import React from 'react';
import { Group } from '@vx/group';
import { letterFrequency } from '@vx/mock-data';
import { scaleLinear } from '@vx/scale';
import { Point } from '@vx/point';
import { Line, LineRadial, LinePath } from '@vx/shape';
import { curveBasisOpen, curveCardinalClosed, curveNatural } from '@vx/curve';
import { max, min } from 'd3-array';
import mockData from './mockData';

// Angle of radar
const ANG = 360;

// Calculate the angle of the spikes of Axis
const calculateAxis = length => {
  if (!length) {
    return [];
  }
  return new Array(length + 1)
    .fill(0)
    .map((value, index) => ({ angle: index * (ANG / length) }));
};

// Calculate Points on each Axis
function calculatePoints(length, radius) {
  const step = Math.PI * 2 / length;
  return new Array(length)
    .fill(0)
    .map((value, index) => ({
      x: radius * Math.sin(index * step),
      y: radius * Math.cos(index * step),
    }));
}

// Calculate Coordinates on the chart
/* eslint-disable no-unused-vars */
function calculateCoordinates(data, scale, access) {
  const step = Math.PI * 2 / data.length;
  console.log('Step:', step);
  const points = new Array(data.length).fill({});
  console.log('Points:', points);
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
/* eslint-disable no-unused-vars */

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
  const webs = calculateAxis(mockData.length);
  const radius = min([xMax, yMax]) / 2;
  const points = calculatePoints(mockData.length, radius);
  const labelMargin = max(Object.values(margin)) - 20;
  // Polulate x and y coordinates
  const x = data => data.label;
  const y = data => data.score;

  // Labels
  const labels = mockData.map((item, index) => {
    return item.label;
  });
  // Calculate the scales
  const rScale = scaleLinear({
    range: [0, Math.PI * 2],
    domain: [ANG, 0],
  });
  const yScale = scaleLinear({
    range: [0, radius],
    domain: [0, max(mockData, y)],
  });

  // Calculate to coordinates
  const scoreCoordinates = calculateCoordinates(mockData, yScale, y);
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
        <polygon
          points={scoreCoordinates.str}
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
        {labels.map((label, index) => <title>{label}</title>)}
      </Group>
    </svg>
  );
};
/* eslint-disable */
