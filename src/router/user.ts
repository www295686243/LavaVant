import notify from '@/views/user/notify/index.vue'
import personalAuth from '@/views/user/auth/personal-auth.vue'

export default [
  {
    path: '/user/notify',
    component: notify,
    meta: {
      title: '消息通知'
    }
  },
  {
    path: '/user/personal-auth',
    component: personalAuth,
    meta: {
      title: '个人认证'
    }
  }
]
