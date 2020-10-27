import axios from '@/plugins/axios'
import BaseModelService from '../BaseModelService'

class CouponMarketService extends BaseModelService {
  name = 'Coupon/CouponMarket'

  index (params: { page: number; sort?: number; coupon_template_id?: string }) {
    return axios.get('coupon_market', params)
  }

  store (params: { coupon_ids: string[]; amount: string }) {
    return axios.post('coupon_market', params)
  }
}

export default new CouponMarketService()
