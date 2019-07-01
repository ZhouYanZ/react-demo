import * as Types from './actionTypes';
import http from '@/utils/http';

export const onStudentList = data => ({
  type: Types.SET_STUDENT_LIST,
  ...data
});

export const asyncStudentList = () => {
  return dispatch => {
    http
      .get('/api/student', {
        params: {
          pageSize: 1000
        }
      })
      .then(res => {
        console.log(res);
        // 继续派发一个普通的动作，将数据写入到仓库中
        dispatch(onStudentList(res.data));
      });
  };
};

export const asyncDelStuden = id => {
  return dispatch => {
    http.delete(`/api/student/${id}`).then(res => {
      console.log(res);
      // 继续派发一个普通的动作，将仓库中数据也给删掉
      dispatch({
        type: Types.DEL_STUDENT,
        id
      });
    });
  };
};

export const onChgVisible = () => ({
  type: Types.SET_VISIBLE
});

export const onChgCurStudentId = id => ({
  type: Types.SET_CUR_STUDENT_ID,
  id
});

export const asyncUpdStudent = values => {
  return (dispatch, getState) => {
    let {
      student: { curStudentId }
    } = getState();

    http
      .put(`/api/student/${curStudentId}`, JSON.stringify(values), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        // 不需要去修改仓库了，应该改起来太麻烦
        // dispatch({
        //   type: Types.UPD_STUDENT,
        //   id: curStudentId,
        //   values
        // });
        // 直接从新派发一个获取学生列表数据的动作
        dispatch(asyncStudentList());
      });
  };
};
