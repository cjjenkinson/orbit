/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import { Group } from '@vx/group';
import { min } from 'd3-array';
import { Line } from '@vx/shape';
import { Point } from '@vx/point';
import { scaleLinear } from '@vx/scale';
import SnapshotPoint from './SnapshotPoint';
import SnapshotLabel from './SnapshotLabel';
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

class Snapshot extends React.Component {
  render() {
    // Snapshot must be above 10px in size
    if (this.props.width < 10) return null;

    // Margins & Levels
    const margin = {
      top: 0,
      left: 0,
      right: 20,
      bottom: 100,
    }
    const levels = 5;

    // Declare the height and width of the snapshot area inside the component
    const xMax = (this.props.width - 150) - margin.left - margin.right;
    const yMax = (this.props.height - 150) - margin.top - margin.bottom;

    // Create axis positions using data
    const radius = min([xMax, yMax]) / 2;
    const lRadius = radius + 20;
    const points = calculatePoints(this.props.data.length, radius);
    const lPoints = calculatePoints(this.props.data.length, lRadius);

    // Polulate x and y coordinates
    const y = d => d.score;

    // Render Labels
    const labelsArray = this.props.data.map(item => item.label);
    const sortedLabelsArray = (labels) => {
      const lastLabel = labels[labels.length - 1];
      labels.unshift(lastLabel);
      labels.splice(labels.length - 1, 1);
      return labels;
    };
    const labels = sortedLabelsArray(labelsArray);

    // Shift Points backwards one place
    const sortedPointsArray = (pointsArray) => {
      const firstSetOfPoints = pointsArray[0];
      pointsArray.push(firstSetOfPoints);
      pointsArray.splice(0, 1);
      return pointsArray;
    }
    const newPointsArray = sortedPointsArray(lPoints);

    // Calculate the scale for score
    const yScale = scaleLinear({
      range: [0, radius],
      domain: [0, 1],
    });

    // Calculate to coordinates with and without labels
    const scoreCoordinates = calculateCoordinates(this.props.data, yScale, y);
    const scoreCoordinatesWithLabels = scoreCoordinates.reduce((accumulator, coordinates, index) => {
      const label = labels[index];
      return [...accumulator, {...coordinates, label}];
    },[]);

    const numberOflabels = 360 / scoreCoordinatesWithLabels.length;


    // Calculate Quadratic coordinates for curve
    function makePathCoordinates(coordinates) {
      const coordinatesArray = coordinates.str.trim().split(' ');
      const firstCoordinate = coordinatesArray[0];
      const extendedCoordinatesArray = coordinatesArray.concat(firstCoordinate);
      const masterCoordinate = 'M';
      const quadraticCoordinate = 'Q 0,0';
      extendedCoordinatesArray.splice(0, 0, masterCoordinate);
      const numberOfIterations = extendedCoordinatesArray.length - 2;
      for (let i = 1; i <= numberOfIterations; i += 1) {
        extendedCoordinatesArray.splice(i * 2, 0, quadraticCoordinate);
      }
      return extendedCoordinatesArray.join(' ');
    }

    // Utilities
    const pathCoordinates = makePathCoordinates(scoreCoordinates);
    const levelNumbers = [2, 4, 6, 8];

    // Render the component
    return (
      <svg width={this.props.width + 100} height={this.props.height + 50} className="snapshot">
        <rect fill="#ffffff" width={this.props.width} height={this.props.height} rx={14} />
        <Group top={this.props.height / 2 - margin.top} left={this.props.width / 2}>
          {levelNumbers.map((number, index) => (
            <text
              key={`level-${index + 1}`}
              strokeWidth={0.5}
              stroke="rgb(223, 223, 223)"
              style={{ fontSize: 8 }}
              x={2}
              y={(index + 1.2) * radius / 5}
            >
              {number}
            </text>
          ))}
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
          {[...new Array(this.props.data.length)].map((value, index) => (
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
          {scoreCoordinatesWithLabels.map((value, index) => (
            <SnapshotPoint
              cx={value.x}
              cy={value.y}
            />
          ))}
          {scoreCoordinatesWithLabels.map((value, index) => (
            <SnapshotLabel
              lx={newPointsArray[index].x}
              ly={newPointsArray[index].y}
              label={value.label}
              transform={`translate(0,0)`}
            />
          ))}
        </Group>
      </svg>
    );
  }
}

Snapshot.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.object,
  levels: PropTypes.number,
  data: PropTypes.array,
};

export default Snapshot;
/* eslint-disable */
