import axios from '@/plugins/axios'
import BaseModelService from '../BaseModelService'

class UserOrderService extends BaseModelService {
  name = 'User/UserOrder'

  index (page: number) {
    return axios.get('user_order', { page })
  }
}

export default new UserOrderService()
