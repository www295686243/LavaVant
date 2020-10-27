import axios from '@/plugins/axios'
import BaseModelService from '../BaseModelService'

class UserCouponService extends BaseModelService {
  name = 'User/UserCoupon'

  index (params: { page: number; coupon_template_id?: string; is_trade?: number; coupon_status?: number }) {
    return axios.get('user_coupon', params)
  }

  recall (user_coupon_ids: string[]) {
    return axios.post('user_coupon/recall', { user_coupon_ids })
  }
}

export default new UserCouponService()
