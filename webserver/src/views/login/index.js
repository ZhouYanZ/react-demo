import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actionCreates';
import { Form, Input, Button } from 'antd';
import { LoginWrap } from './style';

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    // 表单校验
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 校验成功，没有毛病
        console.log('Received values of form: ', values);

        this.props.handleSignIn(values);
      }
    });
  };

  render() {
    let { getFieldDecorator } = this.props.form;
    return (
      <LoginWrap>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Please input email' },
                {
                  type: 'email',
                  message: 'Please sure email'
                }
              ]
            })(<Input placeholder="用户邮箱" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input password' },
                { min: 3, message: '最少要3位数' }
              ]
            })(<Input type="password" placeholder="用户密码" />)}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">登录</Button>
          </Form.Item>
        </Form>
      </LoginWrap>
    );
  }
}

const LoginUI = Form.create({})(Login);

export default connect(
  null,
  (dispatch, props) => ({
    handleSignIn(values) {
      dispatch(actions.asyncSignIn(values, props));
    }
  })
)(LoginUI);
