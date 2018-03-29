/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import './Snapshot.css';

class SnapshotPoint extends React.Component {
  render() {
    return (
      <circle
        cx={this.props.cx}
        cy={this.props.cy}
        r={3}
        fill={this.props.fill}
        className="dots"
      ></circle>
    )
  }
}

SnapshotPoint.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  fill: PropTypes.string,
};

export default SnapshotPoint;
/* eslint-disable */
