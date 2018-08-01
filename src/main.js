import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import qs from 'qs';
import moment from 'moment';
import vueMomentJS from "vue-momentjs";
import ElementUI from 'element-ui';
import App from './App';
import router from './router/router';
import 'element-ui/lib/theme-chalk/index.css'; // 引入elementui默认主题文件
import '../static/css/theme-green/index.css';  // 引入elementui浅绿色主题文件
import store from './store/index';


Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;
Vue.prototype.$qs = qs;
Vue.use(ElementUI, {size: 'small'});
Vue.use(Router);
Vue.use(vueMomentJS, moment);


new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App></App>'
})
