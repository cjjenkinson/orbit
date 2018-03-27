import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Input } from 'antd';
import CancelButton from '../CancelButton';
import AddSnapshotSlider from '../AddSnapshotSlider';

import * as workspaceActions from '../../store/Workspaces/actions';
import * as workspaceSelectors from '../../store/Workspaces/selectors';

import './AddSnapshot.css';

class AddSnapshot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      score: [],
    };
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };


  onSubmit = (e) => {
    e.preventDefault();
    const { score } = this.state;
    const data = { score };
    console.log('Data:', data);
    // dispatch to addSnapshot action
    // this.props.addSnapshot();
  };


  addEnablerScoreToState = (enablerScore) => {
    this.setState({
      score: [...this.state.score, enablerScore],
    });
  }

  renderEnablers = () => {
    const { enablers } = this.props;
    return enablers.map(enabler => (
      <AddSnapshotSlider
        key={`enabler: ${enabler}`}
        enabler={enabler}
        finalValue={enablerScore => this.addEnablerScoreToState(enablerScore)}
      />
    ));
  }

  render() {
    return (
      <div className="container">
        <CancelButton />
        <div className="panel add-snapshot-panel">
          <p className="h4">New Snapshot</p>
          <form onSubmit={this.onSubmit}>
            <span>Name:</span>
            <Input value={this.state.name} onChange={this.onNameChange} />
            {this.renderEnablers()}
            <button type="submit" className="button">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { workspaceId } = ownProps.location.state;
  const enablers = workspaceSelectors.getEnablers(state, workspaceId);
  return {
    workspaceId,
    enablers,
  };
};

const mapDispatchToProps = dispatch => ({
  addWorkspace: data => dispatch(workspaceActions.addWorkspace(data)),
});

AddSnapshot.propTypes = {
  addWorkspace: PropTypes.func,
  enablers: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSnapshot);
