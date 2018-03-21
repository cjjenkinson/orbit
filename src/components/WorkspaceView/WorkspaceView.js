import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Row, Col } from 'antd';

import * as workspaceSelectors from '../../store/Workspaces/selectors';

import SubHeader from '../../components/SubHeader';
import Loader from '../../components/Loader';

class WorkspaceView extends Component {
  componentDidMount() {
    // fetch workspace entries
  }

  renderSubHeader = () => (
    <Row>
      <Col span={12}>
        <p>{this.props.workspace.name}</p>
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
                    <h2>Entries</h2>
                  </Col>
                  <Col span={12}>
                    <Link to={`${this.props.workspace._id}/add`}>
                      <button className="button right">New Entry</button>
                    </Link>
                  </Col>
                </Row>
                <Link to={`${this.props.workspace._id}/entry/tom_moore_id`}>
                  <p>Tom Moore</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const workspace = workspaceSelectors.getWorkspace(state, id);

  return {
    workspace,
  };
};

WorkspaceView.propTypes = {
  match: PropTypes.object,
  workspace: PropTypes.object,
};

export default connect(mapStateToProps)(WorkspaceView);
