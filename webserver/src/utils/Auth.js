import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class AuthRoute extends React.Component {
  render() {
    let { component: Component, user, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={routerProps => {
          // 判断仓库中 user.email 存不存在
          if (user.email) {
            return <Component {...routerProps} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { redirect: routerProps.match.url }
                }}
              />
            );
          }
        }}
      />
    );
  }
}

export default connect(
  ({ user }) => {
    return {
      user
    };
  },
  null
)(AuthRoute);
