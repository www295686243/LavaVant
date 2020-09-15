import axios from '@/plugins/axios'
import BaseModelService from '../BaseService'

class UserPersonalAuth extends BaseModelService {
  name = 'User/UserPersonalAuth'

  show () {
    return axios.get('user_personal_auth/1')
  }

  store (form: object) {
    return axios.post('user_personal_auth', form)
  }
}

export default new UserPersonalAuth()
