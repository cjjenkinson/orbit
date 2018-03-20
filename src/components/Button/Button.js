import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

class Button extends Component {
  onClick = () => this.props.onClick();

  render() {
    return (
      <button
        className={this.props.primary ? 'button' : 'button secondary'}
        onClick={this.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  primary: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
