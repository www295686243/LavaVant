import axios from '@/plugins/axios'
import BaseModelService from '@/service/BaseModelService'
import RouterService from '@/service/RouterService'

class HrResumeService extends BaseModelService {
  name = 'Info/Hr/HrResume'
  path = 'hr/resume'

  index (params: { page: number }) {
    return axios.get('user/hr_resume', params)
  }

  show () {
    return axios.get(`user/hr_resume/${RouterService.query('id')}`, { _check: RouterService.query('_check') })
  }

  store (form: { is_other_user: number; id: number }) {
    return axios.post('user/hr_resume', form)
  }

  update (form: any) {
    return axios.put(`user/hr_resume/${RouterService.query('id')}`, {
      _check: RouterService.query('_check'),
      ...form
    })
  }

  destroy (id: string) {
    return axios.delete(`user/hr_resume/${id}`)
  }

  refreshUpdateAt (id: string) {
    return axios.post('user/hr_resume/refreshUpdateAt', { id })
  }

  updateDisable (id: string) {
    return axios.post('user/hr_resume/updateDisable', { id })
  }
}

export default new HrResumeService()
