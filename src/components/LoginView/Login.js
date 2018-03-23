import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';

import { Link } from 'react-router-dom';

import * as authActions from '../../store/Auth/actions';
import * as authSelectors from '../../store/Auth/selectors';

const FormItem = Form.Item;

class LoginView extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="public-landing">
        <div className="container">
          <div className="panel panel-sm">
            <h2>Login</h2>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please enter your email' }],
                })(
                  <Input
                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email"
                  />,
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please enter your password' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={this.props.isFetching}
                >
                  Log in
                </Button>
                <div>
                  <Link to="/signup">Sign Up</Link>
                </div>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

LoginView.propTypes = {
  isFetching: PropTypes.bool,
  login: PropTypes.func,
  form: PropTypes.any,
  validateFields: PropTypes.func,
};

const mapStateToProps = (state) => {
  const isFetching = authSelectors.getFetchingStatus(state);

  return {
    isFetching,
  };
};

const mapDispatchToProps = dispatch => ({
  login: values => dispatch(authActions.login(values)),
});

const WrappedLoginForm = Form.create()(LoginView);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm);
