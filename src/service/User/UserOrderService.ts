import BaseAbstract from '@/abstract/BaseAbstract'
import axios from '@/plugins/axios'

class UserOrderService extends BaseAbstract {
  name = 'UserOrder'

  index (page: number) {
    return axios.get('user_order', { page })
  }
}

export default new UserOrderService()
