import notify from '@/views/user/notify/index.vue'
import personalAuth from '@/views/user/auth/personal-auth.vue'
import enterpriseAuth from '@/views/user/auth/enterprise-auth.vue'
// 个人信息
import personal from '@/views/user/personal/personal.vue'
import personalBase from '@/views/user/personal/base.vue'
import personalDetail from '@/views/user/personal/detail.vue'
// 企业信息
import enterprise from '@/views/user/enterprise/enterprise.vue'
import enterpriseBase from '@/views/user/enterprise/base.vue'
import enterpriseDetail from '@/views/user/enterprise/detail.vue'
import hr from './user/hr'

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
  },
  {
    path: '/user/personal',
    component: personal,
    children: [
      {
        path: 'base',
        component: personalBase,
        meta: {
          title: '基本信息'
        }
      },
      {
        path: 'detail',
        component: personalDetail,
        meta: {
          title: '个人详情'
        }
      }
    ]
  },
  {
    path: '/user/enterprise',
    component: enterprise,
    children: [
      {
        path: 'base',
        component: enterpriseBase,
        meta: {
          title: '基本信息'
        }
      },
      {
        path: 'detail',
        component: enterpriseDetail,
        meta: {
          title: '企业详情'
        }
      }
    ]
  },
  ...hr
]
