export const Routes = {
  path: '/',
  name: '/',
  redirect: '/home',
  component: () => import('/@/layout/index.vue'),
  children: [
    {
      path: '/home',
      name: 'home',
      component: () => import('/@/views/home/index.vue')
    },
    {
      path: '/detection',
      name: 'detection',
      children: [
        {
          path: 'basicService',
          name: 'basicService',
          component: () => import('/@/views/detection/basicService/index.vue')
        }
      ]
    },
    {
      path: '/strategy',
      name: 'strategy',
      component: () => import('/@/views/strategy/index.vue')
    }
  ]
}
