import resume from '@/views/hr/resume/index.vue'
import resumeShow from '@/views/hr/resume/show.vue'

export default [
  {
    path: '/hr/resume',
    component: resume,
    meta: {
      title: '简历列表'
    }
  },
  {
    path: '/hr/resume/show',
    component: resumeShow,
    meta: {
      title: '简历详情'
    }
  }
]
