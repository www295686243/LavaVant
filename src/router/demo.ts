import form from '@/views/demo/form.vue'
import login from '@/views/demo/login.vue'

export default [
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
  }
]
