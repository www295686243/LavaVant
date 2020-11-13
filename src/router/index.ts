import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import demo from './demo'
import user from './user'
import hr from './hr'
import other from './other'
import CouponMarket from '@/views/coupon-market/coupon-market.vue'
import taskHall from '@/views/task-hall/task-hall.vue'
import invite from '@/views/operation/invite.vue'

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
  {
    path: '/operation/invite',
    component: invite,
    meta: {
      title: '邀请用户'
    }
  },
  ...demo,
  ...user,
  ...hr,
  ...other
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
