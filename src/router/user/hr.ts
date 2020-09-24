import jobForm from '@/views/user/hr/job/form.vue'
import jobSuccess from '@/views/user/hr/job/success.vue'

export default [
  {
    path: '/user/hr/job/form',
    component: jobForm,
    meta: {
      title: '发布招聘'
    }
  },
  {
    path: '/user/hr/job/success',
    component: jobSuccess,
    meta: {
      title: '发布成功'
    }
  }
]
