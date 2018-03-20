import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as workspaceActions from '../../store/Workspaces/actions';

// import Button from '../Button';

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
    const data = { name };
    // dispatch to addWorkspace action
    this.props.addWorkspace(data);
  };

  render() {
    return (
      <div className="container">
        <div className="panel">
          <p className="h4">New Workspace</p>
          <form onSubmit={this.onSubmit}>
            <span className="h6">Workspace Name:</span>
            <input
              type="text"
              value={this.state.name}
              onChange={this.onNameChange}
              className="input"
            />
            <button type="submit">Create Workspace</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addWorkspace: (data) => dispatch(workspaceActions.addWorkspace(data)),
});

AddWorkspace.propTypes = {
  addWorkspace: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(AddWorkspace);
