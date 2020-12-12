import BaseAbstract from '@/abstract/BaseAbstract'
import axios from '@/plugins/axios'

class HrResumeService extends BaseAbstract {
  name = 'InfoProvide'

  store (form: { description: string; phone: string }) {
    return axios.post('info_provide', form)
  }
}

export default new HrResumeService()
