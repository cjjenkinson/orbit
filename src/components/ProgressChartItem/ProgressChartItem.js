import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from 'recharts';

import './ProgressChartItem.css';

class ProgressChartItem extends Component {
  renderProgressChart = () => {
    const chartData = this.props.entry.snapshots.map((snap) => {
      const overallTot = snap.enablers.reduce((a, b) => a + b.score, 0);
      const overallAvg = Math.round(((overallTot * 10) / snap.enablers.length) * 10) / 10;
      return { date: moment(snap.date).format('MMMM Do'), 'Overall score': overallAvg };
    });
    return (
      <LineChart
        width={350}
        height={170}
        data={chartData}
        margin={
          {
           top: 10, right: 10, left: -40, bottom: 0,
          }
        }
      >
        <XAxis dataKey="date" interval="preserveStartEnd" />
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

  renderEnablerChart = () => {
    if (!this.props.entry.snapshots[0]) return null;
    const initial = this.props.entry.snapshots[0].enablers;
    const current = this.props.entry.snapshots[this.props.entry.snapshots.length - 1].enablers;
    const enablers = initial.map(enabler => ({
      label: enabler.label,
      Initial: enabler.score * 10,
      Current: current.find(el => el.label === enabler.label).score * 10,
    }));
    return (
      <BarChart width={650} height={230} data={enablers}>
        <XAxis dataKey="label" interval="preserveStartEnd" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={30} />
        <Bar dataKey="Initial" fill="#8884d8" />
        <Bar dataKey="Current" fill="#82ca9d" />
      </BarChart>
    );
  }

  render() {
    return (
      <div className="progress-chart-item">
        <div className="progress-info">
          <h1>{this.props.entry.name}</h1>
          <div className="enablers-chart">{this.renderProgressChart()}</div>
        </div>
        <div className="progress-chart">{this.renderEnablerChart()}</div>
      </div>
    );
  }
}

ProgressChartItem.propTypes = {
  entry: PropTypes.object,
};

export default ProgressChartItem;
