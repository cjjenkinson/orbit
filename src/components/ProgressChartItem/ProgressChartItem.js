import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import './ProgressChartItem.css';

class ProgressChartItem extends Component {

  renderChart = () => {
    const chartData = this.props.entry.snapshots.map((snap) => {
      const overallTot = snap.enablers.reduce((a, b) => {
        return a + b.score;
      }, 0);
      const overallAvg = Math.round(overallTot * 10 / snap.enablers.length *10) / 10;
      return {'title':snap.title, 'Overall score': overallAvg};
    });
    return (
      <LineChart width={600} height={200} data={chartData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="title"/>
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="Overall score" stroke="#00C64F" activeDot={{ r: 8 }} strokeWidth={2} />
      </LineChart>
    );
  }

  render() {
    console.log(this.props.entry);
    return (
      <div className="progress-chart-item">
        <div className="progress-info"></div>
        <div className="progress-chart">
          {this.renderChart()}
        </div>
      </div>
    );
  }
}

// ProgressChartItem.propTypes = {

// };

export default ProgressChartItem;
