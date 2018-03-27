/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import './Snapshot.css';

class SnapshotLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    }
  }

  toggleHover = () => {
    this.setState({hover: !this.state.hover});
  }

  render() {
    const labelStyle = {
      visibility: this.state.hover ? 'visible' : 'hidden',
    }
    return (
      <g>
        <circle
          cx={this.props.cx}
          cy={this.props.cy}
          r={3}
          fill="#52247f"
          className="dots"
          // onClick={this.toggleHover}
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
        ></circle>
        <text
          className="labels"
          stroke="#52247f"
          strokeWidth={0.5}
          style={labelStyle}
          x={this.props.lx}
          y={this.props.ly}
        >
          {this.props.label}
        </text>
      </g>
    )
  }
}

SnapshotLabel.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  lx: PropTypes.number,
  ly: PropTypes.number,
  label: PropTypes.string,
};

export default SnapshotLabel;
/* eslint-disable */
