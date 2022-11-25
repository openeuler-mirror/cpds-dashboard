import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const history = createWebHistory()
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/',
    redirect: '/home',
    component: () => import('/@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('/@/views/home/index.vue')
      }
    ]
  }
]
const router = createRouter({
  history,
  routes
})
export default router
