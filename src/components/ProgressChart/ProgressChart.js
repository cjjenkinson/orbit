import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProgressChartItem from '../ProgressChartItem/ProgressChartItem';
import './ProgressChart.css';

class ProgressChart extends Component {
  renderProgress = () => {
    if (Object.keys(this.props.progressEntries).length) {
      return Object.keys(this.props.progressEntries).map(key => (
        <ProgressChartItem key={key} entry={this.props.progressEntries[key]} />
      ));
    }
    return <h1 className="no-result">No progress to show</h1>;
  }

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
