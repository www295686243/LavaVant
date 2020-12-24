import BaseAbstract from '@/abstract/BaseAbstract'
import axios from '@/plugins/axios'

class UserCouponService extends BaseAbstract {
  name = 'UserCoupon'

  usableCouponInfo = {
    id: '',
    display_name: '暂无可用的互助券',
    amount: 0
  }

  index (params: { page: number; coupon_template_id?: string; is_trade?: number; coupon_status?: number }) {
    return axios.get('user_coupon', params)
  }

  recall (coupon_market_ids: string[]) {
    return axios.post('user_coupon/recall', { coupon_market_ids })
  }

  updateUsableCoupon (params: { id: string; display_name: string; amount: number }) {
    if (params) {
      Object.assign(this.usableCouponInfo, params)
      this.usableCouponInfo.display_name = this.usableCouponInfo.display_name || '暂无可用的互助券'
    } else {
      this.usableCouponInfo.id = ''
      this.usableCouponInfo.display_name = '暂无可用的互助券'
      this.usableCouponInfo.amount = 0
    }
  }
}

export default new UserCouponService()
