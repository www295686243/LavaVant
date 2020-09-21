import axios from '@/plugins/axios'
import BaseModelService from '@/service/BaseService'
import RouterService from '@/service/RouterService'

class HrService extends BaseModelService {
  name = 'Info/InfoCheck'

  index (params: { page: number }) {
    return axios.get('user/hr', params)
  }

  show () {
    return axios.get(`user/hr/${RouterService.query('id')}`)
  }

  store (form: object) {
    return axios.post('user/hr', form)
  }

  destroy (id: string) {
    return axios.delete(`user/hr/${id}`)
  }
}

export default new HrService()
