// 引入拆分出去 reducer
import userReducer from "../views/login/store/reducer";
import studentReduer from "../views/home/student/store/reducer";

export const user = userReducer;
export const student = studentReduer;
