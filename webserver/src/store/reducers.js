const initUserInfo = {
  email: '',
  name: ''
};
export const user = (state = initUserInfo, actions) => {
  let newState = JSON.parse(JSON.stringify(state));
  return newState;
};
