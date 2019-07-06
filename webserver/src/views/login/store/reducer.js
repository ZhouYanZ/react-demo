// 用户相关的reducer
import * as Types from './actionTypes';

const initState = window.localStorage.getItem('user')
  ? JSON.parse(window.localStorage.getItem('user'))
  : {
      email: ''
    };

export default (state = initState, action) => {
  let newState = JSON.parse(JSON.stringify(state));

  if (action.type === Types.SIGN_IN) {
    console.log(action.value);
    newState.email = action.value.email;
  }

  return newState;
};
