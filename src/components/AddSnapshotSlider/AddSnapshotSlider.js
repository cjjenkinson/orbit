import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Slider } from 'antd';

import './AddSnapshotSlider.css';

class AddSnapshotSlider extends Component {
  onAfterSlideChange = (value = 1) => {
    const enablerScore = {
      label: this.props.enabler,
      score: value,
    };
    this.props.finalValue(enablerScore);
  }

  render() {
    return (
      <div className="add-snapshot-slider-container">
        <p className="add-snapshot-slider-label">{this.props.enabler}</p>
        <Slider
          className="add-snapshot-slider"
          step={1}
          defaultValue={1}
          min={1}
          max={10}
          onChange={this.onAfterSlideChange}
        />
      </div>
    );
  }
}

AddSnapshotSlider.propTypes = {
  enabler: PropTypes.string,
  finalValue: PropTypes.func,
};

export default AddSnapshotSlider;
