/**
 * Created by hllinc on 2018-7-17.
 */

import axios from 'axios';
import qs from 'qs';

/**
 * 设置请求拦截器
 */
axios.interceptors.request.use((config) => {
  /**
   * 用户访问后端业务接口
   */
  if (config.url.indexOf('/login') < 0) {
    config.headers['Authorization'] =('Bearer '+ sessionStorage.getItem('Authorization'));
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * 设置响应拦截器
 */
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.resolve(error.response);
});

/**
 * 检查响应的状态码
 * @param response
 * @returns {*}
 */
function checkStatus(response) {
  if (response && (response.status === 200 ||
    response.status === 304)) {
    return response.data;
  }
  return {
    success: false,
    status: 500,
    message: '请求异常',
    data: null
  };
}

/**
 * 检查业务状态码
 * @param response
 * @returns {*}
 */
function checkCode(data) {
  if (data.success && data.status === 200) {
    return data.data;
  }
  return null;
}

export default {
  postData: function (url, data) {
    return axios({
      method: 'post',
      url: url,
      data: JSON.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(response => { // 该方法执行完之后，返回数据，作为下一个then的参数
      return checkStatus(response);
    }).then(response => {
      return checkCode(response);
    });
  },
  getData: function (url, params) {
    var config = {
      method: 'get',
      url: url,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    };
    if (params) {
      config.params = qs.stringify(params);
    }
    return axios(config).then(response => {
      return checkStatus(response);
    }).then(response => {
      return checkCode(response);
    });
  },
  deleteData: function (url, params) {
    var config = {
      method: 'delete',
      url: url,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    };
    if (params) {
      config.params = qs.stringify(params);
    }
    return axios(config).then(response => {
      return checkStatus(response);
    }).then(response => {
      return checkCode(response);
    });
  },
  putData: function (url, data) {
    return axios({
      method: 'put',
      url: url,
      data: JSON.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(response => { // 该方法执行完之后，返回数据，作为下一个then的参数
      console.log(response);
      return checkStatus(response);
    }).then(response => {
      return checkCode(response);
    });
  },

  login: function (url, data) {
    return axios({
      method: 'post',
      url: url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => { // 该方法执行完之后，返回数据，作为下一个then的参数
      return checkStatus(response);
    }).then(response => {
      return checkCode(response);
    });
  }
}
