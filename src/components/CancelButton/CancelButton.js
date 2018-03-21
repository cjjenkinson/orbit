import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class CancelButton extends Component {
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <button className="cancel-link" onClick={this.goBack}>
        Cancel
      </button>
    );
  }
}

CancelButton.propTypes = {
  history: PropTypes.object,
};

export default withRouter(CancelButton);
