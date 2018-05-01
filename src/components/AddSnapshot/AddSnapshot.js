import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Input } from 'antd';
import moment from 'moment';
import BackButton from '../BackButton';
import AddSnapshotSlider from '../AddSnapshotSlider';

import * as workspaceSelectors from '../../store/Workspaces/selectors';
import * as entryActions from '../../store/Entries/actions';

import './AddSnapshot.css';

class AddSnapshot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(Date.now()).format('YYYY-MM-DD'),
      score: props.enablers.reduce((accum, label) => {
        accum[label] = {
          label,
          score: 1,
        };
        return accum;
      }, {}),
    };
  }

  onDateChange = (e) => {
    this.setState({
      date: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { workspaceId, entryId } = this.props;
    const { date } = this.state;
    const score = Object.keys(this.state.score).map(key => this.state.score[key]);
    const data = { date, score };
    // dispatch to addSnapshot action
    this.props.addSnapshot(workspaceId, entryId, data);
  };

  addEnablerScoreToState = (enablerScore) => {
    this.setState({
      score: { ...this.state.score, [enablerScore.label]: enablerScore },
    });
  };

  renderEnablers = () => {
    const { enablers } = this.props;
    return enablers.map((enabler, i) => (
      <AddSnapshotSlider
        key={i}
        enabler={enabler}
        finalValue={enablerScore => this.addEnablerScoreToState(enablerScore)}
      />
    ));
  };

  render() {
    return (
      <div className="container">
        <BackButton>Cancel</BackButton>
        <div className="panel add-snapshot-panel">
          <p className="h4">New Snapshot</p>
          <form onSubmit={this.onSubmit}>
            <span>Date:</span>
            <Input type="date" value={this.state.date} onChange={this.onDateChange} max={moment(Date.now()).format('YYYY-MM-DD')} required />
            {this.renderEnablers()}
            <button type="submit" className="button">
              Add
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { workspaceId, entryId } = ownProps.location.state;
  const enablers = workspaceSelectors.getEnablers(state, workspaceId);

  return {
    workspaceId,
    entryId,
    enablers,
  };
};

const mapDispatchToProps = dispatch => ({
  addSnapshot: (workspaceId, entryId, data) =>
    dispatch(entryActions.addSnapshot(workspaceId, entryId, data)),
});

AddSnapshot.propTypes = {
  addSnapshot: PropTypes.func,
  enablers: PropTypes.array,
  entryId: PropTypes.string,
  workspaceId: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSnapshot);
