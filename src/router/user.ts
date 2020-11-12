import index from '@/views/user/index/index.vue'
import notify from '@/views/user/notify/index.vue'
import personalAuth from '@/views/user/auth/personal-auth.vue'
import enterpriseAuth from '@/views/user/auth/enterprise-auth.vue'
// 我的钱包
import wallet from '@/views/user/wallet/index.vue'
import bill from '@/views/user/wallet/bill.vue'
import cash from '@/views/user/wallet/cash.vue'
import cashLog from '@/views/user/wallet/cash-log.vue'
// 个人信息
import personal from '@/views/user/personal/personal.vue'
import personalBase from '@/views/user/personal/base.vue'
import personalDetail from '@/views/user/personal/detail.vue'
// 企业信息
import enterprise from '@/views/user/enterprise/enterprise.vue'
import enterpriseBase from '@/views/user/enterprise/base.vue'
import enterpriseDetail from '@/views/user/enterprise/detail.vue'
import hr from './user/hr'
import coupon from './user/coupon'

import order from '@/views/user/order/index.vue'

import invite from '@/views/user/invite/invite.vue'

import infoProvide from '@/views/user/info_provide/info_provide.vue'

export default [
  {
    path: '/user',
    component: index,
    meta: {
      title: '个人中心'
    }
  },
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
  {
    path: '/user/wallet',
    component: wallet,
    meta: {
      title: '我的钱包'
    }
  },
  {
    path: '/user/bill',
    component: bill,
    meta: {
      title: '我的账单'
    }
  },
  {
    path: '/user/cash',
    component: cash,
    meta: {
      title: '提现金额'
    }
  },
  {
    path: '/user/cash-log',
    component: cashLog,
    meta: {
      title: '提现记录'
    }
  },
  {
    path: '/user/order',
    component: order,
    meta: {
      title: '联系记录'
    }
  },
  {
    path: '/user/info_provide',
    component: infoProvide,
    meta: {
      title: '提供信息'
    }
  },
  {
    path: '/user/invite',
    component: invite,
    meta: {
      title: '邀请加入'
    }
  },
  ...hr,
  ...coupon
]
