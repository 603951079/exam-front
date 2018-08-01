/**
 * Created by hllinc on 2018-7-21.
 */
import DashBoard from '../components/index/Dashboard';
import TodoList from '../components/test/todolist/TodoList';
import SysUserModel from '../components/sysuser/SysUser';
import QuestionBank from '../components/questionbank/QuestionBank';
import ConfigSet from '../components/configset/ConfigSet';
import SysRole from '../components/sysrole/SysRole';
import TestPaper from '../components/testpaper/TestPaper';
import TestPaperOnline from '../components/online/TestPaperOnline';
import Parent from '../components/test/vuex/Parent';
import Parent2 from '../components/test/dialog/Parent';

let routerConfig = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoard,
    meta: {title: '个人首页'}
  },
  {
    path: '/sysuser',
    name: 'sysuser',
    component: SysUserModel,
    meta: {title: '用户管理'}
  },
  {
    path: '/sysrole',
    name: 'sysrole',
    component: SysRole,
    meta: {title: '角色管理'}
  },
  {
    path: '/configset',
    name: 'configset',
    component: ConfigSet,
    meta: {title: '规则配置'}
  },
  {
    path: '/questionbank',
    name: 'questionbank',
    component: QuestionBank,
    meta: {title: '题库管理'}
  },
  {
    path: '/testpaper',
    name: 'testpaper',
    component: TestPaper,
    meta: {title: '试题管理'}
  },
  {
    path: '/testpaperonline',
    name: 'testpaperonline',
    component: TestPaperOnline,
    meta: {title: '在线考试'}
  },
  {
    path: '/todolist',
    name: 'todolist',
    component: TodoList,
    meta: {title: '演示案例'}
  },
  {
    path: '/vuextest',
    name: 'vuextest',
    component: Parent,
    meta: {title: 'vuex案例'}
  },
  {
    path: '/vuextest2',
    name: 'vuextest2',
    component: Parent2,
    meta: {title: '父子组件'}
  }
];

export default routerConfig;
