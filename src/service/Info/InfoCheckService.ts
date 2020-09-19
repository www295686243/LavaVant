import axios from '@/plugins/axios'
import BaseModelService from '../BaseService'
import RouterService from '../RouterService'

class InfoCheckService extends BaseModelService {
  name = 'Info/InfoCheck'

  index (params: { _type: string }) {
    return axios.get('info_check', params)
  }

  show () {
    return axios.get(`info_check/${RouterService.query('id')}`)
  }

  store (form: object) {
    return axios.post('info_check', form)
  }

  update (form: { id: string }) {
    return axios.post(`info_check/${form.id}`, form)
  }

  destroy (id: string) {
    return axios.delete(`info_check/${id}`)
  }
}

export default new InfoCheckService()
