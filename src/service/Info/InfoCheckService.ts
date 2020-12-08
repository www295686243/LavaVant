import axios from '@/plugins/axios'
import BaseModelService from '../BaseModelService'

class InfoCheckService extends BaseModelService {
  name = 'Info/InfoCheck'

  show (id: string) {
    return axios.get(`info_check/${id}`)
  }

  destroy (id: string) {
    return axios.delete(`info_check/${id}`)
  }
}

export default new InfoCheckService()
