import { RouteRecordRaw } from 'vue-router'

export const Routes = {
  path: '/',
  name: '/',
  redirect: '/home',
  component: () => import('/@/layout/index.vue'),
  children: [
    {
      path: '/home',
      name: 'home',
      component: () => import('/@/views/home/index.vue'),
      meta: { title: 'navmenu.home', icon: 'House' }
    },
    {
      path: '/detection',
      name: 'detection',
      meta: { title: 'navmenu.detection', icon: 'DataAnalysis' },
      children: [
        {
          path: 'basicService',
          name: 'basicService',
          component: () => import('/@/views/detection/basicService/index.vue'),
          meta: { title: 'navmenu.basicService', icon: 'Operation' }
        },
        {
          path: 'node',
          name: 'node',
          component: () => import('/@/views/detection/node/index.vue'),
          meta: { title: 'navmenu.node', icon: 'Operation' }
        },
        {
          path: 'application',
          name: 'application',
          component: () => import('/@/views/detection/application/index.vue'),
          meta: { title: 'navmenu.application', icon: 'Operation' }
        }
      ]
    },
    {
      path: '/strategy',
      name: 'strategy',
      component: () => import('/@/views/strategy/index.vue'),
      meta: { title: 'navmenu.strategy', icon: 'Paperclip' }
    }
  ]
}

// Define static routes
export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('/@/views/login/index.vue'),
    meta: { title: 'login' }
  },
  {
    path: '/:path(.*)*',
    name: '404',
    component: () => import('/@/views/error/404.vue'),
    meta: { title: '404' }
  },
  {
    path: '/401',
    name: '401',
    component: () => import('/@/views/error/401.vue'),
    meta: { title: '401' }
  }
]
