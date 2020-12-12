import BaseAbstract from '@/abstract/BaseAbstract'
import axios from '@/plugins/axios'

class InfoCheckService extends BaseAbstract {
  name = 'InfoCheck'

  show (id: string) {
    return axios.get(`info_check/${id}`)
  }

  destroy (id: string) {
    return axios.delete(`info_check/${id}`)
  }
}

export default new InfoCheckService()
