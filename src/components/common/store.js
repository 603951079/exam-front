/**
 * Created by hllinc on 2018-7-17.
 */
const STORAGE_KEY = 'todos-vuejs';
export default {
  fetch() {
    // 如果有值返回值，没有的话返回空数组字符串
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
  },
  save(items) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}
