/**
 * Created by hllinc on 2018-7-31.
 */

const sysuser = {
  state: {
    sysUserDetailShow: false,
    operator: '',
    sysUserId: '',
    authShow: false
  },
  mutations: {
    SET_USERDETAIL_SHOW(state, payload) {
      state.sysUserDetailShow = payload;
    },
    SET_OPERATOR(state, payload) {
      state.operator = payload;
    },
    SET_USERID(state, payload) {
      state.sysUserId = payload;
    },
    SET_AUTH_SHOW(state, payload) {
      state.authShow = payload;
    }
  }
};

export default sysuser;
