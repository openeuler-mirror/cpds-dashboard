import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { Routes, staticRoutes } from '/@/router/route'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Session } from '/@/utils/storage'

const history = createWebHashHistory()
const routes: Array<RouteRecordRaw> = [Routes]

const router = createRouter({
  history,
  routes
})

staticRoutes.forEach((route: RouteRecordRaw) => {
  router.addRoute(route)
})

router.beforeEach(async (to, from, next) => {
  NProgress.configure({ showSpinner: false })
  if (to.meta.title) NProgress.start()
  const token = Session.get('token')
  if (to.path === '/login' && !token) {
    next()
    NProgress.done()
  } else {
    if (!token) {
      next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`)
      Session.clear()
      NProgress.done()
    } else if (token && to.path === '/login') {
      next('/home')
      NProgress.done()
    } else {
      next()
    }
  }
})
export default router
