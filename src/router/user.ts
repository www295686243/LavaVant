import notify from '@/views/user/notify/index.vue'
import personalAuth from '@/views/user/auth/personal-auth.vue'
import enterpriseAuth from '@/views/user/auth/enterprise-auth.vue'

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
  },
  {
    path: '/user/enterprise-auth',
    component: enterpriseAuth,
    meta: {
      title: '企业认证'
    }
  }
]
