import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { Routes } from '/@/router/route'

const history = createWebHistory()
const routes: Array<RouteRecordRaw> = [Routes]
const router = createRouter({
  history,
  routes
})
export default router
