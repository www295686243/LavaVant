import resume from '@/views/hr/resume/index.vue'
import resumeShow from '@/views/hr/resume/show.vue'
import job from '@/views/hr/job/index.vue'
import jobShow from '@/views/hr/job/show.vue'

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
  },
  {
    path: '/hr/job',
    component: job,
    meta: {
      title: '职位列表'
    }
  },
  {
    path: '/hr/job/show',
    component: jobShow,
    meta: {
      title: '职位详情'
    }
  }
]
