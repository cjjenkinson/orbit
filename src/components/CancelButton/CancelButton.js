import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './CancelButton.css';

class CancelButton extends Component {
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <a className="cancel-link" onClick={this.goBack}>
        Cancel
      </a>
    );
  }
}

CancelButton.propTypes = {
  history: PropTypes.object,
};

export default withRouter(CancelButton);
