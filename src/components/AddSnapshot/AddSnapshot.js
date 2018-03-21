import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Input } from 'antd';
import CancelButton from '../CancelButton';

import * as workspaceActions from '../../store/Workspaces/actions';

class AddSnapshot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const data = { name };
    // dispatch to addWorkspace action
    this.props.addWorkspace(data);
  };

  render() {
    return (
      <div className="container">
        <CancelButton />
        <div className="panel">
          <p className="h4">New Snapshot</p>
          <form onSubmit={this.onSubmit}>
            <span>Name:</span>
            <Input value={this.state.name} onChange={this.onNameChange} />
            <button type="submit" className="button">
              Next
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addWorkspace: data => dispatch(workspaceActions.addWorkspace(data)),
});

AddSnapshot.propTypes = {
  addWorkspace: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(AddSnapshot);
