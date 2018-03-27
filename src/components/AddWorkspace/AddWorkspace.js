import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form, Input, Icon, Button } from 'antd';
import CancelButton from '../CancelButton';

import * as workspaceActions from '../../store/Workspaces/actions';

const FormItem = Form.Item;
let uuid = 0;
class AddWorkspace extends Component {
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid += 1;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addWorkspace(values);
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <FormItem
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Enabler' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`enablers[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: 'Please input enabler or delete this field.',
            },
          ],
        })(<Input placeholder="enabler" style={{ width: '80%' }} />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </FormItem>
    ));
    return (
      <div className="container">
        <CancelButton />
        <div className="panel">
          <div className="panel-section">
            <h2>New Workspace</h2>
          </div>
          <div className="p-16">
            <Form onSubmit={this.handleSubmit}>
              <FormItem label="Workspace">
                {getFieldDecorator('workspaceName', {
                  rules: [{ required: true, message: 'Workspace name' }],
                })(
                  <Input
                    type="workspaceName"
                    placeholder="e.g January cohort, marketing department"
                  />,
                )}
              </FormItem>
              <FormItem label="Entry Reference">
                {getFieldDecorator('entryReference', {
                  rules: [{ required: true, message: 'Enter a reference for entries' }],
                })(<Input type="entryName" placeholder="e.g student, attacker, employee" />)}
              </FormItem>
              <h4>Enablers</h4>
              {formItems}
              <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={this.add} style={{ width: '80%' }}>
                  <Icon type="plus" /> Add Enabler
                </Button>
              </FormItem>
              <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="primary" htmlType="submit">
                  Create Workspace
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addWorkspace: data => dispatch(workspaceActions.addWorkspace(data)),
});

AddWorkspace.propTypes = {
  addWorkspace: PropTypes.func,
  form: PropTypes.object,
};

const WrappedAddWorkspace = Form.create()(AddWorkspace);

export default connect(null, mapDispatchToProps)(WrappedAddWorkspace);
