import axios from '@/plugins/axios'
import BaseModelService from '../BaseModelService'

class InfoCheckService extends BaseModelService {
  name = 'Info/InfoCheck'

  index (params: { _model: string; page: number }) {
    return axios.get('info_check', params)
  }

  show (id: string) {
    return axios.get(`info_check/${id}`)
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
