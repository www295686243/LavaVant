import axios from '@/plugins/axios'
import BaseModelService from '../BaseService'

class UserEnterpriseAuth extends BaseModelService {
  name = 'User/UserEnterpriseAuth'

  show () {
    return axios.get('user_enterprise_auth/1')
  }

  store (form: object) {
    return axios.post('user_enterprise_auth', form)
  }
}

export default new UserEnterpriseAuth()
