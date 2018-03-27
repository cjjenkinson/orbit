import React, { Component } from 'react';

import { Row, Col } from 'antd';

import SubHeader from '../../components/SubHeader';
import Loader from '../../components/Loader';
import Snapshot from '../../components/Snapshot';
import mockData from '../../components/Snapshot/mockData';

import './SnapshotView.css';

class SnapshotView extends Component {
  renderSubHeader = () => (
    <Row>
      <Col span={12}>
        <p className="breadcrumb">January 18 Cohort /</p>
        <p className="">Tom Moore</p>
      </Col>
    </Row>
  );

  renderLoading = () => <Loader />;

  render() {
    return (
      <div>
        <SubHeader subHeaderComponent={this.renderSubHeader()} />
        <div className="flex">
          <div className="flex-item">
            <div className="entry-container">
              <div className="entry-panel">
                <Row>
                  <Col span={12}>
                    <h3>Entry</h3>
                  </Col>
                  <Col span={12}>
                    <button className="button right">Add Snapshot</button>
                  </Col>
                </Row>
                <div className="snapshot-panel">
                  <Row>
                    <Col span={9}>
                      <div className="middle">
                        <div className="snapshot-container">
                          <Snapshot data={mockData} width={700} height={700} />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SnapshotView;
