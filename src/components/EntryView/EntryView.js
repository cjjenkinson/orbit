import React, { Component } from 'react';

import { Row, Col } from 'antd';

import SubHeader from '../../components/SubHeader';
import Loader from '../../components/Loader';
import Snapshot from '../../components/Snapshot';
import './EntryView.css';

class EntryView extends Component {
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
                <Row gutter={0} >
                  <Col span={4}>
                    <div className="left">
                      <div className="snapshot-container" id="top-left">
                        <Snapshot width={200} height={200} />
                      </div>
                      <div className="snapshot-container" id="bottom-left">
                        <Snapshot width={200} height={200} />
                      </div>
                    </div>
                  </Col>
                  <Col span={9}>
                    <div className="middle">
                      <div className="big-snapshot-container snapshot-container">
                        <Snapshot width={450} height={450} />
                      </div>
                      <div className="snapshot-container" id="bottom-center">
                        <Snapshot width={200} height={200} />
                      </div>
                    </div>
                  </Col>
                  <Col span={4}>
                    <div className="right">
                      <div className="snapshot-container" id="top-right">
                        <Snapshot width={200} height={200} />
                      </div>
                      <div className="snapshot-container" id="bottom-right">
                        <Snapshot width={200} height={200} />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EntryView;
