import axios from '@/plugins/axios'
import BaseModelService from '@/service/BaseModelService'
import RouterService from '@/service/RouterService'

class HrResumeService extends BaseModelService {
  name = 'Info/Hr/HrResume'

  index (params: { page: number }) {
    return axios.get('user/hr_resume', params)
  }

  show () {
    return axios.get(`user/hr_resume/${RouterService.query('id')}`)
  }

  store (form: { is_other_user: number; id: number }) {
    return axios.post('user/hr_resume', form)
  }

  destroy (id: string) {
    return axios.delete(`user/hr_resume/${id}`)
  }
}

export default new HrResumeService()
