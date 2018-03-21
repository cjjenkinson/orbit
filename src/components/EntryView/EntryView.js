import React, { Component } from 'react';

import { Row, Col } from 'antd';

import SubHeader from '../../components/SubHeader';
import Loader from '../../components/Loader';

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
            <div className="container">
              <div className="panel">
                <Row>
                  <Col span={12}>
                    <h3>Entry</h3>
                  </Col>
                  <Col span={12}>
                    <button className="button right">Add Snapshot</button>
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
