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

  store (form: object) {
    return axios.post('user/hr_job', form)
  }

  destroy (id: string) {
    return axios.delete(`user/hr_job/${id}`)
  }
}

export default new HrJobService()
