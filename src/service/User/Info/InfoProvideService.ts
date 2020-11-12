import axios from '@/plugins/axios'
import BaseModelService from '@/service/BaseModelService'

class HrResumeService extends BaseModelService {
  name = 'Info/InfoProvide'

  store (form: { description: string; phone: string }) {
    return axios.post('info_provide', form)
  }
}

export default new HrResumeService()
