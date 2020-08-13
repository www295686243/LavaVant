import entra from '@/views/demo/entra.vue'
import form from '@/views/demo/form.vue'
import login from '@/views/demo/login.vue'
import wechatLogin from '@/views/demo/wechat-login.vue'
import wechatShare from '@/views/demo/wechat-share.vue'

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
  }
]
