import axios from 'axios';
import { message } from 'antd';

const http = axios.create();
http.defaults.baseURL = 'http://localhost:9090';

http.interceptors.response.use(response => {
  let res = response.data;
  if (res.code === 0) {
    return res;
  } else {
    message.error(res.msg);
    return Promise.reject();
  }
});

export default http;
