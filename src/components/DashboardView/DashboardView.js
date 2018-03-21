import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Input, Row, Col, Table, Divider } from 'antd';

import './DashboardView.css';

import * as utils from '../../utils';
import * as workspaceSelectors from '../../store/Workspaces/selectors';
import * as workspaceActions from '../../store/Workspaces/actions';

import Loader from '../../components/Loader';
import Button from '../../components/Button';

const { Search } = Input;

class DashboardView extends Component {
  componentDidMount() {
    // Don't fetch if workspaces are hydrated from localStorage
    this.props.getWorkspaces();
  }

  onDeleteWorkspace = (id) => {
    this.props.deleteWorkspace(id);
  };

  renderActions = () => (
    <div className="dashboard-actions">
      <Row>
        <Col span={12}>
          <Search style={{ width: 400 }} />
        </Col>
        <Col span={12}>
          <Link to="/add">
            <Button primary>Add Workspace</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );

  renderWorkspaces() {
    const { workspacesById } = this.props;

    const tableData = utils.createTableDataFromEntities(workspacesById);
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>,
      },
      {
        title: 'Entries',
        dataIndex: 'entries',
        key: 'entries',
      },
      {
        title: 'Action',
        dataIndex: '_id',
        key: 'action',
        render: id => (
          <span>
            <Divider type="vertical" />
            <Link to={`workspace/${id}`}>View</Link>
            <Divider type="vertical" />
            <a href="#" onClick={() => this.onDeleteWorkspace(id)}>
              Delete
            </a>
          </span>
        ),
      },
    ];

    return (
      <div className="panel">
        <Table columns={columns} dataSource={tableData} rowKey="_id" />
      </div>
    );
  }

  renderLoading = () => <Loader />;

  render() {
    const { isFetching } = this.props;
    return (
      <div className="container">
        {isFetching ? (
          this.renderLoading()
        ) : (
          <div>
            {this.renderActions()}
            {this.renderWorkspaces()}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const isFetching = workspaceSelectors.isFetching(state);
  const [workspacesById, workspacesByIdArray] = workspaceSelectors.getWorkspacesById(state);

  return {
    isFetching,
    workspacesById,
    workspacesByIdArray,
  };
};

const mapDispatchToProps = dispatch => ({
  getWorkspaces: () => dispatch(workspaceActions.getWorkspaces()),
  deleteWorkspace: id => dispatch(workspaceActions.deleteWorkspace(id)),
});

DashboardView.propTypes = {
  isFetching: PropTypes.bool,
  getWorkspaces: PropTypes.func,
  deleteWorkspace: PropTypes.func,
  workspacesById: PropTypes.object,
  workspacesByIdArray: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
