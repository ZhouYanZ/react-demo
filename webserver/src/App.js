import React, { Component } from 'react';
import Loadable from 'react-loadable';
import AuthRoute from './utils/Auth';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// import Login from '@/views/login';
// import Sign from '@/views/sign';
// import Home from '@/views/home';

const Login = Loadable({
  // 需要异步加载的组件
  loader: () => import('./views/login'),
  // 加载中的提示组件
  loading: () => <div>加载中</div>
});

const Sign = Loadable({
  // 需要异步加载的组件
  loader: () => import('./views/sign'),
  // 加载中的提示组件
  loading: () => <div>加载中</div>
});

const Home = Loadable({
  // 需要异步加载的组件
  loader: () => import('./views/home'),
  // 加载中的提示组件
  loading: () => <div>加载中</div>
});

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/sign" component={Sign} />
          <AuthRoute path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}
