import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import ProgressChartItem from '../ProgressChartItem/ProgressChartItem';
import './ProgressChart.css';

class ProgressChart extends Component {

  renderProgress = () => {
    return Object.keys(this.props.progressEntries).map(key => <ProgressChartItem entry={this.props.progressEntries[key]} />);
  }; 

  render() {
    return (
      <div className="progress-chart-container">
        {this.renderProgress()}
      </div>
    );
  }
}

// ProgressChart.propTypes = {

// };

export default ProgressChart;
