import axios from '@/plugins/axios'
import BaseModelService from '@/service/BaseModelService'
import RouterService from '@/service/RouterService'

class HrJobService extends BaseModelService {
  name = 'Info/Hr/HrJob'
  path = 'hr/job'

  index (params: { page: number }) {
    return axios.get('user/hr_job', params)
  }

  show () {
    return axios.get(`user/hr_job/${RouterService.query('id')}`, { _check: RouterService.query('_check') })
  }

  store (form: { is_other_user: number; id: number }) {
    return axios.post('user/hr_job', form)
  }

  update (form: any) {
    return axios.put(`user/hr_job/${RouterService.query('id')}`, {
      _check: RouterService.query('_check'),
      ...form
    })
  }

  destroy (id: string) {
    return axios.delete(`user/hr_job/${id}`)
  }

  refreshUpdateAt (id: string) {
    return axios.post('user/hr_job/refreshUpdateAt', { id })
  }

  updateDisable (id: string) {
    return axios.post('user/hr_job/updateDisable', { id })
  }
}

export default new HrJobService()
