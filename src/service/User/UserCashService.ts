import BaseAbstract from '@/abstract/BaseAbstract'
import axios from '@/plugins/axios'

class UserCashService extends BaseAbstract {
  name = 'UserCash'

  index (page: number) {
    return axios.get('user_cash', { page })
  }

  store (form: object) {
    return axios.post('user_cash', form)
  }

  update (form: { id: string }) {
    return axios.put(`user_cash/${form.id}`, form)
  }
}

export default new UserCashService()
