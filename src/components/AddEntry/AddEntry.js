import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Input } from 'antd';
import BackButton from '../BackButton';

import * as entryActions from '../../store/Entries/actions';

class AddEntry extends Component {
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

    const { id } = this.props.match.params;
    this.props.addEntry(id, data);
  };

  render() {
    return (
      <div className="container">
        <BackButton>
          Cancel
        </BackButton>
        <div className="panel">
          <div className="panel-section">
            <h2>New Entry</h2>
          </div>
          <div className="p-16">
            <form onSubmit={this.onSubmit}>
              <span>Name:</span>
              <Input value={this.state.name} onChange={this.onNameChange} className="input-field"/>
              <button type="submit" className="button">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addEntry: (id, data) => dispatch(entryActions.addEntry(id, data)),
});

AddEntry.propTypes = {
  id: PropTypes.string,
  match: PropTypes.object,
  addEntry: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(AddEntry);
