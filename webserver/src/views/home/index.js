import React, { Component } from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Layout, Menu, Icon, Button } from "antd";
import { HomeWrap, SiderWrap, HeaderWrap, ContentWrap, Logo } from "./style";
import Student from "./student";
import Grade from "./grade";

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

  handleSignOut = () => {
    window.localStorage.removeItem("user");
    // 刷新页面
    window.location.reload();
  };

  render() {
    return (
      <HomeWrap>
        <Layout>
          <SiderWrap collapsed={this.state.collapsed}>
            <Logo />

            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <NavLink to="/student">学生管理</NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to="/grade">班级管理</NavLink>
              </Menu.Item>
            </Menu>
          </SiderWrap>
          <Layout>
            <HeaderWrap>
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />

              <Button onClick={this.handleSignOut}>退出登录</Button>
            </HeaderWrap>
            <ContentWrap>
              <Switch>
                <Route path="/student" component={Student} />
                <Route path="/grade" component={Grade} />
                <Redirect to="/student" />
              </Switch>
            </ContentWrap>
          </Layout>
        </Layout>
      </HomeWrap>
    );
  }
}
