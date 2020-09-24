import axios from '@/plugins/axios'
import BaseModelService from '@/service/BaseModelService'
import RouterService from '@/service/RouterService'

class HrJobService extends BaseModelService {
  name = 'Info/Hr/HrJob'

  index (params: { page: number }) {
    return axios.get('user/hr_job', params)
  }

  show () {
    return axios.get(`user/hr_job/${RouterService.query('id')}`)
  }

  store (form: { is_other_user: number; id: number }) {
    return axios.post('user/hr_job', form)
      .then(() => {
        if (form.is_other_user > 0) {
          if (form.id > 0) {
            RouterService.replace('/user/hr/job/success', { update: 1 })
          } else {
            RouterService.replace('/user/hr/job/success')
          }
        } else {
          RouterService.replace('/user/enterprise/detail', { source: RouterService.getPath() })
        }
      })
  }

  destroy (id: string) {
    return axios.delete(`user/hr_job/${id}`)
  }
}

export default new HrJobService()
