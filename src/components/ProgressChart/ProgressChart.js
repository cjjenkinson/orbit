import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProgressChartItem from '../ProgressChartItem/ProgressChartItem';
import './ProgressChart.css';

class ProgressChart extends Component {
  renderProgress = () =>
    Object.keys(this.props.progressEntries).map(key => (
      <ProgressChartItem key={key} entry={this.props.progressEntries[key]} />
    ));

  render() {
    return (
      <div className="progress-chart-container">{this.renderProgress()}</div>
    );
  }
}

ProgressChart.propTypes = {
  progressEntries: PropTypes.object,
};

export default ProgressChart;
