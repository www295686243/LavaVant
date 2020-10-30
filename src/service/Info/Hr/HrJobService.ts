import axios from '@/plugins/axios'
import BaseModelService from '@/service/BaseModelService'
import RouterService from '@/service/RouterService'

class HrJobService extends BaseModelService {
  name = 'Info/Hr/HrJob'

  index (params: { page: number }) {
    return axios.get('hr_job', params)
  }

  show () {
    return axios.get(`hr_job/${RouterService.query('id')}`)
  }
}

export default new HrJobService()
