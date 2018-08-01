/**
 * Created by hllinc on 2018-7-31.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import Sysuser from './modules/sysuser';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    'sysuser': Sysuser
  },
  state: {
    testMsg: '原始文本',
    childText: '子组件原始文本',
    show: false
  },
  mutations: {
    changeTestMsg(state, str) {
      state.testMsg = str;
    },
    changeChildText(state, str) {
      state.childText = str;
    }
  }
});

export default store;
