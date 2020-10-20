import axios from '@/plugins/axios'
import BaseModelService from '@/service/BaseModelService'
import RouterService from '@/service/RouterService'

class HrResumeService extends BaseModelService {
  name = 'Info/Hr/HrResume'

  index (params: { page: number }) {
    return axios.get('hr_resume', params)
  }

  show () {
    return axios.get(`hr_resume/${RouterService.query('id')}`)
  }
}

export default new HrResumeService()
