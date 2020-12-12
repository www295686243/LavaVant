import BaseAbstract from '@/abstract/BaseAbstract'
import axios from '@/plugins/axios'

class UserPersonalAuthService extends BaseAbstract {
  name = 'UserPersonalAuth'

  show () {
    return axios.get('user_personal_auth/show')
  }

  store (form: object) {
    return axios.post('user_personal_auth', form)
  }
}

export default new UserPersonalAuthService()
