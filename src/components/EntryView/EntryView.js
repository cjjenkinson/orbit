import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Row, Col, Icon, Popconfirm } from 'antd';

import * as entrySelectors from '../../store/Entries/selectors';
import * as entryActions from '../../store/Entries/actions';

import SubHeader from '../../components/SubHeader';
import Loader from '../../components/Loader';

class EntryView extends Component {
  confirm = () => {
    const { deleteEntry, workspaceId, entry } = this.props;
    deleteEntry(workspaceId, entry._id);
  };

  renderSubHeader = () => {
    const { name } = this.props.entry;
    return (
      <Row>
        <Col span={12}>
          <p>{name}</p>
        </Col>
        <Col span={12}>
          <div className="right">
            <Popconfirm
              placement="bottomRight"
              title="Are you sure you want to delete this entry?"
              onConfirm={this.confirm}
              okText="Yes"
              cancelText="No"
            >
              <Icon type="delete" style={{ fontSize: 19, color: '#24273A' }} />
            </Popconfirm>
          </div>
        </Col>
      </Row>
    );
  };

  renderSnapshots = () => {
    const { snapshots, workspaceId, entry } = this.props;
    return snapshots.length
      ? snapshots.map(s => (
        <div className="panel-item" key={s._id}>
          <Link
            to={{
                pathname: `${entry.name}/${s._id}`,
                state: {
                  snapshot: s,
                  workspaceId,
                  entry,
                },
              }}
          >
            <span>{s.title}</span>
          </Link>
        </div>
      ))
      : null;
  };

  renderLoading = () => <Loader />;

  render() {
    const { entry, workspaceId } = this.props;
    return (
      <div>
        <SubHeader subHeaderComponent={this.renderSubHeader()} />
        <div className="flex">
          <div className="flex-item">
            <div className="container container-md">
              <div className="panel">
                <div className="panel-section">
                  <Link
                    to={{
                      pathname: `${entry.name}/add`,
                      state: {
                        workspaceId,
                        entryId: entry._id,
                      },
                    }}
                  >
                    <button className="button right">Add Snapshot</button>
                  </Link>
                  <h3>Snapshots</h3>
                </div>
                {this.renderSnapshots()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { workspaceId, entry } = ownProps.location.state;
  const snapshots = entrySelectors.getSnapshots(state, entry._id);

  return {
    workspaceId,
    entry,
    snapshots,
  };
};

const mapDispatchToProps = dispatch => ({
  deleteEntry: (workspaceId, entryId) => dispatch(entryActions.deleteEntry(workspaceId, entryId)),
});

EntryView.propTypes = {
  entry: PropTypes.object,
  id: PropTypes.string,
  workspaceId: PropTypes.string,
  match: PropTypes.object,
  deleteEntry: PropTypes.func,
  snapshots: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryView);
