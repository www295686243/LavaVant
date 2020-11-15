import axios from '@/plugins/axios'
import BaseModelService from '../BaseModelService'

class UserEnterpriseAuthService extends BaseModelService {
  name = 'User/UserEnterpriseAuth'

  show () {
    return axios.get('user_enterprise_auth/show')
  }

  store (form: object) {
    return axios.post('user_enterprise_auth', form)
  }
}

export default new UserEnterpriseAuthService()
