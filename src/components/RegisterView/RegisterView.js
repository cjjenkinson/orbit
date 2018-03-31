import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';

import { Link } from 'react-router-dom';

import * as authActions from '../../store/Auth/actions';
import * as authSelectors from '../../store/Auth/selectors';

const FormItem = Form.Item;

class RegisterView extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.register(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="public-landing">
        <div className="container">
          <div className="panel panel-sm p-16">
            <h2>Sign Up</h2>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please enter your team name' }],
                })(
                  <Input
                    prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Team name"
                  />,
                )}
              </FormItem>
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
                  Create Account
                </Button>
                <div>
                  Already have an account? <Link to="/login">Login</Link>
                </div>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

RegisterView.propTypes = {
  isFetching: PropTypes.bool,
  register: PropTypes.func,
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
  register: values => dispatch(authActions.register(values)),
});

const WrappedSignUpForm = Form.create()(RegisterView);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedSignUpForm);
