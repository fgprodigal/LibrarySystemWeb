import { message } from 'antd';
import { request } from 'umi';
export default {
  namespace: 'user',
  state: {},
  effects: {
    *signin({ payload }, { put }) {
      const { username, password } = payload;
      const result = yield request('/auth/login', {
        method: 'post',
        data: { username, password },
      });
      const { code, loginUser, userRole, err } = result;
      if (code == 0) {
        localStorage.setItem('token', result.token);
        yield put({ type: 'save', payload: { loginUser, userRole } });
      }
      return { status: code, err };
    },
    *getUser({}, { put }) {
      const result = yield request('/auth');
      const { code, loginUser, userRole, err } = result;
      if (code == 0) {
        yield put({
          type: 'save',
          payload: { loginUser, userRole, authed: true },
        });
      } else {
        localStorage.removeItem('token');
        yield put({
          type: 'save',
          payload: { authed: true },
        });
        if (err) {
          message.error(err);
        }
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    signout() {
      localStorage.removeItem('token');
      return {};
    },
  },
};
