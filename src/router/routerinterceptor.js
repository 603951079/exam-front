/**
 * Created by hllinc on 2018-7-20.
 *
 * 路由拦截器
 */

var routerInterceptor = function (router) {
  router.beforeEach((to, from, next) => {
    if (to.path == '/' || to.path == '/login') {
      // 如果用户访问登录页，可直接访问
      next();
    } else {
      // 如果用户访问其他页面，则要进行登录验证
      if (sessionStorage.getItem('Authorization')) {
        // 用户登录成功之后，可以直接查看个人首页
        if (to.path == '/dashboard' || to.path == '/404') {
          next();
        } else {
          // 用户登录成功之后，则验证用户是否可以有权限访问指定的菜单
          let menuindexs = JSON.parse(sessionStorage.getItem('menuindexs'));
          // 返回的是数组下标
          if (menuindexs.indexOf(to.path) > -1) {
            next();
          } else {
            router.push('/404');
          }
        }
      } else {
        // 用户没有登录，跳转到登录页面
        router.push({
          path: '/login',
          query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
      }
    }
  });
};

export default routerInterceptor;
