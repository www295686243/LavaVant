import BaseAbstract from '@/abstract/BaseAbstract'
import axios from '@/plugins/axios'

class UserEnterpriseAuthService extends BaseAbstract {
  name = 'UserEnterpriseAuth'

  show () {
    return axios.get('user_enterprise_auth/show')
  }

  store (form: object) {
    return axios.post('user_enterprise_auth', form)
  }
}

export default new UserEnterpriseAuthService()
