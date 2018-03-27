import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import get from 'lodash/get';

import { Row, Col, Icon, Popconfirm, message } from 'antd';

// import * as entrySelectors from '../../store/Entries/selectors';
import * as entryActions from '../../store/Entries/actions';

import SubHeader from '../../components/SubHeader';
import Loader from '../../components/Loader';

class EntryView extends Component {
  confirm = () => {
    const { deleteEntry, workspaceId, entry } = this.props;
    deleteEntry(workspaceId, entry._id);
    message.info('Entry succesfully deleted.');
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

  renderLoading = () => <Loader />;

  render() {
    return (
      <div>
        <SubHeader subHeaderComponent={this.renderSubHeader()} />
        <div className="flex">
          <div className="flex-item">
            <div className="container container-md">
              <h2>Entry view</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { workspaceId, entry } = ownProps.location.state;

  return {
    workspaceId,
    entry,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryView);
