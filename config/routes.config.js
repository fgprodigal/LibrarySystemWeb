export default {
  route: {
    path: '/',
    component: '@/pages/index',
    routes: [
      {
        exact: true,
        path: '/',
        redirect: '/library',
      },
      {
        path: '/library',
        name: '图书管理',
        component: '@/layouts/basicLayout',
        wrappers: ['@/wrappers/auth'],
        icon: 'book',
        routes: [
          {
            exact: true,
            path: '/library',
            redirect: '/library/books',
          },
          {
            exact: true,
            path: '/library/books',
            name: '图书浏览',
            component: '@/pages/books',
          },
        ],
      },
      {
        path: '/admin',
        name: '系统管理',
        component: '@/layouts/basicLayout',
        icon: 'control',
        access: 'testFilter',
        routes: [
          {
            exact: true,
            path: '/admin',
            redirect: '/admin/users',
            access: 'testFilter',
          },
          {
            exact: true,
            path: '/admin/users',
            name: '用户管理',
            component: '@/pages/users',
            access: 'testFilter',
          },
        ],
      },
      {
        exact: true,
        path: '/login',
        // name: '登录',
        component: '@/pages/login',
      },
      {
        exact: true,
        path: '/403',
        component: '@/pages/403',
      },
      {
        component: '@/pages/404',
      },
    ],
  },
};
