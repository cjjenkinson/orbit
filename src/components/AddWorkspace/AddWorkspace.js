import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Input } from 'antd';
import CancelButton from '../CancelButton';

import * as workspaceActions from '../../store/Workspaces/actions';

class AddWorkspace extends Component {
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
    // TODO: category is hard coded, should be from user team name
    const data = {
      name,
      category: 'testcategory2',
    };
    // dispatch to addWorkspace action
    this.props.addWorkspace(data);
  };

  render() {
    return (
      <div className="container">
        <CancelButton />
        <div className="panel">
          <p className="h4">New Workspace</p>
          <form onSubmit={this.onSubmit}>
            <span>Workspace Name:</span>
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

AddWorkspace.propTypes = {
  addWorkspace: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(AddWorkspace);
