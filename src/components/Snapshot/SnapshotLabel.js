/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import './Snapshot.css';

class SnapshotLabel extends React.Component {
  render() {
    return (
      <text
        className="labels"
        stroke="#52247f"
        strokeWidth={0.5}
        style={{ fontSize: 10 }}
        x={this.props.lx * 1.3}
        y={this.props.ly * 1.1}
        textAnchor="middle"
        transform={this.props.transform}
      >
        {this.props.label}
      </text>
    )
  }
}

SnapshotLabel.propTypes = {
  lx: PropTypes.number,
  ly: PropTypes.number,
  label: PropTypes.string,
  transform: PropTypes.string,
};

export default SnapshotLabel;
/* eslint-disable */
