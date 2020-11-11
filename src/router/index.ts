import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import demo from './demo'
import user from './user'
import hr from './hr'
import CouponMarket from '@/views/coupon-market/coupon-market.vue'
import taskHall from '@/views/task-hall/task-hall.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/coupon-market',
    component: CouponMarket,
    meta: {
      title: '交易市场'
    }
  },
  {
    path: '/task-hall',
    component: taskHall,
    meta: {
      title: '互助任务'
    }
  },
  ...demo,
  ...user,
  ...hr
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
