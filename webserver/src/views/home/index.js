import React, { Component } from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon, Button } from 'antd';
import { HomeWrap, SiderWrap, HeaderWrap, ContentWrap, Logo } from './style';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };

  render() {
    return (
      <HomeWrap>
        <Layout>
          <SiderWrap collapsed={this.state.collapsed}>
            <Logo />

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <NavLink to="/student">学生管理</NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to="/teacher">教师管理</NavLink>
              </Menu.Item>
            </Menu>
          </SiderWrap>
          <Layout>
            <HeaderWrap>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />

              <Button>退出登录</Button>
            </HeaderWrap>
            <ContentWrap>
              <Switch>
                <Route path="/student" render={() => <h1>学生</h1>} />
                <Route path="/teacher" render={() => <h1>老师</h1>} />
                <Redirect to="/student" />
              </Switch>
            </ContentWrap>
          </Layout>
        </Layout>
      </HomeWrap>
    );
  }
}
