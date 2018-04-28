import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

import './ProgressChartItem.css';

class ProgressChartItem extends Component {
  renderChart = () => {
    const chartData = this.props.entry.snapshots.map((snap) => {
      const overallTot = snap.enablers.reduce((a, b) => a + b.score, 0);
      const overallAvg =
        Math.round(((overallTot * 10) / snap.enablers.length) * 10) / 10;
      return { title: snap.title, 'Overall score': overallAvg };
    });
    return (
      <LineChart
        width={600}
        height={200}
        data={chartData}
        margin={
          {
           top: 5, right: 30, left: 20, bottom: 5,
          }
        }
      >
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="Overall score"
          stroke="#00C64F"
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
      </LineChart>
    );
  };

  render() {
    return (
      <div className="progress-chart-item">
        <div className="progress-info">
          <h1>{this.props.entry.name}</h1>
        </div>
        <div className="progress-chart">{this.renderChart()}</div>
      </div>
    );
  }
}

ProgressChartItem.propTypes = {
  entry: PropTypes.object,
};

export default ProgressChartItem;
