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
                        <h2 className="snapshot-title">{`${name} - ${snapshot.title}`}</h2>
                        <h5 className="snapshot-date">{this.renderDate()}</h5>
                        <div className="snapshot-publish">
                          <button className="button right">Publish</button>
                        </div>
                      </div>
                      <div className="snapshot-performance">
                        <div className="snapshot-header">
                          <h3>Core Progress:</h3>
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
                          <ul>
                            <li>Test</li>
                            <li>Test</li>
                            <li>Test</li>
                            <li>Test</li>
                            <li>Test</li>
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
