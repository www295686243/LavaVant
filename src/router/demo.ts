import entra from '@/views/demo/entra.vue'
import form from '@/views/demo/form.vue'
import login from '@/views/demo/login.vue'
import wechatLogin from '@/views/demo/wechat-login.vue'
import wechatShare from '@/views/demo/wechat-share.vue'
import wechatPay from '@/views/demo/wechat-pay.vue'
import wechatNotify from '@/views/demo/wechat-notify.vue'
import infoComplaint from '@/views/demo/info-complaint.vue'
import infoDelivery from '@/views/demo/info-delivery.vue'
import list from '@/views/demo/list.vue'
import show from '@/views/demo/show.vue'

export default [
  {
    path: '/demo/entra',
    component: entra,
    meta: {
      title: '入口'
    }
  },
  {
    path: '/demo/form',
    component: form,
    meta: {
      title: '表单'
    }
  },
  {
    path: '/demo/login',
    component: login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/demo/wechat-login',
    component: wechatLogin,
    meta: {
      title: '微信登录'
    }
  },
  {
    path: '/demo/wechat-share',
    component: wechatShare,
    meta: {
      title: '微信分享'
    }
  },
  {
    path: '/demo/wechat-pay',
    component: wechatPay,
    meta: {
      title: '微信支付'
    }
  },
  {
    path: '/demo/wechat-notify',
    component: wechatNotify,
    meta: {
      title: '微信通知'
    }
  },
  {
    path: '/demo/info-complaint',
    component: infoComplaint,
    meta: {
      title: '信息投诉'
    }
  },
  {
    path: '/demo/info-delivery',
    component: infoDelivery,
    meta: {
      title: '信息投递'
    }
  },
  {
    path: '/demo/list',
    component: list,
    meta: {
      title: '信息列表'
    }
  },
  {
    path: '/demo/show',
    component: show,
    meta: {
      title: '信息详情'
    }
  }
]
