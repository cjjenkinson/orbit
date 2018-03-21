import React, { Component } from 'react';

import { Row, Col } from 'antd';

import SubHeader from '../../components/SubHeader';
import Loader from '../../components/Loader';

class WorkspaceSettings extends Component {
  renderSubHeader = () => (
    <Row>
      <Col span={12}>
        <p className="breadcrumb">Workspaces /</p>
        <p className="">NAME /</p>
        <p className="">Settings</p>
      </Col>
      <Col span={12}>
        <p>Back</p>
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
                <p>Workspace Settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WorkspaceSettings;
