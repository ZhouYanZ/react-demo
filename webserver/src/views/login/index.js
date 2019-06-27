import React, { Component } from 'react';
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
                  pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                  message: 'Please sure email'
                }
              ]
            })(<Input placeholder="用户邮箱" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input password' },
                { min: 6, message: '最少要6位数' }
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

export default Form.create({})(Login);

// import { Form, Icon, Input, Button, Checkbox } from 'antd';

// class NormalLoginForm extends React.Component {
//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         console.log('Received values of form: ', values);
//       }
//     });
//   };

//   render() {
//     const { getFieldDecorator } = this.props.form;
//     return (
//       <Form onSubmit={this.handleSubmit} className="login-form">
//         <Form.Item>
//           {getFieldDecorator('username', {
//             rules: [{ required: true, message: 'Please input your username!' }],
//           })(
//             <Input
//               prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//               placeholder="Username"
//             />,
//           )}
//         </Form.Item>
//         <Form.Item>
//           {getFieldDecorator('password', {
//             rules: [{ required: true, message: 'Please input your Password!' }],
//           })(
//             <Input
//               prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
//               type="password"
//               placeholder="Password"
//             />,
//           )}
//         </Form.Item>
//         <Form.Item>
//           {getFieldDecorator('remember', {
//             valuePropName: 'checked',
//             initialValue: true,
//           })(<Checkbox>Remember me</Checkbox>)}
//           <a className="login-form-forgot" href="">
//             Forgot password
//           </a>
//           <Button type="primary" htmlType="submit" className="login-form-button">
//             Log in
//           </Button>
//           Or <a href="">register now!</a>
//         </Form.Item>
//       </Form>
//     );
//   }
// }

// const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);
