import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'seamless-immutable';

import { Row, Col } from 'antd';

import Loader from '../Loader';
import BackButton from '../BackButton';
import Snapshot from '../Snapshot';

import './SnapshotView.css';

const createMutableData = data => Immutable.asMutable(data);

class SnapshotView extends Component {
  renderLoading = () => <Loader />;

  render() {
    const { snapshot } = this.props;
    const snapshotData = createMutableData(snapshot.enablers);
    console.log(snapshotData);
    return (
      <div className="viewer">
        <div className="flex">
          <div className="flex-item">
            <Row>
              <Col span={6}>
                <div className="snapshot-sidebar">
                  <BackButton>
                    <h4>Back to Snapshots</h4>
                  </BackButton>
                </div>
              </Col>
              <Col span={18}>
                <div className="snapshot-panel">
                  <h4>{snapshot.title}</h4>
                  <h4>{snapshot.date}</h4>
                  <div className="snapshot-container">
                    <Snapshot data={snapshotData} width={580} height={580} />
                  </div>
                </div>
              </Col>
            </Row>
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
