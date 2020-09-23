import axios from '@/plugins/axios'
import BaseModelService from '../BaseModelService'

class UserPersonalService extends BaseModelService {
  name = 'User/UserPersonal'

  show () {
    return axios.get('user_personal/show')
  }

  update (form: object) {
    return axios.put('user_personal/update', form)
  }
}

export default new UserPersonalService()
