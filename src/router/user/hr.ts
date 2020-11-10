import job from '@/views/user/hr/job/index.vue'
import jobForm from '@/views/user/hr/job/form.vue'
import jobSuccess from '@/views/user/hr/job/success.vue'
import resume from '@/views/user/hr/resume/index.vue'
import resumeForm from '@/views/user/hr/resume/form.vue'
import resumeSuccess from '@/views/user/hr/resume/success.vue'

export default [
  {
    path: '/user/hr/job',
    component: job,
    meta: {
      title: '我的职位'
    }
  },
  {
    path: '/user/hr/job/form',
    component: jobForm,
    meta: {
      title: '发布职位'
    }
  },
  {
    path: '/user/hr/job/create-success',
    component: jobSuccess,
    meta: {
      title: '发布成功'
    }
  },
  {
    path: '/user/hr/job/update-success',
    component: jobSuccess,
    meta: {
      title: '更新成功'
    }
  },
  {
    path: '/user/hr/resume',
    component: resume,
    meta: {
      title: '我的简历'
    }
  },
  {
    path: '/user/hr/resume/form',
    component: resumeForm,
    meta: {
      title: '发布简历'
    }
  },
  {
    path: '/user/hr/resume/create-success',
    component: resumeSuccess,
    meta: {
      title: '发布成功'
    }
  },
  {
    path: '/user/hr/resume/update-success',
    component: resumeSuccess,
    meta: {
      title: '更新成功'
    }
  }
]
