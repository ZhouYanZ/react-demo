// 用户相关的 action 生成器
import * as Types from './actionTypes';
import http from '@/utils/http';

export const onSignIn = value => ({
  type: Types.SIGN_IN,
  value
});

export const asyncSignIn = (values, props) => {
  return dispatch => {
    // 异步操作
    http
      .post('/sign-in', JSON.stringify(values), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        // 这里就不需要判断是否 code
        dispatch(onSignIn(res.data));
        window.localStorage.setItem('user', JSON.stringify(res.data));

        // 跳转页面
        let redirect = props.location.state
          ? props.location.state.redirect
          : '/';
        props.history.replace(redirect);
      });
  };
};
