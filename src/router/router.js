import Router from 'vue-router';
import RouterInterceptor from './routerinterceptor';
import Login from '../components/login/Login';
import Index from '../components/index/Index';
import NoPath from '../components/404/404';
import BizRouter from './bizRouter';

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: BizRouter
    },
    {
      path: '/404',
      name: '404',
      component: NoPath
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
});

// 设置路由拦截器
RouterInterceptor(router);

export default router;
