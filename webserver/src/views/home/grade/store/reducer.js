import * as Types from './actionTypes';

const initState = {
  list: [] // 班级列表
};

export default (state = initState, action) => {
  let newState = JSON.parse(JSON.stringify(state));

  if (action.type === Types.SET_GRADE_LIST) {
    newState.list = action.list;
  }

  return newState;
};
