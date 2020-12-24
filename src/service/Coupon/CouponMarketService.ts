import BaseAbstract from '@/abstract/BaseAbstract'
import axios from '@/plugins/axios'

class CouponMarketService extends BaseAbstract {
  name = 'CouponMarket'

  index (params: { page: number; sell_user_id?: string; sort?: number; coupon_template_id?: string }) {
    return axios.get('coupon_market', params)
  }

  store (params: { coupon_ids: string[]; amount: string }) {
    return axios.post('coupon_market', params)
  }
}

export default new CouponMarketService()
