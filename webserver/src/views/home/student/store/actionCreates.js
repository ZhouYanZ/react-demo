import * as Types from "./actionTypes";
import http from "@/utils/http";

export const onStudentList = data => ({
  type: Types.SET_STUDENT_LIST,
  ...data
});

export const asyncStudentList = () => {
  return dispatch => {
    http
      .get("/api/student", {
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
