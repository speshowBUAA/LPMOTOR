export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
          {
            name: 'regist',
            path: '/user/regist',
            component: './User/regist',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            // authority: ['user'],
            routes: [
              {
                path: '/',
              },
              {
                path: '/annotation/index',
                hideInMenu: true,
                component: './Annotation/index',
              },
              {
                path: '/annotation/detection',
                hideInMenu: true,
                component: './Annotation/detection',
              },
              {
                path: '/userlist',
                name: 'userlist',
                icon: 'UserOutlined',
                component: './Userlist/index',
                authority: ['admin'],
              },
              {
                path: '/dataset',
                name: 'dataset',
                icon: 'DatabaseOutlined',
                component: './Dataset/index',
                authority: ['admin', 'user'],
              },
              {
                name: 'annotation',
                icon: 'PictureOutlined',
                authority: ['admin', 'user'],
                children: [
                  {
                    path: '/annotation/index',
                    name: 'overall',
                  },
                  {
                    path: '/annotation/detection',
                    name: 'detection',
                  },
                ]
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
