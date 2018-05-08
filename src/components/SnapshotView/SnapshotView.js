/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'seamless-immutable';
import moment from 'moment';

import { Row, Col, Icon } from 'antd';

import Loader from '../Loader';
import BackButton from '../BackButton';
import Snapshot from '../Snapshot';
import SnapshotSideBar from '../SnapshotSideBar';

import './SnapshotView.css';

const createMutableData = data => Immutable.asMutable(data);

class SnapshotView extends Component {
  componentDidMount() {
    document.title = `Orbit | ${this.props.entry.name} - ${this.renderDate()}`;
  }

  renderLoading = () => <Loader />;

  renderDate = () => {
    const { snapshot } = this.props;
    return moment(snapshot.date).format('MMMM Do YYYY');
  }

  renderPreviousSnapshot = (id) => {
    const { snapshots } = this.props.entry;
    if (snapshots.length <= 1) {
      return 1;
    }
    return snapshots.reduce((acc, snapshot, index) => {
      if (snapshot._id === id) {
        return acc + index; // eslint-disable-line no-unused-expressions
      }
      return acc;
    }, 0);
  }

  renderPriorities = () => {
    const { snapshot } = this.props;
    const length = snapshot.enablers.length;
    const random = Math.floor(Math.random() * Math.floor(length));
    return random;
  }

  findAverage = (scoreData) => {
    const overall = scoreData.reduce((accumulator, currentValue) => (
      accumulator + currentValue.score), 0);
    const average = Math.round((overall / scoreData.length) * 100) / 10;
    return average;
  };

  render() {
    const { name } = this.props.entry;
    const { _id } = this.props.snapshot;
    const { snapshot } = this.props;
    const { snapshots } = this.props.entry;
    const snapshotData = createMutableData(snapshot.enablers);
    const position = this.renderPreviousSnapshot(_id);
    let previousData;
    if (position === 0) {
      previousData = snapshots[position];
    } else {
      previousData = snapshots[position - 1];
    }
    const priorityOne = snapshot.enablers[this.renderPriorities()];
    const priorityTwo = snapshot.enablers[this.renderPriorities()];
    const priorityThree = snapshot.enablers[this.renderPriorities()];
    const previous = this.findAverage(previousData.enablers);
    const overall = this.findAverage(snapshotData);
    const difference = overall - previous;
    return (
      <div>
        <div className="viewer">
          <div className="flex">
            <div className="flex-item">
              <Row>
                <Col span={6}>
                  <div className="snapshot-sidebar">
                    <BackButton className="back-button-container">
                      <h4 className="back-button"><Icon type="left" />Back to Snapshots</h4>
                    </BackButton>
                    <SnapshotSideBar data={snapshotData} previousData={previousData.enablers} />
                  </div>
                </Col>
                <Col span={18}>
                  <div className="snapshot-container">
                    <div className="snapshot-panel">
                      <div className="snapshot-header">
                        <h2 className="snapshot-title">{`${name} - ${this.renderDate()}`}</h2>
                        <div className="snapshot-publish">
                          <button className="button right">Publish</button>
                        </div>
                      </div>
                      <div className="snapshot-performance">
                        <div className="snapshot-header">
                          <h3 className="snapshot-header-title">Core Progress:</h3>
                          <div className="snapshot-legend">
                            <h3 className="legend-header">Legend:</h3>
                            <div className="legend-helper">
                              <h5>Current Score<div className="legend-current"></div></h5>
                            </div>
                            <div className="legend-helper">
                              <h5>Previous Score<div className="legend-previous"></div></h5>
                            </div>
                          </div>
                        </div>
                        <div className="snapshot-radar">
                          <Snapshot
                            data={snapshotData}
                            previousData={previousData.enablers}
                            width={650}
                            height={650}
                          />
                        </div>
                        <div className="snapshot-feedback-header">
                          <h3>Priorities:</h3>
                        </div>
                        <div className="snapshot-feedback">
                          <ul className="feedback-list">
                            <li>Great, your overall score has improved by <b className="feedback-bold">{difference.toFixed(2)}</b></li>
                            <li>Improve <b className="feedback-bold">{priorityOne.label}</b> to make the biggest increase to your overall score</li>
                            <li>Your most improved skill is <b className="feedback-bold">{priorityTwo.label}</b>, keep it up!</li>
                            <li>You should focus more time on <b className="feedback-bold">{priorityThree.label}</b> to ensure you keep improving overall performance at your current rate</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { snapshot, workspaceId, entry } = ownProps.location.state;

  return {
    snapshot,
    workspaceId,
    entry,
  };
};

SnapshotView.propTypes = {
  snapshot: PropTypes.object,
  entry: PropTypes.object,
};

export default connect(mapStateToProps, null)(SnapshotView);
/* eslint-disable */
