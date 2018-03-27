import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './BackButton.css';

class BackButton extends Component {
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { className, children } = this.props;
    return (
      <a
        className={className || 'cancel-link'}
        onClick={this.goBack}
      >
        {children}
      </a>
    );
  }
}

BackButton.propTypes = {
  history: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default withRouter(BackButton);
