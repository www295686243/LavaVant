import axios from '@/plugins/axios'
import BaseModelService from '../BaseModelService'

class UserCouponService extends BaseModelService {
  name = 'User/UserCoupon'

  index (params: { page: number; coupon_template_id?: string; is_trade?: number }) {
    return axios.get('user_coupon', params)
  }
}

export default new UserCouponService()
