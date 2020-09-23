import axios from '@/plugins/axios'
import BaseModelService from '@/service/BaseModelService'
import RouterService from '@/service/RouterService'

class HrService extends BaseModelService {
  name = 'Info/InfoCheck'

  index (params: { page: number }) {
    return axios.get('hr', params)
  }

  show () {
    return axios.get(`hr/${RouterService.query('id')}`)
  }
}

export default new HrService()
